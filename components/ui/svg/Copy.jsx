"use client";

export default function Copy({
      size = 24,
      color = "--color-rose-500"
}) {
      return (
            <svg
                  width={size}
                  height={size}
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke={`var(${color})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >

                  <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="2" result="blur" />
                              <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                              </feMerge>
                        </filter>
                  </defs>
                  <rect
                        x="20"
                        y="14"
                        width="26"
                        height="34"
                        rx="3"
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                  >
                        <animate
                              id="drawBack"
                              attributeName="stroke-dashoffset"
                              from="100"
                              to="0"
                              dur="0.6s"
                              fill="freeze"
                        />
                  </rect>
                  <rect
                        x="20"
                        y="14"
                        width="26"
                        height="34"
                        rx="3"
                        pathLength="100"
                        strokeDasharray="14 86"
                        filter="url(#glow)"
                        opacity="0.85"
                  >
                        <animate
                              attributeName="stroke-dashoffset"
                              from="100"
                              to="0"
                              dur="1.1s"
                              begin="drawFront.end"
                              repeatCount="indefinite"
                        />
                  </rect>
                  <rect
                        x="14"
                        y="20"
                        width="26"
                        height="34"
                        rx="3"
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                  >
                        <animate
                              id="drawFront"
                              attributeName="stroke-dashoffset"
                              from="100"
                              to="0"
                              dur="0.6s"
                              begin="drawBack.end"
                              fill="freeze"
                        />
                        <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="0 0; 6 -6; 0 0"
                              keyTimes="0;0.4;1"
                              dur="1.1s"
                              begin="drawFront.end"
                              repeatCount="indefinite"
                        />
                  </rect>

            </svg>

      );
}
