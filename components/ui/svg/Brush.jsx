"use client";

export default function Brush({
      size = 24,
      color = "--color-rose-500"
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
                  fill="none" stroke={`var(${color})`} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <g>
                        <path d="m11 10 3 3" />
                        <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
                        <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
                        <animateTransform
                              type="translate"
                              attributeName="transform"
                              values="0 0;1 -0.6;1.4 -0.2;1.6 -0.4;1.8 -0.3;1.8 -0.3;1.6 -0.4;1.2 -0.6;0 0"
                              keyTimes="0;0.15;0.28;0.4;0.55;0.65;0.75;0.88;1"
                              dur="1.8s"
                              repeatCount="indefinite"
                        />
                  </g>
            </svg>
      );
}
