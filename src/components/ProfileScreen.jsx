import { useState } from 'react'

function UserAvatar() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <circle cx="20" cy="14" r="7" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
      <path d="M5 36c0-7 6.716-12 15-12s15 5 15 12"
            stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function ProfileScreen({ t, lang, childrenList, onAddChild, onRemoveChild }) {
  const [adding, setAdding]       = useState(false)
  const [newName, setNewName]     = useState('')
  const [removingIdx, setRemovingIdx] = useState(null)
  const isRtl = lang === 'he'

  const handleSave = () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    onAddChild(trimmed)
    setNewName('')
    setAdding(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setAdding(false); setNewName('') }
  }

  const countLabel = `${childrenList.length} ${t.myChildren.toLowerCase()}`

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 min-h-0 overflow-y-auto bg-gray-50 flex flex-col"
    >
      {/* ── Gradient header ──────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 pt-10 pb-8 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/25 flex items-center justify-center flex-shrink-0">
            <UserAvatar />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{t.profileTitle}</h1>
            <p className="text-white/55 text-sm mt-0.5 font-medium">{countLabel}</p>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="flex-1 px-4 py-5">

        {/* My Children card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card header row */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-[15px]">{t.myChildren}</h2>
            {!adding && (
              <button
                onClick={() => { setAdding(true); setRemovingIdx(null) }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 active:scale-95 transition-all"
              >
                {t.addChild}
              </button>
            )}
          </div>

          {/* Inline add form */}
          {adding && (
            <div className="px-4 py-3.5 border-b border-gray-50 bg-indigo-50/40">
              <input
                autoFocus
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.newChildPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
              />
              <div className="flex gap-2 mt-2.5">
                <button
                  onClick={() => { setAdding(false); setNewName('') }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
                >
                  {t.cancelAdd}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!newName.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-40"
                >
                  {t.saveChild}
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {childrenList.length === 0 && !adding && (
            <div className="flex flex-col items-center gap-2.5 py-10 px-4 text-center">
              <span className="text-4xl">👧🧒</span>
              <p className="font-semibold text-gray-600 text-sm">{t.noChildren}</p>
              <p className="text-gray-400 text-xs max-w-[220px] leading-relaxed">{t.noChildrenSub}</p>
            </div>
          )}

          {/* Children list */}
          {childrenList.length > 0 && (
            <ul>
              {childrenList.map((name, i) => (
                <li key={i} className="border-b border-gray-50 last:border-0">
                  {removingIdx === i ? (
                    /* Inline delete confirmation */
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50">
                      <span className="flex-1 text-xs font-semibold text-red-600 truncate">
                        {t.removeConfirmMsg.replace('{name}', name)}
                      </span>
                      <button
                        onClick={() => setRemovingIdx(null)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50"
                      >
                        {t.confirmKeep}
                      </button>
                      <button
                        onClick={() => { onRemoveChild(i); setRemovingIdx(null) }}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                      >
                        {t.confirmRemove}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3">
                      {/* Avatar initial */}
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-700 leading-none">
                          {name.trim()[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <span className="flex-1 text-sm font-semibold text-gray-800">{name}</span>
                      <button
                        onClick={() => setRemovingIdx(i)}
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all text-[18px] leading-none"
                        aria-label={t.confirmRemove}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
