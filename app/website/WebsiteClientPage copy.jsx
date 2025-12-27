"use client";
import { useState } from "react";
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
import InputMobileNumber from "@/components/ui/controls/input/InputMobileNumber";
import Typewriter from "@/components/ui/Typewriter";
import FingerprintPattern from "@/components/ui/svg/FingerprintPattern";
import Check from "@/components/ui/svg/Check";
import IndicatorNumberFlip from "@/components/ui/controls/IndicatorNumberFlip";
import Button from "@/components/ui/controls/buttons/Button";


export default function WebsiteClientPage() {
      const [open, setOpen] = useState(false);
      const [openModalId, setOpenModalId] = useState(null);
      const [numValue, setNumValue] = useState(0);
      const [val, setVal] = useState('opt2');
      const [CharactersRemainingValue, setCharactersRemainingValue] = useState("");
      const [mobileNumber, setMobileNumber] = useState("");
      //setOpen(true);
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
                              const inpt= document.getElementById(`txtMobile_1`);
                              inpt?.focus(); }}
                  >
                        <User className="" />
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
                              <div className="flex ">
                                    <span className="border border-pink-300/10 bg-pink-400/10 rounded-full p-2">
                                          <FingerprintPattern />
                                    </span>
                                    <span className="p-2">ورود به حساب کاربری</span>
                              </ div>
                        }
                        body={
                              <div className="m-5 space-y-4">
                                    {/* <InputText placeholder="Active" id="txtText" maxLength="10" showClearBtn={true} showCopyBtn={true} showPasteBtn={true} className="border border-pink-200 focus:border-pink-600 w-full px-4 py-3 rounded-lg bg-[#091015] outline-none text-white text-left transition-all duration-500 ease-in-out" />
                                    <InputPassword placeholder="pass" id="txtPassword" maxLength="10" showPasswordShowHideBtn={true} showClearBtn={true} showCopyBtn={false} showPasteBtn={true} className="border border-pink-200 focus:border-pink-600 w-full px-4 py-3 rounded-lg bg-[#091015] outline-none text-white text-left  transition-all duration-500 ease-in-out" />
                                     */}
                                    <InputMobileNumber id="txtMobile" name="txtMobile"
                                          onClickCheckMobile={() => {
                                                let appendMobileText = "";
                                                for (let index = 0; index < 11; index++) {
                                                      const input = document.getElementById(`txtMobile_${index}`);
                                                      input?.setAttribute("readonly", true);
                                                      appendMobileText += input?.value || "";
                                                }
                                                setMobileNumber(appendMobileText);
                                                setOpenModalId('mdlCheckMobile');
                                          }}/>

                                    {/*                                     <InputActivationCode id='divActiveCode' skinColor='#f43f5e' cursorColor='#fecdd3' />
 */}
                              </ div>
                        }
                        footer={""}
                  />
                  <Modal
                        id='mdlCheckMobile'
                        electricBorder="border"
                        electricBorder2="border-2"
                        electricBorderColor="border-pink-500/10"
                        electricColor="--color-pink-500"
                        electricBorderRadius="rounded-xl"
                        electricGlowColor="shadow-pink-300"
                        open={openModalId === "mdlCheckMobile"}
                        closeOnBackdrop={false}
                        hasElectricBorder={false}
                        animOpenModal="justme"
                        onClose={() => setOpenModalId(null)}
                        title={
                              <div className={`flex pt-2 items-center px-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out`} >
                                    <span className={`inline-flex w-10 h-10 rounded-full items-center bg-pink-400/10 px-2 py-1 text-xs font-medium text-rose-100 inset-ring inset-ring-pink-300/10 transition-all duration-500 ease-in-out`} >
                                          <BadgeQuestionMark style={{ display: "inline-block" }} />
                                    </span>
                                    <span className={`text-xl text-rose-100 transition-all duration-500 ease-in-out`} >
                                          <span className="p-2">تایید شماره همراه</span>
                                    </span>
                              </div>
                        }
                        body={
                              <div className="text-14 mt-4 mb-5 text-white/60 leading-[1.4]">
                                    <>
                                          <Typewriter show={true} text="شماره همراه وارد شده را تایید می کنید؟" speed={70} />
                                          <div style={{ direction: 'ltr' }} className="mt-3 flex gap-1 justify-center">

                                                {[...Array(11)].map((_, i) => (
                                                      <div
                                                            key={`inpCheckMobile_${i}`}
                                                            id={`inpCheckMobile_${i}`}
                                                            name={`inpCheckMobile_${i}`}
                                                            className="border rounded-md border-green-300/12 px-1 py-2">
                                                            <IndicatorNumberFlip
                                                                  number={mobileNumber.split("")[i]}
                                                                  fontSize={22}
                                                                  color="var(--color-green-300)"
                                                            /></div>
                                                ))}

                                          </div>
                                          <div className="flex mt-4 w-full justify-between gap-12">
                                                <Button id="btnSubmitMobile"
                                                      show={true}
                                                      icon={<Check
                                                            neon_color="--color-emerald-400"
                                                            check_strike_color="--color-emerald-300"
                                                            check_strike_drop_color="--color-emerald-200"
                                                      />}
                                                      text={"تایید میکنم"}
                                                      disabled={false}
                                                      bg_color='--color-emerald-600'
                                                      text_color='--color-emerald-100'
                                                      border_color='--color-emerald-300'
                                                      border='border'
                                                      onClick={() => { console.log("کد فعالسازی به شماره همراه شما پیامک شد.") }} />
                                                <Button id="btnEditMobile"
                                                      icon={<NotebookPen />}
                                                      show={true}
                                                      text={"ویرایش میکنم"}
                                                      disabled={false}
                                                      bg_color='--color-blue-600'
                                                      text_color='--color-blue-100'
                                                      border_color='--color-blue-300'
                                                      border='border'
                                                      onClick={() => {
                                                            {
                                                                  {
                                                                        setOpenModalId(null);
                                                                        setOpenModalId("mdlLogin");
                                                                        for (let index = 1; index < 11; index++) {
                                                                              const input = document.getElementById(`txtMobile_${index}`);
                                                                              input?.removeAttribute("readonly");
                                                                        }
                                                                        document.getElementById(`txtMobile_1`).focus();
                                                                  }
                                                            }
                                                      }}
                                                />
                                          </div>

                                    </>
                              </ div>
                        }
                        footer={""}
                  />
            </div>
      );
}
