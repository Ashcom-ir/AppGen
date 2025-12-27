"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NumberPriceSwitcher.jsx
 *
 * Props:
 * - monthlyPrice, yearlyPrice (numbers)
 * - monthlyLabel, yearlyLabel (strings)
 * - monthlySuffix, yearlySuffix (strings)  e.g. "/mo", "/yr"
 *
 * Important:
 * - Only the number itself animates.
 * - Buttons, suffix and container do NOT animate (no layout animation).
 * - AnimatePresence configured with initial={false} and mode="wait"
 */

export default function NumberPriceSwitcher({
  monthlyPrice = 10,
  yearlyPrice = 80,
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  monthlySuffix = "/mo",
  yearlySuffix = "/yr",
}) {
  const [mode, setMode] = useState("monthly");

  const isMonthly = mode === "monthly";
  const price = isMonthly ? monthlyPrice : yearlyPrice;
  const suffix = isMonthly ? monthlySuffix : yearlySuffix;

  // spring config tuned to look like the framer demo
  const spring = {
    type: "spring",
    stiffness: 320,
    damping: 28,
    mass: 0.9,
    bounce: 0.28,
  };

  return (
    <div
      // container must NOT be a motion/layout container (prevents extra layout animations)
      className="flex flex-col items-center gap-4 select-none p-4"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* SWITCH (static buttons - no motion/layout wrappers) */}
      <div
        style={{
          display: "inline-flex",
          background: "rgba(0,0,0,0.06)",
          padding: 6,
          borderRadius: 999,
        }}
      >
        <button
          onClick={() => setMode("monthly")}
          aria-pressed={isMonthly}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: isMonthly ? "#fff" : "transparent",
            boxShadow: isMonthly ? "0 6px 18px rgba(0,0,0,0.08)" : "none",
            fontWeight: 700,
            cursor: "pointer",
            marginRight: 6,
          }}
        >
          {monthlyLabel}
        </button>

        <button
          onClick={() => setMode("yearly")}
          aria-pressed={!isMonthly}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: !isMonthly ? "#fff" : "transparent",
            boxShadow: !isMonthly ? "0 6px 18px rgba(0,0,0,0.08)" : "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {yearlyLabel}
        </button>
      </div>

      {/* PRICE AREA */}
      <div
        // wrapper must be static (no layout animation)
        style={{
          position: "relative",
          width: 220,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* AnimatePresence: initial=false prevents mount animation on first render.
            mode="wait" makes exit finish before enter begins (sequential). */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            // key ensures only this element changes when mode toggles
            key={mode}
            // disable layout animation on this element (we control position via absolute)
            layout={false}
            initial={{ y: 40, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.92 }}
            transition={spring}
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {/* PRICE number (large) */}
            <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
              ${price}
            </div>

            {/* suffix stays visually tied but DOES NOT animate separately */}
            <div style={{ alignSelf: "flex-end", color: "#6b7280", fontSize: 16 }}>
              {suffix}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
