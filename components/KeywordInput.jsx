// components/KeywordInput.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

function estimateSyllables(text) {
  if (!text) return 0;
  const vowels = /[aeiouAEIOUآاویوایئ]+/g;
  const matches = text.match(vowels);
  if (!matches) return 1;
  return matches.length;
}

function colorBySyllables(n) {
  if (n <= 1) return "border-red-400";
  if (n === 2) return "border-orange-400";
  if (n === 3) return "border-yellow-300";
  if (n === 4) return "border-lime-300";
  return "border-green-400";
}

export default function KeywordInput({ value = [], onChange = () => {} }) {
  const [keywords, setKeywords] = useState(value.length ? value : [""]);

  useEffect(() => onChange(keywords), [keywords]);

  function addKeyword() {
    setKeywords((s) => [...s, ""]);
  }
  function removeKeyword(i) {
    setKeywords((s) => s.filter((_, idx) => idx !== i));
  }
  function setKeywordValue(i, v) {
    setKeywords((s) => s.map((val, idx) => (idx === i ? v : val)));
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {keywords.map((kw, i) => {
          const syll = estimateSyllables(kw || "");
          const borderClass = colorBySyllables(syll);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              className={`flex items-center gap-3 p-2 rounded-md ${borderClass} border bg-white/4`}
            >
              <input
                type="text"
                value={kw}
                onChange={(e) => setKeywordValue(i, e.target.value)}
                placeholder="کلیدواژه را وارد کنید..."
                className="flex-1 bg-transparent outline-none px-2 py-2 text-white"
                aria-label={`keyword-${i}`}
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => removeKeyword(i)}
                  className="p-2 rounded-md hover:bg-white/6 transition"
                  aria-label="Remove keyword"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="flex gap-2">
        <button
          onClick={addKeyword}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
        >
          <Plus size={14} /> افزودن کلیدواژه
        </button>
        <button
          onClick={() => console.log("Keywords:", keywords)}
          className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/3 transition"
        >
          ذخیره (نمونه)
        </button>
      </div>
    </div>
  );
}
