// instructor.languages is an array of ISO language codes.
// Resolved to display names via translations.languageNames[code][lang].
export const activities = [
  {
    id: 1,
    category: "sport",
    emoji: "⚽",
    color: "#16A34A",

    name: {
      en: "Soccer Training",
      he: "אימון כדורגל",
      ru: "Тренировки по футболу",
    },
    neighborhood: {
      en: "HaYarkon Park",
      he: "פארק הירקון",
      ru: "Парк Яркон",
    },
    location: {
      en: "Tel Aviv · HaYarkon Park",
      he: "תל אביב · פארק הירקון",
      ru: "Тель-Авив · Парк Яркон",
    },

    price: 280,
    instructor: { name: "Alex Petrov",    languages: ["ru", "en", "he"] },
    ageRange:  { en: "Ages 7–12",  he: "גילאי 7–12",  ru: "Возраст 7–12"  },
    schedule:  { en: "Mon & Wed, 16:00–17:30", he: "ב׳ ורביעי, 16:00–17:30", ru: "Пн и Ср, 16:00–17:30" },
    phone:     "+972523456789",
    whatsapp:  "972523456789",

    immigrantRating:    5,
    hebrewLevel:        "beginner",
    registrationStatus: "open",

    coords: [32.1025, 34.7805], // HaYarkon Park, north Tel Aviv
  },

  {
    id: 2,
    category: "art",
    emoji: "🎨",
    color: "#7C3AED",

    name: {
      en: "Creative Art Studio",
      he: "סטודיו אמנות יצירתית",
      ru: "Творческая арт-студия",
    },
    neighborhood: {
      en: "Florentin",
      he: "פלורנטין",
      ru: "Флорентин",
    },
    location: {
      en: "Tel Aviv · Florentin",
      he: "תל אביב · פלורנטין",
      ru: "Тель-Авив · Флорентин",
    },

    price: 350,
    instructor: { name: "Maya Cohen",     languages: ["he", "en"] },
    ageRange:  { en: "Ages 5–10",  he: "גילאי 5–10",  ru: "Возраст 5–10"  },
    schedule:  { en: "Sun & Tue, 15:30–17:00", he: "א׳ וג׳, 15:30–17:00", ru: "Вс и Вт, 15:30–17:00" },
    phone:     "+972501234567",
    whatsapp:  "972501234567",

    immigrantRating:    4.5,
    hebrewLevel:        "beginner",
    registrationStatus: "open",

    coords: [32.0532, 34.7734], // Florentin, south Tel Aviv
  },

  {
    id: 3,
    category: "youth_movement",
    emoji: "⛺",
    color: "#065F46",

    name: {
      en: "Tzofim – Dizengoff Tribe",
      he: "צופים – שבט דיזנגוף",
      ru: "Цофим – отряд Дизенгоф",
    },
    neighborhood: {
      en: "Dizengoff",
      he: "דיזנגוף",
      ru: "Дизенгоф",
    },
    location: {
      en: "Tel Aviv · Dizengoff",
      he: "תל אביב · דיזנגוף",
      ru: "Тель-Авив · Дизенгоф",
    },

    price: 180,
    instructor: { name: "Noa Levi",       languages: ["he"] },
    ageRange:  { en: "Ages 8–14",  he: "גילאי 8–14",  ru: "Возраст 8–14"  },
    schedule:  { en: "Fri, 09:00–12:00", he: "שישי, 09:00–12:00", ru: "Пт, 09:00–12:00" },
    phone:     "+972504567890",
    whatsapp:  "972504567890",

    immigrantRating:    2.5,
    hebrewLevel:        "advanced",
    registrationStatus: "open",

    coords: [32.0803, 34.7742], // Dizengoff area, central Tel Aviv
  },

  {
    id: 4,
    category: "music",
    emoji: "🎹",
    color: "#D97706",

    name: {
      en: "Piano & Classical Music",
      he: "פסנתר ומוזיקה קלאסית",
      ru: "Фортепиано и классическая музыка",
    },
    neighborhood: {
      en: "Lev HaIr",
      he: "לב העיר",
      ru: "Лев ха-Ир",
    },
    location: {
      en: "Tel Aviv · Lev HaIr",
      he: "תל אביב · לב העיר",
      ru: "Тель-Авив · Лев ха-Ир",
    },

    price: 420,
    instructor: { name: "Dmitri Volkov",  languages: ["ru", "he", "en"] },
    ageRange:  { en: "Ages 7–16",  he: "גילאי 7–16",  ru: "Возраст 7–16"  },
    schedule:  { en: "Wed & Fri, 15:00–16:00", he: "ד׳ וו׳, 15:00–16:00", ru: "Ср и Пт, 15:00–16:00" },
    phone:     "+972541112233",
    whatsapp:  "972541112233",

    immigrantRating:    4,
    hebrewLevel:        "beginner",
    registrationStatus: "open",

    coords: [32.0726, 34.7748], // Lev HaIr, central Tel Aviv
  },

  {
    id: 5,
    category: "sport",
    emoji: "🏀",
    color: "#EA580C",

    name: {
      en: "Basketball Academy",
      he: "אקדמיית כדורסל",
      ru: "Академия баскетбола",
    },
    neighborhood: {
      en: "Ramat Gan",
      he: "רמת גן",
      ru: "Рамат-Ган",
    },
    location: {
      en: "Ramat Gan · City Center",
      he: "רמת גן · מרכז העיר",
      ru: "Рамат-Ган · Центр города",
    },

    price: 320,
    instructor: { name: "Idan Shapiro",   languages: ["he", "en"] },
    ageRange:  { en: "Ages 10–16", he: "גילאי 10–16", ru: "Возраст 10–16" },
    schedule:  { en: "Mon, Wed & Thu, 17:00–19:00", he: "ב׳, ד׳ וה׳, 17:00–19:00", ru: "Пн, Ср и Чт, 17:00–19:00" },
    phone:     "+972527654321",
    whatsapp:  "972527654321",

    immigrantRating:    3.5,
    hebrewLevel:        "intermediate",
    registrationStatus: "open",

    coords: [32.0832, 34.8090], // Ramat Gan center
  },

  {
    id: 6,
    category: "dance",
    emoji: "💃",
    color: "#DB2777",

    name: {
      en: "Dance & Movement",
      he: "מחול ותנועה",
      ru: "Танец и движение",
    },
    neighborhood: {
      en: "Neve Tzedek",
      he: "נווה צדק",
      ru: "Неве-Цедек",
    },
    location: {
      en: "Tel Aviv · Neve Tzedek",
      he: "תל אביב · נווה צדק",
      ru: "Тель-Авив · Неве-Цедек",
    },

    price: 300,
    instructor: { name: "Elena Sorokina", languages: ["ru", "en", "he"] },
    ageRange:  { en: "Ages 4–8",   he: "גילאי 4–8",   ru: "Возраст 4–8"   },
    schedule:  { en: "Sun & Thu, 15:00–16:00", he: "א׳ וה׳, 15:00–16:00", ru: "Вс и Чт, 15:00–16:00" },
    phone:     "+972509876543",
    whatsapp:  "972509876543",

    immigrantRating:    5,
    hebrewLevel:        "beginner",
    registrationStatus: "closed",

    coords: [32.0571, 34.7692], // Neve Tzedek, south-west Tel Aviv
  },

  {
    id: 7,
    category: "youth_movement",
    emoji: "📖",
    color: "#0369A1",

    name: {
      en: "HaNoar HaOved VeHaLomed – Florentin",
      he: "הנוער העובד והלומד – סניף פלורנטין",
      ru: "Ха-Ноар ха-Овед – отделение Флорентин",
    },
    neighborhood: {
      en: "Florentin",
      he: "פלורנטין",
      ru: "Флорентин",
    },
    location: {
      en: "Tel Aviv · Florentin",
      he: "תל אביב · פלורנטין",
      ru: "Тель-Авив · Флорентин",
    },

    price: 160,
    instructor: { name: "Yael Mizrachi",  languages: ["he"] },
    ageRange:  { en: "Ages 10–18", he: "גילאי 10–18", ru: "Возраст 10–18" },
    schedule:  { en: "Sat, 10:00–13:00 & Wed evenings", he: "שבת 10:00–13:00 וערבי רביעי", ru: "Сб, 10:00–13:00 и ср вечером" },
    phone:     "+972521234560",
    whatsapp:  "972521234560",

    immigrantRating:    2,
    hebrewLevel:        "advanced",
    registrationStatus: "open",

    coords: [32.0518, 34.7722], // Florentin, south Tel Aviv
  },

  {
    id: 8,
    category: "youth_movement",
    emoji: "🌟",
    color: "#7E22CE",

    name: {
      en: "Bnei Akiva – Ramat Aviv Aleph",
      he: "בני עקיבא – רמת אביב א׳",
      ru: "Бней Акива – Рамат-Авив Алеф",
    },
    neighborhood: {
      en: "Ramat Aviv",
      he: "רמת אביב",
      ru: "Рамат-Авив",
    },
    location: {
      en: "Tel Aviv · Ramat Aviv",
      he: "תל אביב · רמת אביב",
      ru: "Тель-Авив · Рамат-Авив",
    },

    price: 200,
    instructor: { name: "Tzvi Goldberg",  languages: ["he", "en"] },
    ageRange:  { en: "Ages 8–18",  he: "גילאי 8–18",  ru: "Возраст 8–18"  },
    schedule:  { en: "Sat, 09:00–12:30", he: "שבת, 09:00–12:30", ru: "Сб, 09:00–12:30" },
    phone:     "+972509998877",
    whatsapp:  "972509998877",

    immigrantRating:    1.5,
    hebrewLevel:        "advanced",
    registrationStatus: "open",

    coords: [32.1150, 34.8012], // Ramat Aviv, north Tel Aviv
  },
]
