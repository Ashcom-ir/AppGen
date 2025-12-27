export default function Button({
      show = true,
      id = "btn",
      icon,
      text = '',
      disabled = false,
      text_color = "text-white",
      border = "rounded-sm border-white/20 hover:border-white/22 focus:border-white/24 active:border-white/26",
      hasBorder = "border",
      padding = "px-3 py-2",
      bg = "bg-white/3 hover:bg-white/11 focus:bg-white/12 active:bg-white/26",
      shadow = "focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]",
      //bg_gradient= "bg-gradient-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-xl border",
      cursor = 'cursor-pointer',
      onClick = () => { },
}) {
      let setClassStatus = `${padding} flex transition-all duration-200 hover:duration-800 ease-in-out sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md font-semibold items-center `;
      if (disabled) {
            setClassStatus += `text-gray-100/40 focus:shadow-none hover:shadow-none 
                                    ${hasBorder} border-gray-600/10 hover:border-gray-600/22 focus:border-gray-600/24 active:border-gray-600/26
                                    bg-gray-600/5 cursor-not-allowed`;
      } else { setClassStatus += ` ${hasBorder} ${border} ${text_color} ${bg} ${shadow} ${cursor} ` }

      return (
            <button onClick={onClick}
                  id={id}
                  disabled={disabled}
                  className={`relative ${setClassStatus} ${show ? "" : "invisible"}`}
            ><span className="flex gap-2">{icon}{text}</span></button>
      );
}
