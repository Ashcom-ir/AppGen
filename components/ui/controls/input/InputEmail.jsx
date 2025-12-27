"use client";
import InputSepratedNumber from '@/components/ui/controls/input/InputSepratedNumber';
import { useEffect, useState } from "react";
import Email from "@/components/ui/svg/Email";
import BorderAnimation from "@/components/ui/svg/BorderAnimation";
import LeftArrow from "@/components/ui/svg/LeftArrow";
import Select from "@/components/ui/controls/input/Select";
import Gmail from "@/components/ui/svg/Gmail";
import Yahoo from "@/components/ui/svg/Yahoo";
import Outlook from "@/components/ui/svg/Outlook";
import ICloudMail from "@/components/ui/svg/iCloudMail";
import MailCom from "@/components/ui/svg/MailCom";
import Enter from "@/components/ui/svg/Enter";
import Button from "@/components/ui/controls/buttons/Button";
import ClearInputValueButton from '@/components/ui/controls/buttons/ClearInputValueButton';

import SelectIosPicker from "@/components/ui/controls/input/SelectIosPicker";

import Typewriter from "@/components/ui/Typewriter";
import PasteToClipboardButton from "@/components/ui/controls/buttons/PasteToClipboardButton";
import Check from "@/components/ui/svg/Check";


