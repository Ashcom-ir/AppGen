"use client";
import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

export function RadioGroup({ name = "group", defaultValue = null, disableDuration = 2000, children }) {
  const [selected, setSelected] = useState(defaultValue);
  const [disabledOption, setDisabledOption] = useState(null); // گزینه‌ای که بقیه را 2 ثانیه غیرفعال می‌کند

  function select(optionId) {
    setSelected(optionId);
    setDisabledOption(optionId); // بقیه را disable کن

    setTimeout(() => {
      setDisabledOption(null); // دوباره فعال شوند
    }, disableDuration);
  }

  // هر رادیو، props خود را از این state دریافت می‌کند
  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      groupName: name,
      selected,
      disabledOption,
      onSelect: select,
    })
  );

  return <div>{clonedChildren}</div>;
}

/* -----------------------------------
   RadioAnimation
------------------------------------ */
export default function RadioAnimation({
  optionId,
  label,
  groupName,
  selected,
  disabledOption,
  onSelect,
}) {
  const uid = useId();
  const inputId = `${uid}-${optionId}`;

  const checked = selected === optionId;
  const disableThis = disabledOption !== null && disabledOption !== optionId;

  function handleChange() {
    if (!disableThis) onSelect?.(optionId);
  }

  return (
    <label
      htmlFor={inputId}
      className={`flex items-center gap-4 select-none p-4 rounded-2xl bg-white shadow-md transition ${
        disableThis ? "opacity-40 pointer-events-none" : "cursor-pointer"
      }`}
    >
      <input
        id={inputId}
        name={groupName}
        type="radio"
        className="sr-only"
        checked={checked}
        disabled={disableThis}
        onChange={handleChange}
      />

      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* outer ring */}
        <motion.span
          layout
          initial={false}
          animate={
            checked
              ? { scale: 1.05, borderColor: "#6b21a8" }
              : { scale: 1, borderColor: "#9ca3af" }
          }
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute inset-0 rounded-full border-2"
        />

        {/* ripple */}
        <AnimatePresence>
          {checked && (
            <motion.span
              key={`bg-${groupName}-${optionId}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0 rounded-full"
              style={{ background: "rgba(107,33,168,0.08)" }}
            />
          )}
        </AnimatePresence>

        {/* dot */}
        <AnimatePresence>
          {checked && (
            <motion.span
              layoutId={`dot-${groupName}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className="relative w-3.5 h-3.5 rounded-full flex items-center justify-center"
              style={{ background: "#6b21a8" }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.06 }}
              >
                <Check size={12} color="white" />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* label */}
      <span className={checked ? "font-medium text-purple-700" : "font-medium text-gray-800"}>
        {label}
      </span>
    </label>
  );
}
