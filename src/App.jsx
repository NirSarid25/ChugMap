import { useState, useEffect } from 'react'
import { activities } from './data/activities'
import { translations } from './i18n/translations'
import ActivityModal from './components/ActivityModal'
import MapView from './components/MapView'
import LanguageSwitcher from './components/LanguageSwitcher'

export default function App() {
  const [lang, setLang] = useState('en')
  const [selected, setSelected] = useState(null)
  const t = translations[lang]

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  // h-dvh = dynamic viewport height — correctly excludes iOS Safari's
  // retractable address bar, unlike h-screen (100vh) which over-extends
  return (
    <div className={`h-dvh flex flex-col bg-white transition-[filter] duration-300 ${selected ? 'blur-sm' : ''}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 z-10 flex-shrink-0 shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            📍 ChugMap
          </h1>
          <p className="text-xs text-white/70 mt-0.5 font-medium">{t.appTagline}</p>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} dark />
      </header>

      {/* Map */}
      <MapView
        activities={activities}
        onSelectActivity={setSelected}
        lang={lang}
      />

      {/* Detail modal */}
      {selected && (
        <ActivityModal
          activity={selected}
          lang={lang}
          t={t}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
