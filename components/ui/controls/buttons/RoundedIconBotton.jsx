import { useState, useEffect } from "react";

export default function RoundedIconButton({
  id = "btn",
  icon,
  text = "",
  disabled = false,
  active = false,
  baseClasses = "",
  border_bg_class = "",
  activeBg = "",
  text_color = "text-white",
  hasBorder = "border",
  bg = "bg-white/3 hover:bg-white/11 focus:bg-white/12 active:bg-white/26",
  shadow = "focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]",
  cursor = "cursor-pointer",
  onClickExternal = () => {},
}) {
  const [isActive, setIsActive] = useState(active);

  const handleClickInternal = () => {
    // افکت داخلی فقط روی خود دکمه اعمال میشه
    setIsActive(!isActive);

    // اجرای تابع خارجی
    onClickExternal();
  };

  let setClassStatus = ``;
  if (disabled) {
    setClassStatus = `flex transition-all duration-200 ease-in-out sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md px-3 py-2 font-semibold items-center text-gray-100/40 focus:shadow-none hover:shadow-none 
                        rounded-sm border border-gray-600/10 hover:border-gray-600/22 focus:border-gray-600/24 active:border-gray-600/26
                        bg-gray-600/5 cursor-not-allowed`;
  } else {
    setClassStatus=`group h-[45px] flex items-center p-1 justify-center gap-2 rounded-[30px] cursor-pointer text-white/70 overflow-hidden transition-[width,background-color,color,transform] duration-700 ease-out ${
              !isActive ? "w-[45px]" : ""
            } ${baseClasses} ${isActive ? activeBg + " scale-105" : "scale-100"}`
  }

  return (
    <button
      onClick={handleClickInternal}
      id={id}
      disabled={disabled}
      className={`relative ${setClassStatus}`}
    >
      <span className={`flex items-center justify-center rounded-full border ${border_bg_class}`}>
        {icon}
        
      </span><span
              className={`text-shadow-[0_0_10px] whitespace-nowrap transition-opacity duration-300 ${
                isActive ? "block opacity-100" : "hidden group-hover:block opacity-0 group-hover:opacity-100"
              }`}
            >  {text}
        </span>
    </button>
  );
}
