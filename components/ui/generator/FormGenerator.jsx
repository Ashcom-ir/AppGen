
"use client";

import React, { useRef, useEffect, useState } from "react";
import InputText from "@/components/ui/controls/input/InputText"
import InputSepratedNumber from '@/components/ui/controls/input/InputSepratedNumber';
import GuidedTour from "@/components/guided-tour/GuidedTour";
import TypewriterArray from "@/components/ui/TypewriterArray";
import RoundedIconButton from "@/components/ui/controls/buttons/RoundedIconBotton";
import IconButton from "@/components/ui/controls/buttons/IconBotton";
import LayoutGrid from "@/components/ui/svg/LayoutGrid";
import Enter from "@/components/ui/svg/Enter";
import Button from "@/components/ui/controls/buttons/Button";
import LeftArrow from "@/components/ui/svg/LeftArrow";
import GraduationCap from "@/components/ui/svg/GraduationCap";
import Uplaod from "@/components/ui/controls/upload/Upload";
import BackButton from "@/components/ui/controls/buttons/BackButton";
import TooltipRadiusButton from "@/components/ui/controls/buttons/TooltipRadiusButton";
import NumberSlider from "@/components/ui/controls/input/NumberSlider";
import NumberRulerSlider from "@/components/ui/controls/input/NumberRulerSlider";

import { Settings, ArrowLeftToLine, Plus, CircleFadingPlus, X } from "lucide-react";
import Check from "@/components/ui/svg/Check";
import NumberUpDown from "../controls/NumberUpDown";
import NumberRulerSliderH from "../controls/input/NumberRulerSliderH";
import JustifyWithAlign from "../controls/input/justify/JustifyWithAlign";
import JustifyText from "../controls/input/justify/JustifyText";
import DragDropElement from "../controls/drag-and-drop/DragDropElement";
import DirectionAlign from "../controls/input/justify/DirectionAlign";
import VerticalAlign from "../controls/input/justify/VerticalAlign";
import JustifyVShowHide from "../svg/JustifyVShowHide";
import Direction from "@/components/ui/svg/Direction";
import BottomSheet from "../BottomSheet";
import BottomSheetModal from "../BottomSheetModal";
import RemoveButton from "../controls/buttons/RemoveButton";
import TooltipButton from "../controls/buttons/TooltipButton";

