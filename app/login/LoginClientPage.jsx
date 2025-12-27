"use client";
import { useState, useEffect } from "react";
import { sendEmail } from "@/lib/sendEmail";
import AnimatedBorder from "@/components/ui/AnimatedBorder";
import Button from "@/components/ui/controls/buttons/Button";
import LoginWithEmail from "@/components/ui/login/LoginWithEmail";
import LoginWithMobile from "@/components/ui/login/LoginWithMobile";
import LoginMaster from "@/components/ui/login/LoginMaster";

export default function LoginClientPage() {
      const [animateOut, setAnimateOut] = useState(false);
      const [animateIn, setAnimateIn] = useState(false);

      const DEFAULT_SPAN_COLOR = {
            text: "text-white text-shadow-white/22 text-shadow-[0_0_10px]",
            border: "border-white/22",
            neon: "--color-white",
            neon_dash: "--color-white/50",
            bg: "bg-white/10",
            bg_gradient: "bg-gradient-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-xl border",
            bg_border: "border-white/11",
            shadow: "shadow-white/22",
            border_button: "rounded-sm border-white/20 hover:border-white/22 focus:border-white/24 active:border-white/26",
            bg_button: "bg-white/3 hover:bg-white/11 focus:bg-white/12 active:bg-white/26",
            bg_input: "bg-white/1 hover:bg-white/2 focus:bg-white/3 active:bg-white/4",
            caret: "caret-white"
      };
      const [emailSpanColor, setEmailSpanColor] = useState(DEFAULT_SPAN_COLOR);
      const [mobileSpanColor, setMobileSpanColor] = useState(DEFAULT_SPAN_COLOR);
      const handleShowConfirm = () => {
            if (animateIn) {
                  setAnimateOut(false);
                  setTimeout(() => {
                        setAnimateIn(false);
                        setAnimateOut(true);
                  }, 400);
            } else {
                  setAnimateOut(true);
                  setTimeout(() => {
                        setAnimateIn(true);
                        setAnimateOut(false);
                  }, 400);
            }
      };
      return (
            <LoginMaster>
                  <AnimatedBorder dot_size="20px" shadow={emailSpanColor.shadow} radius="30px" from_color={`var(${emailSpanColor.neon})`} to_color={`var(${emailSpanColor.neon})`} first_duration="6s" duration="3s"
                        className="">
                        <div className={`w-[92vw] m-auto pb-20 lg:pb-0 sm:w-[420px] md:w-[460px] lg:w-[504px] ${emailSpanColor.bg_gradient} ${emailSpanColor.bg_border}`}>
                              <div inert={animateIn} className={`${animateOut ? "slide-right show" : animateIn ? "slide-right" : ""} ${animateIn ? "pointer-events-none invisible" : ""} w-full absolute custome-anim`}>
                                    <LoginWithEmail setSpanColor={setEmailSpanColor} spanColor={emailSpanColor} handleShowMobile={handleShowConfirm}/>
                              </div>
                              <div inert={!animateIn} className={`w-full custome-anim ${animateIn ? "slide-left show" : "slide-left"} ${!animateIn ? "pointer-events-none invisible" : ""}`}>
                                    <LoginWithMobile setSpanColor={setMobileSpanColor} spanColor={mobileSpanColor} handleShowEmail={handleShowConfirm}/>
                              </div>
                        </div>
                  </AnimatedBorder>
            </LoginMaster>
      );
}
