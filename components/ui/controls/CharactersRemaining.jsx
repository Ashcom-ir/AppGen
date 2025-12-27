import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Clean, fully working version — no syntax issues
export default function CharactersRemaining({ max = 50, onValueChange }) {
  const [value, setValue] = useState("");
  const remaining = max - value.length;
  const prev = useRef(remaining);
  const [animateCount, setAnimateCount] = useState(false);

  // Send value to parent
  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  // Trigger scale animation when negative
  useEffect(() => {
    if (remaining < 0) {
      setAnimateCount(true);
      const t = setTimeout(() => setAnimateCount(false), 180);
      return () => clearTimeout(t);
    }
    prev.current = remaining;
  }, [remaining]);

  const getColor = () => {
    if (remaining > 3) return "text-green-600";
    if (remaining > 0) return "text-orange-500";
    if (remaining === 0) return "text-red-600 drop-shadow-[0_0_6px_#ff0000]";
    return "text-red-600"; // negative
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-md">
      <div className="relative w-full">
        <input
          className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-5 text-base outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Counter inside input */}
        <motion.div
          style={{direction:'ltr'}}
          className={`absolute left-2 top-1/2 -translate-y-1/2 select-none pointer-events-none font-semibold ${getColor()}`}
          animate={animateCount ? { scale: 1.45 + animateCount } : { scale: 1.4 }}
          transition={{ duration: 0.15 }}
        >
          {remaining}
        </motion.div>
      </div>
    </div>
  );
}