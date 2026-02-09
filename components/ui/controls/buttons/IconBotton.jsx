import { useState, useEffect } from "react";

export default function IconButton({
  id = "btnIconButton",
  icon,
  text = "",
  disabled = false,
  color_tag = 'emerald',
  cursor = "cursor-pointer",
  onClickExternal = () => { },
}) {

  const handleClickInternal = () => {
    onClickExternal();
  };

  let setClassStatus = ``;
  let border = `border border-${color_tag}-500/22 dark:border-${color_tag}-500/11 hover:border-${color_tag}-500/33 dark:hover:border-${color_tag}-500/14`
  let bg = `bg-${color_tag}-500/3 dark:bg-${color_tag}-500/3 hover:bg-${color_tag}-400/16 dark:hover:bg-${color_tag}-400/6`
  let color = `text-white/70 hover:text-white text-shadow-${color_tag}-200`
  let shadow = `focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]`

  if (disabled) {
    setClassStatus = `flex transition-all duration-200 ease-in-out sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md px-3 py-2 font-semibold items-center text-gray-100/40 focus:shadow-none hover:shadow-none 
                        rounded-sm border border-gray-600/10 hover:border-gray-600/22 focus:border-gray-600/24 active:border-gray-600/26
                        bg-gray-600/5 cursor-not-allowed`;
  } else {
    setClassStatus = `${cursor} ${bg} ${border} ${color} ${shadow} group flex text-shadow-[0_0_10px] items-center p-1 justify-center gap-2 rounded-[30px] overflow-hidden transition-all duration-700 ease-out hover:w-auto`
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
