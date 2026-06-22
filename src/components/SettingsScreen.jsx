import { useState } from 'react'

function GearIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-indigo-600" aria-hidden="true">
      <circle cx="13" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M13 2.5v2M13 21.5v2M2.5 13h2M21.5 13h2M5.27 5.27l1.42 1.42M19.31 19.31l1.42 1.42M19.31 6.69l1.42-1.42M5.27 20.73l1.42-1.42"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'he', label: 'עב', flag: '🇮🇱' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
]

function SettingsRow({ label, children }) {
  return (
    <div className="px-4 py-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</p>
      {children}
    </div>
  )
}

export default function SettingsScreen({ t, lang, onLangChange, settings, onSaveSettings, neighborhoods }) {
  const [contact, setContact] = useState({
    parentName: settings.parentName || '',
    email:      settings.email      || '',
    phone:      settings.phone      || '',
  })
  const [saved, setSaved] = useState(false)
  const isRtl = lang === 'he'

  const isDirty =
    contact.parentName !== (settings.parentName || '') ||
    contact.email      !== (settings.email      || '') ||
    contact.phone      !== (settings.phone      || '')

  const setField = (f) => (e) => {
    setContact(c => ({ ...c, [f]: e.target.value }))
    setSaved(false)
  }

  const handleSaveContact = () => {
    onSaveSettings({ parentName: contact.parentName, email: contact.email, phone: contact.phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all placeholder:text-gray-400'

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 min-h-0 overflow-y-auto bg-gray-50 flex flex-col"
    >
      {/* ── Screen header ────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center flex-shrink-0">
            <GearIcon />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">{t.settingsTitle}</h1>
            <p className="text-gray-500 text-sm mt-0.5 font-medium">{t.settingsSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-4">

        {/* ── Contact Defaults card ───────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3.5 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-[15px]">{t.contactDefaults}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{t.contactDefaultsSub}</p>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {t.parentName}
              </label>
              <input
                type="text"
                value={contact.parentName}
                onChange={setField('parentName')}
                placeholder={t.parentNamePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {t.emailAddress}
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={setField('email')}
                placeholder={t.emailPlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                value={contact.phone}
                onChange={setField('phone')}
                placeholder={t.phonePlaceholder}
                className={inputClass}
              />
            </div>
            <button
              onClick={handleSaveContact}
              disabled={!isDirty && !saved}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                saved
                  ? 'bg-emerald-500 text-white'
                  : isDirty
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saved ? t.contactSaved : t.saveContact}
            </button>
          </div>
        </div>

        {/* ── App Preferences card ────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3.5 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-[15px]">{t.preferences}</h2>
          </div>
          <div className="divide-y divide-gray-50">

            {/* Language */}
            <SettingsRow label={t.preferredLanguage}>
              <div dir="ltr" className="flex gap-2">
                {LANG_OPTIONS.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => onLangChange(code)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      lang === code
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {flag} {label}
                  </button>
                ))}
              </div>
            </SettingsRow>

            {/* Default View */}
            <SettingsRow label={t.defaultView}>
              <div dir="ltr" className="flex bg-gray-100 rounded-xl p-0.5 gap-0.5">
                {['map', 'list'].map(v => (
                  <button
                    key={v}
                    onClick={() => onSaveSettings({ defaultView: v })}
                    className={`flex-1 py-2 rounded-[10px] text-xs font-bold transition-all active:scale-95 ${
                      settings.defaultView === v
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {v === 'map' ? `🗺️ ${t.mapView}` : `☰ ${t.listView}`}
                  </button>
                ))}
              </div>
            </SettingsRow>

            {/* Home Neighborhood */}
            <SettingsRow label={t.homeNeighborhood}>
              <div className="relative">
                <select
                  value={settings.neighborhood || ''}
                  onChange={e => onSaveSettings({ neighborhood: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none pe-9"
                >
                  <option value="">{t.allTelAviv}</option>
                  {neighborhoods.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                {/* Chevron decoration */}
                <span className="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </SettingsRow>

          </div>
        </div>

      </div>
    </div>
  )
}
