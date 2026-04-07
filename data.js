// ♡ Our Memory Lane — Places We've Been Together ♡
const COUNTRIES = {
  malaysia: {
    key: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    accent: "#CC0001",
    accentLight: "#FFF0F0",
    center: [3.8077, 109.4497],
    zoom: 5,
    tagline: "Where our adventure first truly bloomed 🌺",
    places: [
      {
        emoji: "🏙️",
        name: "Petronas Twin Towers",
        coords: [3.1579, 101.7116],
        date: "",
        note: "Standing beneath the twin giants, looking up — and at each other. 💫"
      },
      {
        emoji: "🌿",
        name: "KLCC Park",
        coords: [3.1536, 101.7141],
        date: "",
        note: "Walking side by side through the park, not wanting the evening to end."
      },
      {
        emoji: "🍜",
        name: "Jalan Alor Food Street",
        coords: [3.1458, 101.7081],
        date: "",
        note: "Late-night street food and warm laughter under the neon lights."
      },
      {
        emoji: "🌅",
        name: "Penang Hill",
        coords: [5.4164, 100.2688],
        date: "",
        note: "The view from the top was breathtaking — almost as breathtaking as you."
      },
      {
        emoji: "🏖️",
        name: "Langkawi Island",
        coords: [6.3500, 99.8000],
        date: "",
        note: "Crystal waters and endless horizon. Add your memory here..."
      },
      {
        emoji: "🕌",
        name: "Batu Caves",
        coords: [3.2379, 101.6840],
        date: "",
        note: "272 steps hand in hand. Worth every single one."
      }
    ]
  },

  korea: {
    key: "korea",
    name: "South Korea",
    flag: "🇰🇷",
    accent: "#003478",
    accentLight: "#EEF3FF",
    center: [36.5, 127.5],
    zoom: 6,
    tagline: "우리의 이야기 — Our story in the land of morning calm 🌸",
    places: [
      {
        emoji: "🏯",
        name: "Gyeongbokgung Palace",
        coords: [37.5796, 126.9770],
        date: "",
        note: "In matching hanboks, feeling like characters from a love story. We basically were. 👘"
      },
      {
        emoji: "🌸",
        name: "Bukchon Hanok Village",
        coords: [37.5826, 126.9830],
        date: "",
        note: "Wandering the narrow alleyways at golden hour — pure magic."
      },
      {
        emoji: "🗼",
        name: "N Seoul Tower (Namsan)",
        coords: [37.5512, 126.9882],
        date: "",
        note: "Our lock is on that tower. Our love is locked in forever. 🔐"
      },
      {
        emoji: "🛍️",
        name: "Myeongdong",
        coords: [37.5636, 126.9827],
        date: "",
        note: "Tteokbokki, street snacks, and too many skincare products. 10/10."
      },
      {
        emoji: "🍑",
        name: "Jeju Island",
        coords: [33.4890, 126.4983],
        date: "",
        note: "The most beautiful island with the most beautiful person. Add your memory here..."
      },
      {
        emoji: "🌊",
        name: "Haeundae Beach, Busan",
        coords: [35.1587, 129.1604],
        date: "",
        note: "Watching the waves together, nowhere else we'd rather be."
      }
    ]
  },

  usa: {
    key: "usa",
    name: "United States",
    flag: "🇺🇸",
    accent: "#3C3B6E",
    accentLight: "#F0F0FF",
    center: [39.5, -98.35],
    zoom: 4,
    tagline: "From coast to coast, always home in your arms 🗽",
    places: [
      {
        emoji: "🗽",
        name: "New York City",
        coords: [40.7128, -74.0060],
        date: "",
        note: "The city that never sleeps — neither did we, we were too excited. 🌃"
      },
      {
        emoji: "🌉",
        name: "Golden Gate Bridge, San Francisco",
        coords: [37.8199, -122.4783],
        date: "",
        note: "Foggy, cold, and completely perfect. Add your memory here..."
      },
      {
        emoji: "🎡",
        name: "Santa Monica Pier, LA",
        coords: [34.0098, -118.4975],
        date: "",
        note: "Cotton candy, the Ferris wheel, and your hand in mine."
      },
      {
        emoji: "🌵",
        name: "Grand Canyon",
        coords: [36.1069, -112.1129],
        date: "",
        note: "Standing at the edge of something enormous — just like this love. Add your memory here..."
      },
      {
        emoji: "🎶",
        name: "Nashville, Tennessee",
        coords: [36.1627, -86.7816],
        date: "",
        note: "Live music, honky-tonks, and slow dancing. Add your memory here..."
      },
      {
        emoji: "🏙️",
        name: "Chicago",
        coords: [41.8781, -87.6298],
        date: "",
        note: "The Bean, the deep dish, the wind — and us. Add your memory here..."
      }
    ]
  },

  hongkong: {
    key: "hongkong",
    name: "Hong Kong",
    flag: "🇭🇰",
    accent: "#DE2910",
    accentLight: "#FFF0EF",
    center: [22.3193, 114.1694],
    zoom: 11,
    tagline: "城市的燈光，我們的故事 — City lights, our story ✨",
    places: [
      {
        emoji: "🏔️",
        name: "Victoria Peak",
        coords: [22.2759, 114.1455],
        date: "",
        note: "The whole city glittered below us like it was celebrating us. 🌃"
      },
      {
        emoji: "🛳️",
        name: "Star Ferry Pier",
        coords: [22.2937, 114.1694],
        date: "",
        note: "Crossing the harbour as the sky turned pink. Timeless."
      },
      {
        emoji: "🌃",
        name: "Tsim Sha Tsui Promenade",
        coords: [22.2942, 114.1722],
        date: "",
        note: "The Symphony of Lights show — but honestly you were the best view."
      },
      {
        emoji: "🍢",
        name: "Temple Street Night Market",
        coords: [22.3066, 114.1694],
        date: "",
        note: "Dim sum, egg waffles, and getting delightfully lost together."
      },
      {
        emoji: "🏝️",
        name: "Lantau Island & Big Buddha",
        coords: [22.2540, 113.9050],
        date: "",
        note: "Cable car views and peaceful mountain air. Add your memory here..."
      },
      {
        emoji: "🛍️",
        name: "Mong Kok",
        coords: [22.3193, 114.1694],
        date: "",
        note: "Busy, loud, full of life — kind of like us. Add your memory here..."
      }
    ]
  }
};
