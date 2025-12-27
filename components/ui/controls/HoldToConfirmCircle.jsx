"use client";
import { useState, useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { Check } from "lucide-react";

export default function HoldToConfirm({
  label = "Hold to confirm",
  buttonColor = "#1f1f1f",
  fillColor = "#00eaff",
  ringColor = "#00eaff",
  neon = true,
}) {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const animRef = useRef(null);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const triggerHaptics = () => {
    if (navigator.haptics?.impact) navigator.haptics.impact({ style: "heavy" });
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const startHold = () => {
    if (confirmed) return;
    triggerHaptics();
    animRef.current?.stop();
    setProgress(0);

    animRef.current = animate(0, 100, {
      duration: 1.8,
      ease: "linear",
      onUpdate: (v) => {
        setProgress(v);
      },
      onComplete: () => finishConfirm(),
    });
  };

  const cancelHold = () => {
    if (confirmed) return;
    animRef.current?.stop();
    animate(progress, 0, {
      duration: 0.3,
      ease: "easeOut",
      onUpdate: (v) => setProgress(v),
    });
  };

  const finishConfirm = () => {
    triggerHaptics();
    setConfirmed(true); // Tick Icon فقط وقتی progress واقعی = 100
  };

  return (
    <div className="relative flex items-center justify-center py-10 select-none">
      {!confirmed ? (
        <div className="relative flex items-center justify-center">
          {/* حلقه دور دکمه */}
          <svg
            className="absolute -right-10 inset-0 w-[260px] h-[260px] m-auto z-0 pointer-events-none"
            viewBox="0 0 110 110"
          >
            {/* پس‌زمینه رینگ */}
            {/* <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
              fill="transparent"
            /> */}
            {/* رینگ پر شدن */}
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke={ringColor}
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{
                filter: neon ? `drop-shadow(0 0 6px ${ringColor})` : "none",
                right: -40
              }}
            />
          </svg>


          {/* خود دکمه */}
          <motion.button
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            whileTap={{ scale: 0.92 }}
            className="relative w-[180px] py-3 rounded-full font-semibold text-white cursor-pointer overflow-hidden"
            style={{ backgroundColor: buttonColor }}
          >
            {/* fill درون دکمه */}
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ background: fillColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.03 }}
            />
            <span className="relative z-20">{label}</span>

            {neon && progress > 2 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                style={{
                  boxShadow: `0 0 20px ${ringColor}, 0 0 30px ${ringColor}`,
                }}
              />
            )}
          </motion.button>
        </div>
      ) : (
        // Tick Icon فقط وقتی progress = 100
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
          className="p-4 rounded-full"
          style={{
            backgroundColor: buttonColor,
            boxShadow: neon ? `0 0 20px ${ringColor}, 0 0 40px ${ringColor}` : "none",
          }}
        >
          <Check size={28} color={fillColor} />
        </motion.div>
      )}
    </div>
  );
}
