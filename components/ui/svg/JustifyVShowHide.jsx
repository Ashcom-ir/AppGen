"use client";
import { useEffect, useRef } from "react";

/* ================= GLOBAL RAINBOW CLOCK ================= */

let GLOBAL_HUE = Math.random() * 360;
let subscribers = new Set();
let rafId = null;

const startRainbowEngine = () => {
  if (rafId) return;

  const tick = () => {
    GLOBAL_HUE = (GLOBAL_HUE + 0.15) % 360; // سرعت حرکت رنگ (نرم و پیوسته)

    subscribers.forEach(fn => fn(GLOBAL_HUE));

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
};

const stopRainbowEngine = () => {
  if (subscribers.size === 0 && rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
};

/* ================= COMPONENT ================= */

export default function JustifyVShowHide({
  size = 24,
  color = "#ffffff",
  isRainbow = true,
}) {
  const containerRef = useRef(null);
  const target = "start";

  const orderMap = {
    start: ["end", "center", "green", "white"],
  };

  const VISIBLE_STEPS = orderMap[target].length;
  const HUE_GAP = 360 / VISIBLE_STEPS;

  const applyColors = baseHue => {
    const container = containerRef.current;
    if (!container) return;

    if (!isRainbow) {
      container
        .querySelectorAll("svg")
        .forEach(svg => (svg.style.stroke = color));
      return;
    }

    orderMap[target].forEach((step, index) => {
      const el = container.querySelector(`[data-step="${step}"]`);
      if (!el) return;

      const hue = (baseHue + index * HUE_GAP) % 360;
      el.style.stroke = `hsl(${hue}, 100%, 55%)`;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svgs = Array.from(container.querySelectorAll("svg"));

    const showOnly = step => {
      svgs.forEach(svg => (svg.style.display = "none"));
      const el = container.querySelector(`[data-step="${step}"]`);
      if (el) el.style.display = "block";
    };

    let cancelled = false;

    /* ---------- subscribe to global rainbow ---------- */

    const onHueUpdate = hue => {
      if (!cancelled) applyColors(hue);
    };

    if (isRainbow) {
      subscribers.add(onHueUpdate);
      startRainbowEngine();
    } else {
      applyColors();
    }

    /* ---------- step animation (همون قبلی خودت) ---------- */

    const runSteps = async () => {
      showOnly(orderMap[target][0]);

      while (!cancelled) {
        for (const step of orderMap[target]) {
          if (cancelled) return;
          showOnly(step);
          await new Promise(r => setTimeout(r, 2500));
        }
      }
    };

    runSteps();

    return () => {
      cancelled = true;
      subscribers.delete(onHueUpdate);
      stopRainbowEngine();
    };
  }, [isRainbow, color]);

  return (
    <div
      ref={containerRef}
      className="align-loader"
      style={{ width: size, height: size }}
    >
      <svg data-step="start" viewBox="0 0 24 24" width={size} height={size}
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "none" }}>
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="6" width="10" height="6" rx="2" />
        <path d="M2 2h20" />
      </svg>

      <svg data-step="center" viewBox="0 0 24 24" width={size} height={size}
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "none" }}>
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="2" width="10" height="6" rx="2" />
        <path d="M2 12h20" />
      </svg>

      <svg data-step="end" viewBox="0 0 24 24" width={size} height={size}
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "none" }}>
        <rect x="5" y="12" width="14" height="6" rx="2" />
        <rect x="7" y="2" width="10" height="6" rx="2" />
        <path d="M2 22h20" />
      </svg>

      <svg data-step="green" viewBox="0 0 24 24" width={size} height={size}
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "none" }}>
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="6" width="10" height="6" rx="2" />
        <path d="M2 2h20" />
      </svg>

      <svg data-step="white" viewBox="0 0 24 24" width={size} height={size}
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "none" }}>
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="6" width="10" height="6" rx="2" />
        <path d="M2 2h20" />
      </svg>
    </div>
  );
}
