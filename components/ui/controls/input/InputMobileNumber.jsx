"use client";
import InputSepratedNumber from '@/components/ui/controls/input/InputSepratedNumber';
import { useEffect, useState } from "react";
import PhoneCall from "@/components/ui/svg/PhoneCall";
import BorderAnimation from "@/components/ui/svg/BorderAnimation";
import IranFlag from "@/components/ui/svg/IranFlag";

export default function InputMobileNumber({
      id = "txtid",
      name = 'txtname',
      dir = "ltr",
      className = "",
      onInputsChange
}) {
      const [inputs, setInputs] = useState(Array(11).fill(""));
      const [spanColor, setSpanColor] = useState([]);

      // آرایه رنگ‌ها با کلید string
      const spanColorsMap = {
            "white": ["text-white", "border-white", "--color-white", "bg-white/10"],
            "red-300": ["text-red-300", "border-red-300", "--color-red-300", "bg-red-300/10"],
            "red-200": ["text-red-200", "border-red-200", "--color-red-200", "bg-pink-300/10"],
            "orange-300": ["text-orange-300", "border-orange-300", "--color-orange-300", "bg-orange-300/10"],
            "orange-200": ["text-orange-200", "border-orange-200", "--color-orange-200", "bg-orange-300/10"],
            "yellow-300": ["text-yellow-300", "border-yellow-300", "--color-yellow-300", "bg-yellow-300/10"],
            "yellow-200": ["text-yellow-200", "border-yellow-200", "--color-yellow-200", "bg-yellow-300/10"],
            "teal-300": ["text-teal-300", "border-teal-300", "--color-teal-300", "bg-teal-300/10"],
            "teal-200": ["text-teal-200", "border-teal-200", "--color-teal-200", "bg-teal-300/10"],
            "emerald-200": ["text-emerald-200", "border-emerald-200", "--color-emerald-200", "bg-emerald-400/10"],
            "emerald-400": ["text-emerald-300", "border-emerald-400", "--color-emerald-400", "bg-emerald-500/10"],
      };

      // map کردن filledCount به کلید
      const getColorKey = (count) => {
            if (count === 2) return "red-300";
            if (count === 3) return "red-200";
            if (count === 4) return "orange-300";
            if (count === 5) return "orange-200";
            if (count === 6) return "yellow-300";
            if (count === 7) return "yellow-200";
            if (count === 8) return "teal-300";
            if (count === 9) return "teal-200";
            if (count === 10) return "emerald-200";
            if (count === 11) return "emerald-400";
            return "white";
      };

      useEffect(() => {
            setInputs(prev => {
                  const arr = [...prev];
                  arr[0] = "0";
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

      const classVal = "caret-pink-300 py-1 text-center w-full rounded-lg shadow-xs border focus:border-pink-300 hover:bg-black/20 bg-transparent overflow-hidden";
      function handlePaste(e) {
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
      return (
            <div className='relative'>
                  <div className='flex w-full mb-3 items-center justify-between '>
                        <div className='flex badge badge-soft badge-primary badge-sm whitespace-nowrap'>
                              <label htmlFor="txtMobile_1" className={`flex gap-2 border-r ${spanColor[1]} pt-2 items-center px-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out`}>
                                    <span className={`flex w-10 h-10 rounded-full items-center justify-center ${spanColor[3]} px-2 py-1 text-xs font-medium ${spanColor[0]} inset-ring inset-ring-pink-300/10 transition-all duration-500 ease-in-out`}>
                                          <PhoneCall neon_color={spanColor[2]} />
                                    </span>
                                    <span className={`text-xl ${spanColor[0]} transition-all duration-500 ease-in-out text-shadow-pink-300 text-shadow-[0_0_10px]`}>شماره تلفن همراه</span>
                              </label>
                        </div>

                        <BorderAnimation strokeBorderRadios='6' strokeBorderColor="--color-emerald-300" content={
                              <div className="flex items-end justify-start ">
                                    <span className="flex rounded-lg bg-pink-400/2 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-emerald-600/50">
                                          <span style={{ direction: "ltr" }} className='ps-2 pt-1 text-xl text-emerald-100/70'>+98</span>
                                          <IranFlag />
                                    </span>
                              </div>
                        } />

                  </div>
                  <div style={{ direction: dir }} className={`relative mb-3 flex gap-2 ${className}`}>
                        {[...Array(11)].map((_, i) => (
                              <InputSepratedNumber
                                    className={classVal}
                                    normalBorderColor='border-white/10'
                                    filledBorderColor='border-emerald-500/40'
                                    key={`inpMobile_${i}`}
                                    id={`${id}_${i}`}
                                    name={`${name}_${i}`}
                                    readOnly={i === 0}
                                    value={inputs[i]}
                                    onChange={(val) => { if (i > 0) handleChange(i, val) }}
                                    onPaste={(e) => { handlePaste(e) }}
                              />
                        ))}
                  </div>
            </div>
      );
}
