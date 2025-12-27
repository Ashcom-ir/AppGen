"use client";
import { useEffect, useState } from "react";

export default function CircleProgress({
  value = 0,
  min = 0,
  max = 100,
  size = 150,
  strokeWidth = 10,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [displayedPercent, setDisplayedPercent] = useState(0);
  const [blur, setBlur] = useState(4);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const clamped = Math.min(Math.max(value, min), max);
    const duration = 2000; // total animation duration
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // eased progress for smooth animation
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      // Circle offset
      const newOffset = circumference - eased * (circumference * clamped) / 100;
      setOffset(newOffset);

      // Number gradually
      const newNumber = Math.floor(eased * clamped);
      setDisplayedPercent(newNumber);

      // Blur and scale
      setBlur(3 * (1 - eased));
      setScale(1.5 + 1 * eased); // از 0.7 تا 1.2 بزرگ می‌شود

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value, min, max, circumference]);

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="stroke-gray-300 opacity-40"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="stroke-purple-600"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute flex items-center justify-center">
        <span
          className="text-white font-bold"
          style={{
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`,
            transition: "filter 0.1s ease, transform 0.1s ease",
          }}
        >
          {displayedPercent}%
        </span>
      </div>
    </div>
  );
}
