"use client";
import { useEffect } from "react";

export default function InputSepratedNumber({
  id = "id",
  ref,
  readonly = false,
  name = "txt",
  direction = "ltr",
  value,
  onChange = () => {},
  onPaste = () => {},
  normalBorderColor = "border-white/10",
  filledBorderColor = "border-green-500/2",
  className = "caret-red-300 bg-neutral-secondary-medium shadow-xs",
}) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
      }
      input[type="number"] {
        -moz-appearance: textfield !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleInput = (e) => {
    const val = e.target.value.slice(0, 1);
    onChange(val);

    const [prefix, index] = id.split("_");
    const nextIndex = parseInt(index) + 1;
    const nextInput = document.getElementById(`${prefix}_${nextIndex}`);
    if (!nextInput || nextInput.hasAttribute("readonly")) return;
    setTimeout(() => nextInput.focus(), 0);
  };

  const handleFocus = (e) => {
    onChange(""); // پاک کردن مقدار وقتی فوکوس می‌شود
  };

  return (
    <div className="flex relative text-2xl transition ease-linear bg-transparent w-10 h-11 justify-center items-center overflow-visible">
      <input
        id={id}
        type="number"
        min={0}
        max={9}
        maxLength={1}
        name={name}
        ref={ref}
        style={{ direction }}
        className={`${className} transition-all duration-500 ease-in-out ${
          value && value !== "" ? filledBorderColor : normalBorderColor
        }`}
        placeholder="_"
        autoComplete="new-password"
        readOnly={readonly}
        value={value}
        onPaste={onPaste}
        onInput={handleInput}
        onFocus={handleFocus}
      />
    </div>
  );
}
