// components/DomainCheckModal.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCheckDomain from "@/hooks/useCheckDomain";
import { Check, X, CornerDownLeft, ClipboardCheck, Copy, Loader2, BadgeInfo, ShoppingCart, Ban, Search, GlobeLock } from "lucide-react";
import ModalComponent from "@/components/ui/ModalComponent";
import Typewriter from "@/components/ui/Typewriter";
import TickAnimation from "@/components/ui/TickAnimation";
import MotionToolTip from "@/components/ui/Tooltip";
import ElectricBorder from '@/components/ui/ElectricBorder';
import PasteToClipboardButton from '@/components/ui/controls/buttons/PasteToClipboardButton';
import CopyToClipboardButton from '@/components/ui/controls/buttons/CopyToClipboardButton';
import ClearInputValueButton from '@/components/ui/controls/buttons/ClearInputValueButton';
/**
 * Props:
 *  - open (bool) 
 *  - onClose (fn)
 *  - initialDomain (optional)
 *  - onBuy (fn) when purchase chosen
 */
export default function DomainCheckModal({ open, onClose, initialDomain = "", onBuy = () => { } }) {
  const [domain, setDomain] = useState(initialDomain);
  const [state, setState] = useState("idle");
  const { check, loading, data, error, available, invalidDomainText, validDomainText } = useCheckDomain();
  const [lastChecked, setLastChecked] = useState(null);
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [tooltipCaption, setTooltipCaption] = useState("");
  const [errorDomain, setErrorDomain] = useState("");
  const [valueDomain, setValueDomain] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    setState(getState());
    /*     if (domain) {
          handleChange();
        } */
  }, [loading, error, data]);

  async function handleConfirm() {
    console.log("domain" + domain);
    if (!domain) return;
    const res = await check(domain);
    setLastChecked(domain);
    return res;
  }

  // Animated Row variants
  const rowVariants = {
    idle: { background: "#848484ff", color: "#e6eef3", scale: 1 },
    loading: { background: "linear-gradient(90deg, #a948ddff, #a70dfaff)", color: "#e6eef3", scale: 1.02 },
    available: { background: "linear-gradient(90deg, #84dd48ff , #77f225ff)", color: "#065f46", scale: 1.02 },
    taken: { background: "linear-gradient(90deg, #da3036, #da3036)", color: "#e6eef3", scale: 1.02 },
    error: { background: "linear-gradient(90deg, #f85109ff, #f24900ff)", color: "#e6eef3", scale: 1.02 },
    invalidDomainText: { background: "linear-gradient(90deg, #e7000b , #e7000b)", color: "#e6eef3", scale: 1.02 },
    validDomainText: { background: "linear-gradient(90deg, #e5ffd4ff , #e5ffbaff)", color: "#065f46", scale: 1.02 },
  };

  const getState = () => {
    if (loading) return "loading";
    if (error) return "error";
    if (invalidDomainText) return "invalidDomainText";
    if (validDomainText) return "validDomainText";
    if (data) return data.available ? "available" : "taken";
    return "idle";
  };
  const hasEmptyInput = () => {
    setDomain("");
    setState("idle");
    const txtNewDomain = document.getElementById("txtNewDomain");
    txtNewDomain?.focus();
    setValueDomain("");
    setErrorDomain("");
  };

  // رویداد کلید Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (state === "idle" || state === "validDomainText")) {
      handleConfirm(domain);
    }
  };
  const tooltipMap = {
    Enter: "اینتر",
    Paste: "چسباندن",
    Copy: "کپی",
    Clear: "پاک کردن",
    CopyCompleted: <span><Check className="inline text-green-500" />&nbsp;کپی شد</span>,
    PasteCompleted: <span><Check className="inline text-green-500" />&nbsp;چسبید</span>,
  };
  const tooltipBody = tooltipMap[tooltipCaption] || "";

  const normalizeDomain = (raw) => {
    if (!raw) return "";
    let d = raw.trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "");
    d = d.replace(/^www\./, "");
    d = d.replace(/\/+$/, "");
    return d;
  };

  const isValidDomain = (domain) => {
    // قوانین پایه‌ای: اجزاء با حروف/اعداد/خط تیره، حداقل یک نقطه، TLD حداقل 2 حرف
    const regex = /^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,63}$/i;
    return regex.test(domain) && domain.length < 253;
  };

  const handleChange = (text) => {
    const txtNewDomain = document.getElementById("txtNewDomain").value;
    let raw = txtNewDomain;
    if (raw === "") {
      hasEmptyInput();
      raw = text;
    }
    const normalized = normalizeDomain(raw);
    setValueDomain(raw);
    if (raw === "") { setState("idle"); }

    // محدودیت طول ورودی خام یا نرمال‌شده
    if (normalized.length > 63 * 4) { // محافظت اضافی؛ یا از 253 استفاده کن
      setErrorDomain("آدرس دامنه بیش از حد طولانی است.");
      setState("invalidDomainText");
      ///onChange(null);
      return;
    }

    if (normalized === "") {
      setErrorDomain(""); console.log("if (n")
      //onChange(null);
      return;
    }

    if (isValidDomain(normalized)) {
      setErrorDomain("فرمت دامنه صحیح است.");
      setState("validDomainText");
      setDomain(normalized);
    } else {
      setErrorDomain("فرمت دامنه صحیح نیست.");
      setState("invalidDomainText");
      //onChange(null);
    }
  };

  const clearField = () => {
    setValueDomain("");
    setErrorDomain("");
    onChange(null);
    // با ref فوکوس بگیر
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <ModalComponent
      open={open}
      onClose={onClose}
      title="بررسی دامنه"
      body={
        <div className="p-5 space-y-4">

          <div className="relative flex gap-3">
            <input
              dir="ltr"
              ref={inputRef}
              value={domain}
              onChange={(e) => {
                handleChange();
                setDomain(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="example.com"
              id="txtNewDomain"
              style={{
                boxShadow: {
                  loading: "#a948ddff 0px 0px 12px",
                  available: "#84dd48ff 0px 0px 12px",
                  taken: "#dd4848ff 0px 0px 12px",
                  error: "#f85109ff 0px 0px 12px",
                  idle: "#323232ff 0px 0px 6px",
                  invalidDomainText: "#e7000b 0px 0px 12px",
                  validDomainText: "#323232ff 0px 0px 6px",

                }[state]
              }}
              className={"w-full px-4 py-3 rounded-lg bg-[#091015] outline-none text-white text-left " +
                {
                  loading: "border border-[#a948ddff] focus:border-[#a948ddff]",
                  available: "border border-[#84dd48ff] focus:border-[#84dd48ff]",
                  taken: "border border-[#dd4848ff] focus:border-[#dd4848ff]",
                  error: "border border-[#f85109ff] focus:border-[#f85109ff]",
                  idle: "border border-[#d8d8d8ff] focus:border-[#d8d8d8ff]",
                  invalidDomainText: "border border-[#e7000b] focus:border-[#f7111dff]",
                  validDomainText: "border border-[#76e039ff] focus:border-[#84dd48ff]",
                }[state]
              }
            />

            {/* Icons container */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Paste */}
              <PasteToClipboardButton show={true} elementById="txtNewDomain" />
              {/* Copy */}
              <CopyToClipboardButton show={true} elementById="txtNewDomain" />
              {/* Clear */}
              <ClearInputValueButton show={true} elementById="txtNewDomain" />
            </div>
            <button
              onClick={handleConfirm}
              disabled={state !== "idle" && state !== "validDomainText"}
              style={{
                boxShadow: {
                  loading: "0px 0px 12px #a948ddff",
                  available: "0px 0px 12px #84dd48ff",
                  taken: "0px 0px 12px #dd4848ff",
                  error: "0px 0px 12px #f85109ff",
                  idle: "0px 0px 6px #323232ff",
                  invalidDomainText: "0px 0px 12px #e7000b",
                  validDomainText: "0px 0px 6px #323232ff",
                }[state],
                color: {
                  loading: "#a948ddff",
                  available: "#84dd48ff",
                  taken: "#dd4848ff",
                  error: "#f85109ff",
                  idle: "#323232ff",
                  invalidDomainText: "#e7000b",
                  validDomainText: "#323232ff",
                }[state],
              }}
              className={"px-6 py-3 rounded-lg text-xl " +
                {
                  loading: "bg-purple-500 text-white hover:bg-purple-600 cursor-not-allowed",
                  available: "bg-green-500 text-white hover:bg-green-600 cursor-not-allowed",
                  taken: "bg-red-500 text-white hover:bg-red-600 cursor-not-allowed",
                  error: "bg-orange-500 text-white hover:bg-orange-600 cursor-not-allowed",
                  idle: "bg-white text-black hover:bg-white/90 cursor-pointer",
                  invalidDomainText: "bg-red-500 text-white hover:bg-red-600 cursor-not-allowed",
                  validDomainText: "bg-white text-black hover:bg-white/90 cursor-pointer",

                }[state]
              }
            >
              {state === "loading" && <span className="text-purple-100 flex"><Loader2 className="animate-spin inline" />پردازش...</span>}
              {state === "available" && <span className="text-white flex"><Check className="inline" /> آزاد</span>}
              {state === "taken" && <span className="text-white flex"><Ban className="inline" />رزرو </span>}
              {state === "error" && <span className="text-white flex"><X className="inline" />خطا</span>}
              {(state === "idle" || state === "validDomainText") && <span className="text-black-800 flex"><Search className="inline" /><span className="inline">بررسی</span></span>}
              {state === "invalidDomainText" && <span className="text-white flex"><X className="inline" /> اشتباه</span>}
            </button>
            {/*loading || !domain ? #84dd48ff  "#ffd8b3":#7be8ff "#dd8448"*/}

          </div>
          {/* <ElectricBorder key={state} borderColor={
            {
              loading: "#a948ddff",
              available: "#84dd48ff",
              taken: "#dd4848ff",
              error: "#f85109ff",
              idle: "#848484ff",
              invalidDomainText: "#e7000b",
              validDomainText: "#84dd48ff"
            }[state]
          } glowColor={
            {
              loading: "#a948ddff",
              available: "#84dd48ff",
              taken: "#dd4848ff",
              error: "#f85109ff",
              idle: "#848484ff",
              invalidDomainText: "#e7000b",
              validDomainText: "#84dd48ff"
            }[state]
          } electricColor={
            {
              loading: "#a948ddff",
              available: "#84dd48ff",
              taken: "#dd4848ff",
              error: "#f85109ff",
              idle: "#848484ff",
              invalidDomainText: "#e7000b",
              validDomainText: "#84dd48ff"
            }[state]} borderRadius={24}> */}
          {/* Animated status row */}
          <ElectricBorder borderColor={"border border-rose-300"} glowColor={"shadow-pink-300"}
            electricColor={"#a948ddff"} borderRadius={"rounded-xl"}>
            <motion.div
              layout
              initial={false}
              animate={rowVariants[state]}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="rounded-xl p-4 flex items-center justify-between"
            >

              <div className="flex items-center gap-3">
                {/* left icon based on state */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                  {state === "loading" && <Loader2 className="animate-spin" />}
                  {state === "available" && <TickAnimation show={true} />}
                  {state === "taken" && <X className="text-white" />}
                  {state === "error" && <X className="text-white" />}
                  {state === "idle" && <GlobeLock className="text-white" />}
                  {state === "invalidDomainText" && <X className="text-white" />}
                  {state === "validDomainText" && <TickAnimation show={true} />}
                </div>
                {/* <Check className="text-green-600" /> */}
                <div>
                  <div className="text-sl font-semibold" style={{ color: rowVariants[state].color }}>
                    <Typewriter key={state} text={
                      {
                        loading: "در حال بررسی...",
                        available: `این دامنه آزاد است`,
                        taken: `این دامنه ثبت شده است`,
                        error: `خطا: ${error || "مشکلی رخ داد"}`,
                        idle: "وضعیت: آماده بررسی دامنه مورد نظر شما",
                        invalidDomainText: errorDomain,
                        validDomainText: errorDomain
                      }[state]
                    } speed={70} />

                  </div>
                  <BadgeInfo onClick={() => {
                    setOpenTooltipId(openTooltipId === "ttpDomainInfo" ? null : "ttpDomainInfo");
                  }} onMouseEnter={() => {
                    setOpenTooltipId(openTooltipId === "ttpDomainInfo" ? null : "ttpDomainInfo");
                  }}
                    onMouseLeave={() => { setOpenTooltipId(null); }}
                    className={"w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-900" + available ? "hidden" : "block"} />
                  <MotionToolTip
                    id="ttpDomainInfo"
                    show={openTooltipId === "ttpDomainInfo"}
                    body=
                    {state === "taken" && data && data.registrar && (
                      <span>
                        <p><strong>Registrar:</strong> {data.registrar}</p> <p><strong>Expires:</strong> {data.expires || "—"}</p>
                      </span>
                    )} />
                  {/* sub text / details */}
                  <div className={"text-sm  mt-1" +
                    (state === "available" && "text-green-400") ||
                    (state === "error" && "text-red-400") ||
                    (state === "idle" && "text-orange-400") ||
                    (state === "loading" && "text-gray-400")
                  }>
                    {/* <Typewriter text={(state === "available" && "می‌توانید این دامنه را ثبت کنید.") ||
                    (state === "error" && "لطفاً دوباره تلاش کنید یا بعداً بررسی کنید.") ||
                    (state === "idle" && "نام دامنه را وارد کنید سپس بررسی کنید.") ||
                    (state === "loading" && "در حال اتصال به سرویس whois ...")} duration={3} /> */}

                  </div>

                </div>
              </div>


              {/* Right actions */}
              <div className="flex items-center gap-2">
                {/* Buy button (enabled only if available) */}

                {state === "available" && (
                  <ShoppingCart size={30} className="text-green-200" />
                )}

                {/* WHOIS raw / details button if taken */}
                {state === "taken" && (
                  <button
                    onClick={() => {
                      // show full whois in new tab or modal (simple: open raw JSON in new tab)
                      const json = JSON.stringify(data?.raw || {}, null, 2);
                      const w = window.open();
                      w.document.open();
                      w.document.write(`<pre style="white-space:pre-wrap;background:#0b0b0b;color:#fff;padding:16px;">${json.replace(/</g, '&lt;')}</pre>`);
                      w.document.close();
                    }}
                    className="px-3 py-2 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10"
                  >
                    مشاهده WHOIS
                  </button>
                )}
              </div>
            </motion.div>
          </ElectricBorder>
        </ div>
      }
      footer={""}
    />
  );
}
