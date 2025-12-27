"use client";
import "./Email.scss";

export default function Email({
  neon_color = "--color-green-300",
  strike_color = "--color-green-300",
  strike_drop_color = "--color-green-800",
  draw_dur = "2.46s",
  strike_dur = "6.6s",
  glow_intensity = "1",
}) {
  return (
    <svg style={{
      "--neon-color": `var(${neon_color})`,
      "--strike-color": `var(${strike_color})`,
      "--strike-drop": `var(${strike_drop_color})`,
      "--draw-dur": draw_dur,
      "--strike-dur": strike_dur,
      "--glow": glow_intensity,
    }}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="svgEmail"
    >
      <g className="draw-group">
        <path pathLength="100" className="draw" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect pathLength="100" className="draw" x="2" y="4" width="20" height="16" rx="2" />
      </g>
      <g className="strike-group">
        <path pathLength="100" className="strike" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect pathLength="100" className="strike" x="2" y="4" width="20" height="16" rx="2" />
      </g>
    </svg>
  );
}