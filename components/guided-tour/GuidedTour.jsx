"use client";
import { useEffect, useState } from "react";
import "./GuidedTour.scss";
import BorderAnimationPro from "../ui/controls/BorderAnimationPro";
import Button from "@/components/ui/controls/buttons/Button";
import LeftArrow from "@/components/ui/svg/LeftArrow";
import { X } from "lucide-react";

const TOOLTIP_WIDTH = 360;
const TOOLTIP_HEIGHT = 180;
const MARGIN = 12;

export default function GuidedTour({
      steps = [],
      open,
      onClose,
      defaultPosition = "bottom",
}) {
      const [current, setCurrent] = useState(0);
      const [rect, setRect] = useState(null);
      const [animating, setAnimating] = useState(false);
      const [prevRect, setPrevRect] = useState(null);
      useEffect(() => {
            if (!rect || !steps[current]) return;

            const el = document.querySelector(steps[current].target);
            if (!el) return;

            const unblur = document.getElementById("guided-unblur");
            if (!unblur) return; // <-- این خط اضافه شد

            // تنظیم ابعاد unblur
            unblur.style.top = rect.top + "px";
            unblur.style.left = rect.left + "px";
            unblur.style.width = rect.width + "px";
            unblur.style.height = rect.height + "px";

            // پاکسازی قبلی
            unblur.innerHTML = "";

            // کلون کردن فقط target
            const clone = el.cloneNode(true);
            clone.id = "";
            clone.style.margin = "0";
            clone.style.position = "relative";

            unblur.appendChild(clone);
      }, [rect, current, steps]);

      useEffect(() => {
            if (open) setCurrent(0);
      }, [open]);

      const changeStep = (newIndex) => {
            if (newIndex === current) return;

            setAnimating(true);
            setTimeout(() => {
                  setCurrent(newIndex);
                  setAnimating(false);
            }, 250);
      };

      useEffect(() => {
            if (!open || !steps[current]) return;

            const el = document.querySelector(steps[current].target);
            if (!el) return;

            const r = el.getBoundingClientRect();
            setRect({
                  top: r.top,
                  left: r.left,
                  width: r.width,
                  height: r.height,
            });
      }, [current, open, steps]);

      if (!open || !rect) return null;

      const isFirst = current === 0;
      const isLast = current === steps.length - 1;

      let top = 0;
      let left = 0;
      const position = steps[current].position || defaultPosition;

      switch (position) {
            case "top":
                  top = rect.top - TOOLTIP_HEIGHT - MARGIN;
                  left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
                  break;
            case "bottom":
                  top = rect.top + rect.height + MARGIN;
                  left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
                  break;
            case "left":
                  top = rect.top + rect.height / 2 - TOOLTIP_HEIGHT / 2;
                  left = rect.left - TOOLTIP_WIDTH - MARGIN;
                  break;
            case "right":
                  top = rect.top + rect.height / 2 - TOOLTIP_HEIGHT / 2;
                  left = rect.left + rect.width + MARGIN;
                  break;
            default:
                  top = rect.top + rect.height + MARGIN;
                  left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
      }

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      top = Math.max(MARGIN, Math.min(top, viewportH - TOOLTIP_HEIGHT - MARGIN));
      left = Math.max(MARGIN, Math.min(left, viewportW - TOOLTIP_WIDTH - MARGIN));

      return (
            <div className="fixed inset-0 z-9999">
                  <div id="guided-overlay" className="absolute inset-0 z-1 bg-white/10 dark:bg-black/10 backdrop-blur-xl" />
                  <div id="guided-unblur" className={`absolute overflow-hidden rounded-lg z-2 pointer-events-none guided-highlight ${animating ? "exit" : "enter"}`} style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, }} />
                  <div className={`absolute shadow-white/22 bg-white/6 dark:bg-black/6 dark:shadow-black/22 shadow-[0_20px_40px] backdrop-blur-3xl w-[360px] rounded-md z-3 pointer-events-auto guided-tooltip ${animating ? "exit" : "enter"}`} style={{ top, left }}>
                        <div className="flex p-5 justify-between items-center gap-2">
                              <div className="text-[14px] text-white/70 dark:text-white/60 text-shadow-[0_0_10px] text-shadow-white/70 dark:text-shadow-white/60">{steps[current].content}</div>
                              <Button id="btnCloseGuid"
                                    show={true}
                                    icon={
                                          <X size={18} />}
                                    text={""}
                                    text_color="text-white hover:text-red-200 hover:text-red-300"
                                    border="border-white/10 hover:border-red-200/12 focus:border-red-300/14 active:border-red-300/16"
                                    hasBorder="rounded-full border"
                                    padding="p-2"
                                    bg="bg-white/3 hover:bg-white/6 focus:bg-white/7 active:bg-white/8"
                                    shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                    cursor='cursor-pointer focus:ring-red-300/14 focus:ring-offset-0'
                                    disabled={false}
                                    aria-label="Close"
                                    onClick={onClose} />
                        </div>
                        <div className="flex flex-col gap-2 px-3 py-4 bg-white/4 dark:bg-black/4 rounded-b-md text-white backdrop-blur-sm">
                              <div className="flex justify-between items-center gap-2">
                                    <Button id="btnNextStep"
                                          show={true}
                                          icon={
                                                <LeftArrow isAnim={!isFirst}
                                                      neon_color={isFirst ? "--color-gray-600" : "--color-emerald-400"}
                                                      check_strike_color={isFirst ? "--color-gray-600" : "--color-emerald-400"}
                                                      check_strike_drop_color={isFirst ? "--color-gray-600" : "--color-emerald-400"}
                                                />}
                                          text={""}
                                          text_color={isFirst ? "text-gray-400" : "text-emerald-200"}
                                          border="border-white/2 hover:border-emerald-200/4 focus:border-emerald-300/6 active:border-emerald-300/8"
                                          hasBorder="rotate-180 rounded-full border"
                                          padding="px-2"
                                          bg="bg-white/2 hover:bg-white/4 focus:bg-white/6 active:bg-white/8"
                                          shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                          cursor='cursor-pointer focus:ring-emerald-300/8 focus:ring-offset-0'
                                          disabled={isFirst}
                                          onClick={() => {
                                                try {
                                                      changeStep(current - 1)
                                                } catch (err) {
                                                      console.error("error:", err.message);
                                                }
                                          }} />
                                    <div>
                                          <ul className="guided-steps">
                                                {steps.map((_, i) => (
                                                      <li key={i} onClick={() => changeStep(i)} className={`guided-step ${i === current ? "active" : i < current ? "done" : ""}`} />
                                                ))}
                                          </ul>
                                    </div>
                                    <Button id="btnNextStep"
                                          show={true}
                                          icon={<LeftArrow isAnim={!isLast}
                                                neon_color={isLast ? "--color-gray-600" : "--color-emerald-400"}
                                                check_strike_color={isLast ? "--color-gray-600" : "--color-emerald-400"}
                                                check_strike_drop_color={isLast ? "--color-gray-600" : "--color-emerald-400"}
                                          />}
                                          text={""}
                                          text_color={isLast ? "text-gray-400" : "text-emerald-200"}
                                          border="border-white/2 hover:border-emerald-200/4 focus:border-emerald-300/6 active:border-emerald-300/8"
                                          hasBorder="rounded-full border"
                                          padding="px-2"
                                          bg="bg-white/2 hover:bg-white/4 focus:bg-white/6 active:bg-white/8"
                                          shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                          cursor='cursor-pointer focus:ring-emerald-300/8 focus:ring-offset-0'
                                          disabled={isLast}
                                          onClick={() => {
                                                try {
                                                      changeStep(current + 1)
                                                } catch (err) {
                                                      console.error("error:", err.message);
                                                }
                                          }} />
                              </div>
                        </div>
                  </div>
            </div>
      );
}
