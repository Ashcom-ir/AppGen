import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import TickAnimation from "@/components/ui/TickAnimation";

export default function PasteToClipboardButton({ id = 'btnPaste', onPasteText, show = true, text_color = "text-gray-500 hover:text-white" }) {
      const [showTooltip, setShowTooltip] = useState(false);
      const [showTickAnimation, setShowTickAnimation] = useState(false);
      const handlePaste = async () => {
            try {
                  if (showTickAnimation) return;
                  const text = await navigator.clipboard.readText();
                  if (!text) return;
                  onPasteText?.(text);
                  setShowTickAnimation(true)
                  setShowTooltip(true);
                  setTimeout(() => {
                        setShowTickAnimation(false)
                  }, 2000);
            } catch (err) { }
      };
      return (
            <div className={`${show ? "relative inline-block" : "hidden invisible"}`}>
                  <button className={`${text_color} flex w-5 h-6 transition-all duration-500 ease-in-out cursor-pointer`}
                        onClick={handlePaste}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        id={id}
                  >
                        <ClipboardCheck className={`${showTickAnimation ? 'invisible' : ''}`} />
                        <TickAnimation show={showTickAnimation} color="text-emerald-500" />
                  </button>
                  <Tooltip
                        show={showTooltip}
                        body={"چسباندن"}
                        bgColor="bg-gray-900"
                        borderColor="border border-white/10 shadow-[0_0_10px] shadow-emerald-500/20"
                        textColor={text_color}
                  />
                  <Tooltip
                        show={showTickAnimation}
                        body={"متن چسبید"}
                        bgColor="bg-green-900"
                        borderColor="border border-emerald-600/10 shadow-[0_0_10px] shadow-emerald-500/20"
                        textColor={text_color}
                  />
            </div>
      );
}
