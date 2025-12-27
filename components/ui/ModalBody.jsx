"use client";

import { X } from "lucide-react";
import "./Modal.scss";

export default function ModalBody({
      open,
      onClose,
      title,
      body,
      footer,
      border = "border",
      borderColor = "border-pink-500",
      hasClose = false,
}) {

      return (
            <div className={`${border} ${borderColor} bg-neutral-900/10 shadow-[0 10px 30px rgba(2,6,23,0.35), 0 2px 6px rgba(2,6,23,0.12)] backdrop-blur-12 rounded-2xl shadow-2xl overflow-hidden`}>
                  {/* Header */}
                  <div className="flex items-start border-b border-white/6 justify-between gap-4 p-5">
                        <h3 id="modal-title" className="text-lg font-semibold w-full">
                              {title}
                        </h3>
                        <button
                              onClick={onClose}
                              className={`${hasClose ? "" : "invisible hidden"} bg-neutral-900/10 rounded-md text-white border border-white/10 p-2 hover:bg-white/1 hover:border-rose-300 hover:text-red-500 transition-all duration-500 ease-in-out cursor-pointer`}
                              aria-label="Close modal"
                        >
                              <X size={18} />
                        </button>
                  </div>

                  {/* Body */}
                  <div className="py-5 sm:px-3 md:px-4 lg:px-5 xl:px-5">
                        {body}
                  </div>

                  {/* Footer */}
                  <div className={`controls p-5 flex items-center justify-end gap-3`}
                  >
                        {footer}
                  </div>
            </div>

      );
}
