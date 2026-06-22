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

const isValidAge = (val) => {
  const n = parseInt(val, 10)
  return !isNaN(n) && n >= 5 && n <= 13
}

export default function ProfileScreen({ t, lang, childrenList, onAddChild, onRemoveChild, onEditChild }) {
  const [adding, setAdding]             = useState(false)
  const [newName, setNewName]           = useState('')
  const [newAge, setNewAge]             = useState('')
  const [newAgeError, setNewAgeError]   = useState(false)
  const [removingIdx, setRemovingIdx]   = useState(null)
  const [editingIdx, setEditingIdx]     = useState(null)
  const [editName, setEditName]         = useState('')
  const [editAge, setEditAge]           = useState('')
  const [editAgeError, setEditAgeError] = useState(false)
  const isRtl = lang === 'he'

  // ── Add new child ──────────────────────────────────────────────
  const handleSave = () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    if (!isValidAge(newAge)) { setNewAgeError(true); return }
    onAddChild({ name: trimmed, age: parseInt(newAge, 10) })
    setNewName('')
    setNewAge('')
    setNewAgeError(false)
    setAdding(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setAdding(false); setNewName(''); setNewAge(''); setNewAgeError(false) }
  }

  // ── Edit existing child ────────────────────────────────────────
  const startEdit = (i, child) => {
    setEditingIdx(i)
    setEditName(child.name)
    setEditAge(String(child.age))
    setEditAgeError(false)
    setRemovingIdx(null)
    setAdding(false)
  }

  const handleEditSave = () => {
    const trimmed = editName.trim()
    if (!trimmed) return
    if (!isValidAge(editAge)) { setEditAgeError(true); return }
    onEditChild(editingIdx, { name: trimmed, age: parseInt(editAge, 10) })
    setEditingIdx(null)
    setEditName('')
    setEditAge('')
    setEditAgeError(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') { setEditingIdx(null); setEditName(''); setEditAge(''); setEditAgeError(false) }
  }

  const countLabel = `${childrenList.length} ${t.myChildren.toLowerCase()}`

  const ageInputClass = (hasError, focusColor = 'indigo') =>
    `w-[72px] px-2.5 py-2.5 rounded-xl border text-sm text-gray-900 outline-none transition-all text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
      hasError
        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : focusColor === 'blue'
          ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
          : 'border-indigo-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
    }`

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

          {/* ── Inline add form ───────────────────────── */}
          {adding && (
            <div className="px-4 py-3.5 border-b border-gray-50 bg-indigo-50/40">
              <div className="flex gap-2 mb-2.5">
                <input
                  autoFocus
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.newChildPlaceholder}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                />
                <input
                  value={newAge}
                  onChange={e => { setNewAge(e.target.value); setNewAgeError(false) }}
                  onKeyDown={handleKeyDown}
                  type="number"
                  min="5"
                  max="13"
                  placeholder="5–13"
                  className={ageInputClass(newAgeError, 'indigo')}
                />
              </div>
              {newAgeError && (
                <p className="text-xs text-red-500 font-medium mb-2.5 -mt-1">{t.invalidAge}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => { setAdding(false); setNewName(''); setNewAge(''); setNewAgeError(false) }}
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
              {childrenList.map((child, i) => (
                <li key={child.id} className="border-b border-gray-50 last:border-0">

                  {removingIdx === i ? (
                    /* ── Delete confirmation ─────────────────── */
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50">
                      <span className="flex-1 text-xs font-semibold text-red-600 truncate">
                        {t.removeConfirmMsg.replace('{name}', child.name)}
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
                      <div className="flex gap-2 mb-2.5">
                        <input
                          autoFocus
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          onKeyDown={handleEditKeyDown}
                          placeholder={t.newChildPlaceholder}
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <input
                          value={editAge}
                          onChange={e => { setEditAge(e.target.value); setEditAgeError(false) }}
                          onKeyDown={handleEditKeyDown}
                          type="number"
                          min="5"
                          max="13"
                          placeholder="5–13"
                          className={ageInputClass(editAgeError, 'blue')}
                        />
                      </div>
                      {editAgeError && (
                        <p className="text-xs text-red-500 font-medium mb-2.5 -mt-1">{t.invalidAge}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingIdx(null); setEditName(''); setEditAge(''); setEditAgeError(false) }}
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
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-indigo-700 leading-none">
                          {child.name.trim()[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-snug truncate">{child.name}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          {t.ageLabel.replace('{n}', child.age)}
                        </p>
                      </div>
                      {/* Blue edit pencil */}
                      <button
                        onClick={() => startEdit(i, child)}
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
