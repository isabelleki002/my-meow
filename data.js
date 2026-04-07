// ♡ Our Memory Lane — Places We've Been Together ♡
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
