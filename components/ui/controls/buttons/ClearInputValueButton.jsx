import { useState } from "react";
import { X } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import TickAnimation from "@/components/ui/TickAnimation";

export default function ClearInputValueButton({ elementById,onClearText,show=true }) {
      const [showTooltip, setShowTooltip] = useState(false);
      const [showTickAnimation, setShowTickAnimation] = useState(false);
      const clearInput = () => {
            try {
                  if (showTickAnimation) return;
                  onClearText?.("");
                  const input = document.getElementById(elementById);
                  input?.focus();
                  setShowTickAnimation(true)
                  setShowTooltip(true);
                  setTimeout(() => {
                        setShowTickAnimation(false)
                  }, 2000);
            } catch (err) { }
      };
      return (
            <div className={`${show?"relative inline-block" : "hidden invisible"}`}>
                  <button className="flex w-5 h-6 cursor-pointer transition-all duration-500 ease-in-out text-gray-500 hover:text-red-400"
                        onClick={clearInput}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                  >
                        <X className={`${showTickAnimation ? 'invisible' : ''}`} />
                        <TickAnimation show={showTickAnimation} color="text-green-500" />
                  </button>
                  <Tooltip
                        show={showTooltip}
                        body={"پاک کردن"}
                        bgColor="bg-gray-900"
                        borderColor="border border-white/10"
                        textColor="text-white "
                  />
                  <Tooltip
                        show={showTickAnimation}
                        body={"پاک شد"}
                        bgColor="bg-green-900"
                        borderColor="border border-green-600/10"
                        textColor="text-white "
                  />
            </div>

      );
}
