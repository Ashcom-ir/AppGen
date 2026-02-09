'use client'

import { useEffect, useRef, useState } from 'react'

export default function BottomSheet({ maxHeight = 400, body, }) {
  const [drawerPos, setDrawerPos] = useState(40)
  const [screenH, setScreenH] = useState(0)

  const startY = useRef(0)
  const startPos = useRef(40)
  const dragging = useRef(false)

  const lastY = useRef(0)
  const lastTime = useRef(0)

  useEffect(() => {
    const update = () => setScreenH(maxHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

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

    setDrawerPos(Math.max(40, Math.min(screenH, startPos.current + delta)))
  }

  const onEnd = () => {
    if (!dragging.current) return
    dragging.current = false

    const dy = startY.current - lastY.current
    const dt = Date.now() - lastTime.current
    const velocity = dt > 0 ? dy / dt : 0

    if (Math.abs(velocity) > 0.5) {
      if (velocity > 0) {
        animateTo(screenH)
      } else {
        animateTo(40)
      }
      return
    }

    if (drawerPos / screenH > 0.65) {
      animateTo(screenH)
    } else if (drawerPos / screenH > 0.15) {
      animateTo(Math.round(screenH / 2))
    } else {
      animateTo(40)
    }
  }

  const animateTo = (target) => {
    setDrawerPos((prev) => {
      const diff = target - prev
      if (Math.abs(diff) < 2) return target
      requestAnimationFrame(() => animateTo(target))
      return prev + Math.round(diff / 2)
    })
  }

  const scrollHeight =
    drawerPos / screenH > 0.65
      ? screenH - 40
      : screenH / 2 - 40

  const toggleDrawer = () => {
    if (drawerPos / screenH > 0.5) {
      animateTo(40)
    } else {
      animateTo(screenH)
    }
  }

  return (
    <div className="bg-white/55 dark:bg-black/55 backdrop-blur-3xl overflow-hidden fixed flex flex-col rounded-t-md left-0 right-0 bottom-0 top-full z-50"
      style={{ height: screenH, transform: `translateY(${-drawerPos}px)` }} >
      {/* <div class="absolute inset-0 bg-black/33 blur-3xl rounded-t-md -z-1"/> */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 blur-3xl rounded-t-md"></div>
        <div style={{ background: "linear-gradient(-30deg, oklch(from var(--color-pink-500) l c h), transparent, var(--color-pink-500))" }} className="absolute  rounded-t-md transform-[scale(1.1)] opacity-[.4] blur-3xl backdrop-blur-3xl inset-0"></div>
      </div>
      <div className="p-3 flex justify-center cursor-grab backdrop-blur-3xl" onDoubleClick={toggleDrawer}
        onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
        onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd} >
        <div className='w-[60] shadow-[0_0_10px] shadow-white/18 h-[8] rounded-sm bg-white/55 dark:bg-black/55 hover:bg-white/30 dark:hover:bg-black/30 transition-all ease-in delay-75 duration-200' />
      </div>
      <div className="p-4 backdrop-blur-3xl" style={{ height: scrollHeight }} >
        {body}
      </div>
    </div>
  )
}

