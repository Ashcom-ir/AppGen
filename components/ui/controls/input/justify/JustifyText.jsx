// JustifyText.jsx
"use client";

import { useState, useEffect } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const TEXT_ALIGN = [
  { value: "text-left", icon: AlignLeft },
  { value: "text-center", icon: AlignCenter },
  { value: "text-right", icon: AlignRight },
  { value: "text-justify", icon: AlignJustify },
];

export default function JustifyText({
  targetId,
  defaultAlign = "text-left",
}) {
  const [active, setActive] = useState(defaultAlign);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.remove(
      "text-left",
      "text-center",
      "text-right",
      "text-justify"
    );

    el.classList.add(defaultAlign);
    setActive(defaultAlign);
  }, [targetId, defaultAlign]);

  const applyClass = (cls) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.remove(
      "text-left",
      "text-center",
      "text-right",
      "text-justify"
    );

    el.classList.add(cls);
    setActive(cls);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {TEXT_ALIGN.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => applyClass(value)}
          className={`p-2 rounded transition
            ${
              active === value
                ? "bg-black/20 dark:bg-white/20"
                : "hover:bg-black/10 dark:hover:bg-white/10"
            }
          `}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
