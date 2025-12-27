"use client";

import { motion } from "framer-motion";
import { Rocket, Monitor } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-[-15%] left-[-15%] w-[420px] h-[420px] bg-blue-700 rounded-full mix-blend-screen blur-[110px] opacity-30"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 60, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 11, repeat: Infinity }}
          className="absolute top-[25%] right-[-10%] w-[320px] h-[320px] bg-red-600 rounded-full mix-blend-screen blur-[90px] opacity-25"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200"
      >
        طراحی و توسعه  
        <br />
        وب‌سایت، اپلیکیشن و نرم‌افزار
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-loose"
      >
        سفارش آنلاین وب‌سایت، اپلیکیشن اندروید و iOS، طراحی دیتابیس  
        و توسعه نرم‌افزارهای هوشمند — سریع، ساده و کاملاً حرفه‌ای.
      </motion.p>

      <div className="flex flex-col md:flex-row gap-5 justify-center">
        <button className="px-10 py-4 rounded-xl bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition shadow-xl flex items-center gap-2">
          <Rocket size={20} /> شروع سفارش
        </button>
        <button className="px-10 py-4 rounded-xl border border-white/30 text-white text-lg hover:bg-white/10 transition flex items-center gap-2">
          <Monitor size={20} /> نمونه‌کارها
        </button>
      </div>
    </section>
  );
}
