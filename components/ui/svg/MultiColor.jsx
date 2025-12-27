"use client";

export default function MultiColor({
  size = 24,
  color1 = "--color-rose-500",
  color2 = "--color-blue-500",
  color3 = "--color-green-500",
  color4 = "--color-yellow-500",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
    >
      {/* pivot point */}
      <g transform="translate(20 52)">
        <rect x="-4" y="-40" width="8" height="40" rx="2" fill={`var(${color1})`}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-20;20;-20"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x="-4"
          y="-40"
          width="8"
          height="40"
          rx="2"
          fill={`var(${color2})`}
          transform="rotate(25)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="5;45;5"
            dur="1.1s"
            begin="0.1s"
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x="-4"
          y="-40"
          width="8"
          height="40"
          rx="2"
          fill={`var(${color3})`}
          transform="rotate(50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="30;70;30"
            dur="1.1s"
            begin="0.2s"
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x="-4"
          y="-40"
          width="8"
          height="40"
          rx="2"
          fill={`var(${color4})`}
          transform="rotate(75)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="55;95;55"
            dur="1.1s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}
