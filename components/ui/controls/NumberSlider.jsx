"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import IndicatorNumberFlip from "./IndicatorNumberFlip";
export default function NumberSlider({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange = () => { },
  thumbColor = "#4ade80",
  trackColor = "#e5e7eb",
  trackFillColor = "#4ade80",
}) {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [internalValue, setInternalValue] = useState(value);
  const x = useMotionValue(0);

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const trackWidthPercent = useTransform(x, (v) => `${clamp01(v / trackWidth) * 100}%`);

  // resize + مقدار اولیه
  useEffect(() => {
    const resize = () => {
      if (trackRef.current && thumbRef.current) {
        const w = trackRef.current.offsetWidth - thumbRef.current.offsetWidth;
        setTrackWidth(w);
        const clamped = Math.min(Math.max(value, min), max);
        setInternalValue(clamped);
        const targetX = ((clamped - min) / (max - min)) * w;
        x.set(targetX); // بدون animate → جلوگیری از چشمک
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [value, min, max, x]);

  const updateValueFromX = (posX) => {
    const clampedX = Math.max(0, Math.min(posX, trackWidth));
    const newValue =
      Math.round((clampedX / trackWidth) * (max - min) / step) * step + min;
    setInternalValue(newValue);
    onChange(newValue);
    animate(x, clampedX, { type: "spring", stiffness: 360, damping: 28 });
  };

  const handleDrag = (_, info) => {
    if (!thumbRef.current || !trackRef.current) return;
    const thumbRect = thumbRef.current.getBoundingClientRect();
    const trackRect = trackRef.current.getBoundingClientRect();
    const posX = info.point.x - trackRect.left - thumbRect.width / 2;
    updateValueFromX(posX);
  };

  const handleTrackClick = (e) => {
    if (!trackRef.current || !thumbRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left - thumbRef.current.offsetWidth / 2;
    updateValueFromX(px); // **همان تابع drag** → thumb + fill + indicator با هم حرکت می‌کنن
  };

  return (
    <div className="relative w-full h-14 flex flex-col items-center">
      {/* Indicator */}
      <motion.div
        style={{ x, backgroundColor: thumbColor }}
        className="absolute left-0 -top-14 px-1 py-1 bg-white text-white text-center rounded-md text-lg font-large"
      >
        <IndicatorNumberFlip number={internalValue} fontSize={"1.5rem"} color={"#fff"} />
      </motion.div>

      {/* Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative w-full h-2 rounded-full cursor-pointer"
        style={{ backgroundColor: trackFillColor }}
      >
        {/* Fill */}
        <motion.div
          style={{
            width: trackWidthPercent,
            backgroundColor: trackColor,
          }}
          className="absolute left-0 top-0 h-full rounded-full"
        />

        {/* Thumb */}
        <motion.div
          ref={thumbRef}
          drag="x"
          dragConstraints={{ left: 0, right: trackWidth }}
          dragElastic={0.15}
          dragMomentum={false}
          onDrag={handleDrag}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/20 shadow-lg flex items-center justify-center cursor-grab"
          style={{
            x, // **thumb حرکت می‌کنه با x**
            background: trackColor,
            boxShadow: `0 8px 24px ${thumbColor}`,
            border: `2px solid ${thumbColor}`,
          }}
          whileHover={{ scale: 1.2, boxShadow: `0 0 12px ${thumbColor}` }}
          whileTap={{ scale: 1.3 }}
        />
      </div>
    </div>
  );
}
