// ♡ Our Memory Lane — Places We've Been Together ♡

const HUNDRED_REASONS = [
  "How sweet and considerate of others you always are",
  "Your gentle morning voice that's made me blush since day one",
  "The affection that you have for animals",
  "The fact that you say \"howdy\" when beginning almost every single interaction",
  "The way you try and cutely hide your smile when you're happy",
  "The way you dress & always have that shit on",
  "Your cooking that tastes like home",
  "How caring you are when it comes to the people you love",
  "The patience you have",
  "Your willingness to try something new, even when you don't necessarily want to",
  "Your communication skills",
  "The flan you make",
  "All the tunes you hum as we walk around the city",
  "The way you always light the room up",
  "Your laughter on a rainy day",
  "Your natural curiosity for everything out there",
  "How good it feels to be intimate with you and the silly smile on both our faces after",
  "Your newfound affinity for biking",
  "Our walks everywhere, to nowhere in mind",
  "The sparks that fly every time we reunite",
  "Your affinity for cooking tools",
  "Watching you nerd out about action figures",
  "How soft your lips feel when we kiss",
  "The way you inspect the food we eat when we're out and about",
  "Our late-night Mixue runs",
  "Seeing you show up with flowers",
  "All the terrible photos you take",
  "Your affinity for beauty in abnormality",
  "How you make the most menial tasks fun",
  "The way you always make me feel like I belong beside you",
  "Your unwavering loyalty",
  "Every \"good morning\" and \"goodnight\" we share",
  "How safe I feel in your arms",
  "The way your eyes light up when you talk about something you love",
  "How you always know how to make me smile after a hard day",
  "The way you always make time for us, no matter how busy life gets",
  "The future we're building together, one day at a time",
  "The way you believe in me even when I don't believe in myself",
  "Every adventure we accidentally stumble into",
  "Your quiet confidence",
  "How gentle you are without even realizing it",
  "The way you always reach for my hand",
  "How you somehow make airports, trains, and long-distance worth it",
  "The little faces you make when you're concentrating",
  "How proud I am of the man you're becoming",
  "Your dedication to your goals",
  "The comfort of hearing your voice after a long day",
  "Every inside joke that's ours and ours alone",
  "The way you make every goodbye feel like just \"see you soon\"",
  "The way you make me excited for ordinary days together",
  "The way you look at me like I'm the only person in the room",
  "Your willingness to always meet me halfway",
  "The way you never let distance change how much you love me",
  "How easy it is to be completely myself around you",
  "Every time you make me blush without even trying",
  "The little traditions we've made that are ours alone",
  "How every reunion somehow feels even sweeter than the last",
  "The way you always make me feel like a priority",
  "The way your voice instantly calms me down",
  "How you can turn an ordinary afternoon into one of my favorite memories",
  "The excitement I feel every time I see your name on my phone",
  "The way you love me exactly as I am",
  "The confidence you give me just by believing in me",
  "Because with you, forever doesn't feel long enough",
  "Because you've shown me what it feels like to be chosen every day",
  "Because no matter where we are in the world, you're my home",
  "Because you've made long distance feel like love is stronger than miles",
  "Because every version of my future is better if you're in it",
  "Because every countdown I make is really just counting the days until I see you again",
  "Because I still get butterflies after all this time",
  "The way you always notice the little details that everyone else misses",
  "Watching you get completely absorbed in something you're interested in",
  "Your sleepy face in the mornings",
  "The way you always make me feel included, never like an outsider",
  "Your surprisingly goofy sense of humor",
  "The little head tilt you do when you're listening carefully",
  "The way you never pretend to be someone you're not",
  "Your determination, even when things get difficult",
  "How effortlessly you make strangers feel comfortable around you",
  "The little dances you do without realizing it",
  "The way you always want to learn how things work",
  "Your appreciation for good food, good coffee, and good company",
  "How excited you get when you discover something new",
  "The calmness you bring into chaotic moments",
  "The way you make every trip feel like an adventure instead of just travel",
  "Your thoughtfulness in the smallest gestures",
  "The little smile you get when you know you've made me laugh",
  "The way you always stay true to your values",
  "Your ability to find beauty in places other people overlook",
  "The stories we'll someday tell about all the places we've explored together",
  "The fact that I never get tired of hearing your voice",
  "How naturally you make me slow down and enjoy the moment",
  "The excitement of imagining the home we'll build together one day",
  "The way you remind me that love can be peaceful instead of complicated",
  "The person I become when I'm loved by you",
  "Knowing that no matter how much life changes, I'll always want you by my side",
  "Because you've become my favorite place to rest my heart.",
  "Because you've given me a love that feels safe, gentle, patient, and worth waiting a lifetime for.",
  "Because no matter how many birthdays, anniversaries, or years we celebrate together, I know I'll still look at you with the same butterflies I had when we first met.",
  "Because if I could live my life a thousand times over, I would spend every single one searching for you, just so I could fall in love with you all over again."
];
const COUNTRIES = {
  malaysia: {
    key: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    accent: "#CC0001",
    accentLight: "#FFF0F0",
    center: [3.1510, 101.7110],
    zoom: 14,
    tagline: "Where our adventure first truly bloomed 🌺",
    places: [
      {
        emoji: "🛍️",
        name: "Sungei Wang Plaza",
        coords: [3.1469, 101.7107],
        date: "",
        note: "A maze of shops, loud music, and you making everything more fun."
      },
      {
        emoji: "🏨",
        name: "Shangri-La Kuala Lumpur",
        coords: [3.1553, 101.7134],
        date: "",
        note: "Luxury and laughter — the perfect mix with you."
      },
      {
        emoji: "🍜",
        name: "Jalan Alor Food Street",
        coords: [3.1458, 101.7081],
        date: "",
        note: "Late-night street food and warm laughter under the neon lights."
      },
      {
        emoji: "🐱",
        name: "Animal Cafe",
        coords: [3.1495, 101.7120],
        date: "",
        note: "Tiny paws and big smiles — adding the exact spot soon! 📍"
      },
      {
        emoji: "🍣",
        name: "Nobu KL",
        coords: [3.1562, 101.7130],
        date: "",
        note: "Fine dining and finer company. Every bite was a moment."
      }
    ]
  },

  korea: {
    key: "korea",
    name: "South Korea",
    flag: "🇰🇷",
    accent: "#003478",
    accentLight: "#EEF3FF",
    center: [37.5300, 126.9780],
    zoom: 11,
    tagline: "우리의 이야기 — Our story in the land of morning calm 🌸",
    places: [
      {
        emoji: "🌟",
        name: "Gwanak-gu, Seoul",
        coords: [37.4785, 126.9516],
        date: "",
        note: "Where it all began. 💙"
      },
      {
        emoji: "🛍️",
        name: "Myeongdong",
        coords: [37.5636, 126.9827],
        date: "",
        note: "Late nights shopping with you."
      },
      {
        emoji: "✈️",
        name: "Incheon Airport",
        coords: [37.4602, 126.4407],
        date: "",
        note: "Where we said our first hello."
      },
      {
        emoji: "🍲",
        name: "Yeongdeungpo Market",
        coords: [37.5157, 126.9068],
        date: "",
        note: "Best sundae stew of your life."
      },
      {
        emoji: "👖",
        name: "Dongmyo Flea Market",
        coords: [37.5726, 127.0164],
        date: "",
        note: "Fire jeans & 1500 won makgeolli. 🍶"
      },
      {
        emoji: "🍷",
        name: "Onyva Restaurant",
        coords: [37.5347, 126.9948],
        date: "",
        note: "Michelin guide laughter. ✨"
      }
    ]
  },

  usa: {
    key: "usa",
    name: "United States",
    flag: "🇺🇸",
    accent: "#3C3B6E",
    accentLight: "#F0F0FF",
    center: [40.7300, -73.9300],
    zoom: 12,
    tagline: "New York, always home in your arms 🗽",
    places: [
      {
        emoji: "🥟",
        name: "Flushing, Queens",
        coords: [40.7577, -73.8330],
        date: "",
        note: "A mini China — dim sum, bubble tea, and wandering with you."
      },
      {
        emoji: "🏨",
        name: "Wingate by Wyndham LIC",
        coords: [40.7448, -73.9483],
        date: "",
        note: "Worst hotel, but best vibes with you by my side. 😂❤️"
      },
      {
        emoji: "🍵",
        name: "Kijitora, Brooklyn",
        coords: [40.7041, -73.9867],
        date: "",
        note: "Expensive Brooklyn matcha, and cute tote bags."
      },
      {
        emoji: "🌉",
        name: "Dumbo, Brooklyn",
        coords: [40.7033, -73.9903],
        date: "",
        note: "Where we looked into each other's eyes in silence and knew we were right where we wanted to be. 🤍"
      },
      {
        emoji: "🥘",
        name: "East Village",
        coords: [40.7265, -73.9815],
        date: "",
        note: "Walking 30 minutes to a really good Ukrainian restaurant hand-in-hand."
      }
    ]
  },

  hongkong: {
    key: "hongkong",
    name: "Hong Kong",
    flag: "🇭🇰",
    accent: "#DE2910",
    accentLight: "#FFF0EF",
    center: [22.3080, 114.1750],
    zoom: 13,
    tagline: "Places we'll soon go together ✈️🤍",
    places: [
      {
        emoji: "🌙",
        name: "Temple Street Night Market",
        coords: [22.3066, 114.1694],
        date: "",
        note: "Neon lights, fortune tellers, and street food for two."
      },
      {
        emoji: "🌊",
        name: "Kennedy Town New Praya",
        coords: [22.2816, 114.1277],
        date: "",
        note: "A quiet promenade at the edge of the city — our kind of evening."
      },
      {
        emoji: "🛍️",
        name: "Argyle Street Market, Mong Kok",
        coords: [22.3219, 114.1704],
        date: "",
        note: "The best finds in the most chaotic, wonderful streets."
      },
      {
        emoji: "🏮",
        name: "Yau Ma Tei",
        coords: [22.3120, 114.1714],
        date: "",
        note: "Old Hong Kong soul — jade markets, dim sum, and slow mornings."
      },
      {
        emoji: "🎡",
        name: "AIA Carnival",
        coords: [22.2822, 114.1868],
        date: "",
        note: "Ferris wheels, carnival games, and making memories with you."
      }
    ]
  }
};
