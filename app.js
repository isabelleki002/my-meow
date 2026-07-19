// ♡ My Meow — Memory Lane App ♡
// Photos stored in Supabase — accessible from any device, shared between you both

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. Supabase client
  // ──────────────────────────────────────────────
  const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const BUCKET = 'memories';

  // ──────────────────────────────────────────────
  // 2. Helpers
  // ──────────────────────────────────────────────
  function formatCoords(coords) {
    const lat = Math.abs(coords[0]).toFixed(4) + '° ' + (coords[0] >= 0 ? 'N' : 'S');
    const lng = Math.abs(coords[1]).toFixed(4) + '° ' + (coords[1] >= 0 ? 'E' : 'W');
    return `${lat}, ${lng}`;
  }

  function getPublicUrl(storagePath) {
    const { data } = db.storage.from(BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  }

  function uniquePath(countryKey, file) {
    const ext = file.name.split('.').pop().toLowerCase();
    return `${countryKey}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  }

  // ──────────────────────────────────────────────
  // 3. Leaflet map
  // ──────────────────────────────────────────────
  const maps = {};

  function createHeartIcon(accentColor) {
    return L.divIcon({
      className: 'heart-marker-wrapper',
      html: `<div class="heart-marker" style="color:${accentColor}">♥</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 28],
      popupAnchor: [0, -28]
    });
  }

  function initMap(countryData) {
    const mapEl = document.getElementById(`map-${countryData.key}`);
    if (!mapEl) return;

    const map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false })
      .setView(countryData.center, countryData.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    const icon = createHeartIcon(countryData.accent);
    countryData.places.forEach(place => {
      const popup = L.popup({ maxWidth: 220 }).setContent(`
        <div class="map-popup-name">${place.emoji} ${place.name}</div>
        <div class="map-popup-coords">${formatCoords(place.coords)}</div>
        <div class="map-popup-note">${place.note}</div>
      `);
      L.marker(place.coords, { icon }).addTo(map).bindPopup(popup);
    });

    maps[countryData.key] = map;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => map.invalidateSize(), 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(mapEl);
  }

  // ──────────────────────────────────────────────
  // 4. Photo gallery (async — loads from Supabase)
  // ──────────────────────────────────────────────
  async function renderGallery(countryKey) {
    const grid = document.getElementById(`photo-grid-${countryKey}`);
    if (!grid) return;

    grid.innerHTML = '<div class="gallery-loading">Loading memories... 💕</div>';

    const { data: photos, error } = await db
      .from('photos')
      .select('*')
      .eq('country', countryKey)
      .order('created_at', { ascending: true });

    grid.innerHTML = '';

    if (!error && photos) {
      photos.forEach(photo => {
        const url = getPublicUrl(photo.storage_path);
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.dataset.id = photo.id;
        card.innerHTML = `
          <img src="${url}" alt="${photo.caption || 'Memory'}" loading="lazy">
          <div class="photo-caption-overlay">${photo.caption || 'Click to add a caption ✏️'}</div>
          <button class="photo-delete-btn" title="Remove photo" aria-label="Remove photo">✕</button>
        `;

        card.querySelector('img').addEventListener('click', () => {
          openLightbox(url, photo.caption);
        });

        card.querySelector('.photo-delete-btn').addEventListener('click', e => {
          e.stopPropagation();
          if (confirm('Remove this memory? 🥺')) deletePhoto(photo, countryKey);
        });

        card.querySelector('.photo-caption-overlay').addEventListener('click', e => {
          e.stopPropagation();
          openCaptionModal(photo.id, countryKey, photo.caption || '');
        });

        grid.appendChild(card);
      });
    }

    // Always show "Add a photo" card at the end
    const addCard = document.createElement('div');
    addCard.className = 'add-photo-card';
    addCard.setAttribute('role', 'button');
    addCard.setAttribute('aria-label', 'Add a photo');
    addCard.innerHTML = `<span class="add-photo-icon">📷</span><span>Add a photo</span>`;
    addCard.addEventListener('click', () => triggerPhotoUpload(countryKey));
    grid.appendChild(addCard);
  }

  // ──────────────────────────────────────────────
  // 5. Photo upload → Supabase Storage
  // ──────────────────────────────────────────────
  function triggerPhotoUpload(countryKey) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', async () => {
      const files = Array.from(input.files);
      if (!files.length) return;

      // Show uploading indicator
      const grid = document.getElementById(`photo-grid-${countryKey}`);
      const addCard = grid ? grid.querySelector('.add-photo-card') : null;
      if (addCard) {
        addCard.innerHTML = `<span class="add-photo-icon">⏳</span><span>Uploading ${files.length} photo${files.length > 1 ? 's' : ''}...</span>`;
        addCard.style.pointerEvents = 'none';
      }

      for (const file of files) {
        const path = uniquePath(countryKey, file);
        const { error: uploadError } = await db.storage.from(BUCKET).upload(path, file);
        if (uploadError) {
          console.warn('Upload error:', uploadError);
          continue;
        }
        await db.from('photos').insert({ country: countryKey, storage_path: path, caption: '' });
      }

      await renderGallery(countryKey);
      input.value = '';
    });

    input.click();
  }

  // ──────────────────────────────────────────────
  // 6. Delete photo from Storage + DB
  // ──────────────────────────────────────────────
  async function deletePhoto(photo, countryKey) {
    await db.storage.from(BUCKET).remove([photo.storage_path]);
    await db.from('photos').delete().eq('id', photo.id);
    await renderGallery(countryKey);
  }

  // ──────────────────────────────────────────────
  // 7. Caption modal
  // ──────────────────────────────────────────────
  let captionModal, captionInput, captionSaveBtn, captionCancelBtn;

  function initCaptionModal() {
    captionModal    = document.getElementById('caption-modal');
    captionInput    = document.getElementById('caption-input');
    captionSaveBtn  = document.getElementById('caption-save');
    captionCancelBtn = document.getElementById('caption-cancel');
    if (!captionModal) return;

    captionCancelBtn.addEventListener('click', closeCaptionModal);
    captionModal.addEventListener('click', e => {
      if (e.target === captionModal) closeCaptionModal();
    });
  }

  let _captionContext = null;

  function openCaptionModal(photoId, countryKey, currentCaption) {
    if (!captionModal) return;
    _captionContext = { photoId, countryKey };
    captionInput.value = currentCaption;
    captionModal.classList.add('open');
    setTimeout(() => captionInput.focus(), 50);

    captionSaveBtn.onclick = async () => {
      const caption = captionInput.value.trim();
      await db.from('photos').update({ caption }).eq('id', _captionContext.photoId);
      await renderGallery(_captionContext.countryKey);
      closeCaptionModal();
    };
  }

  function closeCaptionModal() {
    captionModal.classList.remove('open');
    _captionContext = null;
  }

  // ──────────────────────────────────────────────
  // 8. Lightbox
  // ──────────────────────────────────────────────
  let lightboxOverlay, lightboxImg, lightboxCaption, lightboxClose;

  function initLightbox() {
    lightboxOverlay = document.getElementById('lightbox-overlay');
    lightboxImg     = document.getElementById('lightbox-img');
    lightboxCaption = document.getElementById('lightbox-caption');
    lightboxClose   = document.getElementById('lightbox-close');
    if (!lightboxOverlay) return;

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', e => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function openLightbox(src, caption) {
    if (!lightboxOverlay) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxOverlay.classList.add('open');
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('open');
    lightboxImg.src = '';
  }

  // ──────────────────────────────────────────────
  // ──────────────────────────────────────────────
  // 9. 100 Reasons
  // ──────────────────────────────────────────────
  function initHundredReasons() {
    const grid = document.getElementById('hundred-grid');
    if (!grid) return;
    HUNDRED_REASONS.forEach((reason, i) => {
      const num  = String(i + 1).padStart(3, '0');
      const card = document.createElement('div');
      card.className = 'hundred-card';
      card.innerHTML = `
        <span class="hundred-num">${num}</span>
        <p class="hundred-text">${reason}</p>
      `;
      grid.appendChild(card);
    });
  }

  // ──────────────────────────────────────────────
  // 9. Reasons (shared)
  // ──────────────────────────────────────────────
  let _reasonAuthor = localStorage.getItem('reason_author') || 'Isabelle';

  async function loadReasons() {
    const grid  = document.getElementById('reasons-grid');
    const empty = document.getElementById('reasons-empty');
    if (!grid) return;

    const { data: reasons, error } = await db
      .from('reasons')
      .select('*')
      .order('created_at', { ascending: true });

    Array.from(grid.querySelectorAll('.reason-card')).forEach(el => el.remove());

    if (!error && reasons && reasons.length > 0) {
      if (empty) empty.style.display = 'none';
      reasons.forEach((r, i) => {
        const who  = r.author === 'Isabelle' ? 'isabelle' : 'michael';
        const num  = String(i + 1).padStart(3, '0');
        const card = document.createElement('div');
        card.className = `reason-card ${who}`;
        card.dataset.id = r.id;
        card.innerHTML = `
          <span class="reason-number">${num}</span>
          <p class="reason-text">${r.reason.replace(/\n/g, '<br>')}</p>
          <div class="reason-footer">
            <span class="reason-author-tag">— ${r.author}</span>
            <button class="reason-delete" title="Delete">✕</button>
          </div>
        `;
        card.querySelector('.reason-delete').addEventListener('click', () => {
          if (confirm('Remove this reason? 🥺')) deleteReason(r.id);
        });
        grid.appendChild(card);
      });
    } else {
      if (empty) empty.style.display = '';
    }
  }

  async function postReason() {
    const input = document.getElementById('reason-input');
    const btn   = document.getElementById('reason-send-btn');
    const msg   = input ? input.value.trim() : '';
    if (!msg) return;

    btn.disabled = true;
    btn.textContent = 'Adding...';

    const { error } = await db.from('reasons').insert({ author: _reasonAuthor, reason: msg });
    if (!error) input.value = '';
    else console.warn('Reason post error:', error);

    btn.disabled = false;
    btn.textContent = 'Add ♡';
  }

  async function deleteReason(id) {
    await db.from('reasons').delete().eq('id', id);
    await loadReasons();
  }

  function initReasons() {
    // Author toggle (reuses same author-btn styles)
    const btns = [
      document.getElementById('reason-author-isabelle'),
      document.getElementById('reason-author-michael')
    ].filter(Boolean);

    btns.forEach(btn => {
      if (btn.dataset.author === _reasonAuthor) btn.classList.add('active');
      btn.addEventListener('click', () => {
        _reasonAuthor = btn.dataset.author;
        localStorage.setItem('reason_author', _reasonAuthor);
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    const sendBtn  = document.getElementById('reason-send-btn');
    const textarea = document.getElementById('reason-input');
    if (sendBtn)  sendBtn.addEventListener('click', postReason);
    if (textarea) textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) postReason();
    });

    loadReasons();

    // Real-time
    db.channel('reasons-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reasons' }, () => loadReasons())
      .subscribe();
  }

  // ──────────────────────────────────────────────
  // 10. Notes
  // ──────────────────────────────────────────────
  let _selectedAuthor = localStorage.getItem('note_author') || 'Isabelle';

  function formatNoteTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  function renderNote(note) {
    const who = note.author === 'Isabelle' ? 'isabelle' : 'michael';
    const bubble = document.createElement('div');
    bubble.className = `note-bubble ${who}`;
    bubble.dataset.id = note.id;
    bubble.innerHTML = `
      <span class="note-author">${note.author}</span>
      <div class="note-body">${note.message.replace(/\n/g, '<br>')}</div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <span class="note-time">${formatNoteTime(note.created_at)}</span>
        <button class="note-delete" title="Delete note">✕</button>
      </div>
    `;
    bubble.querySelector('.note-delete').addEventListener('click', () => {
      if (confirm('Delete this note? 🥺')) deleteNote(note.id);
    });
    return bubble;
  }

  async function loadNotes() {
    const feed = document.getElementById('notes-feed');
    const empty = document.getElementById('notes-empty');
    if (!feed) return;

    const { data: notes, error } = await db
      .from('notes')
      .select('*')
      .order('created_at', { ascending: true });

    // Clear existing bubbles (keep empty placeholder)
    Array.from(feed.querySelectorAll('.note-bubble')).forEach(el => el.remove());

    if (!error && notes && notes.length > 0) {
      if (empty) empty.style.display = 'none';
      notes.forEach(note => feed.appendChild(renderNote(note)));
    } else {
      if (empty) empty.style.display = '';
    }

    // Scroll to bottom
    feed.scrollTop = feed.scrollHeight;
  }

  async function postNote() {
    const input = document.getElementById('note-input');
    const btn   = document.getElementById('note-send-btn');
    const msg   = input ? input.value.trim() : '';
    if (!msg) return;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    const { error } = await db.from('notes').insert({
      author: _selectedAuthor,
      message: msg
    });

    if (!error) {
      input.value = '';
    } else {
      console.warn('Note post error:', error);
    }

    btn.disabled = false;
    btn.textContent = 'Send ♡';
  }

  async function deleteNote(id) {
    await db.from('notes').delete().eq('id', id);
    await loadNotes();
  }

  function initNotes() {
    // Author toggle
    const authorBtns = document.querySelectorAll('.author-btn');
    authorBtns.forEach(btn => {
      if (btn.dataset.author === _selectedAuthor) btn.classList.add('active');
      else btn.classList.remove('active');

      btn.addEventListener('click', () => {
        _selectedAuthor = btn.dataset.author;
        localStorage.setItem('note_author', _selectedAuthor);
        authorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Send on button click
    const sendBtn = document.getElementById('note-send-btn');
    if (sendBtn) sendBtn.addEventListener('click', postNote);

    // Send on Ctrl/Cmd+Enter
    const textarea = document.getElementById('note-input');
    if (textarea) {
      textarea.addEventListener('keydown', e => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) postNote();
      });
    }

    // Load existing notes
    loadNotes();

    // Real-time: new notes appear instantly on both screens
    db.channel('notes-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notes'
      }, () => loadNotes())
      .subscribe();
  }

  // ──────────────────────────────────────────────
  // 10. Place cards
  // ──────────────────────────────────────────────
  function buildPlaceCards(countryData) {
    return countryData.places.map(place => `
      <div class="place-card" style="--country-accent: ${countryData.accent}">
        <div class="place-card-top">
          <span class="place-emoji">${place.emoji}</span>
          <div>
            <div class="place-name">${place.name}</div>
            <span class="place-coords">${formatCoords(place.coords)}</span>
          </div>
        </div>
        <p class="place-note">${place.note}</p>
      </div>
    `).join('');
  }

  function buildCountrySection(countryData) {
    const placesGrid = document.getElementById(`places-${countryData.key}`);
    if (placesGrid) placesGrid.innerHTML = buildPlaceCards(countryData);
    renderGallery(countryData.key); // async, self-contained
  }

  // ──────────────────────────────────────────────
  // 10. Scroll animations
  // ──────────────────────────────────────────────
  function initScrollAnimations() {
    const targets = document.querySelectorAll('.country-section, .place-card');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(el => observer.observe(el));
  }

  // ──────────────────────────────────────────────
  // 11. Init
  // ──────────────────────────────────────────────
  function init() {
    // Pass 1: place cards + galleries (each country independent)
    Object.values(COUNTRIES).forEach(countryData => {
      try { buildCountrySection(countryData); }
      catch (e) { console.warn('Section failed for', countryData.key, e); }
    });

    // Pass 2: maps (isolated so map errors never block place cards)
    Object.values(COUNTRIES).forEach(countryData => {
      try { initMap(countryData); }
      catch (e) { console.warn('Map failed for', countryData.key, e); }
    });

    initCaptionModal();
    initLightbox();
    initHundredReasons();
    initReasons();
    initNotes();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
