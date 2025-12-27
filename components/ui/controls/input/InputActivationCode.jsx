import React, { useState, useEffect, useRef } from 'react';
import AlertBox from '@/components/ui/controls/AlertBox';
import InputSepratedNumber from '@/components/ui/controls/input/InputSepratedNumber';
import { MessageCircleReply, PhoneCall } from "lucide-react";
import Button from "@/components/ui/controls/buttons/Button";
import Check from "@/components/ui/svg/Check";
import DoubleCheck from "@/components/ui/svg/DoubleCheck";
import Typewriter from "@/components/ui/Typewriter";

export default function InputActivationCode({ skinColor = '#00ff99', cursorColor = '#00ff99', onInputsChange }) {
  const [state, setState] = useState("idle");
  const [isSendSms, setIsSendSms] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer_2min, setTimer2min] = useState('02:00');
  const [inputs, setInputs] = useState(Array(4).fill(""));
  const classVal = "caret-pink-300 py-1 text-center w-full rounded-lg shadow-xs border focus:border-pink-300 hover:bg-black/20 bg-transparent overflow-hidden";
  const [spanColor, setSpanColor] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    setTimerActive(true);
    setIsSendSms(true);
    setSpanColor(spanColorsMap["white"]);
  }, []);
  // آرایه رنگ‌ها با کلید string
  const spanColorsMap = {
    "white": ["text-white", "border-white", "--color-white", "bg-white/10"],
    "red-300": ["text-red-300", "border-red-300", "--color-red-300", "bg-red-300/10"],
    "orange-300": ["text-orange-300", "border-orange-300", "--color-orange-300", "bg-orange-300/10"],
    "emerald-400": ["text-emerald-300", "border-emerald-400", "--color-emerald-400", "bg-emerald-500/10"],
  };

  // map کردن filledCount به کلید
  const getColorKey = (count) => {
    if (count === 2) return "red-300";
    if (count === 3) return "orange-300";
    if (count === 4) return "emerald-400";
    return "white";
  };

  useEffect(() => {
    setInputs(prev => {
      const arr = [...prev];
      return arr;
    });
    //

    if (timerActive) {
      let seconds = 120;
      const interval = setInterval(() => {
        seconds--;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        setTimer2min(`${m}:${s}`);
        if (seconds <= 0) {
          clearInterval(interval);
          setTimerActive(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);
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
  function handlePaste(e) {
    e.preventDefault();
    let pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (!pasted) return;

    let digits = pasted.replace(/\D/g, ""); // فقط 4 رقم اول
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
          <label htmlFor="txtGetSmsCode_0" className={`flex gap-2 border-r ${spanColor[1]} pt-2 items-center px-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out`}>
            <span className={`flex w-full rounded-full items-center justify-center ${spanColor[3]} px-2 py-1 text-xs font-medium ${spanColor[0]} inset-ring inset-ring-pink-300/10 transition-all duration-500 ease-in-out`}>
              <PhoneCall neon_color={spanColor[2]} />
            </span>
            <span className={`text-xl ${spanColor[0]} transition-all duration-500 ease-in-out text-shadow-pink-300 text-shadow-[0_0_10px]`}>کد پیامک شده</span>
          </label>
        </div>
      </div>
      <div style={{ direction: "ltr" }} className={`relative mb-3 flex gap-2 items-center justify-center`}>
        {[...Array(4)].map((_, i) => (
          <InputSepratedNumber
            className={classVal}
            normalBorderColor='border-white/10'
            filledBorderColor='border-emerald-500/40'
            key={`txtGetSmsCode_${i}`}
            id={`txtGetSmsCode_${i}`}
            ref={i === 0 ? inputRef : null}
            readOnly={false}
            value={inputs[i]}
            onChange={(val) => { handleChange(i, val) }}
            onPaste={(e) => { handlePaste(e) }}
          />
        ))}

      </div>
      <div className='relative py-2 text-center '>
        <div className={`text-center flex justify-center ${timerActive ? '' : 'invisible hidden'}`}>
          <span>ارسال مجدد : </span>
          <span>{timer_2min}</span>
          <span>دیگر فعال می شود.</span>
        </div>
        <div className={`text-center flex justify-center ${isSendSms && timerActive ? 'invisible hidden' : ''}`}>
          <Button
            id="btnCheckActiveCode"
            show={!timerActive}
            icon={
              <Check
                neon_color="--color-rose-400"
                check_strike_color="--color-rose-300"
                check_strike_drop_color="--color-rose-200"
              />
            }
            text="ارسال مجدد"
            bg_color="--color-rose-600"
            text_color="--color-rose-100"
            border_color="--color-rose-300"
            active_color="--color-rose-800"
            border="border-r"
            onClick={() => {
              setIsSendSms(true);
              setTimerActive(true);
              setInputs(["", "", "", ""]);
              setSpanColor(spanColorsMap["white"]);
              setTimeout(() => {
                document.getElementById("txtGetSmsCode_0")?.focus();
              }, 50);
            }}
          />
        </div>
        <AlertBox
          show={isSendSms && timerActive}
          state="info"
          description="کد تایید به شماره همراه شما پیامک شد"
          sub_description=""
          leftButton=""
          showCloseBtn={false}
          autoHideSecond={30}
          borderRounded="rounded-sm"
          textColor='text-rose-200'
          gradientBg='bg-emerald-700/10 backdrop-blur-xl'
          border='border border-emerald-400/20'
          shadow='shadow shadow-emerald-600/20'
          iconInDescription={<DoubleCheck
            neon_color="--color-emerald-400"
            check_strike_color="--color-emerald-300"
            check_strike_drop_color="--color-emerald-200"
          />}
        />
      </div>
    </div>

  );
}
