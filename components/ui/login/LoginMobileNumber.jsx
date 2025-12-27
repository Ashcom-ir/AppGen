"use client";

import { useState } from "react";
import Button from "@/components/ui/controls/buttons/Button";
import Check from "@/components/ui/svg/Check";
import Email from "@/components/ui/svg/Email";

import InputMobileNumber from "@/components/ui/controls/input/InputMobileNumber";

import InputActivationCode from "@/components/ui/controls/input/InputActivationCode";

export default function LoginMobileNumber() {

      // مراحل
      const [showConfirmDiv, setShowConfirmDiv] = useState(false);       // مرحله 1 → وارد کردن موبایل
      //const [showActivationCode, setShowActivationCode] = useState(false); // مرحله 2 → پیام ارسال کد
      const [activationCode, setActivationCode] = useState("");


      // موبایل
      const [mobile, setMobile] = useState("");

      const handleMobileChange = (arr) => {
            const value = arr.join("");
            setMobile(value);

            if (value.length < 11) {
                  return setShowConfirmDiv(false);
            }

            if (value.length === 11) {
                  setTimeout(() => {
                        document.getElementById("btnCheckMobile")?.focus();
                  }, 80);
            }
      };

      // کد فعالسازی
      const handleActiveCodeChange = (arr) => {
            const value = arr.join("");
            setActivationCode(value);

            if (value.length < 4) return;

            if (value.length === 4) {
                  setTimeout(() => {
                        document.getElementById("btnCheckActiveCode")?.focus();
                  }, 80);
            }
      };

      // → مرحله 1 → کلیک روی تایید موبایل
      const handleShowConfirm = () => {
            setAnimateOut(true);

            setTimeout(() => {
                  setShowConfirmDiv(true);   // برو مرحله 2
                  setAnimateIn(true);
                  setAnimateOut(false);
            }, 400);
      };

      // → مرحله 3 → تایید کد فعالسازی
      const handleConfirmActiveCode = () => {
            setAnimateOut(true);

            setTimeout(() => {
                  setAnimateOut(false);
                  alert("کد درست بود (اینجا مرحله ورود)");
            }, 400);
      };
      return (
            <>
                  <InputMobileNumber
                        id="txtMobile"
                        name="txtMobile"
                        onInputsChange={handleMobileChange}
                  />

                  <Button
                        id="btnCheckMobile"
                        show={mobile.length === 11}
                        icon={
                              <Check
                                    neon_color="--color-emerald-400"
                                    check_strike_color="--color-emerald-300"
                                    check_strike_drop_color="--color-emerald-200"
                              />
                        }
                        text="تایید شماره همراه"
                        bg_color="--color-emerald-600"
                        text_color="--color-emerald-100"
                        border_color="--color-emerald-300"
                        border="border"
                        onClick={handleShowConfirm}
                  />
            </>
      );
}
