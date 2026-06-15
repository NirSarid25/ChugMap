export const translations = {
  en: {
    // ── App chrome ────────────────────────────────────────────────
    appTagline: "Find activities for your kids",
    tapPin: "Tap a pin to explore activities",

    // ── Modal field labels ────────────────────────────────────────
    price:        "Monthly Fee",
    perMonth:     "/ month",
    location:     "Location",
    ageGroup:     "Age Group",
    schedule:     "Schedule",
    instructor:   "Instructor",
    spokenLangs:  "Spoken Languages",
    category:     "Category",

    // ── CTA buttons ───────────────────────────────────────────────
    call:      "Call",
    whatsapp:  "WhatsApp",
    whatsappMessage: "Hi! I'm interested in this activity for my child.",

    // ── Immigrant Readiness Rating ────────────────────────────────
    immigrantRating:         "Immigrant Readiness",
    immigrantRatingSubtitle: "Community-validated score",

    // ── Hebrew Level badge ────────────────────────────────────────
    hebrewLevel:    "Required Hebrew Level",
    beginner:       "Beginner Friendly",
    beginnerSub:    "No Hebrew needed",
    intermediate:   "Intermediate",
    intermediateSub:"Some Hebrew helpful",
    advanced:       "Advanced Hebrew",
    advancedSub:    "Hebrew fluency required",

    // ── Registration Status badge ─────────────────────────────────
    registrationStatus: "Registration",
    open:   "Open",
    closed: "Closed",

    // ── Category display names ────────────────────────────────────
    catSport:         "Sport",
    catArt:           "Art",
    catMusic:         "Music",
    catDance:         "Dance",
    catYouthMovement: "Youth Movement",

    // ── Language display names (for instructor.languages) ─────────
    languageNames: {
      en: "English",
      he: "Hebrew",
      ru: "Russian",
    },
  },

  he: {
    // ── App chrome ────────────────────────────────────────────────
    appTagline: "מצאו פעילויות לילדים שלכם",
    tapPin: "הקישו על סיכה לגלות פעילויות",

    // ── Modal field labels ────────────────────────────────────────
    price:        "תשלום חודשי",
    perMonth:     "/ לחודש",
    location:     "מיקום",
    ageGroup:     "קבוצת גיל",
    schedule:     "לוח זמנים",
    instructor:   "מדריך/ה",
    spokenLangs:  "שפות דיבור",
    category:     "קטגוריה",

    // ── CTA buttons ───────────────────────────────────────────────
    call:      "התקשר",
    whatsapp:  "וואטסאפ",
    whatsappMessage: "שלום! אני מעוניין/ת בפעילות זו עבור ילדי.",

    // ── Immigrant Readiness Rating ────────────────────────────────
    immigrantRating:         "מוכנות לעולים",
    immigrantRatingSubtitle: "ניקוד מאומת על ידי הקהילה",

    // ── Hebrew Level badge ────────────────────────────────────────
    hebrewLevel:    "רמת עברית נדרשת",
    beginner:       "ידידותי למתחילים",
    beginnerSub:    "לא צריך עברית",
    intermediate:   "רמה בינונית",
    intermediateSub:"עברית בסיסית מועילה",
    advanced:       "עברית מתקדמת",
    advancedSub:    "נדרשת שליטה בעברית",

    // ── Registration Status badge ─────────────────────────────────
    registrationStatus: "הרשמה",
    open:   "פתוחה",
    closed: "סגורה",

    // ── Category display names ────────────────────────────────────
    catSport:         "ספורט",
    catArt:           "אמנות",
    catMusic:         "מוזיקה",
    catDance:         "מחול",
    catYouthMovement: "תנועת נוער",

    // ── Language display names ────────────────────────────────────
    languageNames: {
      en: "אנגלית",
      he: "עברית",
      ru: "רוסית",
    },
  },

  ru: {
    // ── App chrome ────────────────────────────────────────────────
    appTagline: "Найдите занятия для ваших детей",
    tapPin: "Нажмите на метку для просмотра",

    // ── Modal field labels ────────────────────────────────────────
    price:        "Ежемесячная плата",
    perMonth:     "/ мес",
    location:     "Местоположение",
    ageGroup:     "Возрастная группа",
    schedule:     "Расписание",
    instructor:   "Инструктор",
    spokenLangs:  "Языки общения",
    category:     "Категория",

    // ── CTA buttons ───────────────────────────────────────────────
    call:      "Позвонить",
    whatsapp:  "WhatsApp",
    whatsappMessage: "Здравствуйте! Я хочу узнать об этом занятии для моего ребёнка.",

    // ── Immigrant Readiness Rating ────────────────────────────────
    immigrantRating:         "Готовность к иммигрантам",
    immigrantRatingSubtitle: "Оценка сообщества",

    // ── Hebrew Level badge ────────────────────────────────────────
    hebrewLevel:    "Требуемый уровень иврита",
    beginner:       "Для начинающих",
    beginnerSub:    "Иврит не нужен",
    intermediate:   "Средний уровень",
    intermediateSub:"Базовый иврит полезен",
    advanced:       "Продвинутый иврит",
    advancedSub:    "Требуется знание иврита",

    // ── Registration Status badge ─────────────────────────────────
    registrationStatus: "Регистрация",
    open:   "Открыта",
    closed: "Закрыта",

    // ── Category display names ────────────────────────────────────
    catSport:         "Спорт",
    catArt:           "Искусство",
    catMusic:         "Музыка",
    catDance:         "Танцы",
    catYouthMovement: "Молодёжное движение",

    // ── Language display names ────────────────────────────────────
    languageNames: {
      en: "Английский",
      he: "Иврит",
      ru: "Русский",
    },
  },
}

// ── Helper: resolve category enum → translated display name ────────────────
const CATEGORY_KEYS = {
  sport:          "catSport",
  art:            "catArt",
  music:          "catMusic",
  dance:          "catDance",
  youth_movement: "catYouthMovement",
}

export function getCategoryName(category, lang) {
  return translations[lang][CATEGORY_KEYS[category]] ?? category
}

// ── Helper: resolve language code array → translated names ─────────────────
export function getLanguageNames(codes, lang) {
  const names = translations[lang].languageNames
  return codes.map(c => names[c] ?? c)
}