export default function InputEmail({
      value,
      dir = "ltr",
      readonly = false,
      className = "caret-red-300 bg-neutral-secondary-medium shadow-xs",
      onChange = () => { },
      onPaste = () => { },
      onColorChange,
      onInputsChange
}) {
      const [inputVal, setInputVal] = useState("");
      const [selectIosVal, setSelectIosVal] = useState("");
      const [showSecondTypeWrite, setShowSecondTypeWrite] = useState(false);
      const spanColorsMap = {
            white: {
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
            },
            "red-300": {
                  text: "text-red-300 text-shadow-red-300/22 text-shadow-[0_0_10px]",
                  border: "border-red-300/22",
                  neon: "--color-red-300",
                  neon_dash: "--color-red-300/50",
                  bg: "bg-red-300/10",
                  bg_gradient: "bg-gradient-to-br from-red-300/4 via-red-300/2 to-red-300/6 backdrop-blur-xl rounded-xl border border-red-300/11",
                  bg_border: "border-red-300/11",
                  shadow: "shadow-red-300/22",
                  border_button: "rounded-sm border-red-300/20 hover:border-red-300/22 focus:border-red-300/24 active:border-red-300/26",
                  bg_button: "bg-red-300/3 hover:bg-red-300/11 focus:bg-red-300/12 active:bg-red-300/26",
                  bg_input: "bg-red-300/1 hover:bg-red-300/2 focus:bg-red-300/3 active:bg-red-300/4",
                  caret: "caret-red-300"
            },
            "red-200": {
                  text: "text-red-200 text-shadow-red-200/22 text-shadow-[0_0_10px]",
                  border: "border-red-200/22",
                  neon: "--color-red-200",
                  neon_dash: "--color-red-200/50",
                  bg: "bg-red-200/10",
                  bg_gradient: "bg-gradient-to-br from-red-200/4 via-red-200/2 to-red-200/6 backdrop-blur-xl rounded-xl border border-red-200/11",
                  bg_border: "border-red-200/11",
                  shadow: "shadow-red-200/22",
                  border_button: "rounded-sm border-red-200/20 hover:border-red-200/22 focus:border-red-200/24 active:border-red-200/26",
                  bg_button: "bg-red-200/3 hover:bg-red-200/11 focus:bg-red-200/12 active:bg-red-200/26",
                  bg_input: "bg-red-200/1 hover:bg-red-200/2 focus:bg-red-200/3 active:bg-red-200/4",
                  caret: "caret-red-200"
            },
            "orange-300": {
                  text: "text-orange-300 text-shadow-orange-300/22 text-shadow-[0_0_10px]",
                  border: "border-orange-300/22",
                  neon: "--color-orange-300",
                  neon_dash: "--color-orange-300/50",
                  bg: "bg-orange-300/10",
                  bg_gradient: "bg-gradient-to-br from-orange-300/4 via-orange-300/2 to-orange-300/6 backdrop-blur-xl rounded-xl border border-orange-300/11",
                  bg_border: "border-orange-300/11",
                  shadow: "shadow-orange-300/22",
                  border_button: "rounded-sm border-orange-300/20 hover:border-orange-300/22 focus:border-orange-300/24 active:border-orange-300/26",
                  bg_button: "bg-orange-300/3 hover:bg-orange-300/11 focus:bg-orange-300/12 active:bg-orange-300/26",
                  bg_input: "bg-orange-300/1 hover:bg-orange-300/2 focus:bg-orange-300/3 active:bg-orange-300/4",
                  caret: "caret-orange-300"
            },
            "yellow-300": {
                  text: "text-yellow-300 text-shadow-yellow-300/22 text-shadow-[0_0_10px]",
                  border: "border-yellow-300/22",
                  neon: "--color-yellow-300",
                  neon_dash: "--color-yellow-300/50",
                  bg: "bg-yellow-300/10",
                  bg_gradient: "bg-gradient-to-br from-yellow-300/4 via-yellow-300/2 to-yellow-300/6 backdrop-blur-xl rounded-xl border border-yellow-300/11",
                  bg_border: "border-yellow-300/11",
                  shadow: "shadow-yellow-300/22",
                  border_button: "rounded-sm border-yellow-300/20 hover:border-yellow-300/22 focus:border-yellow-300/24 active:border-yellow-300/26",
                  bg_button: "bg-yellow-300/3 hover:bg-yellow-300/11 focus:bg-yellow-300/12 active:bg-yellow-300/26",
                  bg_input: "bg-yellow-300/1 hover:bg-yellow-300/2 focus:bg-yellow-300/3 active:bg-yellow-300/4",
                  caret: "caret-yellow-300"
            },
            "teal-300": {
                  text: "text-teal-300 text-shadow-teal-300/22 text-shadow-[0_0_10px]",
                  border: "border-teal-300/22",
                  neon: "--color-teal-300",
                  neon_dash: "--color-teal-300/50",
                  bg: "bg-teal-300/10",
                  bg_gradient: "bg-gradient-to-br from-teal-300/4 via-teal-300/2 to-teal-300/6 backdrop-blur-xl rounded-xl border border-teal-300/11",
                  bg_border: "border-teal-300/11",
                  shadow: "shadow-teal-300/22",
                  border_button: "rounded-sm border-teal-300/20 hover:border-teal-300/22 focus:border-teal-300/24 active:border-teal-300/26",
                  bg_button: "bg-teal-300/3 hover:bg-teal-300/11 focus:bg-teal-300/12 active:bg-teal-300/26",
                  bg_input: "bg-teal-300/1 hover:bg-teal-300/2 focus:bg-teal-300/3 active:bg-teal-300/4",
                  caret: "caret-teal-300"
            },
            "emerald-200": {
                  text: "text-emerald-200 text-shadow-emerald-200/22 text-shadow-[0_0_10px]",
                  border: "border-emerald-200/22",
                  neon: "--color-emerald-200",
                  neon_dash: "--color-emerald-300/50",
                  bg: "bg-emerald-400/10",
                  bg_gradient: "bg-gradient-to-br from-emerald-200/4 via-emerald-200/2 to-emerald-200/6 backdrop-blur-xl rounded-xl border border-emerald-200/11",
                  bg_border: "border-emerald-200/11",
                  shadow: "shadow-emerald-200/22",
                  border_button: "rounded-sm border-emerald-200/20 hover:border-emerald-200/22 focus:border-emerald-200/24 active:border-emerald-200/26",
                  bg_button: "bg-emerald-200/3 hover:bg-emerald-200/11 focus:bg-emerald-200/12 active:bg-emerald-200/26",
                  bg_input: "bg-emerald-200/1 hover:bg-emerald-200/2 focus:bg-emerald-200/3 active:bg-emerald-200/4",
                  caret: "caret-emerald-200"
            },
            "emerald-400": {
                  text: "text-emerald-300 text-shadow-emerald-400/22 text-shadow-[0_0_10px]",
                  border: "border-emerald-400/22",
                  neon: "--color-emerald-400",
                  neon_dash: "--color-emerald-400/50",
                  bg: "bg-emerald-500/10",
                  bg_gradient: "bg-gradient-to-br from-emerald-400/4 via-emerald-400/2 to-emerald-400/6 backdrop-blur-xl rounded-xl border border-emerald-400/11",
                  bg_border: "border-emerald-400/11",
                  shadow: "shadow-emerald-400/22",
                  border_button: "rounded-sm border-emerald-400/20 hover:border-emerald-400/22 focus:border-emerald-400/24 active:border-emerald-400/26",
                  bg_button: "bg-emerald-400/3 hover:bg-emerald-400/11 focus:bg-emerald-400/12 active:bg-emerald-400/26",
                  bg_input: "bg-emerald-400/1 hover:bg-emerald-400/2 focus:bg-emerald-400/3 active:bg-emerald-400/4",
                  caret: "caret-emerald-400"
            },
      };
      const [spanColor, setSpanColor] = useState(spanColorsMap.white);

      let comColor = spanColor.text;
      const options = [
            { label: <><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>@</span><span className='font-segoe-ui text-blue-500 shadow-2xs text-shadow-[0_0_10px_rgb(118_172_255)]'>G</span><span className='font-segoe-ui text-red-500 text-shadow-[0_0_10px_rgb(251_78_86)]'>m</span><span className='text-orange-500 text-shadow-[0_0_10px_rgb(255_160_94)]'>a</span><span className='text-yellow-500 text-shadow-[0_0_10px_rgb(240_204_103)]'>i</span><span className='text-green-500 text-shadow-[0_0_10px_rgb(77_201_126)]'>l</span><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>.Com</span></>, value: "Gmail.Com", icon: <Gmail size={30} /> },
            { label: <><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>@</span><span className='font-segoe-ui text-purple-500 text-shadow-[0_0_10px_rgb(197_70_255)]'>Yahoo</span><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>.Com</span></>, value: "Yahoo.Com", icon: <Yahoo size={30} /> },
            { label: <><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>@</span><span className='font-segoe-ui text-sky-400 text-shadow-[0_0_10px_rgb(104_215_255)]'>Outlook</span><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>.Com</span></>, value: "Outlook.Com", icon: <Outlook size={30} /> },
            { label: <><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>@</span><span className='font-segoe-ui text-blue-500 text-shadow-[0_0_10px_rgb(95_158_255)]'>iCloud</span><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>.Com</span></>, value: "iCloud.Com", icon: <ICloudMail size={30} /> },
            { label: <><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>@</span><span className='font-segoe-ui text-indigo-600 text-shadow-[0_0_10px_rgb(123_106_246)]'>Mail</span><span className={`${comColor} font-segoe-ui text-shadow-[0_0_10px_rgb(255_255_255)]`}>.Com</span></>, value: "Mail.Com", icon: <MailCom size={30} /> },
      ];


      // map کردن filledCount به کلید
      const getColorKey = (count) => {
            if (count === 1) return "red-300";
            if (count === 2) return "red-200";
            if (count === 3) return "orange-300";
            if (count === 4) return "yellow-300";
            if (count === 5) return "teal-300";
            if (count === 6) return "emerald-200";
            if (count > 6) return "emerald-400";
            return "white";
      };
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      const hideElementSmoothly = async (el) => {
            el.classList.add("transition-opacity", "duration-500", "opacity-0");
            //await wait(500);
            //el.classList.add("hidden");
      };

      useEffect(() => {
            setSelectIosVal("");
            const txtEmail = document.getElementById("txtEmail");
            const picker = document.getElementById("divSlectPickerParent");
            const divTypeWrite = document.getElementById("divTypeWrite");
            const btnPasteEmail = document.getElementById("btnPasteEmail");

            const addClasses = (el, classes) => el?.classList.add(...classes);
            const removeClasses = (el, classes) => el?.classList.remove(...classes);

            const runAnimation = async () => {
                  txtEmail?.setAttribute("readonly", "readonly");
                  btnPasteEmail?.setAttribute("disabled", "disabled");
                  removeClasses(btnPasteEmail, ["cursor-pointer"]);
                  addClasses(btnPasteEmail, ["cursor-not-allowed"]);
                  addClasses(txtEmail, ["bg-emerald-400/20", "animate-pulse", "animate-infinite", "animate-ease-in-out", "animate-normal"]);
                  removeClasses(txtEmail, ["bg-white/1"]);
                  await wait(3000);
                  addClasses(txtEmail, ["bg-white/1"]);
                  removeClasses(txtEmail, ["bg-emerald-400/20", "animate-pulse", "animate-infinite", "animate-ease-in-out", "animate-normal"]);
                  setShowSecondTypeWrite(true);
                  addClasses(picker, ["border", "border-emerald-600", "rounded-lg", "bg-emerald-600/10", "animate-pulse", "animate-infinite", "animate-ease-in-out", "animate-normal"]);
                  await wait(3000);
                  removeClasses(picker, ["border", "border-emerald-600", "bg-emerald-600/10", "animate-pulse", "animate-infinite", "animate-ease-in-out", "animate-normal"]);
                  addClasses(picker, ["border-emerald-600/1"]);
                  txtEmail?.removeAttribute("readonly");
                  txtEmail?.focus();
                  btnPasteEmail?.removeAttribute("disabled");
                  removeClasses(btnPasteEmail, ["cursor-not-allowed"]);
                  addClasses(btnPasteEmail, ["cursor-pointer"]);

                  hideElementSmoothly(divTypeWrite);
            };
            runAnimation();
      }, []);
      const handlePasteFromButton = (text) => {
            setInputVal(text);
            const colorKey = getColorKey(text.length);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(text);
      };
      const handleClearFromButton = () => {
            setInputVal('');
            const colorKey = getColorKey(0);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(text);
      };
      const handleChange = (e) => {
            const val = e.target.value.replaceAll(" ", '');
            setInputVal(val);
            const colorKey = getColorKey(val.length);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(val);
            if (val.length > 2) {
                  document.getElementById("txtEmail")
            }
            if (val.includes("@")) {
                  const vals = val.split("@");
                  setInputVal(vals[0] ?? "");
                  //emailProvider = vals[1] ?? "";

                  // اگر خواستی بعداً provider رو ست کنی
                  // setSelectIosVal(emailProvider);
            }
      };
      const handleKeyDown = (e) => {
            if (e.key === "Enter" && e.target.value.length > 2) {
                  const btnSendMail = document.getElementById("btnSendMail");
                  btnSendMail?.focus();
                  btnSendMail?.click();
            }
      };
      const classVal = "w-full rounded-lg shadow-xs border focus:outline-none focus:ring-0 overflow-hidden";
      function handlePaste(e) {
            e.preventDefault();

            const pasted = (e.clipboardData || window.clipboardData).getData("text");
            if (!pasted) return;

            let emailName = "";
            let emailProvider = "";
            pasted.replaceAll(" ", '');
            if (pasted.includes("@")) {
                  const parts = pasted.split("@");
                  emailName = parts[0] ?? "";
                  emailProvider = parts[1] ?? "";

                  // اگر خواستی بعداً provider رو ست کنی
                  // setSelectIosVal(emailProvider);
                  document.getElementById("btnSendMail")?.focus();
            } else {
                  emailName = pasted;
            }

            setInputVal(emailName);

            const colorKey = getColorKey(emailName.length);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(emailName);
      }

      return (
            <>
                  <div style={{ direction: dir }} className={`relative flex flex-col sm:flex-row sm:items-center gap-2 w-full transition-all duration-500 ease-in-out`}>
                        <div className="flex-1 relative w-full">
                              <input type='text' maxLength={100}
                                    id='txtEmail'
                                    name='txtEmail'
                                    placeholder="فقط نام کاربری ایمیل"
                                    autoComplete="off"
                                    readOnly={readonly}
                                    className={`${classVal} ${spanColor.caret} ${spanColor.bg_input} ${spanColor.text} ${spanColor.border} sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md p-2 pr-18 text-left transition-all duration-500 ease-in-out`}
                                    value={inputVal}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    onPaste={handlePaste} />
                              <span className='absolute right-2 top-2 opacity-50'>
                                    <div className='flex justify-center items-center'>
                                          <Enter size={20} color={`var(${spanColor.neon})`} text_color={spanColor.text} />
                                          <PasteToClipboardButton onPasteText={handlePasteFromButton} id="btnPasteEmail" text_color={`${spanColor.text} hover:text-white`} />
                                          <ClearInputValueButton show={true} onClearText={handleClearFromButton} elementById="txtEmail" />
                                    </div>
                              </span>
                        </div>
                        <div className="absolute bottom-[-10]" >
                              <Button id="btnSendMail"
                                    show={true}
                                    icon={<LeftArrow isAnim={inputVal.length > 2}
                                          neon_color={spanColor.neon}
                                          check_strike_color={spanColor.neon_dash}
                                          check_strike_drop_color="--color-emerald-200"
                                    />}
                                    text={"تایید ایمیل"}
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
                        <div className='flex-1 w-full sm:w-auto mb-11 md:mb-0 lg:mb-0'>
                              <SelectIosPicker
                                    options={options}
                                    onChange={(val) => { setSelectIosVal(val.value) }}
                                    isSelectedFirstItem={true}
                                    bgColor=' bg-neutral-secondary-medium'
                                    iconBorderColor={`var(${spanColor.neon})`}
                                    selectedbgColor='bg-emerald-500/10'
                                    textColor='text-pink-100'
                                    selectedColor='text-emerald-100/70'
                                    border='border border-emerald-600 rounded-lg'
                                    borderChild='border border-pink-600 rounded-lg'
                                    className=''
                                    hoverbgColor='hover:bg-emerald-400/2 active:bg-emerald-500/4 focus:bg-emerald-400/12' />

                        </div>
                  </div>
                  <div id="divTypeWrite" className='w-full mt-5 lg:mt-5 transition-all duration-500 ease-in-out '>
                        <span className={`${spanColor.text} text-md font-semibold text-shadow-pink-200 text-shadow-[0_0_10px]`}>
                              <Typewriter show={!showSecondTypeWrite} className={spanColor.text} text={"بخش اول از ایمیل خود را وارد کنید"} speed={showSecondTypeWrite ? 0 : 70} hideAfterType={true} />
                              <Typewriter show={showSecondTypeWrite} className={spanColor.text} text={"بخش دوم از ایمیل خود را انتخاب کنید"} speed={showSecondTypeWrite ? 70 : 0} hideAfterType={true} />
                        </span>
                  </div>
            </>
      );
}
