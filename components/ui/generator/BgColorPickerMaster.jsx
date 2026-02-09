"use client";
import { useState, useEffect } from "react";
import ButtomNav from "@/components/ui/controls/color-picker/ButtomNav";
import Sun from "@/components/ui/svg/Sun";
import Moon from "@/components/ui/svg/Moon";
import GraduationCap from "@/components/ui/svg/GraduationCap";
import LayoutGrid from "@/components/ui/svg/LayoutGrid";
import Typewriter from "@/components/ui/Typewriter";
import TypewriterArray from "@/components/ui/TypewriterArray";
import Badge from "@/components/ui/Badge";
import RoundedIconButton from "@/components/ui/controls/buttons/RoundedIconBotton";
import dynamic from "next/dynamic";
import GuidedTour from "@/components/guided-tour/GuidedTour";
import Button from "@/components/ui/controls/buttons/Button";
import UplaodImage from "@/components/ui/controls/color-picker/UploadImage";
import BottomSheet from "../BottomSheet";
import CopyPasteColorPicker from "@/components/ui/controls/color-picker/CopyPasteColorPicker";
import { Plus } from "lucide-react";


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
  const [singleColor, setSingleColor] = useState({
    hue: hue,
    saturation: saturation,
    lightness: lightness,
    opacity: opacity,
  });

  const [multiColor, setMultiColor] = useState({
    hue: hue,
    saturation: saturation,
    lightness: lightness,
    opacity: opacity,
  });
  const light = "#ff8800";
  const dark = "#222222";
  const downloadExe = () => {

    const url = `/api/exe-gen?light=${encodeURIComponent(light)}&dark=${encodeURIComponent(dark)}`;
    window.location.href = url;
  }
  const downloadHtml = () => { }
  const copyStyle = () => { }
  const copyHsla = () => { }
  const copyHex = () => { }
  const copyRgba = () => { }
  const copyLaba = () => { }
  const pasteColor = () => { }


  const downloadApk = async () => {
    const light = "#ff8800";
    const dark = "#222222";

    const res = await fetch(
      `/api/apk-gen?light=${encodeURIComponent(light)}&dark=${encodeURIComponent(dark)}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("API ERROR:", text);
      alert("Build failed – console را ببین");
      return;
    }

    const data = await res.json();
    console.log("BUILD STARTED:", data);
  };


  const checkApk = async () => {
    const res = await fetch("/api/apk-status");
    const data = await res.json();

    if (data.done && data.url) {
      window.location.href = data.url;
    }
    else {
      setTimeout(checkApk, 5000);
    }
  };

  const [showTypeWrite, setShowTypeWrite] = useState(false);
  const [textTypeWrite, setTextTypeWrite] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGuidIndex, setSelectedGuidIndex] = useState(0);

  //const [animateIn, setAnimateIn] = useState(false);
  //const [animateOut, setAnimateOut] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bgColorSingle = `hsla(${singleColor.hue}, ${singleColor.saturation}%, ${singleColor.lightness}%, ${singleColor.opacity / 100})`;
  const bgColorMulti = `hsla(${multiColor.hue}, ${multiColor.saturation}%, ${multiColor.lightness}%, ${multiColor.opacity / 100})`;
  let litnessCompaire = 0;
  let bgColor = "";
  if (selectedIndex == 0) {
    litnessCompaire = singleColor.lightness;
    bgColor = bgColorSingle;
  }
  else if (selectedIndex == 1) {
    litnessCompaire = multiColor.lightness;
    bgColor = bgColorMulti;

  }
  //const bgColor = `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%,${color.opacity / 100})`;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


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
  const guidSteps = [
    {
      target: `#div${isDark ? "Dark" : "Light"}Opacity`,
      content: <TypewriterArray key={0} show={currentStep == 0} className="" items={[
        "مقدار شفافیت را انتخاب کنید",
        "با اسلایدر شفافیت را تنظیم کنید",
        "پیشنهاد می شود در محدوده سبز بمانید",
        "بهتر است برای صفحات ، شفافیت 100 باشد"
      ]} speed={currentStep == 0 ? 20 : 0} hideAfterType={false} pause={1000} />,
      position: `${isDark ? "top" : "bottom"}`,
    },
    {
      target: `#div${isDark ? "Dark" : "Light"}Saturation`,
      content: <TypewriterArray key={1} show={currentStep == 1} className="" items={[
        "مقدار اشباع را انتخاب کنید",
        "با اسلایدر اشباع را تنظیم کنید",
        "پیشنهاد می شود در محدوده سبز بمانید"
      ]} speed={currentStep == 1 ? 20 : 0} hideAfterType={false} pause={1000} />,
      position: `${isDark ? "top" : "bottom"}`,
    },
    {
      target: `#div${isDark ? "Dark" : "Light"}Lightness`,
      content: <TypewriterArray key={2} show={currentStep == 2} className="" items={[
        "مقدار روشنایی را انتخاب کنید",
        "با اسلایدر روشنایی را تنظیم کنید",
        "پیشنهاد می شود در محدوده سبز بمانید"
      ]} speed={currentStep == 2 ? 20 : 0} hideAfterType={false} pause={1000} />,
      position: `${isDark ? "top" : "bottom"}`,
    },
    {
      target: `#div${isDark ? "Dark" : "Light"}HueRuler`,
      content: <TypewriterArray key={3} show={currentStep == 3} className="" items={[
        "درجه رنگ را انتخاب کنید",
        "با اسلایدر رنگ را تنظیم کنید",
        "آزاد هستید هر رنگی را انتخاب کنید"
      ]} speed={currentStep == 3 ? 20 : 0} hideAfterType={false} pause={1000} />,
      position: `${isDark ? "top" : "bottom"}`,
    },
  ];
  const items = [
    <ColorPicker
      key="SingleColor"
      hueVal={singleColor.hue}
      saturationVal={singleColor.saturation}
      lightnessVal={singleColor.lightness}
      opacityVal={singleColor.opacity}
      limitMin={limitMin}
      limitMax={limitMax}
      isDark={isDark}
      onChange={({ key, value }) => {
        setSingleColor(prev => ({ ...prev, [key]: value }));
      }}
    />,
    <>
      <ColorPicker
        key="MultiColor"
        hueVal={multiColor.hue}
        saturationVal={multiColor.saturation}
        lightnessVal={multiColor.lightness}
        opacityVal={multiColor.opacity}
        limitMin={limitMin}
        limitMax={limitMax}
        isDark={isDark}
        onChange={({ key, value }) => {
          setMultiColor(prev => ({ ...prev, [key]: value }));
        }}
      />
      <div className="absolute left-1/3 bottom-1">
        <div className="flex gap-2 items-center justify-center">
          <Button id="btnSelectColorPlus"
            show={true}
            icon={<Plus />}
            text={""}
            text_color="text-white hover:text-red-200 hover:text-red-300"
            border="border-white/10 hover:border-red-200/12 focus:border-red-300/14 active:border-red-300/16"
            hasBorder="rounded-full border"
            padding="p-1"
            bg="bg-rose-600 hover:bg-white/6 focus:bg-white/7 active:bg-white/8"
            shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
            cursor='cursor-pointer focus:ring-red-300/14 focus:ring-offset-0'
            disabled={false}
            aria-label="Close"
            onClick={null} />
          <button id="btnSelectColor1" className={`${isDark ? "bg-black/25" : "bg-white/60"} flex p-1 rounded-full border focus:ring-offset-0 shadow-[0_0_2px_rgba(0,0,0,0.10)] border-white/10 hover:border-red-200/12 focus:border-red-300/14 active:border-red-300/16 cursor-pointer focus:ring-red-300/14`}>
            <span className="p-3 rounded-full " style={{ backgroundColor: bgColor }}>
            </span>
          </button>
        </div>

      </div>
    </>,

    <UplaodImage isDark={isDark} key={"ImagePicker"} allowedTypes={["image/png", "image/jpeg"]} onFileSelect={(file) => {
      if (file) {
        console.log(file.name); // نام فایل
        const url = URL.createObjectURL(file);
        setImgUrl(url);
        console.log(url); // می‌توانید تصویر را نمایش دهید
      } else {
        console.log("فایل حذف شد");
        setImgUrl(""); // ریست کردن تصویر
      }
    }} />,
    <CopyPasteColorPicker isDark={isDark} onClickHtml={downloadHtml} onClickExe={downloadExe} onClickApk={downloadApk}
      onClickStyle={copyStyle} onClickHsla={copyHsla} onClickHex={copyHex} onClickRgba={copyRgba}
      onClickLaba={copyLaba} onClickPaste={pasteColor} key={"CopyPasteColorPicker"} />
  ];


  const handleImagePicker = (value) => {

  };
  const handleCopyPasteColorPicker = (value) => {

  };
  const handleDownloadHtmlFile = async () => {
    console.log("bbnbn");

    // رنگ ها که میخوای جایگزین کنی
    const lightColor = "#ffffff";
    const darkColor = "#000000";

    // 1) خواندن فایل html از public
    const res = await fetch("/html.html");
    let text = await res.text();

    // 2) جایگزینی متغیرها
    text = text.replace(/--light-background/g, lightColor);
    text = text.replace(/--dark-background/g, darkColor);

    // 3) تبدیل به Blob برای دانلود
    const blob = new Blob([text], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // 4) ساخت لینک دانلود و کلیک اتوماتیک
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.html"; // اسم فایل خروجی
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <><GuidedTour key='GuidedTour'
          openGuidedTour={open}
          steps={guidSteps}
          onClose={() => setOpen(false)}
          defaultPosition="bottom"
        />
      <div id={`div${isDark ? "Dark" : "Light"}Theme`}
        style={{ backgroundImage: imgUrl ? `url(${imgUrl})` : undefined, backgroundColor: imgUrl ? undefined : bgColor }}
        className={`min-h-[50vh] ${isDark ? "bg-black/25" : "bg-white/60"} custome-anim slide-right show w-full transition-all delay-200 duration-2000`}
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
          >
          </div>
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
                <span className={`${litnessCompaire > 25 ? "text-slate-200" : "text-slate-500"
                  } pr-4 font-semibold text-shadow-[0_0_10px] text-shadow-slate-600`}
                >
                  تم تیره
                </span>
              ) : (
                <span
                  className={`${litnessCompaire > 75 ? "text-yellow-500" : "text-yellow-200"
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
            <RoundedIconButton key='btnGuidedTour' id="btnGuidedTour"
              icon={<GraduationCap color={`${isDark ? (litnessCompaire > 25 ? "--color-slate-200" : "--color-slate-500") : (litnessCompaire > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} color2={`${isDark ? "--color-slate-400" : "--color-yellow-500"}`} />}
              text={"آموزش"}
              baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
              border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
              active={false}
              activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
              onClickExternal={() => {
                console.log("Clicked:", open);
                setOpen(true);
                //setActiveIndex(0);
              }}
            />
          </div>
          <div>
            <RoundedIconButton key={0} icon={
              <LayoutGrid color={`${isDark ? (litnessCompaire > 25 ? "--color-slate-200" : "--color-slate-500") : (litnessCompaire > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} />}
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
        <div className="relative w-full h-full">
          {items.map((item, index) => {
            const isPrev = index === prevIndex;
            const isActive = index === selectedIndex;

            let classes = "absolute top-0 left-0 w-full transition-all duration-[2000ms] ease-[cubic-bezier(.4,0,.2,1)]";
            if (isPrev) {
              classes += " opacity-0 translate-x-[90%] scale-95 pointer-events-none";
            } else if (isActive) {
              classes += ` opacity-100 translate-x-0 scale-100 `;
            } else {
              classes += " opacity-0 translate-x-[90%] scale-95 pointer-events-none";
            }
            return <div key={index} className={classes}>{item}</div>;
          })}
        </div>
        <div className="hidden">
          <BottomSheet key={`${isDark ? 'Dark' : 'Light'}`} />
        </div>
        <ButtomNav id={`buttomNav${isDark ? 'Dark' : 'Light'}`} className="bottom-0 left-1/2" onChange={setSelectedIndex} />
      </div>
    </>
  );
}
