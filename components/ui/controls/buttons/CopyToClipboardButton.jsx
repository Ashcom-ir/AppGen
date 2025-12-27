import { useState } from "react";
import { Copy } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import TickAnimation from "@/components/ui/TickAnimation";

export default function ButtonCopyToClipboard({ elementById,show=true }) {
      const [showTooltip, setShowTooltip] = useState(false);
      const [showTickAnimation, setShowTickAnimation] = useState(false);
      const copyToClipboard = () => {
            try {
                  if (showTickAnimation) return;
                  const input = document.getElementById(elementById);
                  input?.select();
                  navigator.clipboard.writeText(input.value || "");
                  setShowTickAnimation(true)
                  setShowTooltip(true);
                  setTimeout(() => {
                        setShowTickAnimation(false)
                  }, 2000);
            } catch (err) { }
      };
      return (
            <div className={`${show?"relative inline-block" : "hidden invisible"}`}>
                  <button className="flex w-5 h-6 transition-all duration-500 ease-in-out cursor-pointer text-gray-500 hover:text-white"
                        onClick={copyToClipboard}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                  >
                        <Copy className={`${showTickAnimation ? 'invisible' : ''}`} />
                        <TickAnimation show={showTickAnimation} color="text-green-500" />
                  </button>
                  <Tooltip
                        show={showTooltip}
                        body={"کپی"}
                        bgColor="bg-gray-900"
                        borderColor="border border-white/10"
                        textColor="text-white "
                  />
                  <Tooltip
                        show={showTickAnimation}
                        body={"کپی شد"}
                        bgColor="bg-green-900"
                        borderColor="border border-green-600/10"
                        textColor="text-white "
                  />
            </div>

      );
}
