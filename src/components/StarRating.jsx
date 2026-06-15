// dir="ltr" is intentional: star ratings are a visual numeric element.
// The half-star clip technique relies on left-to-right overflow, so we
// must opt this container out of RTL regardless of document direction.
export default function StarRating({ rating, max = 5 }) {
  return (
    <div dir="ltr" className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const full = rating >= i + 1
        const half = !full && rating >= i + 0.5
        if (half) {
          return (
            <span key={i} className="relative inline-block leading-none" style={{ fontSize: '28px', width: '28px' }}>
              <span className="text-gray-200">★</span>
              <span
                className="absolute inset-0 text-amber-400 overflow-hidden whitespace-nowrap"
                style={{ width: '50%' }}
              >
                ★
              </span>
            </span>
          )
        }
        return (
          <span
            key={i}
            className={`leading-none ${full ? 'text-amber-400' : 'text-gray-200'}`}
            style={{ fontSize: '28px' }}
          >
            ★
          </span>
        )
      })}
      {/* ms-2: logical margin-start — correct gap in both LTR and RTL */}
      <span className="ms-2 text-sm font-bold text-amber-600 tabular-nums">{rating}/5</span>
    </div>
  )
}
