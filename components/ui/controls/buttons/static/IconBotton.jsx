import { useState, useEffect } from "react";

export default function IconButton({
  id = "btnIconButton",
  icon,
  text = "",
  disabled = false,
  color_tag='emerald',
  border = "border dark:border-slate-500/22 border-yellow-500/22",
  bg = "dark:hover:bg-slate-400/6 hover:bg-yellow-400/6 dark:bg-slate-500/6 bg-white/3 hover:bg-white/11 focus:bg-white/12 active:bg-white/26",
  color = "hover:text-white text-white/70 text-shadow-amber-200",
  shadow = "focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]",
  cursor = "cursor-pointer",
  onClickExternal = () => {},
}) {

  const handleClickInternal = () => {
    onClickExternal();
  };

  let setClassStatus = ``;
  if (disabled) {
    setClassStatus = `flex transition-all duration-200 ease-in-out sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md px-3 py-2 font-semibold items-center text-gray-100/40 focus:shadow-none hover:shadow-none 
                        rounded-sm border border-gray-600/10 hover:border-gray-600/22 focus:border-gray-600/24 active:border-gray-600/26
                        bg-gray-600/5 cursor-not-allowed`;
  } else {
    setClassStatus=`${cursor} ${bg} ${border} ${color} ${shadow} group flex text-shadow-[0_0_10px] items-center p-1 justify-center gap-2 rounded-[30px] overflow-hidden transition-all duration-700 ease-out hover:w-auto`
  }

  return (
    <button id={id} onClick={handleClickInternal}
      disabled={disabled} className={`relative max-h-[45] px-3 ${setClassStatus}`}>
      <span className={`p-1 rounded-full border ${bg} ${border} ${color} backdrop-blur-[14px]`}>
        {icon}
      </span>
      <span className={`block whitespace-nowrap transition-opacity duration-300`}>
                {text}
        </span>
    </button>
  );
}
