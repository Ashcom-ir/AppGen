export const metadata = {
  title: "طراحی سایت، اپلیکیشن و نرم‌افزار | توسعه حرفه‌ای",
  description:
    "سفارش آنلاین وب‌سایت شخصی، شرکتی، فروشگاه آنلاین، اپلیکیشن اندروید و iOS، طراحی دیتابیس و نرم‌افزارهای هوشمند.",
  keywords:
    "طراحی سایت, سفارش سایت, طراحی اپلیکیشن, ساخت اپلیکیشن اندروید, ساخت iOS, برنامه نویسی, طراحی دیتابیس, توسعه نرم افزار",
};

import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="bg-slate-900 text-white min-h-screen">
      <Hero />
      <Services />
      <footer className="py-10 text-center text-gray-500 text-sm">
        © ۲۰۲۵ — تمام حقوق محفوظ است
      </footer>
    </main>
  );
}
