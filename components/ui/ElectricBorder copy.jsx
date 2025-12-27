"use client";
import React from "react";

export default function ElectricBorder({
  children,
  borderColor = "border border-rose-300",
  glowColor = "shadow-pink-300",
  electricColor = "#7be8ff",
  borderRadius = "rounded-xl",
}) {
  return (
    <div className="relative" >
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

      <div className={`relative p-16 bg-white/2 backdrop-blur-xl ${borderRadius}`}>
        {/* Main border border: 1px*/}
        <div className={`absolute inset-0 z-10 ${borderRadius} ${borderColor}`}></div>

        {/* Electric moving layer border: 2px*/}
        <div className={`absolute inset-0 z-20 ${borderRadius} ${borderColor} electric-layer `}></div>

        {/* Glow border-radius: ${borderRadius + 2}px;*/}
        <div className={`absolute inset-0 z-10 shadow-[0_0_10px] ${glowColor} ${borderRadius} ${borderColor}`}></div>

        {/* Content shadow-[0_35px_35px_rgba(0,0,0,0.25)]*/}
        <div className="relative z-10">{children}</div>
      </div>
      <style jsx>{`.electric-layer { filter: url(#turbulent-displace); mix-blend-mode: screen; }`}</style>
    </div>

  );
}
