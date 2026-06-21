import { useState } from 'react'

function ChevronIcon({ isRtl }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
         style={isRtl ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M5.5 3L10 7.5L5.5 12" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function RegistrationsScreen({
  t, lang, registrations, activities, onSelectActivity, onCancelRegistration,
}) {
  const [pendingDelete, setPendingDelete] = useState(null) // { activityId, childIndex }
  const isRtl = lang === 'he'

  // Collect only activities that have registrations, preserving activities order
  const registered = activities
    .filter(a => registrations[a.id]?.length > 0)
    .map(a => ({ activity: a, entries: registrations[a.id] }))

  const totalCount = registered.reduce((sum, { entries }) => sum + entries.length, 0)

  const getName = (a) => a.name[lang] ?? a.name.en
  const getNeighborhood = (a) => a.neighborhood[lang] ?? a.neighborhood.en

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 min-h-0 overflow-y-auto bg-gray-50 flex flex-col"
    >
      {/* ── Gradient header ──────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 pt-10 pb-7 flex-shrink-0">
        <h1 className="text-xl font-black text-white tracking-tight">{t.myRegistrations}</h1>
        <p className="text-white/55 text-sm mt-0.5 font-medium">
          {t.registeredCount.replace('{n}', totalCount)}
        </p>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="flex-1 px-4 py-4">

        {registered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-4xl">
              📋
            </div>
            <p className="font-bold text-gray-700 text-[15px]">{t.noRegistrations}</p>
            <p className="text-gray-400 text-sm max-w-[240px] leading-relaxed">{t.noRegistrationsSub}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {registered.map(({ activity, entries }) => (
              <div key={activity.id}
                   className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Activity header — tap to open modal */}
                <button
                  onClick={() => onSelectActivity(activity)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-start"
                >
                  {/* Emoji tile */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: activity.color + '28' }}
                  >
                    {activity.emoji}
                  </div>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {getName(activity)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ₪{activity.price} · {getNeighborhood(activity)}
                    </p>
                  </div>

                  {/* Chevron */}
                  <span className="flex-shrink-0 text-gray-300">
                    <ChevronIcon isRtl={isRtl} />
                  </span>
                </button>

                {/* Per-child registration rows */}
                {entries.map((entry, idx) => {
                  const isPending =
                    pendingDelete?.activityId === activity.id &&
                    pendingDelete?.childIndex === idx

                  return (
                    <div
                      key={idx}
                      className={`border-t border-gray-50 px-4 py-3 flex items-center gap-2.5 transition-colors ${
                        isPending ? 'bg-red-50' : ''
                      }`}
                    >
                      {isPending ? (
                        /* Inline delete confirmation */
                        <>
                          <span className="flex-1 text-xs font-semibold text-red-600 truncate">
                            {t.removeConfirmMsg.replace('{name}', entry.childName)}
                          </span>
                          <button
                            onClick={() => setPendingDelete(null)}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50"
                          >
                            {t.confirmKeep}
                          </button>
                          <button
                            onClick={() => {
                              onCancelRegistration(activity.id, idx)
                              setPendingDelete(null)
                            }}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                          >
                            {t.confirmRemove}
                          </button>
                        </>
                      ) : (
                        /* Normal row */
                        <>
                          {/* Status badge */}
                          <span
                            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              entry.isWaitlist
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {entry.isWaitlist ? t.statusWaitlist : t.statusRegistered}
                          </span>

                          {/* Child name */}
                          <span className="flex-1 text-sm font-semibold text-gray-800 truncate min-w-0">
                            {entry.childName}
                          </span>

                          {/* Delete trigger */}
                          <button
                            onClick={() =>
                              setPendingDelete({ activityId: activity.id, childIndex: idx })
                            }
                            className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all text-[18px] leading-none"
                            aria-label={t.confirmRemove}
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
