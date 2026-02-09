// JustifyWithAlign.jsx
"use client";

import { useState, useEffect } from "react";
import {
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
} from "lucide-react";
import Justify from "@/components/ui/svg/Justify";
import JustifyV from "@/components/ui/svg/JustifyV";

const HORIZONTAL = [
  { value: "justify-start", icon: <Justify target="start" size={28} whiteColor="#f8f8f8" /> },
  { value: "justify-center", icon: <Justify target="center" size={28} whiteColor="#f8f8f8" /> },
  { value: "justify-end", icon: <Justify target="end" size={28} whiteColor="#f8f8f8" /> },
];

const VERTICAL = [
  { value: "items-start", icon: <JustifyV target="start" size={28} whiteColor="#f8f8f8" /> },
  { value: "items-center", icon: <JustifyV target="center" size={28} whiteColor="#f8f8f8" /> },
  { value: "items-end", icon: <JustifyV target="end" size={28} whiteColor="#f8f8f8" /> },
];

export default function JustifyWithAlign({
  targetId,
  defaultJustify = "justify-start",
  defaultItems = "items-start",
}) {
  const [justify, setJustify] = useState(defaultJustify);
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.remove(
      "justify-start",
      "justify-center",
      "justify-end",
      "items-start",
      "items-center",
      "items-end"
    );

    el.classList.add(defaultJustify, defaultItems);

    setJustify(defaultJustify);
    setItems(defaultItems);
  }, [targetId, defaultJustify, defaultItems]);

  const applyClasses = (newJustify = justify, newItems = items) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.remove(
      "justify-start",
      "justify-center",
      "justify-end",
      "items-start",
      "items-center",
      "items-end"
    );

    el.classList.add(newJustify, newItems);
  };

  const onJustifyClick = (cls) => {
    setJustify(cls);
    applyClasses(cls, items);
  };

  const onItemsClick = (cls) => {
    setItems(cls);
    applyClasses(justify, cls);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Horizontal */}
      {HORIZONTAL.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onJustifyClick(value)}
          className={`p-2 rounded transition
            ${
              justify === value
                ? "bg-black/20 dark:bg-white/20"
                : "hover:bg-black/10 dark:hover:bg-white/10"
            }
          `}
        >{Icon}
        </button>
      ))}

      <span className="mx-1 opacity-40">|</span>

      {/* Vertical */}
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
