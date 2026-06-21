import { useState } from 'react'

function UserAvatar() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-indigo-600" aria-hidden="true">
      <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M5 36c0-7 6.716-12 15-12s15 5 15 12"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

export default function ProfileScreen({ t, lang, childrenList, onAddChild, onRemoveChild, onEditChild }) {
  const [adding, setAdding]           = useState(false)
  const [newName, setNewName]         = useState('')
  const [removingIdx, setRemovingIdx] = useState(null)
  const [editingIdx, setEditingIdx]   = useState(null)
  const [editName, setEditName]       = useState('')
  const isRtl = lang === 'he'

  // ── Add new child ──────────────────────────────────────────────
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

  // ── Edit existing child ────────────────────────────────────────
  const startEdit = (i, name) => {
    setEditingIdx(i)
    setEditName(name)
    setRemovingIdx(null)
    setAdding(false)
  }

  const handleEditSave = () => {
    const trimmed = editName.trim()
    if (!trimmed) return
    onEditChild(editingIdx, trimmed)
    setEditingIdx(null)
    setEditName('')
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') { setEditingIdx(null); setEditName('') }
  }

  const countLabel = `${childrenList.length} ${t.myChildren.toLowerCase()}`

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 min-h-0 overflow-y-auto bg-gray-50 flex flex-col"
    >
      {/* ── Screen header ────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center flex-shrink-0">
            <UserAvatar />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">{t.profileTitle}</h1>
            <p className="text-gray-500 text-sm mt-0.5 font-medium">{countLabel}</p>
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
                onClick={() => { setAdding(true); setRemovingIdx(null); setEditingIdx(null) }}
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
                    /* ── Delete confirmation ─────────────────── */
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50">
                      <span className="flex-1 text-xs font-semibold text-red-600 truncate">
                        {t.removeConfirmMsg.replace('{name}', name)}
                      </span>
                      <button
                        onClick={() => setRemovingIdx(null)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
                      >
                        {t.confirmKeep}
                      </button>
                      <button
                        onClick={() => { onRemoveChild(i); setRemovingIdx(null) }}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
                      >
                        {t.confirmRemove}
                      </button>
                    </div>

                  ) : editingIdx === i ? (
                    /* ── Inline edit ─────────────────────────── */
                    <div className="px-4 py-3.5 bg-blue-50/40">
                      <input
                        autoFocus
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                      <div className="flex gap-2 mt-2.5">
                        <button
                          onClick={() => { setEditingIdx(null); setEditName('') }}
                          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
                        >
                          {t.cancelEdit}
                        </button>
                        <button
                          onClick={handleEditSave}
                          disabled={!editName.trim()}
                          className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40"
                        >
                          {t.saveEdit}
                        </button>
                      </div>
                    </div>

                  ) : (
                    /* ── Default row ─────────────────────────── */
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-700 leading-none">
                          {name.trim()[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <span className="flex-1 text-sm font-semibold text-gray-800">{name}</span>
                      {/* Blue edit pencil */}
                      <button
                        onClick={() => startEdit(i, name)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 active:scale-95 transition-all"
                        aria-label={t.editChild}
                      >
                        <PencilIcon />
                      </button>
                      {/* Red delete X */}
                      <button
                        onClick={() => { setRemovingIdx(i); setEditingIdx(null) }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-95 transition-all"
                        aria-label={t.deleteChild}
                      >
                        <XIcon />
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
