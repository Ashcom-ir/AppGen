"use client";
import { useState } from "react";
import Tooltip from "@/components/ui/Tooltip";

export default function Enter({
      size = 24,
      color = "var(--color-rose-500)",
      text_color = "text-white"
}) {
      const [showTooltip, setShowTooltip] = useState(false);
      return (
            <>
                  <button className=" transition-all duration-500 ease-in-out cursor-pointer" onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}>
                        <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" id="enter-key" fill={color}>
                              <path d="M70.5 5h-31A4.505 4.505 0 0 0 35 9.5V35H9.5A4.505 4.505 0 0 0 5 39.5v31C5 72.981 7.019 75 9.5 75h59.333c3.4 0 6.167-2.766 6.167-6.167V9.5C75 7.019 72.981 5 70.5 5zm.5 63.833A2.169 2.169 0 0 1 68.833 71H9.5a.5.5 0 0 1-.5-.5v-31a.5.5 0 0 1 .5-.5H37a2 2 0 0 0 2-2V9.5a.5.5 0 0 1 .5-.5h31a.5.5 0 0 1 .5.5v59.333z"
                                    strokeDasharray="4 2"
                                    strokeDashoffset="0">
                                    <animate
                                          attributeName="stroke-dashoffset"
                                          values="0;12"
                                          dur="1.5s"
                                          repeatCount="indefinite" />
                              </path>
                              <path d="M55 24a2 2 0 0 0-2 2v27.5H27.1l3.409-3.408a2 2 0 1 0-2.828-2.828l-6.821 6.82a2.015 2.015 0 0 0-.25.307c-.034.049-.056.102-.084.153-.035.063-.073.124-.1.191-.028.066-.043.134-.063.202-.017.057-.04.112-.051.171a2.005 2.005 0 0 0 0 .784c.012.059.034.114.05.17.02.069.036.137.063.203.028.067.066.128.101.191.028.051.05.104.083.153.074.11.157.213.25.306l6.822 6.821c.39.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L27.1 57.5H55a2 2 0 0 0 2-2V26a2 2 0 0 0-2-2" id="enter-arrow">
                                    <animateTransform
                                          attributeName="transform"
                                          type="translate"
                                          values="0 0;5 0;-4 0;3 0;0 0"
                                          keyTimes="0;0.2;0.5;0.8;1"
                                          dur="0.8s"
                                          repeatCount="indefinite"
                                          calcMode="spline"
                                          keySplines="0.5 0 0.3 1;0.5 0 0.3 1;0.5 0 0.3 1;0.5 0 0.3 1" />
                                    <animateTransform
                                          attributeName="transform"
                                          type="scale"
                                          values="1 1;1.12 1;0.92 1;1.05 1;1 1"
                                          keyTimes="0;0.2;0.5;0.8;1"
                                          dur="0.8s"
                                          repeatCount="indefinite"
                                          additive="sum"
                                          calcMode="spline"
                                          keySplines="0.5 0 0.3 1;0.5 0 0.3 1;0.5 0 0.3 1;0.5 0 0.3 1" />
                              </path>
                        </svg>
                  </button>
                  <Tooltip
                        show={showTooltip}
                        body={"Enter فعال"}
                        bgColor="bg-gray-900"
                        borderColor="border border-white/10 shadow-[0_0_10px] shadow-emerald-500/20"
                        textColor={text_color}
                  />
            </>
      );
}