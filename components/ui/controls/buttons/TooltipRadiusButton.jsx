
export default function TooltipRadiusButton({
      show = true,
      showTooltip = true,
      bodyTooltip,
      bgColor = "bg-slate-500/11",
      borderColor = "border border-white/10",
      textColor = "text-white",
      dir = "rtl",
      icon,
      id = "",
      tooltipPos="top",
      onClick = () => { },
}) {
      let tooltipSide = '';
      if(tooltipPos==="top")tooltipSide = 'flex-col';
      else if(tooltipPos==="bottom")tooltipSide = 'flex-col-reverse';
      else if(tooltipPos==="left")tooltipSide = 'flex-row-reverse';
      else if(tooltipPos==="right")tooltipSide = 'flex-row';

      return (
            show ? <div className={`relative flex ${tooltipSide} items-center justify-center gap-1`}>
                  <div style={{ direction: dir }} className={`backdrop-blur-lg ${bgColor} ${borderColor} ${textColor}
                                    px-3 py-1 text-sm rounded-md font-semibold max-w-[200px] wrap-break-word
                                    transition-all duration-500 ease-in-out pointer-events-none z-50
                                    ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                        {bodyTooltip}
                  </div>
                  <button id={id} onClick={onClick} className={`relative group flex items-center p-1 justify-center gap-2 rounded-full cursor-pointer bg-slate-500/11 hover:bg-slate-500/14 border-slate-500/22 border text-white/70 transition-all duration-700 ease-out`}>
                        <span className={`rounded-full border bg-slate-500/11 hover:bg-slate-500/8 border-slate-500/22 p-1 backdrop-blur-[14px]`}>
                              {icon}
                        </span>
                  </button>
            </div> : <div className="relative flex flex-col items-center justify-center gap-0"></div>
      );
}