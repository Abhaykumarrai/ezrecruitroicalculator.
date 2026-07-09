import { useEffect, useState } from 'react'

type GuidedCursorProps = {
  targetRef: React.RefObject<HTMLElement | null>
  visible: boolean
  label?: string
  triggerClick?: boolean
  fast?: boolean
  onClickComplete?: () => void
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export function GuidedCursor({
  targetRef,
  visible,
  label,
  triggerClick,
  fast = false,
  onClickComplete,
}: GuidedCursorProps) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [clicking, setClicking] = useState(false)
  const [show, setShow] = useState(false)
  const [ready, setReady] = useState(false)

  const readyDelay = fast ? 180 : 400
  const posDelay = fast ? 120 : 300
  const clickDelay = fast ? 280 : 550
  const clickHold = fast ? 100 : 160

  useEffect(() => {
    setReady(false)
    const delayIn = setTimeout(() => setReady(true), readyDelay)
    return () => clearTimeout(delayIn)
  }, [targetRef, visible, readyDelay])

  useEffect(() => {
    if (!visible || !ready) {
      setShow(false)
      return
    }

    const update = () => {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
      setShow(true)
    }

    const t = setTimeout(update, posDelay)
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', update)
    }
  }, [targetRef, visible, ready, posDelay])

  useEffect(() => {
    if (!triggerClick || !visible) return

    let cancelled = false
    ;(async () => {
      await delay(clickDelay)
      if (cancelled) return
      setClicking(true)
      await delay(clickHold)
      if (cancelled) return
      setClicking(false)
      onClickComplete?.()
    })()

    return () => {
      cancelled = true
    }
  }, [triggerClick, visible, onClickComplete, clickDelay, clickHold])

  if (!visible || !show) return null

  return (
    <div className="guided-cursor-layer" aria-hidden="true">
      {label && (
        <div
          className="cursor-bubble"
          style={{ left: pos.x + 28, top: pos.y - 52 }}
        >
          {label}
        </div>
      )}
      <div
        className={`guided-cursor${clicking ? ' clicking' : ''}${fast ? ' fast' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M4 3L4 22L9.5 17L13.5 25L16.5 23.5L12.5 15.5L19 15L4 3Z"
            fill="#1A1A1A"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
        <span className="cursor-ring" />
      </div>
    </div>
  )
}
