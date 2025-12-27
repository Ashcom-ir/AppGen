// components/SectionSwitch.jsx
"use client";

import { motion } from "framer-motion";

/**
 * Custom switch based on your sample.
 * Props:
 * - label (string)
 * - icon (React node)
 * - checked (bool)
 * - onChange (fn)
 * - children (revealed content)
 */

export default function SectionSwitch({ label, icon, checked, onChange, children }) {
  const toggle = () => onChange(!checked);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/10 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow">
            {icon}
          </div>
          <div>
            <div className="text-lg font-semibold">{label}</div>
            <div className="text-xs text-gray-300">برای نمایش گزینه‌ها روشن کنید</div>
          </div>
        </div>

        <button
          onClick={toggle}
          aria-pressed={checked}
          className="inline-flex items-center rounded-full p-1"
          style={{
            width: 56,
            height: 30,
            backgroundColor: checked ? "#2563EB" : "rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: 3,
          }}
        >
          <motion.div
            layout
            transition={{ type: "spring", duration: 0.25, bounce: 0.25 }}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 6px 14px rgba(2,6,23,0.5)",
            }}
            // position handled by parent justifyContent inline style in sample — replicate with marginLeft
            // we'll use style marginLeft/auto to visually move it
            animate={{ marginLeft: checked ? 0 : "auto" }}
          />
        </button>
      </div>

      {/* reveal children */}
      <div style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={checked ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-4 pl-2 border-l border-white/10">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
