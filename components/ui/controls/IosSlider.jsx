"use client";
import { useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

export default function IosSlider({
  initialValue = 0.5,
  width = 100,
  height = 225,
  thumbSize = 40,
  trackColor = "rgba(255,255,255,0.08)",
  fillColor = "#fff",
  onChange = (v) => console.log("slider:", v),
}) {
  const trackRef = useRef(null);

  const y = useMotionValue(0);           
  const progress = useMotionValue(initialValue);
  const springY = useSpring(y, { stiffness: 300, damping: 32 });

  const [innerHeight, setInnerHeight] = useState(0);
  const [progressValue, setProgressValue] = useState(initialValue);

  useLayoutEffect(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const h = rect.height - thumbSize;
    setInnerHeight(h);

    const initial = h * (1 - initialValue);
    y.set(initial);
    progress.set(initialValue);
    setProgressValue(initialValue);
  }, []);

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  useMotionValueEvent(y, "change", (curY) => {
    if (innerHeight <= 0) return;

    const bounded = clamp(curY, 0, innerHeight);
    const value = 1 - bounded / innerHeight;

    progress.set(value);
    setProgressValue(Number(value.toFixed(3)));
    onChange(Number(value.toFixed(3)));
  });

  const computeY = (clientY) => {
    const rect = trackRef.current.getBoundingClientRect();
    const offset = clientY - rect.top - thumbSize / 2;
    return clamp(offset, -50, innerHeight + 50);
  };

  const handleTrackClick = (e) => {
    const targetY = computeY(e.clientY);
    y.set(targetY);
  };

  const handleDrag = (e) => {
    const pointY = e.touches ? e.touches[0].clientY : e.clientY;
    const targetY = computeY(pointY);
    y.set(targetY);
  };

  const handleDragEnd = () => {
    const bounded = clamp(y.get(), 0, innerHeight);
    y.set(bounded);
  };

  const iconColorClass =
    progressValue === 0
      ? "text-red-500"
      : progressValue === 1
      ? "text-blue-500"
      : "text-neutral-800";

  return (
    <div
      ref={trackRef}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onMouseDown={handleDrag}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDrag}
      onTouchStart={handleDrag}
      onTouchEnd={handleDragEnd}
      onClick={handleTrackClick}
      style={{
        width,
        height,
        borderRadius: 40,
        backgroundColor: trackColor,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: fillColor,
          transformOrigin: "center bottom",
          scaleY: progress,
          pointerEvents: "none",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      />

      {/* ثابت و وسط */}
      <motion.div
        style={{
          width: thumbSize,
          height: thumbSize,
          borderRadius: "50%",
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg
          className={iconColorClass}
          width={thumbSize * 0.85}
          height={thumbSize * 0.85}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
        </svg>
      </motion.div>
    </div>
  );
}
