"use client";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Settings, X, Plus, CircleFadingPlus } from "lucide-react";

export default function DragDropElement({ sourceId, targetId, extraElement }) {
      const dragHTMLRef = useRef(null);

      /* ================= Drag ================= */
      useEffect(() => {
            const sources = Array.from(
                  document.querySelectorAll(`[id^="${sourceId}"]`)
            );

            sources.forEach((source) => {
                  const children = Array.from(source.children);
                  if (!children) return;

                  children.forEach((el) => {
                        el.setAttribute("draggable", "true");

                        const onDragStart = (e) => {
                              dragHTMLRef.current = el.innerHTML;
                              e.dataTransfer.setData("text/plain", "drag");
                              e.dataTransfer.effectAllowed = "copy";
                        };

                        el.addEventListener("dragstart", onDragStart);
                        el._cleanupDragStart = () =>
                              el.removeEventListener("dragstart", onDragStart);
                  });
            });

            return () => {
                  sources.forEach((source) => {
                        const children = Array.from(source.children);
                        if (!children) return;

                        children.forEach((el) => {
                              el.removeAttribute("draggable");
                              if (el._cleanupDragStart) el._cleanupDragStart();
                        });
                  });
            };
      }, [sourceId]);

      /* ================= Drop ================= */

      useEffect(() => {
            const onDragOver = (e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "copy";
            };

            const onDrop = (e, target) => {
                  e.preventDefault();
                  if (!dragHTMLRef.current) return;

                  const cell = target;

                  cell.innerHTML = "";

                  const wrapper = document.createElement("div");
                  wrapper.className = "relative w-fit";
                  wrapper.innerHTML = dragHTMLRef.current;
                  //extraElement
                  if (extraElement) {
                        const reactMount = document.createElement("div");
                        reactMount.className = "absolute flex justify-center items-center cursor-pointer backdrop-blur-[14px] rounded-full border border-red-600/12 bottom-6 -left-4 w-[35px] h-[35px] p-1 font-[12] bg-red-600/6 text-white";
                        wrapper.appendChild(reactMount);
                        createRoot(reactMount).render(extraElement);
                  }
                  //Setting
                  const settingsBtn = document.createElement("button");
                  settingsBtn.className = "absolute flex justify-center items-center -top-2 -left-4 w-[25px] h-[25px] bg-slate-900/50 p-1 rounded-full backdrop-blur-2xl cursor-pointer opacity-80 hover:opacity-100 transition-all delay-75 duration-700";
                  wrapper.appendChild(settingsBtn);
                  createRoot(settingsBtn).render(<Settings size={16} color="#ffffff" />);

                  //Remove
                  const removeBtn = document.createElement("button");
                  removeBtn.className = "absolute flex justify-center items-center -bottom-2 -left-4 w-[25px] h-[25px] border border-red-600/12 bg-red-600/6 p-1 rounded-full backdrop-blur-2xl cursor-pointer opacity-80 hover:opacity-100 transition-all delay-75 duration-700";
                  createRoot(removeBtn).render(<X size={16} color="#ffffff" />);
                  removeBtn.onclick = () => {
                        cell.innerHTML = "";
                        const addElementToColumnBtn = document.createElement("button");
                        addElementToColumnBtn.className = "p-2";
                        createRoot(addElementToColumnBtn).render(<CircleFadingPlus color="#ffffff"/>);
                        cell.appendChild(addElementToColumnBtn);
                  };

                  wrapper.appendChild(removeBtn);
                  cell.appendChild(wrapper);
            };

            const bindTargets = () => {
                  const targets = Array.from(
                        document.querySelectorAll(`[id^="${targetId}"]`)
                  );

                  targets.forEach((target) => {
                        if (target._binded) return;
                        target._binded = true;

                        target.addEventListener("dragover", onDragOver);
                        target.addEventListener("drop", (e) => onDrop(e, target));
                  });
            };

            bindTargets();

            const interval = setInterval(bindTargets, 300);

            return () => clearInterval(interval);
      }, [targetId, extraElement]);

      return null;
}
