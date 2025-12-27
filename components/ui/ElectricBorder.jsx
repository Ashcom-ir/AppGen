"use client";
import { useEffect, useRef, useState } from "react";
export default function ElectricBorder({
  body,
  border = "border",
  border2 = "border-2",
  borderColor = "border-rose-300",
  glowColor = "shadow-pink-300",
  electricColor = "--color-rose-500",
  borderRadius = "rounded-xl",
}) {
  const bodyRef = useRef(null);
  const effectsRef = useRef(null);

  const [size, setSize] = useState({ height: 0 });

  useEffect(() => {
    if (!bodyRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect;
      setSize(height);
    });

    observer.observe(bodyRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!effectsRef.current) return;
    effectsRef.current.style.height = (size.height) + "px";
  }, [size]);
  return (
    <main className="relative ">
      <svg className="absolute">
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      <div className={`relative p-2 ${borderRadius}`}>
        {/* لایه‌های بوردر + افکت، همه ABSOLUTE */}
        <div className="absolute inset-0 pointer-events-none">
          {/* main stroke */}
          <div className={`${borderRadius} ${borderColor}`}>
            <div ref={effectsRef}
              style={{ filter: "url(#turbulent-displace)" }}
              className={`ml-[-4] mt-[-4] blur-[1px] ${border2} ${borderRadius} ${borderColor}`}
            ></div>
          </div>
          {/* blur layers */}
          <div className={`absolute inset-0 blur-[1px] ${borderRadius} ${borderColor} ${border}`}></div>
          <div ref={bodyRef} className={`absolute inset-0 blur-[4] ${borderRadius} ${borderColor} ${border2}`}></div>
          {/* glow background */}
          <div
            style={{
              background: `linear-gradient(-30deg, oklch(from var(${electricColor}) l c h), transparent, var(${electricColor}))`
            }}
            className={`transform-[scale(1.1)] opacity-[.3] blur-[32px] ${borderRadius} ${borderColor} absolute inset-0`}
          ></div>
        </div>
        {/* محتوای واقعی، تنها چیزی که سایز می‌دهد */}
        <div className="relative z-2">
          {body}
        </div>
      </div>

    </main>
  );
}
