"use client";

export default function ToolTip({
      show,
      body,
      bgColor = "bg-gray-900/1",
      borderColor = "border border-white/10",
      textColor = "text-white",
      dir = "rtl",
}) {
      return (
            <div style={{direction:dir}} className={`backdrop-blur-lg ${bgColor} ${borderColor} ${textColor}
                                    absolute -top-10 left-1/2 -translate-x-1/2 
                                    px-3 py-1 text-sm rounded-md font-semibold
                                    max-w-[200px] overflow-hidden
                                    transition-all duration-500 ease-in-out pointer-events-none
                                    whitespace-nowrap z-50
                                    ${show ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                                    `}
            >
                  {body}
            </div>
      );
}
