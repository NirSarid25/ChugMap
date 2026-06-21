function SearchIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="5.75" stroke="currentColor" strokeWidth={active ? 2.1 : 1.7} />
      <path d="M14 14L19 19" stroke="currentColor" strokeWidth={active ? 2.1 : 1.7} strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2.75" y="4.75" width="16.5" height="14.5" rx="2.5" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
      <path d="M7 3V6M15 3V6" stroke="currentColor" strokeWidth={active ? 2 : 1.7} strokeLinecap="round" />
      <path d="M2.75 9.5H19.25" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
      <path d="M7 13.5H9M7 16.5H11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="8" r="3.75" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
      <path d="M3.5 19c0-3.314 3.358-6 7.5-6s7.5 2.686 7.5 6"
            stroke="currentColor" strokeWidth={active ? 2 : 1.7} strokeLinecap="round" />
    </svg>
  )
}

const TABS = [
  { id: 'search',        labelKey: 'tabSearch',     Icon: SearchIcon   },
  { id: 'registrations', labelKey: 'tabActivities', Icon: CalendarIcon },
  { id: 'profile',       labelKey: 'tabProfile',    Icon: UserIcon     },
]

export default function BottomNav({ activeTab, onChange, t, registrationCount = 0 }) {
  return (
    <nav
      dir="ltr"
      className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 flex items-stretch"
      style={{
        boxShadow: '0 -2px 16px rgba(0,0,0,0.06)',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
    >
      {TABS.map(({ id, labelKey, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-1 relative flex flex-col items-center justify-center gap-1.5 pt-3 pb-1 transition-colors ${
              active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {/* Active top-bar indicator */}
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-indigo-600" />
            )}

            {/* Icon with optional badge */}
            <span className="relative">
              <Icon active={active} />
              {id === 'registrations' && registrationCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-white text-[8px] font-bold flex items-center justify-center leading-none">
                  {registrationCount > 9 ? '9+' : registrationCount}
                </span>
              )}
            </span>

            <span className="text-[10px] font-semibold leading-none tracking-tight">
              {t[labelKey]}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
