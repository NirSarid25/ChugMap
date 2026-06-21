import LanguageSwitcher from './LanguageSwitcher'
import { translations } from '../i18n/translations'

export default function LandingPage({ lang, onLangChange }) {
  const t = translations[lang]
  const isRtl = lang === 'he'

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="h-dvh flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0f0c29 0%, #1b1560 45%, #2e2065 75%, #1a1040 100%)' }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-[-100px] left-[-60px] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[8%] right-[-50px] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)' }}
      />

      {/* Language switcher */}
      <header className="flex justify-end px-5 pt-5 flex-shrink-0 relative z-10">
        <LanguageSwitcher lang={lang} onChange={onLangChange} dark />
      </header>

      {/* Centered hero — fades + slides in on mount */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 land-in">

        {/* App icon */}
        <div
          className="w-28 h-28 rounded-[32px] flex items-center justify-center text-5xl border mb-7"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.55) 100%)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.18)',
            boxShadow: '0 0 52px 14px rgba(139,92,246,0.28), 0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          📍
        </div>

        {/* App name */}
        <h1 className="text-5xl font-black tracking-tight leading-none mb-4">
          <span
            style={{
              background: 'linear-gradient(90deg, #a5b4fc, #c4b5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chug
          </span>
          <span className="text-white">Map</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-[15px] font-medium text-center max-w-[260px] leading-relaxed"
          style={{ color: 'rgba(199,210,254,0.85)' }}
        >
          {t.landingTagline}
        </p>

        {/* Loading indicator */}
        <div className="flex flex-col items-center mt-14 gap-3">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full border-[2px] border-white/[0.12]" />
            <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-indigo-400 animate-spin" />
          </div>
          <p
            className="text-[10px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            {t.loading}
          </p>
        </div>

      </div>
    </div>
  )
}
