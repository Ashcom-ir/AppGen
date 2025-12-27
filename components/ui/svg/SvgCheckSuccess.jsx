"use client";
import "./SvgCheckSuccess.scss";

export default function SvgCheckSuccess({
      stroke_color = "green-300",
      stroke_check_and_border_color = "green-400",
      fill_color = "green-300",
}) {
      return (
            <div style={{
                  "--stroke_color": `var(--color-${stroke_color})`,
                  "--neon-color": `var(--color-${stroke_check_and_border_color})`,
                  "--stroke_check_and_border_color": `var(--color-${stroke_check_and_border_color})`,
                  "--fill_color": `var(--color-${fill_color})`,
            }} className={`rounded-full shadow-2xl neon-glow`}>
                  <svg
                        width="40"
                        height="40"
                        viewBox="0 0 120 120"
                        xmlns="http://www.w3.org/2000/svg"

                  >
                        {/* Circles */}
                        <circle className="ring-bg" cx="60" cy="60" r="50" filter="url(#ringShadow)" />
                        <circle className="ring-anim" cx="60" cy="60" r="50" filter="url(#ringShadow)" />
                        <circle className="pop" cx="60" cy="60" r="42" />

                        {/* Checkmark */}
                        <path className="check" d="M36 62 L52 78 L86 44" />

                        {/* Sparks */}
                        <rect className="spark s1" x="58" y="18" width="4" height="10" rx="2" />
                        <rect className="spark s2" x="40" y="22" width="4" height="10" rx="2" />
                        <rect className="spark s3" x="74" y="22" width="4" height="10" rx="2" />
                  </svg>

            </div>
      );
}
