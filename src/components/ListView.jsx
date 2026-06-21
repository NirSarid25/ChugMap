import { getCategoryName } from '../i18n/translations'

function ActivityCard({ activity, lang, t, registeredCount, onSelect }) {
  const isWaitlist  = activity.registrationStatus === 'closed'
  const categoryName = getCategoryName(activity.category, lang)
  const isRtl       = lang === 'he'

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-150 cursor-pointer overflow-hidden group"
    >
      {/* Colour accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: activity.color }} />

      <div className="p-4 space-y-3">

        {/* Header: emoji tile + name + open/closed dot */}
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
            style={{ backgroundColor: activity.color + '22' }}
          >
            {activity.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors">
              {activity.name[lang]}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{activity.neighborhood[lang]}</p>
          </div>
          <span
            className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
              isWaitlist ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
            }`}
          />
        </div>

        {/* Key details row */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>👶 {activity.ageRange[lang]}</span>
          <span className="text-gray-200">·</span>
          <span className="font-semibold text-gray-800">₪{activity.price}</span>
        </div>

        {/* Category badge + immigrant rating */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
            style={{ backgroundColor: activity.color }}
          >
            {activity.emoji} {categoryName}
          </span>
          <span className="text-xs font-bold text-amber-500">
            ★ {activity.immigrantRating}
          </span>
        </div>

        {/* Registered / waitlisted indicator */}
        {registeredCount > 0 && (
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
              isWaitlist ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                isWaitlist ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
            />
            {t.childrenRegistered.replace('{n}', registeredCount)}
          </div>
        )}

        {/* View Details button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 text-gray-600 hover:text-indigo-700 text-xs font-bold transition-all"
        >
          {t.viewDetails}
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={isRtl ? { transform: 'scaleX(-1)' } : undefined}
            aria-hidden="true"
          >
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  )
}

export default function ListView({ activities, lang, t, registrations, onSelectActivity }) {
  if (activities.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4 py-16">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
          🔍
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-gray-700 text-base">{t.noResults}</h3>
          <p className="text-sm text-gray-400">{t.noResultsSub}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            lang={lang}
            t={t}
            registeredCount={registrations[activity.id]?.length ?? 0}
            onSelect={() => onSelectActivity(activity)}
          />
        ))}
      </div>
    </div>
  )
}
