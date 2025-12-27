"use client";
import { useState, useEffect } from "react";
import LoginMobileNumber from "@/components/ui/controls/LoginMobileNumber";
import FingerprintPattern from "@/components/ui/svg/FingerprintPattern";
import InputEmail from "@/components/ui/controls/input/InputEmail";
import { sendEmail } from "@/lib/sendEmail";
import Lock from "@/components/ui/svg/Lock";
import LightningFlash from "@/components/ui/svg/LightningFlash";
import Email from "@/components/ui/svg/Email";
import Badge from "@/components/ui/Badge";
import AlertBox from "@/components/ui/controls/AlertBox";
import AnimatedBorder from "@/components/ui/AnimatedBorder";
import Button from "@/components/ui/controls/buttons/Button";
import PhoneCall from "@/components/ui/svg/PhoneCall";
import LoginCard from "@/components/ui/login/LoginCard";


export default function LoginClientPage() {
      const [open, setOpen] = useState(false);
      const [html, setHtml] = useState("");
      const [animateOut, setAnimateOut] = useState(false);
      const [animateIn, setAnimateIn] = useState(false);
      const [loginType, setLoginType] = useState("Email");

      const DEFAULT_SPAN_COLOR = {
            text: "text-white",
            border: "border-white/22",
            neon: "--color-white",
            neon_dash: "--color-white/50",
            bg: "bg-white/10",
            bg_gradient:
                  "bg-gradient-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-xl border",
            bg_border: "border-white/11",
            shadow: "shadow-white/22",
      };

      const [emailSpanColor, setEmailSpanColor] = useState(DEFAULT_SPAN_COLOR);
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      useEffect(() => {
            (async () => {
                  const el = document.getElementById("bdgSSL");
                  el.classList.add("transition-opacity", "duration-10000", "opacity-0");
                  await wait(10000);
                  el.classList.add("hidden");
                  const res = await fetch("/html/emails/activation-code.html");
                  let text = await res.text();

                  const vars = { name: "ASh", link: "#" };
                  for (const [key, value] of Object.entries(vars)) {
                        text = text.replaceAll(`{{${key}}}`, value);
                  }

                  setHtml(text);
            })();
      }, []);

      const handleShowConfirm = () => {
            if (animateIn) {
                  setAnimateOut(false);
                  setTimeout(() => {
                        setAnimateIn(false);
                        setAnimateOut(true);
                  }, 400);
                  setLoginType("Email");
            } else {
                  setAnimateOut(true);
                  setTimeout(() => {
                        setAnimateIn(true);
                        setAnimateOut(false);
                  }, 400);
                  setLoginType("Mobile");
            }
      };

      return (
            <main className="relative p-2 sm:p-4 flex items-center justify-center bg-black/6 backdrop-blur-2xl min-h-screen overflow-hidden">
                  <div className="absolute inset-0">
                        <div className="absolute animate-pulse delay-800 transition-all duration-2000 ease-in top-[-2%] left-[-2%] w-[120px] h-[120px] bg-blue-600 rounded-full mix-blend-screen blur-[110px] opacity-30" />
                        <div className="absolute animate-pulse delay-800 transition-all duration-2000 ease-out bottom-[-2%] right-[-2%] w-[120px] h-[120px] bg-pink-600 rounded-full mix-blend-screen blur-[90px] opacity-25" />
                  </div>
                  <div className="absolute inset-0 backdrop-blur-2xl z-0" />
                  <AnimatedBorder dot_size="20px"
                        radius="30px"
                        from_color={`var(${emailSpanColor.neon})`}
                        to_color={`var(${emailSpanColor.neon})`}
                        first_duration="6s"
                        duration="3s"
                        className="">
                        <div className={`w-[92vw] sm:w-[420px] md:w-[460px] lg:w-[504px] ${emailSpanColor.bg_gradient} ${emailSpanColor.bg_border}`}>
                              <div className="my-4 mx-auto space-y-4">
                                    <div className="flex mx-4 justify-between items-center gap-2">
                                          <div className="flex items-center">
                                                <span className={`${emailSpanColor.shadow} shadow-[0_0_11px] flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 border ${emailSpanColor.bg_border} ${emailSpanColor.bg} rounded-full p-2`}>
                                                      {loginType === "Email" ? (
                                                            <Email
                                                                  neon_color={emailSpanColor.neon}
                                                                  strike_color={emailSpanColor.neon_dash}
                                                                  strike_drop_color={emailSpanColor.neon_dash}
                                                            />
                                                      ) : (
                                                            <PhoneCall neon_color={emailSpanColor.neon} />
                                                      )}
                                                </span>

                                                <h1 className={`${emailSpanColor.text} font-semibold px-2 text-xl text-shadow-[0_0_11px]`}>
                                                      {loginType === "Email"
                                                            ? "ورود با ایمیل"
                                                            : "ورود با شماره همراه"}
                                                </h1>
                                          </div>
                                          <Badge
                                                id="bdgSSL"
                                                border="rounded-full border border-emerald-400/20"
                                                bg="bg-emerald-800/8 backdrop-blur-2xl"
                                                shadow="shadow-[0_0_7px] shadow-emerald-400/11"
                                                padding="px-3 py-2"
                                                icon={<Lock size={16} color="--color-emerald-400" />}
                                                titleClass="text-[11px] sm:text-[12px]"
                                                title={
                                                      <a className="decoration-0" href="https://appgen.ir">
                                                            <span className="text-emerald-500 text-shadow-[0_0_10px] font-segoe-ui">
                                                                  https://
                                                            </span>
                                                            <span className="text-emerald-200 text-shadow-[0_0_10px] font-segoe-ui">
                                                                  appgen.ir
                                                            </span>
                                                      </a>
                                                }
                                          />
                                    </div>
                                    <div className={`h-1 w-full border-b ${emailSpanColor.bg_border}`} />
                                    <div className="mb-40 lg:mb-20 relative">
                                          <div className={`w-full px-4 sm:px-5 absolute custome-anim ${animateOut
                                                      ? "slide-right show"
                                                      : animateIn
                                                            ? "slide-right"
                                                            : ""
                                                      }`}
                                          >
                                                <InputEmail
                                                      onColorChange={setEmailSpanColor}
                                                      value=""
                                                      normalBorderColor="border-white/10"
                                                      filledBorderColor="border-emerald-500/40"
                                                />
                                          </div>

                                          <div className={`px-4 sm:px-5 custome-anim ${animateIn ? "slide-left show" : "slide-left"
                                                      }`}
                                          >
                                                <LoginMobileNumber />
                                          </div>
                                    </div>
                              </div>

                              <footer className="py-4 sm:py-5 text-center text-gray-500 text-sm">
                                    <div className={`h-1 mb-5 w-full border-b ${emailSpanColor.bg_border}`} />
                                    <div className="relative">
                                          <div className={`right-1/3 absolute custome-anim ${animateOut
                                                      ? "slide-right show"
                                                      : animateIn
                                                            ? "slide-right"
                                                            : ""
                                                      }`}
                                          >
                                                <Button id="btnUseMobile"
                                                      show={true}
                                                      icon={
                                                            <PhoneCall
                                                                  neon_color="--color-blue-400"
                                                                  check_strike_color="--color-blue-300"
                                                                  check_strike_drop_color="--color-blue-200"
                                                            />
                                                      }
                                                      text="ورود با شماره همراه"
                                                      disabled={false}
                                                      bg="bg-blue-800/3 hover:bg-blue-800/11 focus:bg-blue-800/12 active:bg-blue-800/26"
                                                      shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                                      text_color="text-blue-100"
                                                      border="border rounded-sm border-blue-400/20 hover:border-blue-400/22 focus:border-blue-400/24 active:border-blue-400/26"
                                                      onClick={handleShowConfirm}
                                                />
                                          </div>

                                          <div
                                                className={`flex justify-center custome-anim ${animateIn ? "slide-left show" : "slide-left"
                                                      }`}
                                          >
                                                <Button
                                                      id="btnUseEmail"
                                                      show={true}
                                                      icon={
                                                            <Email
                                                                  neon_color="--color-blue-400"
                                                                  strike_color="--color-blue-300"
                                                                  strike_drop_color="--color-blue-200"
                                                            />
                                                      }
                                                      text="ورود با ایمیل"
                                                      disabled={false}
                                                      bg="bg-blue-800/3 hover:bg-blue-800/11 focus:bg-blue-800/12 active:bg-blue-800/26"
                                                      shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                                      text_color="text-blue-100"
                                                      border="border rounded-sm border-blue-400/20 hover:border-blue-400/22 focus:border-blue-400/24 active:border-blue-400/26"
                                                      onClick={handleShowConfirm}
                                                />
                                          </div>
                                    </div>
                              </footer>
                        </div>
                  </AnimatedBorder>
            </main>
      );
}
