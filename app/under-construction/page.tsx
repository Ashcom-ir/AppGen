"use client";

import { motion } from "framer-motion";
import { Rocket, Star, Hammer } from "lucide-react";

export default function UnderConstruction() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 text-white">
      
      {/* --- Background Animation (Orbs) --- */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[20%] right-[-5%] w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
           animate={{ 
            scale: [1, 1.5, 1], 
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      {/* --- Main Content Card (Glassmorphism) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-10 text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl max-w-2xl mx-4"
      >
        
        {/* Icon Animation */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full shadow-lg">
            <Rocket size={48} className="text-white" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
          چیزی شگفت‌انگیز <br/> در راه است...
        </h1>

        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          ما  در حال  ساختن  پلتفرمی  هستیم  که  دنیای  سفارش  نرم‌افزار  را متحول  می‌کند.
          <br />
          طراحی سایت، اپلیکیشن و سیستم‌های هوشمند، ساده‌تر  از  همیشه.
        </p>

        {/* Progress Bar Simulation */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
          ></motion.div>
        </div>
        <p className="text-xs text-gray-400 mb-8">پیشرفت پروژه: ۷۵٪</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
               <Star size={18} /> خبرم کن
            </button>
            <button className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition flex items-center gap-2">
               <Hammer size={18} /> ارتباط با ما
            </button>
        </div>

      </motion.div>

      <footer className="absolute bottom-4 text-gray-500 text-sm">
        © ۲۰۲۵ تمام حقوق محفوظ است
      </footer>
    </main>
  );
}