export default function FormGenerator({ isDark, gradient, color }) {
      const ref = useRef(null);
      const [inputs, setInputs] = useState(Array(4).fill(""));
      const [spanColor, setSpanColor] = useState([]);
      const [CharactersRemainingValue, setCharactersRemainingValue] = useState("");
      const [txtFormTitleValue, setTxtFormTitleValue] = useState("");
      const [showTooltip, setShowTooltip] = useState(false);
      const [openGuidTour, setOpenGuidTour] = useState(false);

      const [currentStep, setCurrentStep] = useState(0);
      const [inputVal, setInputVal] = useState("");
      const [rows, setRows] = useState([{ id: 0 }]);
      const [columnsCountVal, setColumnsCountVal] = useState(1);
      const [showRowSetting, setShowRowSetting] = useState(false)
      const [showElementsList, setShowElementsList] = useState(false)
      const dragItem = useRef(null);
      const dragOverItem = useRef(null);
      function handleDragStart(index) {
            dragItem.current = index;
      }

      function handleDragEnter(index) {
            dragOverItem.current = index;
      }

      function handleDragEnd() {
            const from = dragItem.current;
            const to = dragOverItem.current;

            if (
                  from === null ||
                  to === null ||
                  from === to ||
                  !rows[from] ||
                  !rows[to]
            ) {
                  dragItem.current = null;
                  dragOverItem.current = null;
                  return;
            }

            setRows(prev => {
                  const copy = [...prev];
                  const [moved] = copy.splice(from, 1);
                  copy.splice(to, 0, moved);
                  return copy;
            });

            dragItem.current = null;
            dragOverItem.current = null;
      }


      const handleKeyDown = (e) => {
            if (e.key === "Enter" && e.target.value.length > 2) {
                  const btnSendMail = document.getElementById("btnSendMail");
                  btnSendMail?.focus();
                  btnSendMail?.click();
            }
      };
      const spanColorsMap = {
            "white": ["text-white", "border-white", "--color-white", "bg-white/10"],
            "orange-300": ["text-orange-300", "border-orange-300", "--color-orange-300", "bg-orange-300/10"],
            "yellow-300": ["text-yellow-300", "border-yellow-300", "--color-yellow-300", "bg-yellow-300/10"],
            "emerald-400": ["text-emerald-300", "border-emerald-400", "--color-emerald-400", "bg-emerald-500/10"],
      };
      const getColorKey = (count) => {
            if (count === 2) return "orange-300";
            if (count === 3) return "yellow-300";
            if (count === 4) return "emerald-300";
            return "white";
      };

      useEffect(() => {
            GenerateColumn(1);
            setInputs(prev => {
                  const arr = [...prev];
                  //arr[0] = "0";
                  return arr;
            });
            setSpanColor(spanColorsMap["white"]);
      }, []);
      const handleChange = (index, val) => {
            const newInputs = [...inputs];
            newInputs[index] = val;
            setInputs(newInputs);
            const filledCount = newInputs.filter(v => v !== "").length;
            const colorKey = getColorKey(filledCount);
            const spanColor = spanColorsMap[colorKey];
            setSpanColor(spanColor);
            onInputsChange?.(newInputs);
      };
      const GenerateColumn = (e) => {
            setColumnsCountVal(e);
      }
      function handlePasteVersion(e) {
            e.preventDefault();
            let pasted = (e.clipboardData || window.clipboardData).getData("text");
            if (!pasted) return;
            if (pasted.startsWith("+98")) {
                  pasted = pasted.substring(3);
            }
            if (pasted.startsWith("0098")) {
                  pasted = pasted.substring(4);
            }
            if (!pasted.startsWith("0")) {
                  pasted = "0" + pasted;
            }
            let digits = pasted.replace(/\D/g, "");
            if (!digits.length) return;

            const newInputs = [...inputs];
            digits.split("").forEach((digit, i) => {
                  newInputs[i] = digit;
            });

            setInputs(newInputs);

            // رنگ border
            const filledCount = newInputs.filter((v) => v !== "").length;
            const colorKey = getColorKey(filledCount);
            setSpanColor(spanColorsMap[colorKey]);

            onInputsChange?.(newInputs);
      }
      const guidSteps = [
            {
                  target: `#divFormTitle`,
                  content: <TypewriterArray key={0} show={currentStep == 0} className="" items={[
                        "مقدار شفافیت را انتخاب کنید",
                        "با اسلایدر شفافیت را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید",
                        "بهتر است برای صفحات ، شفافیت 100 باشد"
                  ]} speed={currentStep == 0 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: "bottom",
            },
            {
                  target: `#divFormName`,
                  content: <TypewriterArray key={1} show={currentStep == 1} className="" items={[
                        "مقدار اشباع را انتخاب کنید",
                        "با اسلایدر اشباع را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید"
                  ]} speed={currentStep == 1 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: "bottom",
            },
            {
                  target: `#divRowsGenerate`,
                  content: <TypewriterArray key={2} show={currentStep == 2} className="" items={[
                        "مقدار روشنایی را انتخاب کنید",
                        "با اسلایدر روشنایی را تنظیم کنید",
                        "پیشنهاد می شود در محدوده سبز بمانید"
                  ]} speed={currentStep == 2 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: "bottom",
            },
            {
                  target: `#btnAddNewRow`,
                  content: <TypewriterArray key={3} show={currentStep == 3} className="" items={[
                        "درجه رنگ را انتخاب کنید",
                        "با اسلایدر رنگ را تنظیم کنید",
                        "آزاد هستید هر رنگی را انتخاب کنید"
                  ]} speed={currentStep == 3 ? 20 : 0} hideAfterType={false} pause={1000} />,
                  position: "bottom",
            },
      ];
      const SaveTitle = () => {
            console.log("SaveTitle:", txtFormTitleValue)
      }
      const SaveTitleSubmitColumns = () => {
            console.log("SaveTitle:", txtFormTitleValue)
      }
      function AddNewRow() {
            const id = Date.now();
            setRows(prev => [...prev, { id }]);
            setTimeout(() => {
                  const el = document.getElementById(`divRows_${id}`);
                  if (!el) return;
                  el.classList.add(
                        "scale-102",
                        "border",
                        "border-green-500",
                        "rounded-sm",
                        "shadow",
                        "shadow-[0_0_2px_rgba(0,0,0,0.10)]",
                  );
                  setTimeout(() => {
                        el.classList.remove(
                              "scale-102",
                              "border",
                              "border-green-500",
                              "rounded-sm",
                              "shadow",
                              "shadow-[0_0_2px_rgba(0,0,0,0.10)]",
                        );
                  }, 400);
            }, 10);
      }
      function RemoveRow(id) {
            const el = document.getElementById(`divRows_${id}`);
            if (!el) return;
            el.classList.add(
                  "opacity-0",
                  "translate-y-2",
                  "scale-40",
                  "border-1",
                  "border-red-600",
                  "rounded-sm",
                  "shadow",
                  "shadow-[0_0_2px_rgba(0,0,0,0.10)]",
            );
            setTimeout(() => {
                  setRows(prev => prev.filter(r => r.id !== id));
            }, 400);
      }

      const btnListClassName = "relative w-full mb-2 group flex items-center p-1 justify-start gap-2 rounded-sm cursor-pointer bg-slate-500/11 hover:bg-slate-500/14 border-slate-500/22 border text-white/70 transition-all duration-700 ease-out";
      return (
            <div id={`divAppInfo`} className="w-[92vw] m-auto sm:w-[420px] md:w-[460px] lg:w-[504px] flex flex-col items-center">
                  <GuidedTour key='GuidedTour'
                        openGuidedTour={openGuidTour}
                        steps={guidSteps}
                        onClose={() => setOpenGuidTour(false)}
                        defaultPosition="bottom"
                  />
                  <div className="w-full flex gap-2 justify-between items-start">
                        <BackButton />
                        <div className="flex justify-between items-center">
                              <RoundedIconButton key='btnGuidedTour' id="btnGuidedTour"
                                    icon={<GraduationCap color={`${isDark ? (26 > 25 ? "--color-slate-200" : "--color-slate-500") : (76 > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} color2={`${isDark ? "--color-slate-400" : "--color-yellow-500"}`} />}
                                    text={"آموزش"}
                                    baseClasses={`hover:w-[100px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
                                    border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} w-[35px] h-[35px] backdrop-blur-[14px]`}
                                    active={false}
                                    activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[100px] text-white`}
                                    onClickExternal={() => {
                                          console.log("Clicked:", open);
                                          setOpenGuidTour(true);
                                          //setActiveIndex(0);
                                    }}
                              />
                              <RoundedIconButton key={0} icon={
                                    <LayoutGrid color={`${isDark ? (26 > 25 ? "--color-slate-200" : "--color-slate-500") : (76 > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} />}
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
                  <DragDropElement
                        sourceId="divDragableGroups"
                        targetId="divAddElementToColumn_"
                  />

                  <div ref={ref} className="w-[92vw] m-auto min-h-[92vh] p-5 sm:w-[420] md:w-[460] lg:w-[504] bg-linear-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-sm border border-white/11 transition-all duration-150 ease-out"
                        style={{ background: gradient }}>
                        <div className="flex flex-col gap-2 justify-center items-right">
                              <div id="divFormTitle">
                                    <label className=" w-1/5" htmlFor="txtFormTitle">عنوان فرم</label>
                                    <InputText
                                          id={`txtFormTitle`}
                                          dir="rtl"
                                          maxLength={64}
                                          showCopyBtn={true}
                                          showPasteBtn={true}
                                          showClearBtn={true}
                                          placeholder={"عنوان فرم را وارد کنید"}
                                          onValueChange={setTxtFormTitleValue}
                                    />
                              </div>
                              <div id="divFormName">
                                    <label className=" w-1/5" htmlFor="txtFormName">نام فرم | جدول دیتابیس<span className="text-red-400">(EN)</span></label>
                                    <InputText
                                          id={`txtFormName`}
                                          dir="ltr"
                                          maxLength={32}
                                          showCopyBtn={true}
                                          showPasteBtn={true}
                                          showClearBtn={true}
                                          placeholder={"نام فرم را وارد کنید"}
                                          onValueChange={setTxtFormTitleValue}
                                    />
                              </div>
                              <VerticalAlign targetId={`wrapperAddElementToColumn`} />
                              <div id="divRowsGenerate" className={`relative mt-4 flex flex-col gap-7`}>
                                    {rows.map((row, index) => (
                                          <div
                                                key={row.id}
                                                id={`divRows_${row.id}`}
                                                draggable
                                                onDragStart={() => handleDragStart(index)}
                                                onDragEnter={() => handleDragEnter(index)}
                                                onDragOver={e => e.preventDefault()}
                                                onDragEnd={handleDragEnd}
                                                className={`relative transition-all duration-400 ease-out`}
                                          >
                                                <div id={`divColumns_${row.id}`} className="flex overflow-x-auto overflow-y-hidden w-full relative border rounded-sm divide-x divide-white/50">
                                                      {Array.from({ length: columnsCountVal }).map((_, i) => (
                                                            <button key={i} onClick={() => setShowElementsList(true)} className={`flex-1 ${showElementsList ? "border border-green-400" : ""} relative cursor-pointer`}>
                                                                  <div id={`divAddElementToColumn_${row.id}_${i}`} className="p-1">
                                                                        <span className="p-2">
                                                                              <CircleFadingPlus />
                                                                        </span>
                                                                  </div>
                                                            </button>
                                                      ))}
                                                </div>
                                                <div className="absolute -left-3 -top-3">
                                                      <TooltipButton tooltipPos="right" tickAfterClick={false}
                                                            bgBeforClickClass='text-shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:text-shadow-[0_0_2px_rgba(0,0,0,0.10)] text-gray-500 hover:text-indigo-400 bg-gray-900 border-white/10'
                                                            bgAfterClickClass='text-indigo-200 hover:text-indigo-400 bg-indigo-900 border-indigo-600/10'
                                                            buttonClass=''
                                                            icon={<Settings size={20} />} bodyTooltip='تنظیمات' bodyTooltipAfterClick='تنظیمات'
                                                            onClick={() => setTimeout(() => { setShowRowSetting(true) }, 444)} />
                                                </div>
                                                <div className="absolute -left-3 -bottom-3">
                                                      <TooltipButton tooltipPos="right"
                                                            bgBeforClickClass='text-shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:text-shadow-[0_0_2px_rgba(0,0,0,0.10)] text-gray-500 hover:text-red-400 bg-gray-900 border-white/10'
                                                            icon={<X size={20} />} bodyTooltip='حذف ردیف' bodyTooltipAfterClick='حذف شد'
                                                            onClick={() => setTimeout(() => { RemoveRow(row.id) }, 444)} />
                                                </div>
                                          </div>
                                    ))}
                              </div>
                              <button onClick={AddNewRow} id="btnAddNewRow" className={`relative mt-2 p-3 bg-slate-900/20 cursor-pointer flex justify-center gap-2 ${""}`}>
                                    <Plus /><span>ردیف جدید ایجاد کنید</span>
                              </button>
                        </div>
                        <div className="">
                              <BottomSheetModal show={showElementsList} onClose={() => setShowElementsList(false)} key={`${isDark ? 'Dark' : 'Light'}`} body={
                                    <div className="flex flex-col justify-start items-center" >
                                          <div className={btnListClassName}><span>لیبل</span><span id="divDragableGroups_Labels">1</span></div>
                                          <div className={btnListClassName}>
                                                <span>دکمه</span>
                                                <div id="divDragableGroups_Buttons" className="relative w-full flex flex-row overflow-x-auto pb-2">
                                                      <div className="flex-none border border-white/15 rounded-sm px-4 py-2">
                                                            <TooltipRadiusButton id="btnSampleTooltipRadiusButton" icon={<Check />} bodyTooltip='آیکون دار - متن شناور' />
                                                      </div>
                                                      <div className="flex-none pt-6 border border-white/15 rounded-sm px-4 py-2">
                                                            <RoundedIconButton key='btnSampleIconButton' id="btnSampleIconButton"
                                                                  icon={<GraduationCap color={`${isDark ? (26 > 25 ? "--color-slate-200" : "--color-slate-500") : (76 > 75 ? "--color-yellow-500" : "--color-yellow-200")}`} color2={`${isDark ? "--color-slate-400" : "--color-yellow-500"}`} />
                                                                  }
                                                                  text={"آیکون دار - متن"}
                                                                  baseClasses={`hover:w-[150px] hover:text-white ${isDark ? "hover:bg-slate-400/6" : "hover:bg-yellow-400/6"}`}
                                                                  border_bg_class={`${isDark ? "bg-slate-500/11 border-slate-500/22" : "bg-yellow-500/11 border-yellow-500/22"} p-1 backdrop-blur-[14px]`}
                                                                  active={true}
                                                                  activeBg={`${isDark ? "bg-slate-500/6" : "bg-yellow-500/6"} w-[150px] text-white`}
                                                            />
                                                      </div>
                                                      <div className="flex-none pt-6 border border-white/15 rounded-sm px-4 py-2">
                                                            <button className="bg-slate-500/11 border-slate-500/22 px-4 py-2 backdrop-blur-[14px]">فقط آیکون | متن</button>
                                                      </div>
                                                      <div className="flex-none border border-white/15 rounded-sm px-4 py-2">
                                                            <TooltipRadiusButton id="btnSampleTooltipRadiusButton5" icon={<Check />} bodyTooltip='آیکون دار - متن شناور' />
                                                      </div>
                                                </div>

                                          </div>
                                          <div className={btnListClassName}>
                                                <span>باکس</span>
                                                <div id="divDragableGroups_Boxs" className="relative w-full flex flex-row overflow-x-auto pb-2">
                                                      <div className="flex-none h-[80] border border-white/15 rounded-sm px-4 py-2">
                                                            <input type="text" className="w-full rounded-sm border border-white/15 focus:ring-0 sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md p-2 text-right transition-all duration-500 ease-in-out" />
                                                      </div>
                                                      <div className="flex-none h-[80] border border-white/15 rounded-sm px-4 py-2">
                                                            <textarea className="w-full rounded-sm border border-white/15 focus:ring-0 sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md p-2 text-right transition-all duration-500 ease-in-out" />
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={btnListClassName}><span>متن</span><span>x</span></div>
                                          <div className={btnListClassName}><span>عدد</span><NumberUpDown /></div>
                                          <div className="h-px bg-white/6 my-1 mx-2" />
                                    </div>
                              } />
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />

                        <div className="flex justify-center items-center">
                              <div className="flex-1 relative w-full">
                                    <Button id="btnSubmit"
                                          show={true}
                                          icon={<LeftArrow isAnim={inputVal.length > 2}
                                                neon_color={spanColor.neon}
                                                check_strike_color={spanColor.neon_dash}
                                                check_strike_drop_color="--color-emerald-200"
                                          />}
                                          text={"تایید و ادامه"}
                                          text_color={spanColor.text}
                                          border={spanColor.border_button}
                                          hasBorder="border"
                                          bg={spanColor.bg_button}
                                          shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                          //bg_gradient= "bg-gradient-to-br from-white/4 via-white/2 to-white/6 backdrop-blur-xl rounded-xl border",
                                          cursor='cursor-pointer focus:ring-emerald-600 focus:ring-offset-0'
                                          disabled={inputVal.length < 3}
                                          bg_color={spanColor.bg}
                                          border_color={spanColor.bg_border}
                                          onClick={async () => {
                                                try {
                                                      console.log(CharactersRemainingValue);
                                                      return;
                                                      const res = await fetch("/html/emails/activation-code.html");
                                                      let html = await res.text();
                                                      let vars = { name: "ASh", link: "#" }
                                                      for (const [key, value] of Object.entries(vars)) {
                                                            html = html.replaceAll(`{{${key}}}`, value);
                                                      }
                                                      const send = await sendEmail({
                                                            to: "sector.persian@gmail.com",
                                                            subject: "سلام",
                                                            html: html,
                                                      });
                                                      console.log("Email sent:", send);
                                                } catch (err) {
                                                      console.error("Email error:", err.message);
                                                }
                                          }} />
                              </div>
                        </div>

                  </div>
                  <BottomSheetModal show={showRowSetting} onClose={() => setShowRowSetting(false)} key={`${isDark ? 'Dark2' : 'Light2'}`} body={
                        <>
                              <span>تعداد ستونهای ردیف را وارد کنید</span>
                              <div className="flex gap-2 justify-center items-center justify-items-center">
                                    <NumberRulerSliderH
                                          id="nrsColumnsH"
                                          value={columnsCountVal}
                                          max={10}
                                          setValue={(v) => {
                                                ({
                                                      hue: v,
                                                }); GenerateColumn(v);
                                          }}
                                          label=""
                                          width={260}
                                          height={20}
                                          step={1}
                                          knobSize={35}
                                          inputD={11}
                                          rulerM={2}
                                          min={1}
                                    />
                                    <TooltipRadiusButton id="btnSubmitNuberColumns" icon={<Check />} bodyTooltip='تایید' onClick={SaveTitleSubmitColumns} />
                              </div>


                              <DirectionAlign targetId="divRowsGenerate" defaultDirection="" />
                              <VerticalAlign targetId="wrapperAddElementToColumn" />
                              <JustifyWithAlign targetId="divColumns" defaultJustify="justify-center" defaultItems="items-end" />
                              <div className="h-px bg-white/6 my-1 mx-2" />
                              <JustifyText targetId="divJustifyText" defaultAlign="text-right" />
                              <div id="divJustifyText" className="text-right">
                                    border="border border-emerald-500/22 dark:border-emerald-500/11 hover:border-emerald-500/33 dark:hover:border-emerald-500/14"
                                    bg="bg-emerald-500/3 dark:bg-emerald-500/3 hover:bg-emerald-400/16 dark:hover:bg-emerald-400/6"
                                    color="text-white/70 hover:text-white text-shadow-amber-200"
                              </div>
                              <button className="bg-slate-900/50 p-1 rounded-full backdrop-blur-2xl cursor-pointer opacity-80 hover:opacity-100 transition-all delay-75 duration-700">
                                    <JustifyVShowHide size={16} color="#ffffff" isRainbow={true} />
                              </button>
                              <button className="bg-slate-900/50 opacity-50 hover:opacity-100 p-2 rounded-full backdrop-blur-2xl cursor-pointer transition-all delay-75 duration-700">
                                    <JustifyVShowHide size={20} color="#ffffff" isRainbow={false} />
                              </button>

                              <button className="bg-slate-900/50 p-1 rounded-full backdrop-blur-2xl cursor-pointer opacity-80 hover:opacity-100 transition-all delay-75 duration-700">
                                    <Direction size={16} color="--color-rose-500" />
                              </button>
                              <button className="bg-slate-900/50 p-1 rounded-full backdrop-blur-2xl cursor-pointer opacity-80 hover:opacity-100 transition-all delay-75 duration-700">
                                    <Direction size={16} isLtr={false} color="--color-rose-500" />
                              </button>
                              <IconButton key='btnSubmitTitle' id="btnSubmitTitle"
                                    icon={<Check />}
                                    text={"تایید و ادامه"}
                                    border="border border-emerald-500/22 dark:border-emerald-500/11 hover:border-emerald-500/33 dark:hover:border-emerald-500/14"
                                    bg="bg-emerald-500/3 dark:bg-emerald-500/3 hover:bg-emerald-400/16 dark:hover:bg-emerald-400/6"
                                    color="text-white/70 hover:text-white text-shadow-amber-200"
                                    shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                    onClickExternal={SaveTitle}
                              />
                              <IconButton key='btnSubmitColumns' id="btnSubmitColumns"
                                    icon={<Check neon_color="--color-red-300"
                                          check_strike_color="--color-red-300"
                                          check_strike_drop_color="--color-red-300/50" />}
                                    text={"پیش نمایش"}
                                    color_tag='red'
                                    onClickExternal={() => {
                                          console.log("Clicked:", "item.label");
                                          //setActiveIndex(0);
                                    }}
                              />
                        </>} />
            </div>
      );
}
