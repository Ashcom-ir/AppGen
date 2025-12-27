"use client";
import { motion } from "framer-motion";

// borderColor, backColor, fillColor = Tailwind classes
export default function ProgressBar({
  progress = 0,
  isVisible = false,
  borderColor = "border-gray-800",
  backColor = "bg-gray-700",
  fillColor = "bg-blue-500",
}) {
  return (
    <div style={{direction:"ltr"}} className={`w-full p-2 rounded-full border ${borderColor}`}>
      <div className={`${isVisible ? "block" : "hidden"} w-full h-2 ${backColor} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${fillColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
