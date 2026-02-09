"use client";
import { useRef, useEffect, useState } from "react";

import PasteToClipboardButton from '@/components/ui/controls/buttons/PasteToClipboardButton';
import CopyToClipboardButton from '@/components/ui/controls/buttons/CopyToClipboardButton';
import ClearInputValueButton from '@/components/ui/controls/buttons/ClearInputValueButton';

export default function InputTxet({
      id = "txtid",
      name = 'txtname',
      dir = "ltr",
      //onChange = () => { },
      onKeyDown,
      onKeyUp,
      onInput,
      maxLength = 0,
      className = "rounded-sm border w-full focus:outline-none focus:ring-0 sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md p-2 transition-all duration-500 ease-in-out",
      placeholder = "",
      showCopyBtn = false,
      showPasteBtn = false,
      showClearBtn = false,
      onValueChange,
      isEN=false
}) {
      const [value, setValue] = useState("");
      const remaining = maxLength - value.length;
      const prev = useRef(remaining);
      const [animateCount, setAnimateCount] = useState(false);

      // Send value to parent
      useEffect(() => {
            if (onValueChange) onValueChange(value);
      }, [value, onValueChange]);

      // Trigger scale animation when negative
      useEffect(() => {
            if (remaining < 0) {
                  setAnimateCount(true);
                  const t = setTimeout(() => setAnimateCount(false), 180);
                  return () => clearTimeout(t);
            }
            prev.current = remaining;
      }, [remaining]);

      const getColor = () => {
            if (remaining > maxLength/2 || remaining == maxLength) return "text-green-600";
            if (remaining > maxLength/3) return "text-yellow-500";
            if (remaining > maxLength/4) return "text-orange-500";
            if (remaining > maxLength/5) return "text-red-500 text-shadow-[0_0_6px_#ff0000]";
            if (remaining === 0) return "text-red-600 text-shadow-[0_0_6px_#ff0000]";
            return "text-red-600 text-shadow-[0_0_6px_#ff0000]"; // negative
      };
            const getBorderColor = () => {
            if (remaining > maxLength/2 || remaining == maxLength) return "border-green-600/15";
            if (remaining > maxLength/3) return "border-yellow-500/15";
            if (remaining > maxLength/4) return "border-orange-500/15";
            if (remaining > maxLength/5) return "border-red-500/15";
            if (remaining === 0) return "border-red-600/15";
            return "border-red-600/15"; // negative
      };
      const handlePasteFromButton = (text) => {
            setValue(text);
            const colorKey = getColor(text.length);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(text);
      };
      const handleClearFromButton = () => {
            setValue('');
            const colorKey = getColor(0);
            setSpanColor(spanColorsMap[colorKey]);
            onColorChange?.(spanColorsMap[colorKey]);
            onInputsChange?.(text);
      };
      const directionClassInput = dir === "rtl" ? "text-right pl-22" : "text-left pr-22";
      return (
            <div className="relative" style={{direction:dir}}>
                  {maxLength < 129 ? <input
                        style={{direction:dir}}
                        type='text'
                        id={id}
                        name={name}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onInput={onInput}
                        className={`${className} ${directionClassInput} ${getBorderColor()}`}
                        autoComplete="off"
                  /> : <textarea
                        style={{direction:dir}}
                        id={id}
                        name={name}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onInput={onInput}
                        className={`${className} ${directionClassInput} ${getBorderColor()}`}
                        autoComplete="off"
                        value={value}
                  />}
                  <div style={{ direction: dir === "ltr" ? "rtl" : "ltr" }} className={`absolute ${dir === "ltr" ? "right-2" : "left-2"} z-3 top-1/2 -translate-y-1/2 flex items-center gap-2`}>
                        <PasteToClipboardButton onPasteText={handlePasteFromButton} show={showPasteBtn} elementById={id} />
                        <CopyToClipboardButton show={showCopyBtn} elementById={id} />
                        <ClearInputValueButton onClearText={handleClearFromButton} show={showClearBtn} elementById={id} />

                  </div>
                  <div style={{ direction: dir }}
                        className={`absolute z-2 left-2 top-0 -translate-y-1/2 select-none pointer-events-none font-semibold ${getColor()}`}
                        animate={animateCount ? { scale: 1.45 + animateCount } : { scale: 1.4 }}
                        transition={{ duration: 0.15 }}>
                        <div className="flex gap-1 bg-[#121212] backdrop-blur-xl">
                              <span className="text-emerald-400 drop-shadow-[0_0_6px_#8BC34A]">{maxLength}</span><span className="text-emerald-300">/</span>
                              <span>{remaining}</span>
                        </div>
                  </div>
            </div>
      );
}
