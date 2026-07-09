export function LeakingClock() {
  return (
    <div className="leaking-clock" aria-hidden="true">
      <div className="lc-clock">
        <svg viewBox="0 0 80 80" className="lc-face">
          <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="40" y1="40" x2="40" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="lc-hand-hour" />
          <line x1="40" y1="40" x2="56" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lc-hand-min" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
        </svg>
        <div className="lc-drops">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="lc-drop" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="lc-coins">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="lc-coin" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  )
}
