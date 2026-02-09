"use client";

import { useState, useEffect } from "react";
import Direction from "@/components/ui/svg/Direction";

const HORIZONTAL = [
  { value: "ltr", icon: <Direction size={28} color="--color-rose-500" /> },
  { value: "rtl", icon: <Direction size={28} isLtr={false} color="--color-rose-500" /> }
];

export default function DirectionAlign({
  targetId,
  defaultDirection = "" // "ltr" | "rtl" | ""
}) {
  const [direction, setDirection] = useState(defaultDirection);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (defaultDirection) {
      el.style.direction = defaultDirection;
      setDirection(defaultDirection);
    } else {
      el.style.removeProperty("direction");
      setDirection("");
    }
  }, [targetId, defaultDirection]);

  const applyDirectionStyle = (value) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (!value) {
      el.style.removeProperty("direction");
    } else {
      el.style.direction = value;
    }
  };

  const onDirectionClick = (value) => {
    // اگر روی دکمه انتخاب‌شده دوباره کلیک شد → deselect
    if (direction === value) {
      setDirection("");
      applyDirectionStyle("");
    } else {
      setDirection(value);
      applyDirectionStyle(value);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {HORIZONTAL.map(({ value, icon }) => (
        <button
          key={value}
          onClick={() => onDirectionClick(value)}
          className={`p-2 rounded transition
            ${
              direction === value
                ? "bg-black/20 dark:bg-white/20"
                : "hover:bg-black/10 dark:hover:bg-white/10"
            }
          `}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
