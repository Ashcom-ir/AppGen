"use client";
import { useEffect, useState } from "react";
import "./IndicatorNumberFlip.scss";

export default function IndicatorNumberFlip({
  number,
  fontSize = "2rem",
  color = "#000",
  duration = 0.35, // ثانیه
}) {
  const digits = String(number).split("");
  const dynamicWidth = `${digits.length * 20}px`;
  const [animateDigits, setAnimateDigits] = useState([]);

  useEffect(() => {
    // هر بار number تغییر کند، انیمیشن اجرا شود
    setAnimateDigits(digits.map((digit, index) => ({ digit, key: `${digit}-${index}` })));
  }, [number]);

  return (
    <div
      className="flex justify-center items-center relative"
      style={{ fontSize, color, width: dynamicWidth, direction: "ltr", textAlign: "center", gap: "4px" }}
    >
      {animateDigits.map(({ digit, key }) => (
        <div
          key={key}
          className="relative inline-flex w-[22px] h-[1em] overflow-hidden justify-center items-center"
        >
          <span
            key={key}
            style={{
              animation: `flipEnter ${duration}s ease forwards`,
            }}
            className="absolute left-0 right-0 top-0 h-full flex justify-center items-center font-semibold"
          >
            {digit}
          </span>
        </div>
      ))}
    </div>
  );
}
