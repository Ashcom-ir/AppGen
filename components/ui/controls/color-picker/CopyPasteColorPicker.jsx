
"use client";

import { useRef, useEffect } from "react";
import {
      Copy,
      ClipboardPaste,
      CloudDownload,
      ExternalLink,
      ChevronRight,
      Eye,
      Plus,
} from "lucide-react";
export default function CopyPasteColorPicker({
      isDark, gradient, color, onClickHtml, onClickExe, onClickApk,
      onClickStyle, onClickHex, onClickHsla, onClickRgba, onClickLaba, onClickPaste }) {
      const ref = useRef(null);

      return (
            <div id={`div${isDark ? "Dark" : "Light"}CopyPasteColorPicker`} className="flex flex-col items-center">
                  <div ref={ref} className="relative min-w-[340px] py-2 px-1 bg-white/22 dark:bg-black/22 backdrop-blur rounded-md border border-white/6 shadow-xl origin-top-left transition-all duration-150 ease-out"
                        style={{ background: gradient }}>
                        <div className="flex justify-center items-center">
                              <MenuItem onClick={onClickApk} hasLeftBorder={true} icon={<CloudDownload size={16} />}>APK</MenuItem>
                              <MenuItem onClick={onClickExe} icon={<CloudDownload size={16} />}>EXE</MenuItem>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <div className="flex justify-center items-center">
                              <MenuItem onClick={onClickStyle} hasLeftBorder={true} icon={<Copy size={16} />}>style</MenuItem>
                              <MenuItem onClick={onClickHtml} icon={<CloudDownload size={16} />}>Html</MenuItem>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <div className="flex justify-center items-center">
                              <MenuItem onClick={onClickHex} hasLeftBorder={true} icon={<Copy size={16} />}>HEX</MenuItem>
                              <MenuItem onClick={onClickHsla} icon={<Copy size={16} />}>hslA</MenuItem>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <div className="flex justify-center items-center">
                              <MenuItem onClick={onClickLaba} hasLeftBorder={true} icon={<Copy size={16} />}>labA</MenuItem>
                              <MenuItem onClick={onClickRgba} icon={<Copy size={16} />}>rgbA</MenuItem>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <div className="flex justify-center items-center">
                              <MenuItem onClick={onClickLaba} hasLeftBorder={true} icon={<Copy size={16} />}>VectorRgba(UE)</MenuItem>
                              <MenuItem onClick={onClickRgba} icon={<Copy size={16} />}>Vector3(UE)</MenuItem>
                        </div>
                        <div className="h-px bg-white/6 my-1 mx-2" />
                        <MenuItem onClick={onClickPaste} destructive={true} icon={<ClipboardPaste size={16} />}>Paste Any Color (CTRL+V)</MenuItem>
                  </div>
            </div>
      );
      function MenuItem({ icon, children, destructive, onClick, hasLeftBorder }) {
            return (
                  <button
                        onClick={onClick}
                        className={`${hasLeftBorder ? "border-l border-white/20" : ""} w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-shadow-[0_0_10px] text-shadow-white/20 cursor-pointer transition-all hover:scale-[1.02]
                                    ${destructive ? "text-white hover:bg-white/2" : "text-white hover:bg-white/10"}`}>
                        <span className="w-5 h-5 flex justify-center text-white text-shadow-[0_0_10px] text-shadow-white/20">
                              {icon}
                        </span>
                        <span className="flex-1 text-left">{children}</span>
                  </button>
            );
      }
}
