"use client";
import { useState, useEffect } from "react";
import ButtomNav from "@/components/ui/controls/color-picker/ButtomNav";
import Sun from "@/components/ui/svg/Sun";
import Moon from "@/components/ui/svg/Moon";
import GraduationCap from "@/components/ui/svg/GraduationCap";
import LayoutGrid from "@/components/ui/svg/LayoutGrid";
import Typewriter from "@/components/ui/Typewriter";
import Badge from "@/components/ui/Badge";
import RoundedIconButton from "../controls/buttons/RoundedIconBotton";
import dynamic from "next/dynamic";
import GuidedTour from "@/components/guided-tour/GuidedTour";

const ColorPicker = dynamic(
  () => import("@/components/ui/controls/color-picker/ColorPicker"),
  { ssr: false }
);

export default function BgColorPickerMaster({
  hue,
  saturation,
  lightness,
  opacity,
  limitMin,
  limitMax,
  isDark,
}) {
  const [color, setColor] = useState({
    hue: hue,
    saturation: saturation,
    lightness: lightness,
    opacity: opacity,
  });

  const [showTypeWrite, setShowTypeWrite] = useState(false);
  const [textTypeWrite, setTextTypeWrite] = useState("");
  const [open, setOpen] = useState(false);
  const bgColor = `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%,${color.opacity / 100})`;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const handleColorChange = (value) => {
  setColor((prev) => {
    // اگر مقدار تغییر نکرده بود، setState نزن
    const updated = { ...prev, ...value };
    if (
      updated.hue === prev.hue &&
      updated.saturation === prev.saturation &&
      updated.lightness === prev.lightness &&
      updated.opacity === prev.opacity
    ) return prev;
    return updated;
  });
};

  useEffect(() => {
    //setSelectIosVal("");
    const divTheme = document.getElementById(
      `div${isDark ? "Dark" : "Light"}Theme`
    );
    const divHelp = document.getElementById(
      `div${isDark ? "Dark" : "Light"}Help`
    );
    const divTypeWrite = document.getElementById(
      `div${isDark ? "Dark" : "Light"}TypeWrite`
    );
    const bdg = document.getElementById(`bdg${isDark ? "Dark" : "Light"}`);

    const addClasses = (el, classes) => el?.classList.add(...classes);
    const removeClasses = (el, classes) => el?.classList.remove(...classes);

    const runAnimation = async () => {
      if (isDark) {
        addClasses(divTypeWrite, ["hidden"]);
        await wait(4500);
        removeClasses(divTypeWrite, ["hidden"]);
        setShowTypeWrite(true);
        setTextTypeWrite(`پس زمینه برای تم تیره انتخاب کنید`);
        await wait(3000);
      } else {
        setShowTypeWrite(true);
        setTextTypeWrite(`پس زمینه برای تم روشن انتخاب کنید`);
        addClasses(divHelp, [
          "animate-pulse",
          "animate-infinite",
          "animate-ease-in-out",
          "animate-normal",
        ]);
        await wait(3000);
        removeClasses(divHelp, [
          "animate-pulse",
          "animate-infinite",
          "animate-ease-in-out",
          "animate-normal",
        ]);
        await wait(1000);
      }
      addClasses(divTypeWrite, [
        "transition-opacity",
        "duration-500",
        "opacity-0",
      ]);
      addClasses(divHelp, ["hidden"]);
      setShowTypeWrite(false);
      addClasses(bdg, ["show"]);
      setTimeout(() => {
        removeClasses(bdg, ["border", "rounded-full"]);
        addClasses(bdg, ["border-l", "border-y", "rounded-l-full"]);
      }, 100);
    };
    runAnimation();
  }, []);
  const steps = [
    {
      target: `#buttomNav${isDark ? "Dark" : "Light"}`,
      content: <p>Manage settings here</p>,
      position: "top",
    },
    {
      target: `#div${isDark ? "Dark" : "Light"}Opacity`,
      content: <p>مقدار شفافیت را انتخاب کنید</p>,
      position: `${isDark ? "top" : "bottom"}`,
    },
    {
      target: `#div${isDark ? "Dark" : "Light"}Saturation`,
      content: <p>مقدار اشباع را انتخاب کنید</p>,
      position: `${isDark ? "top" : "bottom"}`,
    },
  ];
  return (
    <>
      <div id={`div${isDark ? "Dark" : "Light"}Theme`}
        style={{ backgroundColor: bgColor }}
        className={`min-h-[50vh] custome-anim slide-right show w-full transition-all delay-200 duration-2000`}
      >
        <div
          id={`div${isDark ? "Dark" : "Light"}Help`}
          className="absolute z-50 inset-0 rounded-md backdrop-blur-12 bg-emerald-400/20 border border-emerald-600 cursor-not-allowed pointer-events-auto"
        >
          <div
            style={{
              background: `linear-gradient(-30deg, oklch(from var(--color-pink-500) l c h), transparent, var(--color-pink-600))`,
            }}
            className="transform-[scale(.99)] opacity-[.3] blur-[32px] rounded-lg border-pink-500 absolute inset-0"
          ></div>
        </div>
        <div className="flex gap-1 justify-between items-center">
          <div className={`flex gap-1 justify-start items-center m-2`}>
            <span
              className={`rounded-full p-1 border shadow-[0_0_7px] ${isDark
                ? "border-slate-500/22 bg-slate-500/30 shadow-slate-400/30"
                : "border-yellow-500/22 bg-yellow-500/22 shadow-yellow-400/22"
                }`}
            >
              {isDark ? <Moon size={40} /> : <Sun size={40} />}
            </span>
            <span
              id={`bdg${isDark ? "Dark" : "Light"}`}
              className={`w-24 absolute right-12 rounded-full p-2 border border-r-0 shadow-[0_0_7px] ${isDark
                ? "border-slate-500/22 bg-slate-500/11 shadow-slate-400/22"
                : "border-yellow-500/22 bg-yellow-500/11 shadow-yellow-400/22"
                } custome-anim slide-left `}
            >
              {isDark ? (
                <span className={`${color.lightness > 25 ? "text-slate-200" : "text-slate-500"
                  } pr-4 font-semibold text-shadow-[0_0_10px] text-shadow-slate-600`}
                >
                  تم تیره
                </span>
              ) : (
                <span
                  className={`${color.lightness > 75 ? "text-yellow-500" : "text-yellow-200"
                    } pr-4 font-semibold text-shadow-[0_0_10px] text-shadow-yellow-600`}
                >
                  تم روشن
                </span>
              )}
            </span>
          </div>
          <div id={`div${isDark ? "Dark" : "Light"}TypeWrite`} className={`${""} mr-1 w-full transition-all duration-500 ease-in-out`}>
            <span className={`${isDark ? "text-white" : "text-black"} text-md font-semibold text-shadow-pink-200 text-shadow-[0_0_10px]`}>
              <Typewriter show={showTypeWrite} className="" text={textTypeWrite} speed={showTypeWrite ? 70 : 0} hideAfterType={true} />
            </span>
          </div>
          <div>
            <RoundedIconButton key={0} id="btnGuidedTour"
              icon={<GraduationCap color={`${isDark ? (color.lightness > 25 ? "--color-slate-200" : "--color-slate-500") : (color.lightness > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} color2={`${isDark ? "--color-slate-400" : "--color-yellow-500"}`} />}
              text={"آموزش"}
              baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
              border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
              active={false}
              activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
              onClickExternal={() => {
                console.log("Clicked:", "item.label");
                setOpen(true);
                //setActiveIndex(0);
              }}
            />
          </div>
          <div>
            <RoundedIconButton key={0} icon={
              <LayoutGrid color={`${isDark ? (color.lightness > 25 ? "--color-slate-200" : "--color-slate-500") : (color.lightness > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} />}
              text={"خانه"}
              baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
              border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
              active={false}
              activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
              onClickExternal={() => {
                console.log("Clicked:", "item.label");
                //setActiveIndex(0);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <ColorPicker
            hueVal={color.hue}
            saturationVal={color.saturation}
            lightnessVal={color.lightness}
            opacityVal={color.opacity}
            limitMin={limitMin}
            limitMax={limitMax}
            isDark={isDark}
            onChange={handleColorChange}
          />

        </div>

        <ButtomNav id={`buttomNav${isDark ? 'Dark' : 'Light'}`} className="bottom-0 left-1/2" />


      </div>
      <GuidedTour
        open={open}
        steps={steps}
        onClose={() => setOpen(false)}
        defaultPosition="bottom"
      />
    </>
  );
}
