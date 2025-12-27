"use client";

import { useState, useEffect } from "react";
import { BadgeQuestionMark } from "lucide-react";
import SvgCheckSuccess from "@/components/ui/svg/SvgCheckSuccess";
import Typewriter from "@/components/ui/Typewriter";

import BorderAnimation from "@/components/ui/svg/BorderAnimation";
import Button from "@/components/ui/controls/buttons/Button";

import "./EasyDialog.scss";

export default function EasyDialog({
      id = "EasyDialog_",
      title = "Easy Dialog",
      description = "EasyDialog.",
      dialogBgColor = "bg-black/60",
      confirmSuccessMessage = "تایید شد",
      onOpen = () => { },
      onConfirm = () => { },
      onCancel = () => { },
      parentButtonLabel = "تایید شماره همراه",
      rightButtonLabel = "تایید میکنم",
      leftButtonLabel = "ویرایش میکنم",
      parentButtonIcon,
      rightButtonIcon,
      leftButtonIcon,
      buttonColor = "bg-emerald-500/5",
      confirmButtonColor = "bg-emerald-500/5",
      cancelButtonColor = "bg-emerald-500/5",
}) {
      const [open, setOpen] = useState(false);
      const [isConfirmed, setConfirmed] = useState(false);
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
            if (open) {
                  setMounted(true);
            } else {
                  const timer = setTimeout(() => setMounted(false), 250);
                  return () => clearTimeout(timer);
            }
      }, [open]);

      const handleConfirm = () => {
            onConfirm();
            setOpen(false);
            setConfirmed(true);
      };

      const handleCancel = () => {
            onCancel();
            setOpen(false);
            setConfirmed(false);
      };

      const spanColor = ["text-rose-100", "border-pink-600"];
      return (
            <div id={id} className="relative w-full inline-block">
                  {!open &&
                        (!isConfirmed ? (
                              <BorderAnimation
                                    strokeBorderColor="--color-emerald-300"
                                    content={
                                          <Button show={true} id="btnSendActivationCode"
                                                icon={parentButtonIcon}
                                                text={parentButtonLabel}
                                                disabled={false}
                                                bg_color='--color-emerald-600'
                                                text_color='--color-emerald-100'
                                                border_color='--color-emerald-300'
                                                border='border'
                                                onClick={() => { setOpen(true); onOpen(); }} />
                                    }
                              />
                        ) : (
                              <span className="flex gap-4">
                                    <SvgCheckSuccess stroke_color="green-100" stroke_check_and_border_color="green-500" fill_color="green-200" />
                                    <Typewriter text={confirmSuccessMessage} speed={70} />
                              </span>
                        ))}

                  {mounted && (
                        <div className={`absolute w-full z-50 bottom-[-32] rounded-lg border border-pink-400/20 
                                          ${dialogBgColor} px-6 py-5 z-auto backdrop-blur-3xl shadow-2xl 
                                          transition-all duration-300 ease-in-out easy-dialog-modal ${open ? "open" : "close"
                              }`}
                              style={{ boxShadow: "0 10px 25px rgba(15,23,42,0.12), 0 4px 10px rgba(15,23,42,0.06)", }}>
                              <div className={`easy-dialog-content ${open ? "content-in" : "content-out"
                                    }`}>
                                    {/* HEADER */}
                                    <div className="flex badge badge-soft badge-primary badge-sm whitespace-nowrap">
                                          <div className={`inline-flex border-r ${spanColor[1]} pt-2 items-center px-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out`} >
                                                <span className={`inline-flex w-10 h-10 rounded-full items-center bg-pink-400/10 px-2 py-1 text-xs font-medium ${spanColor[0]} inset-ring inset-ring-pink-300/10 transition-all duration-500 ease-in-out`} >
                                                      <BadgeQuestionMark style={{ display: "inline-block" }} />
                                                </span>
                                                <span className={`text-xl ${spanColor[0]} transition-all duration-500 ease-in-out`} >
                                                      {title}
                                                </span>
                                          </div>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="text-14 mt-4 mb-5 text-white/60 leading-[1.4]">
                                          {description}
                                    </p>

                                    {/* ACTION BUTTONS */}
                                    <div className="flex mt-4 w-full justify-between gap-12">
                                          <Button show={true}
                                                icon={rightButtonIcon}
                                                text={rightButtonLabel}
                                                disabled={false}
                                                bg_color='--color-emerald-600'
                                                text_color='--color-emerald-100'
                                                border_color='--color-emerald-300'
                                                border='border'
                                                onClick={() => { handleConfirm(); console.log("Clickesdsdsda") }} />
                                          <Button
                                                icon={leftButtonIcon}
                                                show={true}
                                                text={leftButtonLabel}
                                                disabled={false}
                                                bg_color='--color-blue-600'
                                                text_color='--color-blue-100'
                                                border_color='--color-blue-300'
                                                border='border'
                                                onClick={() => { handleCancel(); console.log("EditClicked") }}
                                          />
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
