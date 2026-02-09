"use client";
import { useState, useEffect } from "react";
import "./Upload.scss";

export default function Upload({
  allowedTypes = ["image/png","image/jpeg","image/webp"],
}) {

  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error

const generateUID = () => {
  const randomBlock = () => Math.floor(Math.random()*0xffff).toString(16).padStart(4,'0');
  return Array(6).fill(0).map(() => randomBlock()).join('-'); // 6 بلوک 4 رقمی = 24 کاراکتر
}

  const uploadFile = async (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setStatus("error");
      setErrorMsg("فرمت فایل قابل قبول نیست ❌");
      setProgress(0);
      setTimeout(()=>{
        setStatus("idle");
        setErrorMsg("");
      },2000);
      return;
    }

    // تغییر نام فایل با UID + پسوند اصلی
    const ext = file.name.split(".").pop();
    const newFileName = `${generateUID()}.${ext}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    setStatus("uploading");
    setErrorMsg("");
    const formData = new FormData();
    formData.append("file", renamedFile);

    const req = new XMLHttpRequest();
    req.open("POST", "/api/upload");

    req.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded/e.total)*100));
      }
    };

    req.onload = () => {
      if(req.status === 200){
        setProgress(100);
        setStatus("done");
        setTimeout(()=>{
          setProgress(0);
          setStatus("idle");
        },2500);
      }
      else{
        setStatus("error");
        setErrorMsg("خطا در آپلود ❗");
      }
    };

    req.send(formData);
  };

  // ===== پشتیبانی از Paste (Ctrl+V) =====
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i=0; i<items.length; i++){
        const item = items[i];
        if(item.kind === "file"){
          const file = item.getAsFile();
          uploadFile(file);
          e.preventDefault();
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const isUploading = progress>0 && progress<100;
  const isDone = progress===100;

  return (
    <div className="flex flex-col items-center gap-2">

      <div
        className={`
          upload relative w-[200px] h-[100px]
          rounded-2xl backdrop-blur-xl cursor-pointer
          bg-white/15 dark:bg-black/25
          flex justify-center items-center overflow-hidden
          border border-white/10 transition-all duration-500
          ${isUploading?"uploading":""}
          ${isDone?"done":""}
          ${status==="error"?"error":""}
        `}
        onDragOver={(e)=>{e.preventDefault(); e.currentTarget.classList.add("drag")}}
        onDragLeave={(e)=>e.currentTarget.classList.remove("drag")}
        onDrop={(e)=>{e.preventDefault(); e.currentTarget.classList.remove("drag"); uploadFile(e.dataTransfer.files[0])}}
        onClick={()=>document.getElementById("file-input").click()}
      >
        <input 
          id="file-input"
          type="file"
          accept={allowedTypes.join(",")}
          className="absolute inset-0 opacity-0"
          onChange={(e)=>uploadFile(e.target.files[0])}
        />

        <span className={`drop-text absolute text-2xl font-extrabold tracking-[3px] text-pink-400
          ${(status!=="idle")?"opacity-0 translate-y-[-10px]":""}`}>
          DROP HERE
        </span>

        <span className={`upload-text absolute text-xl tracking-[2px] font-semibold text-amber-300
          ${(isUploading)?"opacity-100 translate-y-[10px]":"opacity-0"}`}>
          UPLOADING {isUploading && `${progress}%`}
        </span>

        <svg className="progress-svg absolute opacity-0" width="300" height="300">
          <circle className="progress-circle" r="115" cx="150" cy="150"
            style={{ strokeDashoffset:`calc(720 - 720*${progress}/100)` }}
          />
        </svg>

        <svg className="check-svg absolute opacity-0 scale-75" width="130" height="130">
          <polyline className="check-line" points="100.2,40.2 51.5,88.8 29.8,67.5"/>
        </svg>

        <div className="shine"></div>

        {status==="error" && (
          <span className="absolute bottom-4 text-red-400 text-sm font-bold animate-pulse">
            {errorMsg}
          </span>
        )}
      </div>
    </div>
  );
}
