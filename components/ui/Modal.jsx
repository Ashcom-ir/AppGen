"use client";

import { useEffect, useRef } from "react";
import ElectricBorder from "@/components/ui/ElectricBorder";
import "./Modal.scss";
import ModalBody from "./ModalBody";

export default function Modal({
      id = 'idModal',
      open,
      onClose,
      title,
      body,
      footer,
      closeOnBackdrop = true, // ✅ کنترل بستن با بک‌دراپ
      electricBorder = "border",
      electricBorder2 = "border-2",
      electricBorderColor = "border-pink-500",
      hasElectricBorder = false,
      electricColor = "--color-pink-500",
      electricBorderRadius = "rounded-xl",
      electricGlowColor = "shadow-pink-300",
      animOpenModal = 'justme'
}) {
      const modalRef = useRef(null);
      // ✅ ESC + Focus Trap
      useEffect(() => {
            if (!open) return;
            function onKey(e) {
                  if (e.key === "Escape") onClose?.();

                  if (e.key === "Tab") {
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


      function stop(e) {
            e.stopPropagation();
      }

      return (
            <div
                  id={id}
                  role="dialog"
                  ref={modalRef}
                  className={`custome-modal-overlay w-full h-full fixed flex justify-center items-center opacity-0 z-50 inset-0 backdrop-blur-sm bg-black/50 ${open ? "show" : ""}`}
                  onClick={closeOnBackdrop ? onClose : undefined}
            >
                  {/* ✅ فقط این کلاس رو عوض کن = نوع انیمیشن */}
                  <div onClick={stop} className={`custome-modal ${animOpenModal} ${open ? "show" : "close"} opacity-0 relative z-50 w-full max-w-lg mx-4`}
                  > {hasElectricBorder ?
                        <ElectricBorder
                              border={electricBorder}
                              border2={electricBorder2}
                              borderColor={electricBorderColor}
                              glowColor={electricGlowColor}
                              electricColor={electricColor}
                              borderRadius={electricBorderRadius}
                              body={
                                    <ModalBody open={open}
                                          onClose={onClose}
                                          title={title}
                                          body={body}
                                          footer={footer} 
                                          border="border-none"
                                          hasClose={true} />
                              }
                        /> : <ModalBody open={open}
                              onClose={onClose}
                              title={title}
                              body={body}
                              border={electricBorder}
                              borderColor={electricBorderColor}
                              hasClose={false} />}
                  </div>
            </div>
      );
}
