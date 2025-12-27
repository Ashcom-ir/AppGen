"use client";
import "./BorderAnimation.scss";

export default function BorderAnimation({
      show=true,
      content = '',
      neon_color = "--color-green-300",
      strokeBorderColor = '--color-green-300',
      strokeBorderRadios = '2',
      injectClass=''
}) {
      return (
            <div style={{"--neon-color": `var(${neon_color})`,}} className={`relative ${show ? "" : "invisible"} ${injectClass} transition ease-linear bg-transparent overflow-visible`}>
                  <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                  >
                        <rect
                              x="1"
                              y="1"
                              width="98"
                              height="38"
                              rx={strokeBorderRadios}
                              ry={strokeBorderRadios}
                              fill="none"
                              stroke={`var(${strokeBorderColor})`}
                              strokeOpacity={0.5}
                              className="rect-anim-shadow"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeDasharray="14 266"
                        />
                  </svg>
                  {content}
            </div>
      );
}
