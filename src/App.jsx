import { useState, useEffect, useMemo } from 'react'
import { activities } from './data/activities'
import { translations } from './i18n/translations'
import ActivityModal from './components/ActivityModal'
import MapView from './components/MapView'
import ListView from './components/ListView'
import FilterPanel from './components/FilterPanel'
import LanguageSwitcher from './components/LanguageSwitcher'
import LandingPage from './components/LandingPage'
import BottomNav from './components/BottomNav'
import ProfileScreen from './components/ProfileScreen'
import RegistrationsScreen from './components/RegistrationsScreen'

const INITIAL_FILTERS = {
  age:       '',
  maxPrice:  '',
  languages: [],
  minRating: 0,
  days:      [],
}

function FunnelIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" aria-hidden="true">
      <path d="M1 1H12M3 5.5H10M5.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function App() {
  const [showLanding, setShowLanding]     = useState(true)
  const [lang, setLang]                   = useState('en')
  const [activeTab, setActiveTab]         = useState('search')
  const [selected, setSelected]           = useState(null)
  const [viewMode, setViewMode]           = useState('map')
  const [filterOpen, setFilterOpen]       = useState(false)
  const [filters, setFilters]             = useState(INITIAL_FILTERS)
  // { [activityId]: [{ childName, parentName, childAge, email, phone, isWaitlist }] }
  const [registrations, setRegistrations] = useState({})
  const [childrenList, setChildrenList]   = useState([])
  const t = translations[lang]

  // RTL/LTR on the root HTML element
  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  // Auto-dismiss splash screen after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // ── Registration handlers ──────────────────────────────────────
  const handleRegister = (activityId, formData, isWaitlist = false) => {
    setRegistrations(prev => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), { ...formData, isWaitlist }],
    }))
  }

  const handleCancelRegistration = (activityId, childIndex) => {
    setRegistrations(prev => {
      const updated = [...(prev[activityId] || [])]
      updated.splice(childIndex, 1)
      if (updated.length === 0) {
        const { [activityId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [activityId]: updated }
    })
  }

  // ── Children handlers ──────────────────────────────────────────
  const handleAddChild    = (name)  => setChildrenList(prev => [...prev, name])
  const handleRemoveChild = (index) => setChildrenList(prev => prev.filter((_, i) => i !== index))
  const handleEditChild   = (index, newName) => setChildrenList(prev => prev.map((n, i) => i === index ? newName : n))

  // ── Centralized filtering (shared by MapView + ListView) ───────
  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      if (filters.age !== '') {
        const age = +filters.age
        if (a.ageMin > age || a.ageMax < age) return false
      }
      if (filters.maxPrice !== '' && a.price > +filters.maxPrice) return false
      if (filters.languages.length > 0 && !filters.languages.some(l => a.instructor.languages.includes(l))) return false
      if (filters.minRating > 0 && a.immigrantRating < filters.minRating) return false
      if (filters.days.length > 0 && !filters.days.some(d => a.days.includes(d))) return false
      return true
    })
  }, [filters])

  const activeFilterCount = (
    (filters.age !== '' ? 1 : 0) +
    (filters.maxPrice !== '' ? 1 : 0) +
    (filters.languages.length > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.days.length > 0 ? 1 : 0)
  )

  // Total registrations across all activities (for nav badge)
  const registrationCount = Object.values(registrations).reduce(
    (sum, arr) => sum + arr.length, 0
  )

  // ── Splash screen ──────────────────────────────────────────────
  if (showLanding) {
    return <LandingPage lang={lang} onLangChange={setLang} />
  }

  // ── Main app shell ─────────────────────────────────────────────
  return (
    <div className={`h-dvh flex flex-col bg-white transition-[filter] duration-300 ${selected ? 'blur-sm' : ''}`}>

      {/* ── Persistent global header ─────────────────────── */}
      <header className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 z-10 flex-shrink-0 shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            📍 ChugMap
          </h1>
          <p className="text-xs text-white/70 mt-0.5 font-medium">{t.appTagline}</p>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} dark />
      </header>

      {/* ── Search tab ─────────────────────────────────────── */}
      {activeTab === 'search' && (
        <>
          {/* View toggle + filter bar — always dir=ltr so toggle order never flips */}
          <div dir="ltr" className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-100 flex-shrink-0">
            <div className="flex bg-gray-100 rounded-xl p-0.5 gap-0.5">
              <button
                onClick={() => setViewMode('map')}
                className={`relative flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-[11px] font-bold transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🗺️ {t.mapView}
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-indigo-100 text-indigo-700 text-[8px] font-bold leading-none">
                    {filteredActivities.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`relative flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-[11px] font-bold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ☰ {t.listView}
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-indigo-100 text-indigo-700 text-[8px] font-bold leading-none">
                    {filteredActivities.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setFilterOpen(true)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex-shrink-0 ${
                activeFilterCount > 0
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <FunnelIcon />
              {t.filter}
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {viewMode === 'map' ? (
            <MapView
              activities={filteredActivities}
              onSelectActivity={setSelected}
              lang={lang}
            />
          ) : (
            <ListView
              activities={filteredActivities}
              lang={lang}
              t={t}
              registrations={registrations}
              onSelectActivity={setSelected}
            />
          )}
        </>
      )}

      {/* ── Profile tab ─────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <ProfileScreen
          t={t}
          lang={lang}
          childrenList={childrenList}
          onAddChild={handleAddChild}
          onRemoveChild={handleRemoveChild}
          onEditChild={handleEditChild}
        />
      )}

      {/* ── My Registrations tab ────────────────────────────── */}
      {activeTab === 'registrations' && (
        <RegistrationsScreen
          t={t}
          lang={lang}
          registrations={registrations}
          activities={activities}
          onSelectActivity={setSelected}
          onCancelRegistration={handleCancelRegistration}
        />
      )}

      {/* ── Persistent bottom navigation bar ────────────────── */}
      <BottomNav
        activeTab={activeTab}
        onChange={setActiveTab}
        t={t}
        registrationCount={registrationCount}
      />

      {/* ── Global modals (portal to document.body) ─────────── */}
      {selected && (
        <ActivityModal
          activity={selected}
          lang={lang}
          t={t}
          onClose={() => setSelected(null)}
          registrations={registrations[selected.id] || []}
          onRegister={(formData, isWaitlist) => handleRegister(selected.id, formData, isWaitlist)}
          childrenList={childrenList}
          onGoToProfile={() => { setSelected(null); setActiveTab('profile') }}
        />
      )}

      {filterOpen && (
        <FilterPanel
          filters={filters}
          lang={lang}
          t={t}
          onFiltersChange={setFilters}
          onClear={() => setFilters(INITIAL_FILTERS)}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  )
}
