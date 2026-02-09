"use client";
import { useEffect, useRef } from "react";

export default function JustifyV({
  size = 40,
  whiteColor = "#ffffff",
  target = "start", // start | center | end
}) {
  const containerRef = useRef(null);

  const orderMap = {
    start: ["end", "center", "green", "white"],
    center: ["start", "end", "green", "white"],
    end: ["start", "center", "green", "white"],
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svgs = Array.from(container.querySelectorAll("svg"));

    const showOnly = (step) => {
      svgs.forEach(svg => (svg.style.display = "none"));
      const el = container.querySelector(`[data-step="${step}"]`);
      if (el) el.style.display = "block";
    };

    let cancelled = false;

    const run = async () => {
      // نمایش اولیه بدون flicker
      showOnly(orderMap[target][0]);

      while (!cancelled) {
        for (const step of orderMap[target]) {
          if (cancelled) return;
          showOnly(step);
          await new Promise(r =>
            setTimeout(r, step === "white" ? 2000 : 500)
          );
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, [target]);

  return (
    <div
      ref={containerRef}
      className="align-loader"
      style={{ width: size, height: size }}
    >
      {/* قرمز start */}
      <svg
        data-step="start"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="crimson"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "none" }}
      >
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="6" width="10" height="6" rx="2" />
        <path d="M2 2h20" />
      </svg>

      {/* قرمز center */}
      <svg
        data-step="center"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="crimson"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "none" }}
      >
        <rect x="5" y="16" width="14" height="6" rx="2" />
        <rect x="7" y="2" width="10" height="6" rx="2" />
        <path d="M2 12h20" />
      </svg>

      {/* قرمز end */}
      <svg
        data-step="end"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="crimson"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "none" }}
      >
        <rect x="5" y="12" width="14" height="6" rx="2" />
        <rect x="7" y="2" width="10" height="6" rx="2" />
        <path d="M2 22h20" />
      </svg>

      {/* سبز */}
      <svg
        data-step="green"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "none" }}
      >
        {target === "start" && (
          <>
            <rect x="5" y="16" width="14" height="6" rx="2" />
            <rect x="7" y="6" width="10" height="6" rx="2" />
            <path d="M2 2h20" />
          </>
        )}
        {target === "center" && (
          <>
            <rect x="5" y="16" width="14" height="6" rx="2" />
            <rect x="7" y="2" width="10" height="6" rx="2" />
            <path d="M2 12h20" />
          </>
        )}
        {target === "end" && (
          <>
            <rect x="5" y="12" width="14" height="6" rx="2" />
            <rect x="7" y="2" width="10" height="6" rx="2" />
            <path d="M2 22h20" />
          </>
        )}
      </svg>

      {/* سفید */}
      <svg
        data-step="white"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke={whiteColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "none" }}
      >
        {target === "start" && (
          <>
            <rect x="5" y="16" width="14" height="6" rx="2" />
            <rect x="7" y="6" width="10" height="6" rx="2" />
            <path d="M2 2h20" />
          </>
        )}
        {target === "center" && (
          <>
            <rect x="5" y="16" width="14" height="6" rx="2" />
            <rect x="7" y="2" width="10" height="6" rx="2" />
            <path d="M2 12h20" />
          </>
        )}
        {target === "end" && (
          <>
            <rect x="5" y="12" width="14" height="6" rx="2" />
            <rect x="7" y="2" width="10" height="6" rx="2" />
            <path d="M2 22h20" />
          </>
        )}
      </svg>
    </div>
  );
}
