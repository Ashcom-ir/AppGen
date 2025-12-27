"use client";
import { useState,useEffect } from "react";

import DomainCheckModal from "@/components/ui/DomainCheckModal";
import OptionGroup from "@/components/OptionGroup";
import { Globe, Server, Box, ShoppingCart, Search, User, NotebookPen, BadgeQuestionMark } from "lucide-react";
import NumberSlider from "@/components/ui/controls/NumberSlider";
import NumberUpDown from "@/components/ui/controls/NumberUpDown";
import EasyDialog from "@/components/ui/EasyDialog";
import Toast from "@/components/ui/Toast";
import ProgressBar from "@/components/ui/controls/ProgressBar";
import NumberPriceSwitcher from "@/components/ui/controls/NumberPriceSwitcher";
import HoldToConfirmCircle from "@/components/ui/controls/HoldToConfirmCircle";
import HoldToConfirmLine from "@/components/ui/controls/HoldToConfirmLine";
import IosSlider from "@/components/ui/controls/IosSlider";
import SwipeAction from "@/components/ui/controls/SwipeAction";
import RadioAnimation, { RadioGroup } from "@/components/ui/controls/RadioAnimation";
import ContextMenu from "@/components/ui/controls/ContextMenu";
import RippleLoading from "@/components/ui/controls/RippleLoading";
import CharactersRemaining from "@/components/ui/controls/CharactersRemaining"
import Notifications from "@/components/ui/controls/Notifications"
import NotificationsDynamicIsland from "@/components/ui/controls/NotificationsDynamicIsland"
import CircleProgress from "@/components/ui/controls/CircleProgress"
import PaymentSuccess from "@/components/ui/fullpage/PaymentSuccess"
import Modal from "@/components/ui/Modal";
import InputText from '@/components/ui/controls/input/InputText';
import InputPassword from '@/components/ui/controls/input/InputPassword';
import Typewriter from "@/components/ui/Typewriter";
import FingerprintPattern from "@/components/ui/svg/FingerprintPattern";
import IndicatorNumberFlip from "@/components/ui/controls/IndicatorNumberFlip";
import Button from "@/components/ui/controls/buttons/Button";
import InputEmail from "@/components/ui/controls/input/InputEmail";
import { sendEmail } from "@/lib/sendEmail";
import Unlock from "@/components/ui/svg/Unlock";
import Copy from "@/components/ui/svg/Copy";
import Check from "@/components/ui/svg/Check";
import Badge from "@/components/ui/Badge";

