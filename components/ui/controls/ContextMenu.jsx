import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
  Eye,
  Plus,
} from "lucide-react";

/**
 * PURE REACT CONTEXT MENU — بدون هیچ پکیج خارجی
 * فقط React + Framer‑Motion + Lucide
 * کاملاً شبیه نمونه motion.dev با انیمیشن، ساب‌منو، استایل و رفتار درست.
 *
 * استفاده:
 *   import ContextMenu from './ContextMenu.jsx'
 *   <ContextMenu />
 */

export default function ContextMenu() {
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const close = () => setVisible(false);
    window.addEventListener("click", close);
    window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close);
    };
  }, []);

  const onRightClick = (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setMenuPos({ x, y });
    setVisible(true);
    setSubOpen(false);
  };

  const menuMotion = {
    initial: { opacity: 0, scale: 0.96, y: -6 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.14 } },
    exit: { opacity: 0, scale: 0.96, y: -6, transition: { duration: 0.1 } },
  };

return (
  <div className="flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 select-none">
    <div
      ref={containerRef}
      onContextMenu={(e) => { e.preventDefault(); onRightClick(e); }}
      className="w-70 h-44 backdrop-blur-sm border border-white/8 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center p-6 cursor-context-menu hover:scale-102 transition-transform"
      style={{backgroundColor:'#0e1616', boxShadow: "0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)" }}
    >
      <div className="text-white text-lg font-semibold">Right click here</div>
      <div className="mt-2 text-sm text-slate-300">Pure React custom context menu</div>
    </div>

    {/* MAIN MENU */}
    <AnimatePresence>
      {visible && (
        <motion.div
          {...menuMotion}
          onContextMenu={(e) => e.preventDefault()}  // <-- جلوگیری از کلیک راست مرورگر
          className="fixed z-50 min-w-[220px] bg-black/55 backdrop-blur rounded-lg border border-white/15 py-2 px-1 shadow-xl"
          style={{ left: menuPos.x, top: menuPos.y }}
        >
          <MenuItem icon={<Copy size={16} />}>Copy</MenuItem>
          <MenuItem icon={<Edit2 size={16} />}>Rename</MenuItem>

          <Separator />

          <MenuSub
            label="Share"
            icon={<ExternalLink size={16} />}
            open={subOpen}
            setOpen={setSubOpen}
            parentPos={menuPos}
          >
            <MenuItem icon={<Eye size={16} />}>View link</MenuItem>
            <MenuItem icon={<Plus size={16} />}>Create invite</MenuItem>
          </MenuSub>

          <Separator />

          <MenuItem icon={<Trash2 size={16} />} destructive>
            Delete
          </MenuItem>

          <div className="px-2 py-2 text-xs text-slate-400">Press Esc to close</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


function MenuItem({ icon, children, destructive }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className={
        `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm outline-none transition-colors ` +
        (destructive
          ? "text-white hover:bg-rose-600 hover:text-white-100"
          : "text-white hover:bg-pink-600")
      }
      onClick={(e) => {
        e.stopPropagation();
        console.log("Clicked:", children);
      }}
    >
      <span className="w-5 h-5 flex justify-center text-slate-300">{icon}</span>
      <span className="flex-1 text-left">{children}</span>
    </motion.button>
  );
}

function Separator() {
  return <div className="h-px bg-white/6 my-1 mx-2" />;
}

function MenuSub({ label, icon, children, open, setOpen, parentPos }) {
  const subRef = useRef(null);

  const submenuMotion = {
    initial: { opacity: 0, x: 6 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 6 },
  };

 return (
  <div className="relative">
    <motion.button
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-100 hover:bg-white/6 outline-none"
    >
      <span className="w-5 h-5 flex justify-center text-slate-300">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight size={16} className="text-slate-300" />
    </motion.button>

    <AnimatePresence>
      {open && (
        <motion.div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <motion.div
            ref={subRef}
            {...submenuMotion}
            className="absolute left-[100%] top-0 ml-1 min-w-[180px] bg-white/5 backdrop-blur rounded-md border border-white/6 py-2 px-1 shadow-xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}}
