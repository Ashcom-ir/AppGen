"use client";
import "./DoubleCheck.scss";

export default function DoubleCheck({
  neon_color = "--color-green-300",
  check_strike_color = "--color-green-300",
  check_strike_drop_color = "--color-green-300/50",
  draw_dur = "1.5s",
  strike_dur = "1.8s",
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
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--neon-color)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="tick-base" d="M18 6 7 17l-5-5"></path>
        <path className="tick-base" d="m22 10-7.5 7.5L13 16"></path>

        <path className="tick-strike" d="M18 6 7 17l-5-5"></path>
        <path className="tick-strike" d="m22 10-7.5 7.5L13 16"></path>
      </svg>
    </div>
  );
}
