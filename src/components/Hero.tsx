export function Hero() {
  const scrollToSetup = () => {
    document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero">
      <span className="eyebrow">Interactive ROI Journey</span>
      <h1>
        Every day, your recruiters lose hours to busywork.{' '}
        <span className="hl">Watch it come back.</span>
      </h1>
      <p>
        Walk through four EzRecruit features. Switch each one on, see the
        minutes it returns to your team — then see what that time is worth in
        rupees.
      </p>
      <button className="btn" type="button" onClick={scrollToSetup}>
        Start calculating ↓
      </button>
    </div>
  )
}
