"use client";
import "./BorderAnimationPro.scss";

export default function BorderAnimationPro({ children, show = true }) {
  return show ? (
    <div className="relative isolate w-[370px] max-w-full bg-amber-50 rounded-md overflow-hidden fancy px-[1.5rem]">
      <div className="z-20 relative">{children}</div>
      <div className="fancy-border-layer pointer-events-none absolute inset-0 rounded-md" />
    </div>
  ) : null;
}
