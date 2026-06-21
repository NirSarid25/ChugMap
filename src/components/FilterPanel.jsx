import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const DAYS       = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const LANG_CODES = ['en', 'he', 'ru', 'fr']
const LANG_FLAGS = { en: '🇺🇸', he: '🇮🇱', ru: '🇷🇺', fr: '🇫🇷' }
const RATING_OPTIONS = [0, 3, 4, 5]
const AGE_OPTIONS    = [5, 6, 7, 8, 9, 10, 11, 12, 13]
const PRICE_OPTIONS  = [150, 200, 250, 300, 350, 400, 450, 500]

function FilterSection({ title, children }) {
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
      {children}
    </div>
  )
}

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
        active
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}

function SelectField({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all appearance-none pe-9 cursor-pointer"
      >
        {children}
      </select>
      {/* Custom chevron — logical end so it flips in RTL */}
      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-gray-400">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default function FilterPanel({ filters, lang, t, onFiltersChange, onClear, onClose }) {
  const [closing, setClosing] = useState(false)
  const isRtl = lang === 'he'

  const activeCount = [
    filters.age !== '',
    filters.maxPrice !== '',
    filters.languages.length > 0,
    filters.minRating > 0,
    filters.days.length > 0,
  ].filter(Boolean).length

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 210)
  }

  const handleClear = () => {
    onClear()
    setClosing(true)
    setTimeout(onClose, 210)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const toggleDay = (d) => {
    const days = filters.days.includes(d)
      ? filters.days.filter(x => x !== d)
      : [...filters.days, d]
    onFiltersChange({ ...filters, days })
  }

  const toggleLang = (l) => {
    const languages = filters.languages.includes(l)
      ? filters.languages.filter(x => x !== l)
      : [...filters.languages, l]
    onFiltersChange({ ...filters, languages })
  }

  // 'sun' → 'daySun', 'mon' → 'dayMon', etc.
  const dayKey = (d) => `day${d[0].toUpperCase()}${d.slice(1)}`

  return createPortal(
    <div
      className={`fixed inset-0 z-[10001] flex items-end sm:items-center justify-center ${
        closing ? 'backdrop-exit' : 'backdrop-enter'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleClose}
    >
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`${closing ? 'modal-exit' : 'modal-enter'} bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[88vh] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="relative px-6 pt-6 pb-4 flex-shrink-0 border-b border-gray-100">
          <button
            onClick={handleClose}
            className="absolute top-4 end-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-all active:scale-95"
            aria-label="Close"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <h2 className="text-lg font-bold text-gray-900">{t.filter}</h2>
          {activeCount > 0 && (
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">
              {t.activeFilters.replace('{n}', activeCount)}
            </p>
          )}
        </div>

        {/* ── Scrollable filter body ─────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Age */}
          <FilterSection title={t.filterAge}>
            <SelectField
              value={filters.age}
              onChange={val => onFiltersChange({ ...filters, age: val })}
            >
              <option value="">{t.anyAge}</option>
              {AGE_OPTIONS.map(a => (
                <option key={a} value={String(a)}>{a}</option>
              ))}
            </SelectField>
          </FilterSection>

          {/* Max Price */}
          <FilterSection title={t.filterMaxPrice}>
            <SelectField
              value={filters.maxPrice}
              onChange={val => onFiltersChange({ ...filters, maxPrice: val })}
            >
              <option value="">{t.anyPrice}</option>
              {PRICE_OPTIONS.map(p => (
                <option key={p} value={String(p)}>₪{p}</option>
              ))}
            </SelectField>
          </FilterSection>

          {/* Language */}
          <FilterSection title={t.filterLanguage}>
            <div className="flex flex-wrap gap-2">
              {LANG_CODES.map(l => (
                <Pill
                  key={l}
                  active={filters.languages.includes(l)}
                  onClick={() => toggleLang(l)}
                >
                  {LANG_FLAGS[l]} {t.languageNames[l]}
                </Pill>
              ))}
            </div>
          </FilterSection>

          {/* Min Rating */}
          <FilterSection title={t.filterMinRating}>
            <div className="flex flex-wrap gap-2">
              {RATING_OPTIONS.map(r => (
                <Pill
                  key={r}
                  active={filters.minRating === r}
                  onClick={() => onFiltersChange({ ...filters, minRating: r })}
                >
                  {r === 0 ? t.anyRating : t.starsPlus.replace('{n}', r)}
                </Pill>
              ))}
            </div>
          </FilterSection>

          {/* Days */}
          <FilterSection title={t.filterDay}>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(d => (
                <Pill
                  key={d}
                  active={filters.days.includes(d)}
                  onClick={() => toggleDay(d)}
                >
                  {t[dayKey(d)]}
                </Pill>
              ))}
            </div>
          </FilterSection>

        </div>

        {/* ── Footer actions ─────────────────────────────── */}
        <div className="px-6 py-5 border-t border-gray-100 flex-shrink-0 flex gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors active:scale-95"
          >
            {t.clearAll}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-md shadow-indigo-200"
          >
            {t.applyFilters}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
