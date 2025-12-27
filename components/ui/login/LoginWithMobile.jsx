"use client";
import { useState, useEffect } from "react";
import LoginMobileNumber from "@/components/ui/login/LoginMobileNumber";
import { sendEmail } from "@/lib/sendEmail";
import Lock from "@/components/ui/svg/Lock";
import Email from "@/components/ui/svg/Email";
import PhoneCall from "@/components/ui/svg/PhoneCall";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/controls/buttons/Button";


export default function LoginWithMobile({ spanColor: mobileSpanColor, setSpanColor, handleShowEmail }) {

      return (
            <div className="w-full my-4 mx-auto">
                  <div className="flex px-4 pb-4 justify-between items-center gap-2">
                        <div className="flex items-center">
                              <span className={`${mobileSpanColor.shadow} shadow-[0_0_11px] flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 border ${mobileSpanColor.bg_border} ${mobileSpanColor.bg} rounded-full p-2`}>
                                    <PhoneCall neon_color={mobileSpanColor.neon} />
                              </span>
                              <h1 className={`${mobileSpanColor.text} font-semibold px-2 text-xl text-shadow-[0_0_11px]`}>
                                    ورود با شماره همراه
                              </h1>
                        </div>
                        <Badge
                              id="bdgSSL"
                              border="rounded-full border border-emerald-400/20"
                              bg="bg-emerald-800/8 backdrop-blur-2xl"
                              shadow="shadow-[0_0_7px] shadow-emerald-400/11"
                              padding="px-3 py-2"
                              icon={<Lock size={16} color="--color-emerald-400" />}
                              titleClass="text-[11px] sm:text-[12px]"
                              title={
                                    <a className="decoration-0" href="https://appgen.ir">
                                          <span className="text-emerald-500 text-shadow-[0_0_10px] font-segoe-ui">
                                                https://
                                          </span>
                                          <span className="text-emerald-200 text-shadow-[0_0_10px] font-segoe-ui">
                                                appgen.ir
                                          </span>
                                    </a>
                              }
                        />
                  </div>
                  <div className={`h-1 w-full border-b ${mobileSpanColor.bg_border}`} />
                  <div className="w-full sm:p-5 p-4 lg:mb-2 relative">
                        <LoginMobileNumber onColorChange={setSpanColor} />
                  </div>
                  <footer className="py-3 sm:py-2 text-center text-gray-500 text-sm">
                        <div className={`h-1 mb-5 w-full border-b ${mobileSpanColor.bg_border}`} />
                        <div className="relative flex justify-center">
                              <Button
                                    id="btnUseEmail"
                                    show={true}
                                    icon={
                                          <Email
                                                neon_color="--color-blue-400"
                                                strike_color="--color-blue-300"
                                                strike_drop_color="--color-blue-200"
                                          />
                                    }
                                    text="ورود با ایمیل"
                                    disabled={false}
                                    bg="bg-blue-800/3 hover:bg-blue-800/11 focus:bg-blue-800/12 active:bg-blue-800/26"
                                    shadow="focus:shadow-[0_0_2px_rgba(0,0,0,0.10)] hover:shadow-[0_0_2px_rgba(0,0,0,0.10)]"
                                    text_color="text-blue-100"
                                    border="border rounded-sm border-blue-400/20 hover:border-blue-400/22 focus:border-blue-400/24 active:border-blue-400/26"
                                    onClick={handleShowEmail}
                              />
                        </div>
                  </footer>
            </div>
      );
}
