"use client";

export default function LayoutGrid({
      size = 24,
      color = "--color-rose-500",
      color2 = "--color-rose-500"
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`var(${color})`} strokeWidth="2">
                  <rect width="7" height="7" x="3" y="3" rx="1">
                        <animateTransform attributeName="transform" type="translate" values="-10,-10;0,0;0,0" keyTimes="0;0.2;1" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.2;1" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <rect width="7" height="7" x="14" y="3" rx="1">
                        <animateTransform attributeName="transform" type="translate" values="10,-10;0,0;0,0" keyTimes="0;0.2;1" dur="3s" begin="0.3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.2;1" dur="3s" begin="0.3s" repeatCount="indefinite" />
                  </rect>
                  <rect width="7" height="7" x="14" y="14" rx="1">
                        <animateTransform attributeName="transform" type="translate" values="10,10;0,0;0,0" keyTimes="0;0.2;1" dur="3s" begin="0.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.2;1" dur="3s" begin="0.6s" repeatCount="indefinite" />
                  </rect>
                  <rect width="7" height="7" x="3" y="14" rx="1">
                        <animateTransform attributeName="transform" type="translate" values="-10,10;0,0;0,0" keyTimes="0;0.2;1" dur="3s" begin="0.9s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.2;1" dur="3s" begin="0.9s" repeatCount="indefinite" />
                  </rect>
            </svg>

      );
}
