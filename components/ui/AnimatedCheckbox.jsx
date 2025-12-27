// AnimatedCheckbox.jsx
"use client";

import React from "react";
import { Check } from "lucide-react";

export default function AnimatedCheckbox({
  checked,
  onChange,
  open,
  setOpen, // ممکنه از OptionGroup با نام parSetOpen پاس داده بشه
  variant = "parent", // parent | child — اختیاری، اگر پاس داده نشد parent فرض می‌شود
}) {
  // رنگ‌ها برای والد/فرزند
  const COLORS = {
    parent: {
      border: "rgba(34,197,94,0.9)",
      gradient: "rgba(34,197,94,0.12)",
      icon: "#22C55E",
    },
    child: {
      border: "rgba(59,130,246,0.9)",
      gradient: "rgba(59,130,246,0.12)",
      icon: "#3B82F6",
    },
  };

  const color = COLORS[variant] || COLORS.parent;

  const handleClick = (e) => {
    e.stopPropagation();
    const newChecked = !checked;

    // اگر setOpen پاس شده است آن را صدا بزن
    if (newChecked && typeof setOpen === "function") {
      try {
        setOpen(true);
      } catch (err) {
        // امن: اگر setOpen مشکل داشت خطا نده
        // console.warn(err);
      }
    }

    // به parent اطلاع بده
    onChange(newChecked);
  };

  return (
    <div className="no-toggle" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleClick}
        aria-pressed={checked}
        className="relative flex items-center justify-center rounded-md"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          border: checked ? `1px solid ${color.border}` : "1px solid rgba(255,255,255,0.08)",
          background: checked
            ? `linear-gradient(180deg, ${color.gradient}, rgba(0,0,0,0.04))`
            : "rgba(255,255,255,0.02)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 180ms cubic-bezier(.22,1,.36,1)",
          boxShadow: checked ? `0 6px 18px ${color.border}33` : "none",
        }}
      >
        {/* animated check — pure CSS transform/opacity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: checked ? "scale(1) rotate(0deg)" : "scale(0) rotate(-10deg)",
            opacity: checked ? 1 : 0,
            transition: "transform 240ms cubic-bezier(.22,1,.36,1), opacity 180ms ease",
          }}
        >
          <Check size={16} color={checked ? color.icon : "transparent"} />
        </div>
      </button>
    </div>
  );
}
