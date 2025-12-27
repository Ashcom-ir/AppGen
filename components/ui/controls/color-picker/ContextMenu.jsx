"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Copy,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
  Eye,
  Plus,
} from "lucide-react";

/* ======================================================
   GLOBAL EVENT
====================================================== */
const CONTEXT_MENU_EVENT = "GLOBAL_CONTEXT_MENU_OPEN";

/* ======================================================
   CONFIG
====================================================== */
const MENU_WIDTH = 220;
const MENU_HEIGHT = 260;
const EDGE_PADDING = 8;

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function ContextMenu({ target = "body" }) {
  const id = useId(); // 👈 unique per instance

  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  /* ---------- smart positioning ---------- */
  const smartPosition = (x, y) => {
    let nx = x;
    let ny = y;

    if (x + MENU_WIDTH + EDGE_PADDING > window.innerWidth)
      nx = window.innerWidth - MENU_WIDTH - EDGE_PADDING;

    if (y + MENU_HEIGHT + EDGE_PADDING > window.innerHeight)
      ny = window.innerHeight - MENU_HEIGHT - EDGE_PADDING;

    return {
      x: Math.max(EDGE_PADDING, nx),
      y: Math.max(EDGE_PADDING, ny),
    };
  };

  /* ---------- open ---------- */
  const openMenu = e => {
    e.preventDefault();

    // 🔥 close others (but not me)
    window.dispatchEvent(
      new CustomEvent(CONTEXT_MENU_EVENT, {
        detail: { sourceId: id },
      })
    );

    const pos = smartPosition(e.clientX, e.clientY);
    setMenuPos(pos);
    setIsClosing(false);
    setIsOpen(true);
    setSubOpen(false);
  };

  /* ---------- close (with animation) ---------- */
  const closeMenu = () => {
    if (!isOpen) return;
    setIsClosing(true);
    setSubOpen(false);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 140);
  };

  /* ---------- attach contextmenu ---------- */
  useEffect(() => {
    const el =
      target === "body" ? document.body : document.querySelector(target);

    if (!el) return;

    el.addEventListener("contextmenu", openMenu);
    return () => el.removeEventListener("contextmenu", openMenu);
  }, [target]);

  /* ---------- listen global close ---------- */
  useEffect(() => {
    const onGlobalOpen = e => {
      if (e.detail?.sourceId !== id) closeMenu();
    };

    window.addEventListener(CONTEXT_MENU_EVENT, onGlobalOpen);
    return () =>
      window.removeEventListener(CONTEXT_MENU_EVENT, onGlobalOpen);
  }, [isOpen]);

  /* ---------- outside / esc ---------- */
  useEffect(() => {
    const esc = e => e.key === "Escape" && closeMenu();
    const click = () => closeMenu();
    const scroll = () => closeMenu();

    window.addEventListener("keydown", esc);
    window.addEventListener("click", click);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("keydown", esc);
      window.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
    };
  }, [isOpen]);

  /* ======================================================
     RENDER (always mounted)
  ====================================================== */
  return (
    <div
      onContextMenu={e => e.preventDefault()}
      className={`
        fixed z-50 min-w-[220px]
        bg-black/55 backdrop-blur
        rounded-lg border border-white/15
        py-2 px-1 shadow-xl
        origin-top-left
        transition-all duration-150 ease-out
        ${
          isOpen && !isClosing
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-1 pointer-events-none"
        }
      `}
      style={{ left: menuPos.x, top: menuPos.y }}
    >
      <MenuItem icon={<Copy size={16} />}>Copy</MenuItem>
      <MenuItem icon={<Edit2 size={16} />}>Rename</MenuItem>

      <div className="h-px bg-white/6 my-1 mx-2" />

      <MenuSub
        label="Share"
        icon={<ExternalLink size={16} />}
        open={subOpen}
        setOpen={setSubOpen}
      >
        <MenuItem icon={<Eye size={16} />}>View link</MenuItem>
        <MenuItem icon={<Plus size={16} />}>Create invite</MenuItem>
      </MenuSub>

      <div className="h-px bg-white/6 my-1 mx-2" />

      <MenuItem icon={<Trash2 size={16} />} destructive>
        Delete
      </MenuItem>

      <div className="px-2 py-2 text-xs text-slate-400">
        Press Esc to close
      </div>
    </div>
  );
}

/* ======================================================
   MENU ITEM
====================================================== */
function MenuItem({ icon, children, destructive }) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        console.log("Clicked:", children);
      }}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
        transition-all hover:scale-[1.02]
        ${
          destructive
            ? "text-white hover:bg-rose-600"
            : "text-white hover:bg-pink-600"
        }
      `}
    >
      <span className="w-5 h-5 flex justify-center text-slate-300">
        {icon}
      </span>
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
}

/* ======================================================
   SUB MENU
====================================================== */
function MenuSub({ label, icon, children, open, setOpen }) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-100 hover:bg-white/6 transition-all hover:scale-[1.02]">
        <span className="w-5 h-5 flex justify-center text-slate-300">
          {icon}
        </span>
        <span className="flex-1 text-left">{label}</span>
        <ChevronRight size={16} className="text-slate-300" />
      </button>

      <div
        className={`
          absolute left-full top-0 ml-1 min-w-[180px]
          bg-white/5 backdrop-blur
          rounded-md border border-white/6
          py-2 px-1 shadow-xl
          transition-all duration-150
          ${
            open
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-2 pointer-events-none"
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}
