"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ElectricBorder from '@/components/ui/ElectricBorder';
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


export default function ModalComponent({
      open,
      onClose,
      title,
      body,
      footer,
      electricBorder = "border",
      electricBorder2 = "border-2",
      electricBorderColor = "border-pink-500",
      electricColor = "--color-pink-500",
      electricBorderRadius = "rounded-xl",
      electricGlowColor = "shadow-pink-300",
}) {
      const modalRef = useRef(null);
      const firstFocusableRef = useRef(null);

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
            hidden: {
                  opacity: 0,
                  rotateY: 90,
                  transformPerspective: 800,
                  transformOrigin: "right center",
            },
            visible: {
                  opacity: 1,
                  rotateY: 0,
                  transformPerspective: 800,
                  transformOrigin: "right center",
                  transition: {
                        duration: 0.9,
                        ease: [0.25, 0.1, 0.25, 1],
                  },
            },
            exit: {
                  opacity: 0,
                  rotateY: 90,
                  transformPerspective: 800,
                  transformOrigin: "right center",
                  transition: {
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                  },
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
                                          <ElectricBorder
                                                border={electricBorder}
                                                border2={electricBorder2}
                                                borderColor={electricBorderColor}
                                                glowColor={electricGlowColor}
                                                electricColor={electricColor}
                                                borderRadius={electricBorderRadius}
                                                body={
                                                      <div className="bg-neutral-900/10 shadow-[0 10px 30px rgba(2,6,23,0.35), 0 2px 6px rgba(2,6,23,0.12)] backdrop-blur-12 border border-white/6 rounded-2xl shadow-2xl overflow-hidden"
                                                      >
                                                            {/* Header */}
                                                            <div className="flex items-start border-b border-white/6 justify-between gap-4 p-5">
                                                                  <h3 variants={content} custom={1} id="modal-title" className="text-lg font-semibold">
                                                                        {title}
                                                                  </h3>

                                                                  <button
                                                                        variants={content}
                                                                        custom={2}
                                                                        ref={firstFocusableRef}
                                                                        onClick={() => onClose?.()}
                                                                        className="bg-neutral-900/10 rounded-md text-white border border-white/10 p-2 hover:bg-white/1 hover:border-rose-300 hover:text-red-500 transition-all duration-500 ease-in-out cursor-pointer"
                                                                        aria-label="Close modal"
                                                                        style={{
                                                                              boxShadow: "0 10px 30px rgba(2,6,23,0.35), 0 2px 6px rgba(2,6,23,0.12)",
                                                                        }}
                                                                  >
                                                                        <X size={18} />
                                                                  </button>
                                                            </div>

                                                            {/* Body */}
                                                            <div className="py-5 sm:px-3 md:px4 lg:px-5 xl:px-5">
                                                                  <div variants={content} custom={3}>
                                                                        {body}
                                                                  </div>
                                                            </div>

                                                            {/* Footer */}
                                                            <div className="controls px-5 pb-5 pt-0 flex items-center justify-end gap-3"
                                                                  style={{
                                                                        direction: "ltr",
                                                                        paddingTop: "20px",
                                                                        marginTop: "20px"
                                                                  }}>
                                                                  <div variants={content} custom={4}>
                                                                        {footer}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                } />
                                    </motion.div>
                              </motion.div>
                        </>
                  )
                  }
            </AnimatePresence >
      );
}
