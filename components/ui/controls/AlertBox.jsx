import { useState, useEffect } from 'react';
import './AlertBox.scss';
import Typewriter from "@/components/ui/Typewriter";
import { X } from "lucide-react";

export default function AlertBox({
      show = false,
      state = "idle",
      description = "",
      badge = "",
      sub_description = "",
      leftButton = "",
      showCloseBtn = false,
      autoHideSecond = 0,
      descriptionTextColor = 'text-rose-200',
      textColor = 'text-rose-200',
      borderRounded = "rounded-none",
      gradientBg = 'bg-gradient-to-br from-rose-700 to-rose-600',
      border = 'border border-rose-400/20',
      shadow = 'shadow shadow-purple-600/20',
      iconInDescription
}) {

      const [isShow, setShow] = useState(show);
      useEffect(() => {
            setTimeout(() => {
                  const el = document.getElementById('spnShowDescBadge');
                  el.classList.remove('invisible');
                  el.classList.remove('opacity-0');
                  el.classList.add('opacity-100');
            }, 8100);
      }, []);
      useEffect(() => {
            setShow(show);
      }, [show]);

      // Auto hide
      useEffect(() => {
            if (autoHideSecond > 0 && isShow) {
                  const t = setTimeout(() => setShow(false), autoHideSecond * 1000);
                  return () => clearTimeout(t);
            }
      }, [isShow, autoHideSecond]);

      const onClose = () => setShow(false);
      if (!show) return "";
      return (
            <div className={`w-full p-2 transition-all duration-500 ease-in-out overflow-hidden 
                        ${borderRounded} 
                        ${border} 
                        ${gradientBg} 
                        ${shadow} 
                        ${isShow ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                  <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                              <div className="rounded-lg flex items-center justify-center">
                                    {iconInDescription}
                              </div>
                              <div>
                                    <div className="flex items-center justify-start min-h-7 gap-1 text-sm font-semibold">
                                          <Typewriter className={descriptionTextColor} key={state} text={description} speed={100} hideAfterType={true} />
                                          <span id='spnShowDescBadge' className='opacity-0 invisible transition-opacity duration-700 ease-out'>{badge}</span>
                                    </div>
                                    <div className={`flex items-center justify-start min-h-7 gap-1 text-sm mt-2 ${textColor}`}>
                                          <Typewriter key={state} text={sub_description} speed={150} hideAfterType={true} />
                                    </div>
                              </div>
                        </div>
                        <div>
                              {showCloseBtn ? (
                                    <button
                                          onClick={onClose}
                                          className="rounded-md p-2 hover:bg-black/20 transition cursor-pointer"
                                          aria-label="Close alert"
                                    >
                                          <X size={18} />
                                    </button>
                              ) : leftButton}
                        </div>
                  </div>
            </div>
      );
}
