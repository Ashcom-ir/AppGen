import { useState } from "react";
import { X } from "lucide-react";
import TickAnimation from "@/components/ui/TickAnimation";
export default function TooltipButton({
      show = true,
      tickAfterClick = true,
      bodyTooltip,
      bodyTooltipAfterClick,
      dir = "rtl",
      icon,
      tooltipPos = "top",
      bgBeforClickClass='text-gray-500 hover:text-red-400 bg-gray-900 border-white/10',
      bgAfterClickClass='text-green-500 hover:text-red-400 bg-green-900 border-green-600/10',
      onClick = () => { },
}) {
      let tooltipSide = '';
      if (tooltipPos === "top") tooltipSide = 'flex-col';
      else if (tooltipPos === "bottom") tooltipSide = 'flex-col-reverse';
      else if (tooltipPos === "left") tooltipSide = 'flex-row';
      else if (tooltipPos === "right") tooltipSide = 'flex-row-reverse';
      const [showTooltip, setShowTooltip] = useState(false);
      const [showTickAnimation, setShowTickAnimation] = useState(false);
      const click = () => {
            try {
                  if (showTickAnimation) return;
                  onClick();
                  setShowTickAnimation(true)
                  setShowTooltip(true);
                  setTimeout(() => {
                        setShowTickAnimation(false)
                  }, 2000);
            } catch (err) { }
      };
      return (
            show ? <div className={`relative flex ${tooltipSide} items-center justify-center gap-1`}>
                  <button style={{ direction: dir }} className={`flex p-1 rounded-full border cursor-pointer transition-all duration-500 delay-75 ease-in-out backdrop-blur-3xl opacity-80 hover:opacity-100 ${showTickAnimation ? bgAfterClickClass : bgBeforClickClass}`}
                        onClick={click}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                  >
                        {tickAfterClick ? (!showTickAnimation ? icon : <TickAnimation show={showTickAnimation} color="text-green-500" />)
                        : icon}
                  </button>
                  <div style={{ direction: dir }} className={`backdrop-blur-lg text-white border ${showTickAnimation ? bgAfterClickClass : bgBeforClickClass}
                                    px-3 py-1 text-sm rounded-md font-semibold max-w-[200] wrap-break-word
                                    transition-all duration-500 ease-in-out pointer-events-none z-50
                                    ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                        {showTickAnimation ? bodyTooltipAfterClick : bodyTooltip}
                  </div>

            </div> : <div className="relative flex flex-col items-center justify-center gap-0"></div>
      );
}
