// File: components/ui/controls/input/color-picker/Bar.js
"use client";

import { useRef, useEffect } from "react";

export default function Bar({ value, setValue, gradient, color, label, width = 20, height = 300 }) {
      const ref = useRef(null);

      useEffect(() => {
            const el = ref.current;

            const update = (y) => {
                  const rect = el.getBoundingClientRect();
                  let p = 100 - ((y - rect.top) / rect.height) * 100;
                  p = Math.max(0, Math.min(100, p));
                  setValue(Math.round(p));
            };

            const down = (e) => {
                  update(e.clientY);
                  window.addEventListener("mousemove", move);
                  window.addEventListener("mouseup", up);
            };

            const move = (e) => update(e.clientY);
            const up = () => {
                  window.removeEventListener("mousemove", move);
                  window.removeEventListener("mouseup", up);
            };

            el.addEventListener("mousedown", down);
            return () => el.removeEventListener("mousedown", down);
      }, [setValue]);

      return (
            <div className="flex flex-col items-center">
                  <div
                        ref={ref}
                        className="relative ml-5"
                        style={{ width, height, background: gradient }}
                  >
                        <div
                              style={{
                                    position: "absolute",
                                    left: -10,
                                    top: `${100 - value}%`,
                                    width: width * 2,
                                    height: 25,
                                    background: color,
                                    transform: "translateY(-50%)"
                              }}
                        />
                  </div>

                  <div className="mt-4 text-center select-none" style={{ color }}>
                        <div className="text-[30px]">{value}%</div>
                        <div className="text-[14px]">{label}</div>
                  </div>
            </div>
      );
}
