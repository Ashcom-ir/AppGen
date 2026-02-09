import LeftArrow from "@/components/ui/svg/LeftArrow";

export default function BackButton({
      show = true,
      currentStep = 0,
      onClick = () => { },
}) {
      let setClassStatus = `text-white rounded-full border border-white/20 hover:border-white/22 focus:border-white/24 active:border-white/26 p-2 bg-white/3 hover:bg-white/11 focus:bg-white/12 active:bg-white/26 focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)] cursor-pointer transition-all duration-200 hover:duration-800 ease-in-out sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md font-semibold`;
      return (
            <button onClick={onClick}
                  id={"btnBack"}
                  className={`relative ${setClassStatus} ${show ? "" : "invisible"}`}
            ><LeftArrow isAnim={true}
                  neon_color={"--color-green-300"}
                  check_strike_color={"--color-green-300"}
                  check_strike_drop_color="--color-emerald-200/50"
                  /></button>
      );
}