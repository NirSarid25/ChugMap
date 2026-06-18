import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import StarRating from './StarRating'
import RegistrationModal from './RegistrationModal'
import { getCategoryName, getLanguageNames } from '../i18n/translations'

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug">{value}</p>
      </div>
    </div>
  )
}

function RegistrationBadge({ status, t }) {
  const isOpen = status === 'open'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'
        }`}
      />
      {t.registrationStatus}: {isOpen ? t.open : t.closed}
    </span>
  )
}

const HEBREW_LEVEL_CONFIG = {
  beginner: {
    classes: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
    labelKey: 'beginner',
    subKey: 'beginnerSub',
  },
  intermediate: {
    classes: 'bg-orange-50 border-orange-200 text-orange-700',
    dot: 'bg-orange-500',
    labelKey: 'intermediate',
    subKey: 'intermediateSub',
  },
  advanced: {
    classes: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-500',
    labelKey: 'advanced',
    subKey: 'advancedSub',
  },
}

function HebrewLevelBadge({ level, t }) {
  const c = HEBREW_LEVEL_CONFIG[level]
  return (
    <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl border ${c.classes}`}>
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.dot}`} />
      <div>
        <p className="text-sm font-bold">{t[c.labelKey]}</p>
        <p className="text-xs opacity-70 mt-0.5">{t[c.subKey]}</p>
      </div>
    </div>
  )
}

export default function ActivityModal({ activity, lang, t, onClose }) {
  const [closing, setClosing]           = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const isRtl = lang === 'he'
  const whatsappUrl   = `https://wa.me/${activity.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`
  const headerBg      = activity.color + '18'
  const iconBg        = activity.color + '2a'
  const categoryName  = getCategoryName(activity.category, lang)
  const spokenLangs   = getLanguageNames(activity.instructor.languages, lang).join(' · ')

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 210)
  }

  // Escape key dismisses with animation.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {createPortal(
        <div
          className={`fixed inset-0 z-[9999] flex items-end sm:items-center justify-center ${
            closing ? 'backdrop-exit' : 'backdrop-enter'
          }`}
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={handleClose}
        >
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className={`${closing ? 'modal-exit' : 'modal-enter'} bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col`}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="relative px-6 pt-6 pb-5 flex-shrink-0" style={{ backgroundColor: headerBg }}>

              {/* Close button — logical `end` mirrors: right in LTR, left in RTL */}
              <button
                onClick={handleClose}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-gray-400 hover:text-gray-800 flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
                aria-label="Close"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Registration status */}
              <div className="mb-4">
                <RegistrationBadge status={activity.registrationStatus} t={t} />
              </div>

              {/* Category emoji tile */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-sm"
                style={{ backgroundColor: iconBg }}
              >
                {activity.emoji}
              </div>

              {/* Activity name — pe-10 keeps logical space from the close button */}
              <h2 className="text-xl font-bold text-gray-900 leading-snug pe-10">
                {activity.name[lang]}
              </h2>

              {/* Category chip */}
              <div className="mt-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: activity.color }}
                >
                  {activity.emoji} {categoryName}
                </span>
              </div>
            </div>

            {/* ── Scrollable body ─────────────────────────────────────── */}
            <div className="overflow-y-auto flex-1">

              {/* Immigrant-family fit — visible without scrolling */}
              <div className="px-6 pt-5 pb-1 space-y-3">

                {/* Immigrant Readiness Rating */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-amber-900">{t.immigrantRating}</p>
                    <span className="text-xs font-semibold text-amber-500 bg-amber-100 px-2 py-0.5 rounded-full">
                      {activity.immigrantRating}/5
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 mb-3">{t.immigrantRatingSubtitle}</p>
                  {/* Stars are a visual numeric element — always render LTR */}
                  <StarRating rating={activity.immigrantRating} />
                </div>

                {/* Hebrew Level */}
                <div>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2">
                    {t.hebrewLevel}
                  </p>
                  <HebrewLevelBadge level={activity.hebrewLevel} t={t} />
                </div>
              </div>

              {/* Activity details */}
              <div className="mx-6 mt-5 mb-0 border-t border-gray-100" />
              <div className="px-6 py-1 divide-y divide-gray-50">
                <InfoRow icon="📍" label={t.location}    value={activity.location[lang]} />
                <InfoRow icon="👶" label={t.ageGroup}    value={activity.ageRange[lang]} />
                <InfoRow icon="🗓️"  label={t.schedule}    value={activity.schedule[lang]} />
                <InfoRow icon="💰" label={t.price}       value={`₪${activity.price} ${t.perMonth}`} />
                <InfoRow icon="👤" label={t.instructor}  value={activity.instructor.name} />
                <InfoRow icon="🌐" label={t.spokenLangs} value={spokenLangs} />
              </div>

            </div>

            {/* ── CTA buttons ─────────────────────────────────────────── */}
            <div className="px-6 py-5 space-y-3 border-t border-gray-100 flex-shrink-0 bg-white">

              {/* Primary CTA — Register Now */}
              <button
                onClick={() => setRegisterOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-md shadow-indigo-200"
              >
                ✍️ {t.registerNow}
              </button>

              {/* Secondary CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${activity.phone}`}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  📞 {t.call}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  💬 {t.whatsapp}
                </a>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {registerOpen && (
        <RegistrationModal
          activity={activity}
          lang={lang}
          t={t}
          onClose={() => setRegisterOpen(false)}
        />
      )}
    </>
  )
}
