
"use client";

import { useRef, useEffect, useState } from "react";
import InputText from "@/components/ui/controls/input/InputText"
import InputSepratedNumber from '@/components/ui/controls/input/InputSepratedNumber';
import GuidedTour from "@/components/guided-tour/GuidedTour";
import TypewriterArray from "@/components/ui/TypewriterArray";
import RoundedIconButton from "@/components/ui/controls/buttons/RoundedIconBotton";
import LayoutGrid from "@/components/ui/svg/LayoutGrid";
import Enter from "@/components/ui/svg/Enter";
import Button from "@/components/ui/controls/buttons/Button";
import LeftArrow from "@/components/ui/svg/LeftArrow";
import GraduationCap from "@/components/ui/svg/GraduationCap";
import Uplaod from "@/components/ui/controls/upload/Upload";
import BackButton from "@/components/ui/controls/buttons/BackButton";

import { Eye } from "lucide-react";

export default function AppInfo({ isDark, gradient, color }) {
      const ref = useRef(null);
      const [inputs, setInputs] = useState(Array(4).fill(""));
      const [spanColor, setSpanColor] = useState([]);
      const [CharactersRemainingValue, setCharactersRemainingValue] = useState("");
      const [currentStep, setCurrentStep] = useState(0);
      const [inputVal, setInputVal] = useState("");

      const handleKeyDown = (e) => {
            if (e.key === "Enter" && e.target.value.length > 2) {
                  const btnSendMail = document.getElementById("btnSendMail");
                  btnSendMail?.focus();
                  btnSendMail?.click();
            }
      };
      const spanColorsMap = {
            "white": ["text-white", "border-white", "--color-white", "bg-white/10"],
            "orange-300": ["text-orange-300", "border-orange-300", "--color-orange-300", "bg-orange-300/10"],
            "yellow-300": ["text-yellow-300", "border-yellow-300", "--color-yellow-300", "bg-yellow-300/10"],
            "emerald-400": ["text-emerald-300", "border-emerald-400", "--color-emerald-400", "bg-emerald-500/10"],
      };
      const getColorKey = (count) => {
            if (count === 2) return "orange-300";
            if (count === 3) return "yellow-300";
            if (count === 4) return "emerald-300";
            return "white";
      };

      useEffect(() => {
            setInputs(prev => {
                  const arr = [...prev];
                  //arr[0] = "0";
                  return arr;
            });
            setSpanColor(spanColorsMap["white"]);
      }, []);
      const handleChange = (index, val) => {
            const newInputs = [...inputs];
            newInputs[index] = val;
            setInputs(newInputs);
            const filledCount = newInputs.filter(v => v !== "").length;
            const colorKey = getColorKey(filledCount);
            const spanColor = spanColorsMap[colorKey];
            setSpanColor(spanColor);
            onInputsChange?.(newInputs);
      };
      const AutoFillVersion = () => {
            for (let i = 0; i < 4; i++) {
                  const inpVersion = document.getElementById(`inpVersion_${i}`);
                  if (i < 3) inpVersion.value = "0";
                  if (i === 3) inpVersion.value = "1";
            }
      }
      function handlePasteVersion(e) {
            e.preventDefault();
            let pasted = (e.clipboardData || window.clipboardData).getData("text");
            if (!pasted) return;
            if (pasted.startsWith("+98")) {
                  pasted = pasted.substring(3);
            }
            if (pasted.startsWith("0098")) {
                  pasted = pasted.substring(4);
            }
            if (!pasted.startsWith("0")) {
                  pasted = "0" + pasted;
            }
            let digits = pasted.replace(/\D/g, "");
            if (!digits.length) return;

            const newInputs = [...inputs];
            digits.split("").forEach((digit, i) => {
                  newInputs[i] = digit;
            });

            setInputs(newInputs);

            // رنگ border
            const filledCount = newInputs.filter((v) => v !== "").length;
            const colorKey = getColorKey(filledCount);
            setSpanColor(spanColorsMap[colorKey]);

            onInputsChange?.(newInputs);
      }
      const guidSteps = [
            {
                  target: `#div${isDark ? "Dark" : "Light"}Opacity`,
                  content: <TypewriterArray key={0} show={currentStep == 0} className="" items={[
                        "مقدار شفافیت را انتخاب کنید",
                        "با اسلایدر شفافیت را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید",
                        "بهتر است برای صفحات ، شفافیت 100 باشد"
                  ]} speed={currentStep == 0 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: `${isDark ? "top" : "bottom"}`,
            },
            {
                  target: `#div${isDark ? "Dark" : "Light"}Saturation`,
                  content: <TypewriterArray key={1} show={currentStep == 1} className="" items={[
                        "مقدار اشباع را انتخاب کنید",
                        "با اسلایدر اشباع را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید"
                  ]} speed={currentStep == 1 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: `${isDark ? "top" : "bottom"}`,
            },
            {
                  target: `#div${isDark ? "Dark" : "Light"}Lightness`,
                  content: <TypewriterArray key={2} show={currentStep == 2} className="" items={[
                        "مقدار روشنایی را انتخاب کنید",
                        "با اسلایدر روشنایی را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید"
                  ]} speed={currentStep == 2 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: `${isDark ? "top" : "bottom"}`,
            },
            {
                  target: `#div${isDark ? "Dark" : "Light"}HueRuler`,
                  content: <TypewriterArray key={3} show={currentStep == 3} className="" items={[
                        "درجه رنگ را انتخاب کنید",
                        "با اسلایدر رنگ را تنظیم کنید",
                        "آزاد هستید هر رنگی را انتخاب کنید"
                  ]} speed={currentStep == 3 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: `${isDark ? "top" : "bottom"}`,
            },
      ];
      return (
            <div id={`divAppInfo`} className="flex p-2 flex-col items-center">

                  <GuidedTour key='GuidedTour'
                        openGuidedTour={false}
                        steps={guidSteps}
                        onClose={() => setOpen(false)}
                        defaultPosition="bottom"
                  />
                  <div className="w-full flex gap-2 justify-between items-start">
                        <BackButton />
                        <div className="flex justify-between items-center">
                              <RoundedIconButton key='btnGuidedTour' id="btnGuidedTour"
                                    icon={<GraduationCap color={`${isDark ? (26 > 25 ? "--color-slate-200" : "--color-slate-500") : (76 > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} color2={`${isDark ? "--color-slate-400" : "--color-yellow-500"}`} />}
                                    text={"آموزش"}
                                    baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
                                    border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
                                    active={false}
                                    activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
                                    onClickExternal={() => {
                                          console.log("Clicked:", open);
                                          setOpen(true);
                                          //setActiveIndex(0);
                                    }}
                              />
                              <RoundedIconButton key={0} icon={
                                    <LayoutGrid color={`${isDark ? (26 > 25 ? "--color-slate-200" : "--color-slate-500") : (76 > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} />}
                                    text={"خانه"}
                                    baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
                                    border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
                                    active={false}
                                    activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
                                    onClickExternal={() => {
                                          console.log("Clicked:", "item.label");
                                          //setActiveIndex(0);
                                    }}
                              />
                        </div>
                  </div>

                  <div ref={ref} className="relative min-w-[340px] py-2 px-1 bg-white/22 dark:bg-black/22 backdrop-blur rounded-md border border-white/6 shadow-xl origin-top-left transition-all duration-150 ease-out"
                        style={{ background: gradient }}>
                        <div className="flex flex-col justify-center items-right">
                              <span>عنوان اپلیکیشن</span>
                              <InputText
                                    id={`txtTitle`}
                                    dir="rtl"
                                    maxLength={128}
                                    showCopyBtn={true}
                                    showPasteBtn={true}
                                    showClearBtn={true}
                                    placeholder={"عنوان اپلیکیشن را وارد کنید"}
                                    onValueChange={setCharactersRemainingValue}
                              />
                              <span>نسخه اپلیکیشن</span>
                              <div style={{ direction: "ltr" }} className={`relative mb-3 flex gap-2 ${""}`}>
                                    {[...Array(4)].map((_, i) => (
                                          <InputSepratedNumber
                                                className="caret-pink-300 py-1 text-center w-full rounded-lg shadow-xs border focus:border-pink-300 hover:bg-black/20 bg-transparent overflow-hidden"
                                                normalBorderColor='border-white/10'
                                                filledBorderColor='border-emerald-500/40'
                                                key={`inpVersion_${i}`}
                                                id={`inpVersion_${i}`}
                                                name={`inpVersion_${i}`}
                                                readOnly={false}
                                                value={inputs[i]}
                                                onChange={(val) => { handleChange(i, val) }}
                                                onPaste={(e) => { handlePasteVersion(e) }}
                                          />
                                    ))}
                                    <button
                                          className="px-2 py-2 rounded-lg bg-blue-600/2 text-white hover:bg-blue-700/5 transition cursor-pointer"
                                          onClick={() => AutoFillVersion()}
                                    >
                                          Auto
                                    </button>
                              </div>
                              <span>توضیحات اپلیکیشن</span>
                              <InputText
                                    dir="rtl"
                                    id={`txtDescription`}
                                    showCopyBtn={true}
                                    showPasteBtn={true}
                                    showClearBtn={true}
                                    maxLength={512}
                                    onValueChange={setCharactersRemainingValue}
                              />
                              <span>لوگو اپلیکیشن</span>
                              <Uplaod isDark={isDark} key={"UplaodLogoPicker"} allowedTypes={["image/png", "image/jpeg"]} onFileSelect={(file) => {
                                    if (file) {
                                          console.log(file.name); // نام فایل
                                          const url = URL.createObjectURL(file);
                                          setImgUrl(url);
                                          console.log(url); // می‌توانید تصویر را نمایش دهید
                                    } else {
                                          console.log("فایل حذف شد");
                                          setImgUrl(""); // ریست کردن تصویر
                                    }
                              }} />
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <div className="flex justify-center items-center">
                              <div className="flex-1 relative w-full">
                                    <Button id="btnSubmit"
                                          show={true}
                                          icon={<LeftArrow isAnim={inputVal.length > 2}
                                                neon_color={spanColor.neon}
                                                check_strike_color={spanColor.neon_dash}
                                                check_strike_drop_color="--color-emerald-200"
                                          />}
                                          text={"تایید و ادامه"}
                                          text_color={spanColor.text}
                                          border={spanColor.border_button}
                                          hasBorder="border"
                                          bg={spanColor.bg_button}
                                          shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                          //bg_gradient= "bg-gradient-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-xl border",
                                          cursor='cursor-pointer focus:ring-emerald-600 focus:ring-offset-0'
                                          disabled={inputVal.length < 3}
                                          bg_color={spanColor.bg}
                                          border_color={spanColor.bg_border}
                                          onClick={async () => {
                                                try {
                                                      console.log(CharactersRemainingValue);
                                                      return;
                                                      const res = await fetch("/html/emails/activation-code.html");
                                                      let html = await res.text();
                                                      let vars = { name: "ASh", link: "#" }
                                                      for (const [key, value] of Object.entries(vars)) {
                                                            html = html.replaceAll(`{{${key}}}`, value);
                                                      }
                                                      const send = await sendEmail({
                                                            to: "sector.persian@gmail.com",
                                                            subject: "سلام",
                                                            html: html,
                                                      });
                                                      console.log("Email sent:", send);
                                                } catch (err) {
                                                      console.error("Email error:", err.message);
                                                }
                                          }} />
                              </div>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                  </div>
            </div>
      );
}
