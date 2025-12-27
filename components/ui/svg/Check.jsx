"use client";
import "./Check.scss";

export default function Check({
  neon_color = "--color-green-300",
  check_strike_color = "--color-green-300",
  check_strike_drop_color = "--color-green-300/50",
  draw_dur = "1.5s",
  strike_dur = "1.8s",
  size=24
}) {
  return (
    <div
      style={{
        "--neon-color": `var(${neon_color})`,
        "--check-strike-color": `var(${check_strike_color})`,
        "--check-strike-drop-color": `var(${check_strike_drop_color})`,
        "--draw-dur": draw_dur,
        "--strike-dur": strike_dur,
      }}
      className="relative rounded-full neon-back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--neon-color)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* path اصلی (draw once) */}
        <path className="check-base" d="M20 6 9 17l-5-5" />

        {/* strike متحرک */}
        <path className="check-strike" d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
}
