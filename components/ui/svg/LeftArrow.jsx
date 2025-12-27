"use client";
import "./LeftArrow.scss";

export default function LeftArrow({
      neon_color = "--color-green-300",
      check_strike_color = "--color-green-300",
      check_strike_drop_color = "--color-green-300/50",
      draw_dur = "1.5s",
      strike_dur = "1.8s",
      size = 24,
      isAnim=true
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <g className={`origin-[left_center] ${isAnim?'animation-left-arrow':''}`}>
                              <path d="M6 8L2 12L6 16" />
                              <path d="M2 12H22" />
                        </g>
                  </svg>
            </div>
      );
}
