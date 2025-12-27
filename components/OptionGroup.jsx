// OptionGroup.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import AnimatedSwitch from "./ui/AnimatedSwitch";
import AnimatedCheckbox from "./ui/AnimatedCheckbox";

/* RenderChild — ساختار حفظ شده */
function RenderChild({ item, childState, toggleChild, open, parSetOpen }) {
  const hasNested = Array.isArray(item.children) && item.children.length > 0;

  return (
    <div
      className="space-y-2 p-3 rounded-xl border"
      style={{
        backgroundColor: "rgba(20,24,27,0.75)",
        backdropFilter: "blur(6px)",
        borderColor: "rgba(255,255,255,0.05)",
        cursor: "pointer",
      }}
    >
      <div
        className="flex items-center gap-3"
        onClick={(e) => {
          e.stopPropagation();
          toggleChild(item.label);
        }}
      >
        <AnimatedCheckbox
          checked={!!childState[item.label]}
          onChange={() => toggleChild(item.label)}
          open={open}
          setOpen={parSetOpen} // ساختارِ قدیمی/تو همین شکلی که خواستی حفظ شد
          variant="parent"
        />

        <div className="text-sm font-medium text-white">{item.label}</div>
      </div>

      {hasNested && childState[item.label] && (
        <div className="pl-8 mt-2 space-y-2 pr-8">
          {item.children.map((sub) => (
            <div
              key={sub.label}
              className="flex items-center gap-3"
              onClick={(e) => {
                e.stopPropagation();
                toggleChild(sub.label);
              }}
            >
              <AnimatedCheckbox
                checked={!!childState[sub.label]}
                onChange={() => toggleChild(sub.label)}
                open={open}
                setOpen={parSetOpen}
                variant="child"
              />
              <div className="text-sm text-gray-300">{sub.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* OptionGroup — ورودی‌ها و امضا همان‌گونه که خواستی */
export default function OptionGroup({
  title,
  icon,
  childrenItems = [],
  open,
  parSetOpen,
}) {
  const [isOpen, setIsOpen] = useState(false); // استفاده از isOpen طبق snippetِ تو
  const [childState, setChildState] = useState({});
  const ref = useRef(null);

  function toggleChild(key) {
    setChildState((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function onBoxClick(e) {
    if (e.target.closest(".no-toggle")) return;
    setIsOpen((s) => !s);
  }

  /* === دقیقا همون useEffect که خودت خواسته بودی === */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = "auto";
      const fullHeight = el.clientHeight + "px";
      el.style.height = "0px";

      requestAnimationFrame(() => {
        el.style.transition = "height 0.35s cubic-bezier(0.28, 0.11, 0.32, 1)";
        el.style.height = fullHeight;
      });

      const onEnd = () => {
        el.style.height = "auto";
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      const fullHeight = el.clientHeight + "px";
      el.style.height = fullHeight;

      requestAnimationFrame(() => {
        el.style.transition = "height 0.35s cubic-bezier(0.28, 0.11, 0.32, 1)";
        el.style.height = "0px";
      });
    }
  }, [isOpen]);
  /* === end useEffect === */

  return (
    <div className="p-4 rounded-xl border space-y-2">
      {/* Parent Box (unchanged structure) */}
      <div
        className="p-4 rounded-2xl border shadow-lg"
        style={{
          backgroundColor: "rgba(11,16,18,0.8)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,0.04)",
          cursor: "pointer",
        }}
        onClick={onBoxClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              }}
            >
              {icon}
            </div>

            <div>
              <div className="text-base font-semibold text-white">{title}</div>
              <div className="text-xs text-gray-400">
                روشن کنید تا گزینه‌های تکمیلی نمایش داده شوند
              </div>
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <div className="no-toggle">
              <AnimatedSwitch value={isOpen} onChange={setIsOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* Collapse container — ref همان اسم ref که تو خواستی */}
      <div
        ref={ref}
        style={{
          height: 0,
          overflow: "hidden",
          paddingLeft: "8px",
        }}
      >
        {isOpen && (
          <div className="p-4 rounded-xl space-y-3">
            {childrenItems.map((it) => (
              <RenderChild
                key={it.label}
                item={it}
                childState={childState}
                toggleChild={toggleChild}
                open={open}
                parSetOpen={parSetOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
