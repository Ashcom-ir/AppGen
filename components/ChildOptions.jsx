// components/ChildOptions.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

/**
 * props:
 * - items: array of strings
 * - title: optional
 * - onChange: function(choicesArray)
 */

export default function ChildOptions({ items = [], title, onChange = () => { } }) {
  const [checkedState, setCheckedState, open, setOpen] = useState(false);
  function toggleItem(key) {
    const next = { ...checkedState, [key]: !checkedState[key] };
    setCheckedState(next);
    const choices = Object.keys(next).filter((k) => next[k]);
    onChange(choices);
    setOpen(true);
    console.log("setOpen");
  }

  return (

    <div className="space-y-3">
      {title && <div className="font-semibold mb-1">{title}</div>}
      
      <div className="grid gap-2 md:grid-cols-2">
        {items.map((it, idx) => (
          <motion.label
            key={it}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/6 cursor-pointer hover:scale-[1.01] transition-transform"
            onClick={() => toggleItem(it)}
          >
            <div
              className={`w-5 h-5 rounded-sm flex items-center justify-center border ${checkedState[it] ? "bg-blue-500 border-blue-500" : "bg-transparent border-white/10"}`}
            >
              {checkedState[it] && <Check size={12} className="text-white" />}
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium">{it}</div>
              <div className="text-xs text-gray-300">توضیح کوتاه درباره‌ی {it}</div>
            </div>
          </motion.label>
        ))}
      </div>
    </div>
  );
}
