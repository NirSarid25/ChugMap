import { useState, useEffect } from 'react'
import { activities } from './data/activities'
import { translations } from './i18n/translations'
import ActivityModal from './components/ActivityModal'
import MapView from './components/MapView'
import ListView from './components/ListView'
import LanguageSwitcher from './components/LanguageSwitcher'

export default function App() {
  const [lang, setLang]             = useState('en')
  const [selected, setSelected]     = useState(null)
  const [viewMode, setViewMode]     = useState('map')
  // registrations: { [activityId]: [{ childName, parentName, childAge, email, phone }] }
  const [registrations, setRegistrations] = useState({})
  const t = translations[lang]

  const handleRegister = (activityId, formData) => {
    setRegistrations(prev => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), formData],
    }))
  }

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

      {/* View toggle bar — always dir=ltr, like LanguageSwitcher */}
      <div dir="ltr" className="flex items-center px-4 py-2.5 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5 w-full">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🗺️ {t.mapView}
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ☰ {t.listView}
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'map' ? (
        <MapView
          activities={activities}
          onSelectActivity={setSelected}
          lang={lang}
        />
      ) : (
        <ListView
          activities={activities}
          lang={lang}
          t={t}
          registrations={registrations}
          onSelectActivity={setSelected}
        />
      )}

      {/* Detail modal */}
      {selected && (
        <ActivityModal
          activity={selected}
          lang={lang}
          t={t}
          onClose={() => setSelected(null)}
          registrations={registrations[selected.id] || []}
          onRegister={(formData) => handleRegister(selected.id, formData)}
        />
      )}
    </div>
  )
}
