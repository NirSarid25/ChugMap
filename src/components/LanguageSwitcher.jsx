const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'he', label: 'עב', flag: '🇮🇱' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
]

export default function LanguageSwitcher({ lang, onChange, dark = false }) {
  return (
    <div
      dir="ltr"
      className={`flex items-center gap-0.5 rounded-full p-1 ${
        dark ? 'bg-white/20' : 'bg-gray-100'
      }`}
    >
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
            lang === l.code
              ? dark
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'bg-white text-gray-900 shadow-sm'
              : dark
                ? 'text-white/75 hover:text-white hover:bg-white/10'
                : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  )
}
