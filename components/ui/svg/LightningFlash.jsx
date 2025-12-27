"use client";
import { useEffect, useRef } from "react";
import "./LightningFlash.scss";
import { getMultiPathSVGCode } from "lindsvg";

export default function LightningFlash({
  size = 24,
  color = "var(--color-indigo-600)",
  border_color = "var(--color-indigo-500)"
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createLightning = () => {
      const baseAlpha = 170 * Math.PI / 180;
      const baseTheta = 22 * Math.PI / 180;

      // کمی رندوم ±5 درجه
      const alpha = baseAlpha + (Math.random() - 0.5) * (10 * Math.PI / 180);
      const theta = baseTheta + (Math.random() - 0.5) * (10 * Math.PI / 180);

      const lsParams = {
        axiom: "FYX",
        rules: {
          F: "FFFXFX-[FFFXFXY]",
          X: "Y+F+XF",
          Y: "[F+F+F]"
        },
        alpha,
        theta,
        iterations: 4,
        step: 1
      };

      const svgParams = {
        width: size,
        height: size,
        pathAttributes: {
          stroke: color,
          "stroke-width": ["4", "2", "1"],
          opacity: ["1", "0.6", "0.5", "0.2"],
          style: "filter: url(#glow)"
        }
      };

      containerRef.current.innerHTML = getMultiPathSVGCode(lsParams, svgParams);
    };

    // ایجاد اولین flash
    createLightning();

    // هر 4 ثانیه یکبار flash جدید با alpha/theta رندوم
    const interval = setInterval(createLightning, 4000);

    return () => clearInterval(interval);
  }, [size, color]);

  return (
    <>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="skyblue" />
          </filter>
        </defs>
      </svg>
      <div id="sky" ref={containerRef} />
    </>
  );
}
