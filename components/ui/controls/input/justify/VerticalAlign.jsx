"use client";

import { useState, useEffect } from "react";
import JustifyV from "@/components/ui/svg/JustifyV";

const VERTICAL = [
  { value: "items-start", icon: <JustifyV target="start" size={22} whiteColor="#f8f8f8" /> },
  { value: "items-center", icon: <JustifyV target="center" size={22} whiteColor="#f8f8f8" /> },
  { value: "items-end", icon: <JustifyV target="end" size={22} whiteColor="#f8f8f8" /> },
];

export default function VerticalAlign({
  targetId,
  defaultAlign = "items-start",
  alignType = "",//flex-col
  show=false
}) {
  const [items, setItems] = useState(defaultAlign);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.classList.remove(
      "items-start",
      "items-center",
      "items-end"
    );
    el.classList.add( defaultAlign);
    setItems(defaultAlign);
  }, [targetId, defaultAlign]);

  const applyClasses = (newItems = items) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.classList.remove(
      "items-start",
      "items-center",
      "items-end"
    );
    el.classList.add( newItems);
  };
  const onItemsClick = (cls) => {
    setItems(cls);
    applyClasses(cls);
  };

  return (
    <div className={`flex w-fit ${alignType} ${!show?"invisible hidden":""} rounded-md bg-black/20 dark:bg-white/20 p-1 items-center justify-center gap-2 transition-all duration-1000`}>
      {VERTICAL.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onItemsClick(value)}
          className={`p-2 rounded transition
            ${
              items === value
                ? "bg-black/20 dark:bg-white/20"
                : "hover:bg-black/10 dark:hover:bg-white/10"
            }
          `}
        >
          {Icon}
        </button>
      ))}
    </div>
  );
}
