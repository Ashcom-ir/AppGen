import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";

export default function ButtonShowHidePassword({ elementById, show = true }) {
      const [showPassword, setShowPassword] = useState(false);
      const [showTooltip, setShowTooltip] = useState(false);
      const [showTooltipHidePass, setShowTooltipHidePass] = useState(false);

      // 🔥 در اولین لود هیچ Tooltipی نمایش داده نشود
      useEffect(() => {
            setShowTooltip(false);
            setShowTooltipHidePass(false);
      }, []);

      const onClickShowHide = () => {
            try {
                  const input = document.getElementById(elementById);
                  input.type = showPassword ? "password" : "text";

                  const next = !showPassword;
                  setShowPassword(next);

                  if (next) {
                        setShowTooltip(false);
                        setShowTooltipHidePass(true);
                  } else {
                        setShowTooltip(true);
                        setShowTooltipHidePass(false);
                  }
            } catch (err) { }
      };

      const handleMouseEnter = () => {
            if (showPassword) {
                  setShowTooltip(false);
                  setShowTooltipHidePass(true);
            } else {
                  setShowTooltip(true);
                  setShowTooltipHidePass(false);
            }
      };

      const handleMouseLeave = () => {
            setShowTooltip(false);
            setShowTooltipHidePass(false);
      };

      return (
            <div className={`${show ? "relative inline-block" : "hidden invisible"}`}>
                  <button
                        className={`flex w-5 h-6 transition-all duration-500 ease-in-out cursor-pointer text-gray-500 ${showPassword ? "hover:text-rose-400" : "hover:text-green-400"}`}
                        onClick={onClickShowHide}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                  >
                        <Eye className={`${!showPassword ? "hidden invisible" : ""}`} />
                        <EyeOff className={`${showPassword ? "hidden invisible" : ""}`} />
                  </button>

                  {/* Tooltip نمایش رمز عبور */}
                  <Tooltip
                        show={showTooltip}
                        body={"نمایش کلمه عبور"}
                        bgColor="bg-green-600"
                        borderColor="border border-green-600/10"
                        textColor="text-white "
                  />

                  {/* Tooltip مخفی کردن رمز عبور */}
                  <Tooltip
                        show={showTooltipHidePass}
                        body={"مخفی کردن کلمه عبور"}
                        bgColor="bg-rose-600"
                        borderColor="border border-rose-600/10"
                        textColor="text-white "
                  />
            </div>
      );
}
