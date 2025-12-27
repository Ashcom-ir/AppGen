"use client";
import { useState, useEffect } from "react";
import Check from "@/components/ui/svg/Check";
import Copy from "@/components/ui/svg/Copy";
import Brush from "@/components/ui/svg/Brush";
import MultiColor from "@/components/ui/svg/MultiColor";
import Image from "@/components/ui/svg/Image";

export default function ButtomNav({ id="buttomNav" , className }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index, fn) => {
    setActiveIndex(index);
    if (fn) fn();
  };
  const navItems = [
    {
      icon: <Brush size={18} color="--color-orange-400" />,
      label: "تک رنگ",
      baseClasses: "hover:w-[110px] hover:bg-orange-600/7 hover:text-white",
      border_bg_class: "w-[35px] h-[35px] bg-orange-500/11 backdrop-blur-[14px] border-orange-500/22",
      activeBg: "bg-orange-600/7 w-[110px] text-white",
    },
    {
      icon: (
        <MultiColor
          size={25}
          color1="--color-pink-500"
          color2="--color-yellow-500"
          color3="--color-emerald-500"
          color4="--color-blue-500"
        />
      ),
      label: "رنگ ترکیبی",
      baseClasses: "hover:w-[130px] hover:bg-pink-600/7 hover:text-white",
      border_bg_class: "w-[35px] h-[35px] bg-pink-500/11 backdrop-blur-[14px] border-pink-500/22",
      activeBg: "bg-pink-600/7 w-[130px] text-white",
    },
    {
      icon: <Image size={19} color="--color-blue-400" />,
      label: "تصویر",
      baseClasses: "hover:w-[100px] hover:bg-blue-400/7 hover:text-white",
      border_bg_class: "w-[35px] h-[35px] bg-blue-500/11 backdrop-blur-[14px] border-blue-500/22",
      activeBg: "bg-blue-400/7 w-[100px] text-white",
    },
    {
      icon: (
        <Copy
          size={23}
          color="--color-violet-400"
          check_strike_color="--color-emerald-300"
          check_strike_drop_color="--color-emerald-200"
        />
      ),
      label: "کپی",
      baseClasses: "hover:w-[100px] hover:bg-violet-400/8 hover:text-white",
      border_bg_class: "w-[35px] h-[35px] bg-violet-500/11 backdrop-blur-[14px] border-violet-500/22",
      activeBg: "bg-violet-400/8 w-[100px] text-white",
    },
    {
      icon: (
        <Check
          neon_color="--color-emerald-400"
          check_strike_color="--color-emerald-300"
          check_strike_drop_color="--color-emerald-200"
        />
      ),
      label: "تایید",
      baseClasses: "hover:w-[100px] hover:bg-emerald-500/6 hover:text-white",
      border_bg_class: "w-[35px] h-[35px] bg-emerald-500/11 backdrop-blur-[14px] border-emerald-500/22",
      activeBg: "bg-emerald-500/6 w-[100px] text-white",
    },
  ];

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <div id={id} className={`${className} fixed bg-[#0e161631] backdrop-blur-[14px] -translate-x-1/2 flex gap-2 px-4 py-2 rounded-lg border border-pink-500/11 transition-all duration-300 font-['Poppins',sans-serif]`}>
      <div className="absolute inset-0 pointer-events-none rounded-md backdrop-blur-12 bg-neutral-900/10">
        <div
          style={{
            background:
              "linear-gradient(-30deg, oklch(from var(--color-pink-500) l c h), transparent, var(--color-pink-600))",
          }}
          className="transform-[scale(.99)] opacity-[.3] blur-[32px] rounded-lg border-pink-500 absolute inset-0"
        ></div>
      </div>
      {navItems.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`group h-[45px] flex items-center p-1 justify-center gap-2 rounded-[30px] cursor-pointer text-white/70 overflow-hidden transition-[width,background-color,color,transform] duration-700 ease-out ${
              !isActive ? "w-[45px]" : ""
            } ${item.baseClasses} ${isActive ? item.activeBg + " scale-105" : "scale-100"}`}
          >
            <span className={`flex items-center justify-center rounded-full border ${item.border_bg_class}`}>
              {item.icon}
            </span>
            <span
              className={`text-shadow-[0_0_10px] whitespace-nowrap transition-opacity duration-300 ${
                isActive ? "block opacity-100" : "hidden group-hover:block opacity-0 group-hover:opacity-100"
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
      <div className="absolute top-14 right-1/5 inset-0 pointer-events-none">
        <div className="w-3/4 h-1 rounded-full bg-pink-200/11"></div>
      </div>
    </div>
  );
}
