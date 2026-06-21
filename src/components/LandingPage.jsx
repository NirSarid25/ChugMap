import LanguageSwitcher from './LanguageSwitcher'
import { translations } from '../i18n/translations'

const FLOATING_PINS = [
  { emoji: '⚽', top: '10%',  left: '7%',  size: 34, opacity: 0.18, rotate: -15 },
  { emoji: '🎨', top: '7%',   left: '80%', size: 28, opacity: 0.15, rotate: 10  },
  { emoji: '🎹', top: '38%',  left: '2%',  size: 22, opacity: 0.18, rotate: -8  },
  { emoji: '💃', top: '28%',  left: '91%', size: 28, opacity: 0.20, rotate: 12  },
  { emoji: '🤸', top: '63%',  left: '88%', size: 24, opacity: 0.16, rotate: -10 },
  { emoji: '⛺', top: '74%',  left: '5%',  size: 22, opacity: 0.15, rotate: 6   },
  { emoji: '🎸', top: '86%',  left: '74%', size: 26, opacity: 0.18, rotate: -12 },
  { emoji: '🏊', top: '50%',  left: '93%', size: 20, opacity: 0.12, rotate: 0   },
]

const FEATURES = [
  { icon: '🗺️', tk: 'feat1Title', dk: 'feat1Desc' },
  { icon: '⭐', tk: 'feat2Title', dk: 'feat2Desc' },
  { icon: '🔍', tk: 'feat3Title', dk: 'feat3Desc' },
  { icon: '✍️', tk: 'feat4Title', dk: 'feat4Desc' },
]

export default function LandingPage({ lang, onLangChange, onEnter }) {
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
      <div
        className="absolute top-[35%] left-[40%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)' }}
      />

      {/* Decorative floating activity emojis */}
      {FLOATING_PINS.map((p, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 flex-shrink-0 relative z-10">
        <span
          className="text-[10px] font-bold tracking-widest uppercase border rounded-full px-2.5 py-1"
          style={{ color: 'rgba(255,255,255,0.30)', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          Beta
        </span>
        <LanguageSwitcher lang={lang} onChange={onLangChange} dark />
      </header>

      {/* Hero — animates in on mount */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 land-in">

        {/* App icon */}
        <div className="relative mb-5">
          <div
            className="w-28 h-28 rounded-[32px] flex items-center justify-center text-5xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.55) 100%)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255,255,255,0.18)',
              boxShadow: '0 0 48px 12px rgba(139,92,246,0.28), 0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            📍
          </div>
        </div>

        {/* App name */}
        <h1 className="text-5xl font-black tracking-tight mb-3 leading-none">
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
          className="text-base font-semibold text-center max-w-[300px] leading-snug mb-2"
          style={{ color: 'rgba(199,210,254,0.90)' }}
        >
          {t.landingTagline}
        </p>
        <p
          className="text-[12px] text-center max-w-[270px] leading-relaxed mb-8"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          {t.landingSubtitle}
        </p>

        {/* Feature highlights — 2×2 grid */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
          {FEATURES.map(f => (
            <div
              key={f.tk}
              className="rounded-2xl p-3.5 border"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255,255,255,0.10)',
              }}
            >
              <span className="text-[22px]">{f.icon}</span>
              <p className="text-white text-[12px] font-bold mt-2 leading-tight">{t[f.tk]}</p>
              <p
                className="text-[11px] leading-relaxed mt-1"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                {t[f.dk]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 flex-shrink-0 relative z-10">
        <button
          onClick={onEnter}
          className="w-full py-4 rounded-2xl bg-white font-black text-base transition-all active:scale-[0.97] hover:bg-indigo-50"
          style={{
            color: '#4338ca',
            boxShadow: '0 8px 32px rgba(99,102,241,0.40)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {t.startExploring}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={isRtl ? { transform: 'scaleX(-1)' } : undefined}
            >
              <path
                d="M3.5 9H14.5M9.5 4L14.5 9L9.5 14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <p
          className="text-center text-xs mt-3"
          style={{ color: 'rgba(255,255,255,0.22)' }}
        >
          Tel Aviv · 2025
        </p>
      </div>
    </div>
  )
}
