
"use client";
import { motion } from "framer-motion";
import { Rocket, Smartphone, Monitor, Database } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Monitor size={32} />,
      title: "وب‌سایت",
      color: "from-blue-500 to-blue-700",
      list: ["طراحی سایت شخصی، شرکتی", "فروشگاه آنلاین", "سئو"],
    },
    {
      icon: <Smartphone size={32} />,
      title: "اپلیکیشن",
      color: "from-blue-500 to-blue-700",
      list: ["کراس پلتفرم (iOS, Android, Web)", "اندروید", "iOS", "وب"],
    },
    {
      icon: <Rocket size={32} />,
      title: "نرم‌افزار",
      color: "from-blue-500 to-blue-700",
      list: ["نرم‌افزار ویندوز", "سیستم‌های هوشمند", "اینترنت اشیا"],
    },
    {
      icon: <Database size={32} />,
      title: "دیتابیس",
      color: "from-blue-500 to-blue-700",
      list: ["طراحی جداول", "کوئری‌نویسی", "بهینه‌سازی دیتابیس"],
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:scale-[1.03] transition cursor-default"
        >
          <div
            className={`mb-6 p-5 rounded-full bg-gradient-to-tr ${service.color} text-white shadow-lg w-fit mx-auto`}
          >
            {service.icon}
          </div>

          <h3 className="text-2xl font-bold mb-4 text-center">
            {service.title}
          </h3>

          <ul className="text-gray-300 space-y-2 text-right leading-relaxed">
            {service.list.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
}
