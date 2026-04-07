// ♡ My Meow — Memory Lane App ♡
// Maps, photo upload, localStorage, lightbox

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // 1. Storage helpers
  // ──────────────────────────────────────────────
  function storageKey(countryKey) {
    return `memory_photos_${countryKey}`;
  }

  function loadPhotos(countryKey) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(countryKey))) || [];
    } catch {
      return [];
    }
  }

  function savePhotos(countryKey, photos) {
    localStorage.setItem(storageKey(countryKey), JSON.stringify(photos));
  }

  // ──────────────────────────────────────────────
  // 2. Leaflet map initialisation
  // ──────────────────────────────────────────────
  const maps = {};

  function formatCoords(coords) {
    const lat = Math.abs(coords[0]).toFixed(4) + '° ' + (coords[0] >= 0 ? 'N' : 'S');
    const lng = Math.abs(coords[1]).toFixed(4) + '° ' + (coords[1] >= 0 ? 'E' : 'W');
    return `${lat}, ${lng}`;
  }

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

    // Fix Leaflet rendering when section becomes visible
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => map.invalidateSize(), 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(mapEl);
  }

  // ──────────────────────────────────────────────
  // 3. Photo gallery rendering
  // ──────────────────────────────────────────────
  function renderGallery(countryKey) {
    const grid = document.getElementById(`photo-grid-${countryKey}`);
    if (!grid) return;

    const photos = loadPhotos(countryKey);
    grid.innerHTML = '';

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="${photo.dataUrl}" alt="${photo.caption || 'Memory'}" loading="lazy">
        <div class="photo-caption-overlay">${photo.caption || 'Click to add a caption ✏️'}</div>
        <button class="photo-delete-btn" data-idx="${idx}" title="Remove photo" aria-label="Remove photo">✕</button>
      `;

      // Open lightbox on image click
      card.querySelector('img').addEventListener('click', () => {
        openLightbox(photo.dataUrl, photo.caption);
      });

      // Delete button
      card.querySelector('.photo-delete-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (confirm('Remove this memory? 🥺')) {
          const updated = loadPhotos(countryKey);
          updated.splice(idx, 1);
          savePhotos(countryKey, updated);
          renderGallery(countryKey);
        }
      });

      // Edit caption on overlay click
      card.querySelector('.photo-caption-overlay').addEventListener('click', e => {
        e.stopPropagation();
        openCaptionModal(countryKey, idx, photo.caption || '');
      });

      grid.appendChild(card);
    });

    // Always append the "add photo" card at the end
    const addCard = document.createElement('div');
    addCard.className = 'add-photo-card';
    addCard.setAttribute('role', 'button');
    addCard.setAttribute('aria-label', 'Add a photo');
    addCard.innerHTML = `
      <span class="add-photo-icon">📷</span>
      <span>Add a photo</span>
    `;
    addCard.addEventListener('click', () => triggerPhotoUpload(countryKey));
    grid.appendChild(addCard);
  }

  // ──────────────────────────────────────────────
  // 4. Photo upload
  // ──────────────────────────────────────────────
  function triggerPhotoUpload(countryKey) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', () => {
      const files = Array.from(input.files);
      if (!files.length) return;

      const readers = files.map(file => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve({ dataUrl: e.target.result, caption: '' });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(newPhotos => {
        const existing = loadPhotos(countryKey);
        savePhotos(countryKey, [...existing, ...newPhotos]);
        renderGallery(countryKey);
      });

      // Reset so same file can be re-uploaded
      input.value = '';
    });

    input.click();
  }

  // ──────────────────────────────────────────────
  // 5. Caption modal
  // ──────────────────────────────────────────────
  let captionModal, captionInput, captionSaveBtn, captionCancelBtn;

  function initCaptionModal() {
    captionModal = document.getElementById('caption-modal');
    captionInput = document.getElementById('caption-input');
    captionSaveBtn = document.getElementById('caption-save');
    captionCancelBtn = document.getElementById('caption-cancel');

    if (!captionModal) return;

    captionCancelBtn.addEventListener('click', closeCaptionModal);
    captionModal.addEventListener('click', e => {
      if (e.target === captionModal) closeCaptionModal();
    });
  }

  let _captionContext = null;

  function openCaptionModal(countryKey, idx, currentCaption) {
    if (!captionModal) return;
    _captionContext = { countryKey, idx };
    captionInput.value = currentCaption;
    captionModal.classList.add('open');
    setTimeout(() => captionInput.focus(), 50);

    captionSaveBtn.onclick = () => {
      const photos = loadPhotos(_captionContext.countryKey);
      if (photos[_captionContext.idx]) {
        photos[_captionContext.idx].caption = captionInput.value.trim();
        savePhotos(_captionContext.countryKey, photos);
        renderGallery(_captionContext.countryKey);
      }
      closeCaptionModal();
    };
  }

  function closeCaptionModal() {
    captionModal.classList.remove('open');
    _captionContext = null;
  }

  // ──────────────────────────────────────────────
  // 6. Lightbox
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
  // 7. Export / Import
  // ──────────────────────────────────────────────
  function exportData() {
    const data = {};
    Object.keys(COUNTRIES).forEach(key => {
      data[key] = loadPhotos(key);
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `our-memory-lane-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', () => {
      if (!input.files[0]) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          Object.keys(data).forEach(key => {
            if (COUNTRIES[key]) savePhotos(key, data[key]);
          });
          Object.keys(COUNTRIES).forEach(key => renderGallery(key));
          alert('Memories imported! 💝');
        } catch {
          alert('Hmm, that file didn\'t work. Make sure it\'s a valid export. 🥺');
        }
      };
      reader.readAsText(input.files[0]);
    });
    input.click();
  }

  // ──────────────────────────────────────────────
  // 8. Build country sections dynamically
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
    const section = document.getElementById(`section-${countryData.key}`);
    if (!section) return;

    // Place cards
    const placesGrid = section.querySelector('.places-grid');
    if (placesGrid) {
      placesGrid.innerHTML = buildPlaceCards(countryData);
    }

    // Map
    initMap(countryData);

    // Gallery
    renderGallery(countryData.key);
  }

  // ──────────────────────────────────────────────
  // 9. Scroll-triggered fade-in animations
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
  // 10. Init
  // ──────────────────────────────────────────────
  function init() {
    // Build all country sections
    Object.values(COUNTRIES).forEach(buildCountrySection);

    // Modals & lightbox
    initCaptionModal();
    initLightbox();

    // Export / Import buttons
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportData);
    if (importBtn) importBtn.addEventListener('click', importData);

    // Scroll animations
    initScrollAnimations();
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
