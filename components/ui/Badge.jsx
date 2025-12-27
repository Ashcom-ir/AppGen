"use client";
import "./Badge.scss";

export default function Badge({
  id="Badge",
  title,
  icon = null,
  titleClass = "text-emerald-100 text-[14px]",
  border = "rounded-full border border-emerald-400/20",
  shadow = "shadow-[0_0_10px] shadow-emerald-400/20",
  bg = "bg-white/2 backdrop-blur-2xl",
  padding = "px-3 py-1",
  dir = 'ltr'
}) {
  return (
    <div id={id} style={{direction:dir}} className={`inline-flex items-center justify-start font-medium leading-none gap-2 whitespace-nowrap ${border} ${bg} ${padding} ${shadow}`}>
      {icon && <span className="inline-flex">{icon}</span>}
      <span className={`${titleClass}`}>{title}</span>
    </div>
  );
}

