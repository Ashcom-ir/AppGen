"use client";
import { useState, useEffect } from "react";
import "./UploadImage.scss";
import { Trash, Trash2 } from "lucide-react";


export default function UploadImage({
  isDark = true,
  allowedTypes = ["image/png", "image/jpeg", "image/webp"],
  onFileSelect = (file) => { }, // پاس دادن فایل به والد
}) {
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error
  const [selectedFile, setSelectedFile] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const handleFile = (file) => {
    console.log(file);
    
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setStatus("error");
      setErrorMsg("فرمت فایل قابل قبول نیست ❌");
      setProgress(0);
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 2000);
      return;
    }
    setStatus("uploading");
    setProgress(0);
    setSelectedFile(file.name);
    setShowRemove(false);
    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += Math.floor(Math.random() * 20) + 10;
      if (fakeProgress >= 100) {
        fakeProgress = 100;
        clearInterval(interval);
        setStatus("done");
        onFileSelect(file); // پاس دادن فایل به والد

        // بعد از 0.6s انیمیشن تیک، REMOVE FILE نمایش داده شود
        setTimeout(() => setShowRemove(true), 600);
      }
      setProgress(fakeProgress);
    }, 200);
  }
  const removeFile = () => {
    setSelectedFile("");
    setErrorMsg("");
    setStatus("idle");
    setProgress(0);
    setShowRemove(false);
    onFileSelect(null); // والد هم پاک شود
  }
  // پشتیبانی از Paste (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const file = item.getAsFile();
          handleFile(file);
          e.preventDefault();
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const isUploading = progress > 0 && progress < 100;
  const isDone = status === "done";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`upload relative w-[400px] h-[220px]
          rounded-xl backdrop-blur-sm cursor-pointer
          ${isDark ? "bg-black/22" : "bg-white/2"}
          flex justify-center items-center overflow-hidden
          border border-white/10 transition-all duration-500
          ${isUploading ? "uploading" : ""}
          ${isDone ? "done" : ""}
          ${status === "error" ? "error" : ""}`}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag") }}
        onDragLeave={(e) => e.currentTarget.classList.remove("drag")}
        onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("drag"); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => {
          if (!isDone) {
            document.getElementById(`${isDark ? "dark-file-input" : "light-file-input"}`).click();
          }
        }}>
        <input id={`${isDark ? "dark-file-input" : "light-file-input"}`} type="file"
          accept={allowedTypes.join(",")}
          className="opacity-0"
          onChange={(e) => handleFile(e.target.files[0])}/>
        <span className={`drop-text ${isDark ? "text-white/70" : "text-black/70"} absolute text-xl font-extrabold tracking-[3px] 
          ${(status !== "idle") ? "opacity-0 translate-y-[-10px]" : ""}`}>
          {isDone ? "حذف تصویر پشت زمینه" : "تصویر پشت زمینه را اینجا رها کنید"}
        </span>

        <span className={`upload-text absolute text-xl tracking-[2px] font-semibold text-amber-300
          ${(isUploading) ? "opacity-100 translate-y-[10px]" : "opacity-0"}`}>
          در حال بارگذاری {isUploading && `${progress}%`}
        </span>

        <svg className="progress-svg absolute opacity-0" width="200" height="200">
          <circle className="progress-circle" r="90" cx="90" cy="90"
            style={{ strokeDashoffset: `calc(720 - 720*${progress}/100)` }}
          />
        </svg>

        <svg className="check-svg absolute opacity-0 scale-75" width="111" height="111">
          <polyline className="check-line" points="100.2,40.2 51.5,88.8 29.8,67.5" />
        </svg>
        {/* بعد از نمایش تیک */}
        {showRemove && (
          <span
            className="absolute px-2 py-1 rounded-sm bottom-4 text-rose-800 font-bold cursor-pointer transition-all delay-75 duration-750 ease-in hover:border-rose-800/15 hover:border"
            onClick={removeFile}
          >
            <span className="flex gap-0.5">
            <Trash2/>
            حذف تصویر پشت زمینه
            </span>
          </span>
        )}

        <div className="shine"></div>

        {status === "error" && (
          <span className="absolute bottom-4 text-red-400 text-sm font-bold animate-pulse">
            {errorMsg}
          </span>
        )}

        {selectedFile && status !== "idle" && (
          <span className="absolute top-4 text-sm text-white/90">
            {selectedFile.name}
          </span>
        )}
      </div>
    </div>
  );
}
