"use client";

import { useEffect, useState } from "react";

export default function MailCom({
  size = 30,
  color = "var(--color-indigo-600)",
  border_color = "var(--color-indigo-500)",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M107.6,2.5H2.5v91.4c0,8.2,5.6,15,13.1,17l0,0l126.9,31.7V37.5C142.6,18.2,126.9,2.5,107.6,2.5z 
           M125.1,93.9 h-17.6V53.8c0-3.9-1.3-13-12.9-13c-7.7,0-13.3,5.3-13.3,13v40.1H63.7V53.8c0-3.9-1.2-13-12.8-13
           c-7.9,0-13.3,5.3-13.3,13v40.1H20 V23.6h30.9c9.3,0,16.9,3.7,21.8,9.7c5.2-6,12.9-9.7,21.8-9.7
           c19.2,0,30.5,12.7,30.5,30.6L125.1,93.9L125.1,93.9z"
        fill={color}
        stroke={border_color}
        strokeWidth="3"
        filter="url(#neonGlow)"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{ transform: "scale(2)" }}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="600"
          to="0"
          dur="2s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="fill"
          values="none;#4900ff"
          dur="1s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
    </svg>
  );
}
