"use client";

import { motion } from "framer-motion";

export default function AnimatedSwitch({ value, onChange }) {
  const HANDLE_SIZE = 24;
  const SWITCH_WIDTH = 56;
  const PADDING = 4;
  const MAX_X = SWITCH_WIDTH - HANDLE_SIZE - PADDING * 2;

  return (
    <div className="no-toggle" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="relative flex items-center rounded-full"
        style={{
          width: SWITCH_WIDTH,
          height: 32,
          padding: PADDING,
          direction: "ltr",
          background: value ? "rgba(255,255,255,0.88)" : "rgba(148,163,184,0.18)",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.10)",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <motion.div
          layout
          initial={false}
          animate={{ x: value ? MAX_X : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 80,
          }}
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: "50%",
            background: value ? "rgba(16,185,129,0.95)" : "rgba(239,68,68,0.95)",
            boxShadow: value ? "0 4px 12px rgba(16,185,129,0.35)" : "0 4px 12px rgba(239,68,68,0.35)",
          }}
        />
      </button>
    </div>
  );
}
