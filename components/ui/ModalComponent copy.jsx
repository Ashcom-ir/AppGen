"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { X } from "lucide-react";
import MultiStateBadge from "@/components/ui/MultiStateBadge";
/**
 * MotionModal props:
 * - open (bool)
 * - onClose (fn)
 * - title (node or string)
 * - body (node)
 * - cancelButton = { text, color }
 * - confirmButton = { text, color, onClick }
 *
 * Usage:
 * <MotionModal open={open} onClose={() => setOpen(false)} title="Confirm" body={<p>...</p>} />
 */


export default function MotionModal({
      open,
      onClose,
      title,
      body,
      footer
}) {
      const modalRef = useRef(null);
      const firstFocusableRef = useRef(null);
      const badgeStates = [
            { text: "بررسی دامنه", bgColor: "#E5E7EB", textColor: "#111827" },
            { text: "موفقیت", bgColor: "#10B981", textColor: "#FFFFFF" },
            { text: "هشدار", bgColor: "#F59E0B", textColor: "#FFFFFF" },
            { text: "خطا", bgColor: "#EF4444", textColor: "#FFFFFF" },
      ];
      // close on ESC
      useEffect(() => {
            if (!open) return;
            function onKey(e) {
                  if (e.key === "Escape") onClose?.();
                  if (e.key === "Tab") {
                        // very small focus-trap: keep focus inside modal
                        const focusables = modalRef.current?.querySelectorAll(
                              'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                        );
                        if (!focusables || focusables.length === 0) return;
                        const first = focusables[0];
                        const last = focusables[focusables.length - 1];
                        if (e.shiftKey && document.activeElement === first) {
                              e.preventDefault();
                              last.focus();
                        } else if (!e.shiftKey && document.activeElement === last) {
                              e.preventDefault();
                              first.focus();
                        }
                  }
            }
            document.addEventListener("keydown", onKey);
            return () => document.removeEventListener("keydown", onKey);
      }, [open, onClose]);

      // focus first element when opened
      useEffect(() => {
            if (open) {
                  setTimeout(() => {
                        if (firstFocusableRef.current) firstFocusableRef.current.focus();
                        else if (modalRef.current) {
                              const btn = modalRef.current.querySelector("button, [tabindex]");
                              if (btn) btn.focus();
                        }
                  }, 40);
            }
      }, [open]);

      // Variants: backdrop + modal + children stagger
      const backdrop = {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
      };

      const modal = {
            hidden: { opacity: 0, y: 40, scale: 0.98 },
            visible: {
                  opacity: 0.97,
                  y: 0,
                  scale: 1,
                  animate: { opacity: [0, 1, 1, 0], y: [-50, 0, 0, 50] },
                  transition: {
                        duration: 0.8,
                        delay: 0.01,
                        ease: [0, 0.71, 0.2, 1.01],
                  },
            },
            exit: {
                  animate: { opacity: [1, 0, 0, 1], y: [50, 0, 0, -50] },
                  opacity: 0,
                  y: 24,
                  scale: 0.98,
                  transition: { duration: 0.18 },
            },
      };

      const content = {
            hidden: { opacity: 0, y: 6 },
            visible: (i = 1) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.06 * i, duration: 0.22 },
            }),
      };

      // stopPropagation helper for clicks inside modal
      function stop(e) {
            e.stopPropagation();
      }

      return (
            <AnimatePresence>
                  {open && (
                        <>
                              {/* Backdrop */}
                              <motion.div
                                    key="backdrop"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={backdrop}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 z-40 flex items-center justify-center"
                                    style={{ pointerEvents: "auto" }}
                                    onClick={() => onClose?.()}
                              >

                                    {/* blurred layer */}
                                    <div
                                          aria-hidden
                                          className="absolute inset-0 bg-black/50"
                                          style={{ backdropFilter: "blur(4px)" }}
                                    />

                                    {/* modal container (centering) */}
                                    <motion.div
                                          key="modal"
                                          initial="hidden"
                                          animate="visible"
                                          exit="exit"
                                          variants={modal}
                                          transition={{ duration: 0.28 }}
                                          role="dialog"
                                          aria-modal="true"
                                          aria-labelledby="modal-title"
                                          className="relative z-50 w-full max-w-lg mx-4"
                                          onClick={stop} // prevent backdrop from seeing clicks inside
                                          ref={modalRef}
                                          
    
                                    >
                                          {/* Card */}
                                          <div
                                                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                                                style={{
                                                      backgroundColor: "#0808088c",
                                                      border: "1px solid #1d2628",
                                                      backdropFilter: "blur(8px)",
                                                      boxShadow:
                                                            "0 10px 30px rgba(2,6,23,0.35), 0 2px 6px rgba(2,6,23,0.12)",
                                                }}
                                          >
                                                {/* Header */}
                                                <div className="flex items-start justify-between gap-4 p-5 border-b" style={{ borderColor: "rgba(2,6,23,0.06)" }}>
                                                      <motion.h3 variants={content} custom={1} id="modal-title" className="text-lg font-semibold">
                                                            {title}
                                                      </motion.h3>

                                                      <motion.button
                                                            variants={content}
                                                            custom={2}
                                                            ref={firstFocusableRef}
                                                            onClick={() => onClose?.()}
                                                            className="rounded-md p-2 hover:bg-slate-100 transition"
                                                            aria-label="Close modal"
                                                            style={{
                                                                  backgroundColor: "#0e1616",
                                                                  border: "1px solid #1a1e26",
                                                                  boxShadow:
                                                                        "0 10px 30px rgba(2,6,23,0.35), 0 2px 6px rgba(2,6,23,0.12)",
                                                                  cursor: "pointer"
                                                            }}
                                                      >
                                                            <X size={18} />
                                                      </motion.button>
                                                </div>

                                                {/* Body */}
                                                <div className="p-5">
                                                      <motion.div variants={content} custom={3}>
                                                            {body}
                                                      </motion.div>
                                                </div>

                                                {/* Footer */}
                                                <div className="controls px-5 pb-5 pt-0 flex items-center justify-end gap-3"
                                                      style={{
                                                            direction: "ltr", borderTop: "1px solid #1a1e26",
                                                            paddingTop: "20px",
                                                            marginTop: "20px"
                                                      }}>
                                                      <motion.div variants={content} custom={4}>
                                                            {footer}
                                                      </motion.div>
                                                </div>
                                          </div>
                                    </motion.div>
                              </motion.div>
                        </>
                  )
                  }
            </AnimatePresence >
      );
}
