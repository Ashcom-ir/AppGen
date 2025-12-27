"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({
      title = "Toast",
      description = "Toast description",
      triggerText = "Add to Toast",
      duration = 3000,
      backgroundColor = "#3b82f6", // آبی پیشفرض
      content = <span>Event added to your Toast!</span>,
}) {
      const [visible, setVisible] = useState(false);

      const showToast = () => {
            setVisible(true);
            setTimeout(() => setVisible(false), duration);
      };

      return (
            <>
                  {/* دکمه trigger */}
                  <button
                        onClick={showToast}
                        style={{
                              padding: "0.75rem 1.2rem",
                              borderRadius: 8,
                              background: "#1e40af",
                              color: "#fff",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontSize: 16,
                              border: "none",
                        }}
                  >
                        {triggerText}
                  </button>

                  {/* Toast container */}
                  <AnimatePresence>
                        {visible && (
                              <motion.div
                                    initial={{ opacity: 0, x: 50, y: 20 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0, x: 50, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                          position: "fixed",
                                          bottom: 24,
                                          right: 24,
                                          background: backgroundColor,
                                          color: "#fff",
                                          padding: "1rem 1.2rem",
                                          borderRadius: 10,
                                          border: "1px solid #1d2628",
                                          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                                          zIndex: 9999,
                                          maxWidth: 320,
                                    }}
                              >
                                    <div className="m-1 text-white text-xl font-semibold">{title}</div>
                                    <div className="m-2 relative flex gap-3" style={{minWidth:300}}>
                                          <div className="m-0 text-white/90 text-lg" style={{lineHeight: 1.3}} >{description}</div>
                                          <button className="absolute left-4 bottom-4 px-2 py-1 rounded-xl text-sm bg-blue-800 text-white hover:bg-blue-900 cursor-pointer" type="button" >Undo</button>
                                    </div>
                              </motion.div>
                        )}
                  </AnimatePresence>
            </>

      );
}