export default function WebsiteClientPage() {
      const [open, setOpen] = useState(false);
      const [openModalId, setOpenModalId] = useState(null);
      const [numValue, setNumValue] = useState(0);
      const [val, setVal] = useState('opt2');
      const [CharactersRemainingValue, setCharactersRemainingValue] = useState("");
      const [html, setHtml] = useState("");

      useEffect(() => {
            (async () => {
                  const res = await fetch("/html/emails/activation-code.html");
                  let text = await res.text();

                  const vars = { name: "ASh", link: "#" };
                  for (const [key, value] of Object.entries(vars)) {
                        text = text.replaceAll(`{{${key}}}`, value);
                  }

                  setHtml(text);
            })();
      }, []);
      //setOpen(true);app-gen\\.html
      const handleCheckboxChange = (v) => {
            console.log("parent got checkbox:", v);
            if (v) {
                  console.log("opening modal");
                  setOpen(true);
            }

      }
      /*       document.querySelectorAll("input").forEach(input => {
                  input.addEventListener("contextmenu", e => e.preventDefault());
            }); */

      return (

            <div className="p-8 max-w-4xl mx-auto space-y-6">
                  <button
                        className="px-2 py-2 border border-gray-700 rounded-full bg-white/5 text-violet-500 hover:bg-white/3 hover:ring-white/20 hover:text-violet-400 transition-all duration-500 ease-in-out cursor-pointer"
                        onClick={() => {
                              setOpenModalId("mdlLogin");
                              const txtMobile = document.getElementById(`txtMobile_1`);
                              const txtGetSmsCode = document.getElementById(`txtGetSmsCode_0`);
                              txtMobile?.focus();
                              txtGetSmsCode?.focus();
                        }}>
                        <User className="" />
                  </button>
                  <button
                        className="px-2 py-2 border border-gray-700 rounded-full bg-white/5 text-rose-500 hover:bg-white/3 hover:ring-white/20 hover:text-violet-400 transition-all duration-500 ease-in-out cursor-pointer"
                        onClick={() => {
                              setOpenModalId("mdlVerify");
                              /* const txtMobile = document.getElementById(`txtMobile_1`);
                              const txtGetSmsCode = document.getElementById(`txtGetSmsCode_0`);
                              txtMobile?.focus();
                              txtGetSmsCode?.focus(); */
                        }}>
                        <User className="" />
                  </button>
                  <button
                        className="px-2 py-2 border border-gray-700 rounded-full bg-white/5 text-violet-500 hover:bg-white/3 hover:ring-white/20 hover:text-violet-400 transition-all duration-500 ease-in-out cursor-pointer"
                        onClick={async () => {
                              try {
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
                        }}>
                        <Server className="" />
                  </button>

                  {<DomainCheckModal
                        open={open}
                        onClose={() => setOpen(false)}
                  />}

                  <h1 onClick={console.log("010101")} className="text-3xl font-bold text-white">پیکربندی سفارش — وب‌سایت</h1>

                  {/* App */}
                  <OptionGroup
                        title="اپلیکیشن"
                        icon={<Box className="text-purple-400" />}
                        description={"طراحی و تولید اپلیکیشن اندروید - iOS - ویندوز - وب"}
                        childrenItems={[
                              {
                                    label: "اپلیکیشن کراس پلتفرم قابل اجرا روی تمام سیستم عامل ها",
                                    children: [
                                          { label: "زبان: React" },
                                          { label: "دیتابیس: " },
                                    ],
                              },
                              {
                                    label: "اپلیکیشن iOS",
                                    children: [
                                          { label: "نصب وردپرس" },
                                          { label: "قالب پایه" },
                                          { label: "افزونه: فروشگاه" },
                                          { label: "افزونه: فرم تماس" },
                                          { label: "افزونه: سئو (Yoast)" },
                                    ],
                              },
                              {
                                    label: "اپلیکیشن اندروید",
                                    children: [
                                          { label: "زبان: Node/PHP" },
                                          { label: "دیتابیس: MySQL/Postgres" },
                                    ],
                              },
                              {
                                    label: "اپلیکیشن ویندوزی",
                                    children: [
                                          { label: "زبان: Node/PHP" },
                                          { label: "دیتابیس: MySQL/Postgres" },
                                    ],
                              },

                              {
                                    label: "اپلیکیشن تحت وب",
                                    children: [
                                          { label: "زبان: Node/PHP" },
                                          { label: "دیتابیس: MySQL/Postgres" },
                                    ],
                              },

                        ]}
                  />
                  {/* وب‌سایت */}
                  <OptionGroup
                        title="وب‌سایت"
                        icon={<Box className="text-purple-400" />}
                        description={"وبسایت استاتیک و داینامیک - وبسایت وردپرسی"}
                        childrenItems={[
                              {
                                    label: "وردپرس",
                                    children: [
                                          { label: "نصب وردپرس" },
                                          { label: "قالب پایه" },
                                          { label: "افزونه: فروشگاه" },
                                          { label: "افزونه: فرم تماس" },
                                          { label: "افزونه: سئو (Yoast)" },
                                    ],
                              },
                              {
                                    label: "تولید از پایه (صفحات استاتیک)",
                                    children: [
                                          { label: "فرمت سی اس اس: css | scss | sass | less" },
                                          { label: "فرمت تایپ اسکریپت : ts | jsx | tsx" },
                                          { label: "فرمت جاوا اسکریپت یا جی کوئری: js" },
                                          { label: "فرمت اچ تی ام ال: html" },
                                          { label: "فرمت ایکس ام ال: xml" },
                                          { label: "فرمت جی سن: json" }

                                    ],
                              },

                        ]}
                  />

                  {/* فروشگاه آنلاین */}
                  <OptionGroup
                        title="فروشگاه آنلاین"
                        icon={<ShoppingCart className="text-yellow-400" />}
                        description={"فروشگاه آنلاین داینامیک یا ووکامرس"}
                        childrenItems={[
                              {
                                    label: "تولید از پایه (داینامیک)",
                                    children: [
                                          { label: "پنل مدیریت" },
                                          { label: "درگاه پرداخت" },
                                          { label: "سبد خرید" },
                                    ],
                              },
                              {
                                    label: "وردپرس (ووکامرس)",
                                    children: [
                                          { label: "نصب ووکامرس" },
                                          { label: "افزونه پرداخت" },
                                          { label: "افزونه ارسال" },
                                    ],
                              },
                        ]}
                  />

                  {/* سئو */}
                  <OptionGroup
                        title="سئو"
                        icon={<Search className="text-teal-400" />}
                        description={"افزودن کلمات کلیدی -خرید گوگل ادز "}
                        childrenItems={[
                              {
                                    label: "گوگل ادز",
                                    children: [
                                          { label: "پلن 10 دلاری" },
                                          { label: "پلن 20 دلاری" },
                                          { label: "پلن 50 دلاری" },
                                    ],
                              },
                              {
                                    label: "کلمات کلیدی",
                                    children: [
                                          { label: "مدیریت کلمات کلیدی (اضافه/حذف)" }, // actual input manager can be separate
                                    ],
                              },
                        ]}
                  />
                  {/* دامنه */}
                  <OptionGroup
                        title="دامنه"
                        icon={<Globe className="text-indigo-400" />}
                        description={"خرید / استعلام / انتقال دامنه"}
                        childrenItems={[
                              { label: "خرید یا استعلام دامنه" },
                              { label: "خودم دامنه دارم" },
                        ]}
                        parSetOpen={handleCheckboxChange}

                  />

                  {/* هاست */}
                  <OptionGroup
                        title="هاست"
                        icon={<Server className="text-cyan-400" />}
                        description={"انتخاب انواع هاست"}
                        childrenItems={[
                              { label: "هاست 100 مگابایت" },
                              { label: "هاست 200 مگابایت" },
                              { label: "هاست 500 مگابایت" },
                              { label: "هاست 1 گیگابایت" },
                        ]}
                  />

                  {/* سرور مجازی */}
                  <OptionGroup
                        title="سرور مجازی"
                        icon={<Server className="text-red-400" />}
                        description={"انتخاب سرور مجازی"}
                        childrenItems={[
                              { label: "CPU: 1 vCPU" },
                              { label: "CPU: 2 vCPU" },
                              { label: "CPU: 4 vCPU" },
                              { label: "RAM: 8GB" },
                              { label: "RAM: 16GB" },
                        ]}
                  />


                  <NumberSlider
                        min={0}
                        max={100}
                        step={1}
                        value={0}
                        thumbColor="#9911ff"
                        trackColor="#e5e7eb"
                        trackFillColor="#1d2628"
                        onChange={(val) => console.log("Value:", val)}
                  />
                  <NumberUpDown min={0}
                        max={100}
                        step={1}
                        fontSize={"2rem"}
                        color={"#ffffffff"}
                        buttonColor={"#9911ffff"}
                        iconBorderColor={"#e5e7eb"}
                        onChange={(v) => {
                              setNumValue(v);
                              console.log("Value changed:", v);
                        }}
                  />

                  <Toast
                        title="توجه"
                        description="بخش توضیجات"
                        triggerText="Toast"
                        backgroundColor="#0e1616"
                  />
                  <Notifications
                        title="توجه"
                        description="بخش توضیجات"
                        triggerText="Notifications"
                        backgroundColor="#0e161631"
                  />
                  <NotificationsDynamicIsland
                        title="توجه"
                        description="بخش توضیجات"
                        triggerText="NotificationsDynamicIsland"
                        backgroundColor="#0e1616"
                  />
                  <CircleProgress value={80} />
                  <ProgressBar progress={65} isVisible={true}
                        borderColor="border-custom-gray-900"
                        backColor="bg-custom-gray-900"
                        fillColor="bg-purple-500" />
                  <NumberPriceSwitcher
                        monthlyPrice={15}
                        yearlyPrice={120}
                        monthlyLabel="Monthly Plan"
                        yearlyLabel="Yearly Plan"
                        monthlySuffix="/mo"
                        yearlySuffix="/yr"
                  />
                  <CharactersRemaining
                        max={10}
                        onValueChange={setCharactersRemainingValue}
                  />

                  <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={() => console.log(CharactersRemainingValue)}
                  >
                        Print Value
                  </button>
                  <HoldToConfirmCircle />
                  <HoldToConfirmLine />
                  <IosSlider />
                  <ContextMenu />
                  <RippleLoading />
                  <SwipeAction
                        rightBgClass="bg-green-600"
                        leftBgClass="bg-red-700"
                        onSwipeRight={() => console.log("Archived")}
                        onSwipeLeft={() => console.log("Deleted")}
                  />
                  <RadioGroup name="group1" defaultValue="opt2">
                        <RadioAnimation optionId="opt1" label="Option One" />
                        <RadioAnimation optionId="opt2" label="Option Two" />
                        <RadioAnimation optionId="opt3" label="Option Three" />
                  </RadioGroup>
                  <PaymentSuccess />
                  {/* Modal */}
                  <Modal
                        id='mdlLogin'
                        electricBorder="border"
                        electricBorder2="border-2"
                        electricBorderColor="border-pink-500"
                        electricColor="--color-pink-500"
                        electricBorderRadius="rounded-xl"
                        electricGlowColor="shadow-pink-300"
                        open={openModalId === "mdlLogin"}
                        closeOnBackdrop={false}
                        hasElectricBorder={true}
                        animOpenModal="slide-left"
                        onClose={() => setOpenModalId(null)}
                        title={
                              <div className="flex">
                                    <span className="flex justify-center items-center w-12 h-12 border border-pink-300/10 bg-pink-400/10 rounded-full p-2">
                                          <FingerprintPattern size={30} />
                                    </span>
                                    <span className="p-2 text-[21px] text-pink-200">ورود به حساب کاربری</span>
                              </ div>
                        }
                        body={
                              <div className="m-5 space-y-4">
                                    <InputEmail value='' normalBorderColor='border-white/10'
                                          filledBorderColor='border-emerald-500/40' />
                                    {/* <LoginMobileNumber /> */}
                              </ div>

                        }
                        footer=''
                  />
                  <Modal
                        id='mdlVerify'
                        electricBorder="border"
                        electricBorder2="border-2"
                        electricBorderColor="border-pink-500/10"
                        electricColor="--color-pink-500"
                        electricBorderRadius="rounded-xl"
                        electricGlowColor="shadow-pink-300"
                        open={openModalId === "mdlVerify"}
                        closeOnBackdrop={false}
                        hasElectricBorder={false}
                        animOpenModal="slide-left"
                        onClose={() => setOpenModalId(null)}
                        title={
                              <div className="flex justify-between gap-1 items-center w-full">
                                    <span className="flex justify-right items-center">
                                          <span className="flex justify-center items-center w-12 h-12 border border-pink-300/10 bg-pink-400/10 rounded-full p-2">
                                                <Unlock size={30} />
                                          </span>
                                          <span className="p-2 text-[21px] text-pink-200">کد تأیید حساب کاربری</span>
                                    </span>
                                    <span className="flex justify-left items-start">
                                          <Badge icon={
                                                <Check size={16}
                                                      neon_color="--color-emerald-400"
                                                      check_strike_color="--color-emerald-300"
                                                      check_strike_drop_color="--color-emerald-200"
                                                />} titleClass='text-emerald-100 text-[12px]' title='https://appgen.ir' />
                                    </span>
                              </ div>
                        }
                        body={
                              <div className="m-5 space-y-4">
                                    <div className="m-5 flex items-center justify-center">
                                          <div dangerouslySetInnerHTML={{ __html: html }} />
                                    </div>
                                    {/* 
                                    <div style={{ direction: 'ltr' }} className="flex gap-3 items-center justify-center ">
                                          <span className="min-w-8 text-center rounded-lg bg-neutral-secondary-medium pt-2 px-2 py-1 inset-ring inset-ring-emerald-600/50">
                                                <span className="text-xl font-medium text-emerald-100/70">1</span>
                                          </span>
                                          <span className="min-w-8 text-center rounded-lg bg-neutral-secondary-medium pt-2 px-2 py-1 text-xs font-medium inset-ring inset-ring-emerald-600/50">
                                                <span className="text-xl font-medium text-emerald-100/70">2</span>
                                          </span>
                                          <span className="min-w-8 text-center rounded-lg bg-neutral-secondary-medium pt-2 px-2 py-1 text-xs font-medium inset-ring inset-ring-emerald-600/50">
                                                <span className="text-xl font-medium text-emerald-100/70">3</span>
                                          </span>
                                          <span className="min-w-8 text-center rounded-lg bg-neutral-secondary-medium pt-2 px-2 py-1 text-xs font-medium inset-ring inset-ring-emerald-600/50">
                                                <span className="text-xl font-medium text-emerald-100/70">4</span>
                                          </span>
                                          <button className="w-12 h-12 pt-2 px-2 py-1 rounded-full bg-neutral-secondary-medium inset-ring inset-ring-rose-300/11">
                                                <span className="transition-all duration-500 ease-in-out cursor-pointer text-gray-500 hover:text-white"
                                                      //onClick={copyToClipboard} onClick={navigator.clipboard.writeText("1234")}
                                                >
                                                      <Copy size={30} color = "var(--color-rose-200)" />
                                                </span>
                                          </button>
                                    </div> */}
                                    {/* <LoginMobileNumber /> */}
                              </ div>

                        }
                        footer=''
                  />
            </div >
      );
}
