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
    <div className="h-dvh flex flex-col bg-white">
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 shadow-sm z-10 flex-shrink-0"
      >
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">ChugMap</h1>
          <p className="text-xs text-gray-400 mt-0.5">{t.appTagline}</p>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} />
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
