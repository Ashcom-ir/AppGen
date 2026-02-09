'use client'

import { useEffect, useRef, useState } from 'react'

export default function BottomSheetModal({
  maxHeight = 500,
  body,
  show = false,
  onClose
}) {

  const CLOSED = -30
  const HALF = Math.round(maxHeight * 0.55)
  const FULL = maxHeight

  const [drawerPos, setDrawerPos] = useState(CLOSED)
  const [screenH, setScreenH] = useState(maxHeight)
  const dragging = useRef(false)

  const startY = useRef(0)
  const startPos = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(0)

  useEffect(() => {
    const update = () => setScreenH(maxHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [maxHeight])

  useEffect(() => {
    show ? animateTo(FULL) : animateTo(CLOSED)
  }, [show])

  const animateTo = (target) => {
    setDrawerPos(prev => {
      const diff = target - prev
      if (Math.abs(diff) < 1) return target
      requestAnimationFrame(() => animateTo(target))
      return prev + diff * 0.22
    })
  }

  const onStart = (e) => {
    dragging.current = true
    const y = e.touches ? e.touches[0].clientY : e.clientY
    startY.current = y
    startPos.current = drawerPos
    lastY.current = y
    lastTime.current = Date.now()
  }

  const onMove = (e) => {
    if (!dragging.current) return
    const y = e.touches ? e.touches[0].clientY : e.clientY
    const delta = startY.current - y

    lastY.current = y
    lastTime.current = Date.now()

    setDrawerPos(Math.max(CLOSED, Math.min(FULL, startPos.current + delta)))
  }

  const onEnd = () => {
    if (!dragging.current) return
    dragging.current = false

    const dy = startY.current - lastY.current
    const dt = Date.now() - lastTime.current
    const velocity = dt ? dy / dt : 0

    if (velocity > 0.6) return animateTo(FULL)
    if (velocity < -0.6) {
      animateTo(CLOSED)
      onClose?.()
      return
    }

    if (drawerPos > FULL * 0.72) return animateTo(FULL)
    if (drawerPos > FULL * 0.32) return animateTo(HALF)

    animateTo(CLOSED)
    onClose?.()
  }

  const backdropOpacity = Math.min(drawerPos / FULL, 1)

  return (
    <>
      {/* iOS style backdrop */}
      <div
        onClick={() => { animateTo(CLOSED); onClose?.() }}
        className={`${show ? "" : "hidden"} fixed inset-0 z-40 transition-all duration-200`}
        style={{
          background: `rgba(0,0,0,${backdropOpacity * 0.45})`,
          backdropFilter: `blur(${backdropOpacity * 12}px)`,
          pointerEvents: show ? 'auto' : 'none',
        }}
      />

      {/* Sheet */}
      <div className={`${show ? "" : "hidden"} p-2 fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl overflow-hidden bg-white/60 dark:bg-black/60 backdrop-blur-3xl shadow-2xl flex flex-col`}
        style={{
          height: screenH,
          transform: `translateY(${screenH - drawerPos}px)`
        }}
      >

        {/* glow layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 blur-3xl rounded-t-2xl opacity-40 bg-gradient-to-tr from-pink-500/40 via-transparent to-indigo-500/40"/>
        </div>

        {/* handle */}
        <div
          className="p-3 flex justify-center cursor-grab active:cursor-grabbing"
          onDoubleClick={() => { animateTo(CLOSED); onClose?.() }}
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
        >
          <div className="w-[64px] h-[6px] rounded-full bg-white/60 dark:bg-black/60 shadow"/>
        </div>

        {/* content */}
        <div
          className="p-4 overflow-auto"
          style={{
            height:
              drawerPos > FULL * 0.7
                ? FULL - 40
                : HALF - 40
          }}
        >
          {body}
        </div>
      </div>
    </>
  )
}
