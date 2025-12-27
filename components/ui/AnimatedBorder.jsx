"use client";
import "./AnimatedBorder.scss";

export default function AnimatedBorder({
  children,
  className = "",
  dot_size = "300px",
  radius = "30px",
  from_color = "var(--color-pink-600)",
  to_color = "var(--color-pink-200)",
  shadow = "shadow-pink-600",
  first_duration = "16s",
  duration = "13s",
}) {
  return (
    <div
      style={{
        "--radius": radius,
        "--color-from": from_color,
        "--color-to": to_color,
        "--first-duration": first_duration,
        "--duration": duration,
        "--dot-size": dot_size,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <span className="absolute inset-0 pointer-events-none p-[1] rounded-b-2xl border-layer">
        <span className="absolute shadow-[0_0_15px] border-dot" />
      </span>
    </div>
  );
}
