"use client";
import { useState, useEffect, useRef } from "react";
import "./Typewriter.scss";

export default function Typewriter({ text, speed = 50, show = true,hideAfterType = true,className='' }) {
  const [displayed, setDisplayed] = useState("");
  const [textWidth, setTextWidth] = useState(0);

  const spanRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setTextWidth(width);
    }
  }, [text]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (hideAfterType && cursorRef.current) {
          setTimeout(() => {
            cursorRef.current?.classList.add("hidden");
          }, 2000);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    show?
    <p className={`contents typewrite ${className}`} style={{ "--targetWidth": `${textWidth + 2}px` }}>
      <span ref={spanRef} className="hidden-span">{text}</span>
      {displayed}
      <span ref={cursorRef} className="typewrite-cursor max-w-[1] border-none pr-1 bg-transparent caret-emerald-100/50 text-xl ">|</span>
    </p>:""
  );
}
