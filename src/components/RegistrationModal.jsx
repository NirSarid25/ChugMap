import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

function FormField({ label, error, errorMsg, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-1">{errorMsg}</p>
      )}
    </div>
  )
}

function SuccessCard({ t, isWaitlist, onClose, childNames }) {
  return (
    <div className="success-enter flex flex-col items-center justify-center px-8 py-12 text-center gap-5">
      {/* Animated check circle */}
      <div
        className={`check-pop w-20 h-20 rounded-full flex items-center justify-center ${
          isWaitlist ? 'bg-amber-100' : 'bg-emerald-100'
        }`}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
          <path
            d="M9 19L15.5 25.5L29 12"
            stroke={isWaitlist ? '#d97706' : '#059669'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Registered child name pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {childNames.map(n => (
          <span
            key={n}
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isWaitlist ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="space-y-2 max-w-xs">
        <h3 className="text-xl font-bold text-gray-900">
          {isWaitlist ? t.successTitleWaitlist : t.successTitle}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {isWaitlist ? t.successMessageWaitlist : t.successMessage}
        </p>
      </div>

      <button
        onClick={onClose}
        className={`mt-1 px-10 py-3.5 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-md ${
          isWaitlist
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-200'
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200'
        }`}
      >
        {t.done}
      </button>
    </div>
  )
}

function NoChildrenState({ t, onGoToProfile }) {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
        <div>
          <p className="text-sm font-bold text-amber-800 leading-snug">
            {t.noChildrenProfile}
          </p>
          <p className="text-xs text-amber-600 mt-1.5 leading-relaxed">
            {t.noChildrenProfileSub}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onGoToProfile}
        className="self-start px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 active:scale-95 transition-all"
      >
        {t.goToProfile}
      </button>
    </div>
  )
}

export default function RegistrationModal({
  activity, lang, t, isWaitlist = false, onClose, onRegister,
  childrenList = [], existingRegistrations = [], onGoToProfile,
}) {
  const [closing, setClosing]                   = useState(false)
  const [submitted, setSubmitted]               = useState(false)
  const [selectedChildren, setSelectedChildren] = useState([])
  const [form, setForm]     = useState({ parentName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const isRtl = lang === 'he'

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 210)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // 'registered' | 'waitlist' | null
  const getChildStatus = (name) => {
    const reg = existingRegistrations.find(r => r.childName === name)
    if (!reg) return null
    return reg.isWaitlist ? 'waitlist' : 'registered'
  }

  const toggleChild = (name) => {
    setSelectedChildren(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
    if (errors.children) setErrors(e => ({ ...e, children: false }))
  }

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(err => ({ ...err, [field]: false }))
  }

  const validate = () => {
    const e = {}
    if (selectedChildren.length === 0) e.children = true
    if (!form.parentName.trim()) e.parentName = true
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true
    if (!form.phone.trim()) e.phone = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Register each selected child as a separate entry
    selectedChildren.forEach(childName => {
      onRegister?.({ childName, parentName: form.parentName, email: form.email, phone: form.phone })
    })
    setSubmitted(true)
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 bg-gray-50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
    }`

  // True if at least one child is still available to register
  const hasAvailableChildren = childrenList.some(n => !getChildStatus(n))

  return createPortal(
    <div
      className={`fixed inset-0 z-[10000] flex items-end sm:items-center justify-center ${
        closing ? 'backdrop-exit' : 'backdrop-enter'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={handleClose}
    >
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`${closing ? 'modal-exit' : 'modal-enter'} bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {submitted ? (
          <SuccessCard
            t={t}
            isWaitlist={isWaitlist}
            onClose={handleClose}
            childNames={selectedChildren}
          />
        ) : (
          <>
            {/* ── Header ──────────────────────────────────────── */}
            <div className="relative px-6 pt-6 pb-5 flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600">
              <button
                onClick={handleClose}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all active:scale-95"
                aria-label="Close"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                {t.registeringFor}
              </p>
              <h2 className="text-lg font-bold text-white pe-10 leading-snug">
                {activity.name[lang] ?? activity.name.en}
              </h2>
            </div>

            {/* ── Form ────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate className="overflow-y-auto flex-1">
              <div className="px-6 py-5 space-y-5">

                {/* ── Child selection ──────────────────────────── */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t.selectChildren}
                  </p>

                  {childrenList.length === 0 ? (
                    <NoChildrenState t={t} onGoToProfile={() => onGoToProfile?.()} />
                  ) : (
                    <div className="space-y-2">
                      {childrenList.map(name => {
                        const status  = getChildStatus(name)
                        const disabled = !!status
                        const checked  = selectedChildren.includes(name)
                        return (
                          <label
                            key={name}
                            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all select-none ${
                              disabled
                                ? 'bg-gray-50 border-gray-100 cursor-not-allowed'
                                : checked
                                  ? 'bg-indigo-50 border-indigo-300 cursor-pointer'
                                  : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-gray-50 cursor-pointer'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={disabled}
                              onChange={() => !disabled && toggleChild(name)}
                              className="w-4 h-4 flex-shrink-0 accent-indigo-600"
                            />
                            <span className={`flex-1 text-sm font-semibold ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>
                              {name}
                            </span>
                            {status === 'registered' && (
                              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                {t.alreadyRegistered}
                              </span>
                            )}
                            {status === 'waitlist' && (
                              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                                {t.alreadyOnWaitlist}
                              </span>
                            )}
                          </label>
                        )
                      })}
                      {errors.children && (
                        <p className="text-xs text-red-500 font-medium ps-1">{t.required}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Contact fields — only shown when children exist */}
                {childrenList.length > 0 && (
                  <>
                    <FormField label={t.parentName} error={errors.parentName} errorMsg={t.required}>
                      <input
                        type="text"
                        value={form.parentName}
                        onChange={set('parentName')}
                        placeholder={t.parentNamePlaceholder}
                        className={inputClass('parentName')}
                      />
                    </FormField>

                    <FormField label={t.emailAddress} error={errors.email} errorMsg={t.invalidEmail}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder={t.emailPlaceholder}
                        className={inputClass('email')}
                      />
                    </FormField>

                    <FormField label={t.phoneNumber} error={errors.phone} errorMsg={t.required}>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder={t.phonePlaceholder}
                        className={inputClass('phone')}
                      />
                    </FormField>
                  </>
                )}

              </div>

              {/* Submit — only shown when children exist */}
              {childrenList.length > 0 && (
                <div className="px-6 pb-7 pt-1 flex-shrink-0">
                  <button
                    type="submit"
                    disabled={!hasAvailableChildren}
                    className={`w-full py-4 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                      isWaitlist
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-200'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200'
                    }`}
                  >
                    {t.submitRegistration}
                  </button>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
