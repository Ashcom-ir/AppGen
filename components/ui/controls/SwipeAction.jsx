"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { Archive, Trash2 } from "lucide-react";

export default function SwipeAction({
  onSwipeRight = (info) => console.log("swipe right", info),
  onSwipeLeft = (info) => console.log("swipe left", info),
  rightBgClass = "bg-green-600",
  leftBgClass = "bg-red-700",
  rightLabel = "Archive",
  leftLabel = "Delete",
  actionTextClass = "text-white",
  threshold = 0.35, // fraction of width to trigger
  className = "",
}) {
  const rowRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [swipeWidth, setSwipeWidth] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [activeAction, setActiveAction] = useState(null); // "left" | "right" | null

  useLayoutEffect(() => {
    if (!rowRef.current) return;
    setSwipeWidth(rowRef.current.offsetWidth);
  }, []);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsSwiping(true);
    rowRef.current.startX = e.clientX - dragX;
  };

  const handlePointerMove = (e) => {
    if (!isSwiping) return;
    const newX = e.clientX - rowRef.current.startX;
    setDragX(newX); // ← dragX آنلاین
  };

  const handlePointerUp = (e) => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const pxThreshold = swipeWidth * threshold;

    if (dragX > pxThreshold) {
      // swipe right complete
      setActiveAction("right");
      setDragX(swipeWidth + 80);
      console.log("swipe right", { direction: "right" });
      setTimeout(() => resetSwipe(), 250);
    } else if (dragX < -pxThreshold) {
      // swipe left complete
      setActiveAction("left");
      setDragX(-swipeWidth - 80);
      console.log("swipe left", { direction: "left" });
      setTimeout(() => resetSwipe(), 250);
    } else {
      // reset
      resetSwipe();
    }
  };

  const resetSwipe = () => {
    setActiveAction(null);
    setDragX(0);
  };

  // رنگ proportional و سایه proportional با dragX
  const computeStyle = () => {
    let bg = "#0b1011";
    let shadow = "";

    if (dragX > 0) {
      const progress = Math.min(dragX / (swipeWidth * threshold), 1);
      bg = `rgba(34,197,94,${progress})`; // green-600 proportional
      shadow = `0 8px 24px rgba(34,197,94,${progress})`;
    } else if (dragX < 0) {
      const progress = Math.min(-dragX / (swipeWidth * threshold), 1);
      bg = `rgba(220,38,38,${progress})`; // red-700 proportional
      shadow = `0 8px 24px rgba(220,38,38,${progress})`;
    }

    return {
      transform: `translateX(${dragX}px)`,
      transition: isSwiping ? "none" : "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
      backgroundColor: bg,
      boxShadow: shadow,
      border: `2px solid ${bg}`,
    };
  };

  // compute opacity for backgrounds
  const rightOpacity = dragX > 0 ? Math.min(dragX / (swipeWidth * threshold), 1) : 0;
  const leftOpacity = dragX < 0 ? Math.min(-dragX / (swipeWidth * threshold), 1) : 0;
  const hideCenterText = dragX > 10 ? "Swiping right" : dragX < -10 ?"Swipping left" : "Swipe me left or right";

  return (
    <div
      ref={rowRef}
      className={`relative overflow-hidden border-1 border-solid border-gray-900 rounded-lg select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Foreground draggable row */}
      <div
        className={`relative z-10 rounded-md cursor-grab`}
        style={computeStyle()}
      >
        {/* Right background */}
        <div
          aria-hidden
          className={`absolute inset-y-0 left-0 flex items-center pl-4`}
          style={{ opacity: rightOpacity }}
        >
          <div className="flex items-center gap-3">
            <Archive className={`w-5 h-5 ${actionTextClass}`} />
            <span className={`${actionTextClass} font-semibold`}>{rightLabel}</span>
          </div>
        </div>

        {/* Left background */}
        <div
          aria-hidden
          className={`absolute inset-y-0 right-0 flex items-center pr-4`}
          style={{ opacity: leftOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className={`${actionTextClass} font-semibold`}>{leftLabel}</span>
            <Trash2 className={`w-5 h-5 ${actionTextClass}`} />
          </div>
        </div>
        <div className={`p-4`}>
          <div className="text-sm text-center text-gray-500">{`${hideCenterText}`}</div>
        </div>
      </div>
    </div>
  );
}
