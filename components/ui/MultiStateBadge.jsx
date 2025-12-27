"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MultiStateBadge({
      states,       // آرایه از وضعیت‌ها
      initial = 0,  // ایندکس وضعیت اولیه

}) {
      const [current, setCurrent] = useState(initial);

      // تغییر وضعیت بعدی (چرخه‌ای)
      function nextState() {
            setCurrent((prev) => (prev + 1) % states.length);
      }

      const state = states[current];
      // state باید چیزی شبیه { text, bgColor, textColor } باشد

      // انیمیشن برای تغییر حالت
      const variants = {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
      };

      return (
            <motion.button
                  onClick={nextState}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                        backgroundColor: state.bgColor,
                        color: state.textColor,
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                  }}
            >
                  {state.text}
            </motion.button>
      );
}
