export default function CancelButton({
      show = true,
      cancelText = '',
      disabled = false,
      colorType='emerald',
      roundedType='rounded-sm',
      border='border',
      onClick = () => { },
}) {
      if (!show) return null;
      let setClassStatus = "flex transition-all duration-800 ease-in-out text-15 px-3 py-2 font-semibold items-center ";
      if (disabled) {
            setClassStatus += `text-${colorType}-100/40
                                    focus:shadow-none 
                                    hover:shadow-none 
                                    ${roundedType} ${border} border-${colorType}-600/10
                                    bg-${colorType}-600/5 cursor-not-allowed`;
      } else {
            setClassStatus += `text-${colorType}-100 
                                    focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] focus:shadow-${colorType}-500/20 
                                    hover:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-${colorType}-500/22 
                                    ${roundedType} ${border} border-${colorType}-600/20 
                                    focus:border-${colorType}-300/20 focus:bg-${colorType}-600/12 
                                    hover:border-${colorType}-500/20 bg-${colorType}-600/3 
                                    hover:bg-${colorType}-600/11 cursor-pointer`;
      }

      return (
            <div className="relative inline-block">
                  <button
                        onClick={onClick} // ⚡ فقط تابع
                        disabled={disabled}
                        className={setClassStatus}
                  >
                        {cancelText}
                  </button>
            </div>
      );
}
