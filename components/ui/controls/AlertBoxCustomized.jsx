import React, { useState, useEffect } from 'react';
import './ShoppingCart.scss';
import TickAnimation from "@/components/ui/TickAnimation";
import Typewriter from "@/components/ui/Typewriter";
import { Loader2, Ban, GlobeLock, TriangleAlert, MessageCircleMore, MessageSquareText, X } from "lucide-react";

export default function AlertBoxCustomized({
      show = false,
      state = "idle",
      description = "",
      sub_description = "",
      leftButton = "",
      showCloseBtn = false,
      autoHideSecond = 0,
      hasBorder = false,
      borderRounded = "rounded-none"
}) {

      // همگام‌سازی ورودی show با state داخلی
      const [isShow, setShow] = useState(show);

      useEffect(() => {
            setShow(show);
      }, [show]);

      // Auto hide
      useEffect(() => {
            if (autoHideSecond > 0 && isShow) {
                  const t = setTimeout(() => setShow(false), autoHideSecond * 1000);
                  return () => clearTimeout(t);
            }
      }, [isShow, autoHideSecond]);

      const rowVariants = {
            loading: "bg-gradient-to-br from-violet-600 to-violet-500 border-violet-400 shadow-violet-600",
            available: "bg-gradient-to-br from-emerald-600 to-emerald-500 border-emerald-400 shadow-emerald-600",
            error: "bg-gradient-to-br from-rose-700 to-rose-600 border-rose-400 shadow-rose-600",
            idle: "bg-gradient-to-br from-indigo-500 to-indigo-600 border-indigo-400 shadow-indigo-600",
            success: "bg-gradient-to-br from-green-600 to-green-500 border-green-400 shadow-green-600",
            warning: "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-orange-600",
            message: "bg-gradient-to-br from-purple-600 to-purple-500 border-purple-400 shadow-purple-600",
            info: "bg-gradient-to-br from-blue-600 to-blue-500 border-blue-400 shadow-blue-600",
      };
      const onClose = () => setShow(false);
      if (!show) return "";
      return (
            <div className={`w-full p-2 mb-2 transition-all duration-500 ease-in-out overflow-hidden
                        ${rowVariants[state]}
                        ${borderRounded}
                        ${hasBorder ? "border shadow-sm" : ""}
                        ${isShow ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                  <div className="flex items-center justify-between p-4">

                        {/* Left: Icon + Text */}
                        <div className="flex items-center gap-3">

                              {/* ICON */}
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.08)" }}>
                                    {state === "loading" && <Loader2 className="animate-spin" />}
                                    {state === "available" && <TickAnimation show={true} className="text-[#ace488]" />}
                                    {state === "error" && <Ban className="text-red-200" />}
                                    {state === "idle" && <GlobeLock className="text-purple-200" />}
                                    {state === "success" && <TickAnimation show={true} className="text-green-100" />}
                                    {state === "warning" && <TriangleAlert className="text-orange-200" />}
                                    {state === "message" && <MessageCircleMore className="text-green-100" />}
                                    {state === "info" && <MessageSquareText className="text-blue-200" />}
                              </div>

                              {/* TEXTS */}
                              <div>
                                    <div className="text-sl font-semibold">
                                          <Typewriter key={state} text={description} speed={70} />
                                    </div>
                                    <div className={`text-sm mt-1 ${state === "loading" ? "text-gray-200" :
                                          state === "available" ? "text-green-200" :
                                                state === "error" ? "text-red-200" :
                                                      state === "idle" ? "text-purple-200" :
                                                            state === "success" ? "text-green-200" :
                                                                  state === "warning" ? "text-orange-200" :
                                                                        state === "message" ? "text-green-300" :
                                                                              state === "info" ? "text-blue-200" : ""
                                          }`}>
                                          {sub_description}
                                    </div>
                              </div>
                        </div>

                        {/* Right: Close button or custom button */}
                        <div>
                              {showCloseBtn ? (
                                    <button
                                          onClick={onClose}
                                          className="rounded-md p-2 hover:bg-black/20 transition cursor-pointer"
                                          aria-label="Close alert"
                                    >
                                          <X size={18} />
                                    </button>
                              ) : leftButton}
                        </div>
                  </div>
            </div>
      );
}
