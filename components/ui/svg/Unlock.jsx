"use client";

export default function Unlock({
      size = 24,
      color = "--color-rose-500"
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg"
                  width={size} height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={`var(${color})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">

                  <defs>
                        <filter id="glow" x="-150%" y="-150%" width="400%" height="400%">
                              <feGaussianBlur stdDeviation="1.5" result="blur" />
                              <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                              </feMerge>
                        </filter>
                  </defs>

                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke={color} strokeWidth="2"
                        strokeDasharray="58" strokeDashoffset="58">
                        <animate attributeName="stroke-dashoffset" from="58" to="0" dur="2s" fill="freeze" />
                  </rect>

                  <path d="M7 11V7a5 5 0 0 1 9.9-1"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        style={{transformBox: 'fill-box', transformOrigin: '7px 11px'}}>
                        <animateTransform
                              attributeName="transform"
                              type="rotate"
                              values="0;-12;12;0"
                              keyTimes="0;0.3;0.7;1"
                              dur="4s"
                              repeatCount="indefinite"
                              calcMode="spline"
                              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1" />
                  </path>

                  <path d="M7 11V7a5 5 0 0 1 9.9-1"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="30"
                        strokeDashoffset="30"
                        filter="url(#glow)">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="4s" repeatCount="indefinite" />
                  </path>

            </svg>
      );
}
