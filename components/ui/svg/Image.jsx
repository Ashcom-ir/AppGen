"use client";

export default function Image({ size = 24, color = "--color-rose-500" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      stroke={`var(${color})`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(12 12)">
        <g>
          <rect x="-9" y="-9" width="18" height="18" rx="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-1.8;1.8;-1.8"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </rect>
          <circle cx="-3" cy="-3" r="2">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;2 -2;0 0"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <path d="M9 3l-3.1-3.1a2 2 0 0 0-2.8 0L-6 9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-1.8;1.8;-1.8"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
