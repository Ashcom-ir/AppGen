"use client";
import { useEffect, useRef } from "react";

export default function Justify({
  size = 40,
  whiteColor = "#ffffff",
  target = "start", // start | center | end
}) {
  const containerRef = useRef(null);

  const orderMap = {
    start: ["right", "center", "green", "white"],
    center: ["right", "end", "green", "white"],
    end: ["end", "center", "green", "white"],
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svgs = Array.from(container.querySelectorAll("svg"));

    const hideAll = () => {
      svgs.forEach(svg => (svg.style.display = "none"));
    };

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (const id of orderMap[target]) {
          if (cancelled) return;
          hideAll();

          const el = container.querySelector(`[data-step="${id}"]`);
          if (el) el.style.display = "block";

          await new Promise(r =>
            setTimeout(r, id === "white" ? 2000 : 500)
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
      {/* قرمز راست */}
      <svg
        data-step="right"
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
        <rect width="6" height="14" x="2" y="5" rx="2" />
        <rect width="6" height="14" x="12" y="5" rx="2" />
        <path d="M22 2v20" />
      </svg>

      {/* قرمز وسط */}
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
        <rect width="6" height="14" x="2" y="5" rx="2" />
        <rect width="6" height="14" x="16" y="5" rx="2" />
        <path d="M12 2v20" />
      </svg>

      {/* قرمز چپ */}
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
        <rect width="6" height="14" x="6" y="5" rx="2" />
        <rect width="6" height="14" x="16" y="5" rx="2" />
        <path d="M2 2v20" />
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
            <rect width="6" height="14" x="6" y="5" rx="2" />
            <rect width="6" height="14" x="16" y="5" rx="2" />
            <path d="M2 2v20" />
          </>
        )}
        {target === "center" && (
          <>
            <rect width="6" height="14" x="2" y="5" rx="2" />
            <rect width="6" height="14" x="16" y="5" rx="2" />
            <path d="M12 2v20" />
          </>
        )}
        {target === "end" && (
          <>
            <rect width="6" height="14" x="2" y="5" rx="2" />
            <rect width="6" height="14" x="12" y="5" rx="2" />
            <path d="M22 2v20" />
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
            <rect width="6" height="14" x="6" y="5" rx="2" />
            <rect width="6" height="14" x="16" y="5" rx="2" />
            <path d="M2 2v20" />
          </>
        )}
        {target === "center" && (
          <>
            <rect width="6" height="14" x="2" y="5" rx="2" />
            <rect width="6" height="14" x="16" y="5" rx="2" />
            <path d="M12 2v20" />
          </>
        )}
        {target === "end" && (
          <>
            <rect width="6" height="14" x="2" y="5" rx="2" />
            <rect width="6" height="14" x="12" y="5" rx="2" />
            <path d="M22 2v20" />
          </>
        )}
      </svg>
    </div>
  );
}
