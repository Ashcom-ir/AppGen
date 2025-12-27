"use client";
import { useEffect, useRef } from "react";
import "./SvgMobileNumber.scss";

export default function SvgMobileNumber({
  stroke_color = "--color-green-300",
  stroke_check_and_border_color = "--color-green-400",
  fill_color = "--color-green-300",
  fill_value = 0, // 0 تا 100 درصد
}) {
  const phoneRef = useRef(null);

  useEffect(() => {
    if (!phoneRef.current) return;

    const pathLength = phoneRef.current.getTotalLength();
    phoneRef.current.style.strokeDasharray = pathLength;

    const startOffset = parseFloat(phoneRef.current.style.strokeDashoffset) || pathLength;
    const targetOffset = pathLength * (1 - fill_value / 100);
    const duration = 1500; // مدت زمان انیمیشن به میلی‌ثانیه
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing ساده (easeInOutQuad)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const newOffset = startOffset + (targetOffset - startOffset) * eased;
      phoneRef.current.style.strokeDashoffset = newOffset;

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [fill_value]);

  return (
    <div className={`relative rounded-full shadow-2xl svg-mobile-number`}>
      <div
        style={{
          "--stroke_color": `var(${stroke_color})`,
          "--neon-color": `var(${stroke_check_and_border_color})`,
          "--stroke_check_and_border_color": `var(${stroke_check_and_border_color})`,
          "--fill_color": `var(${fill_color})`,
        }}
        className={`svg-mobile-number`}
      >
        <svg
          className="transition-all duration-500 ease-in-out"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <g transform="translate(24,0) scale(-1,1)">
            <path
              ref={phoneRef}
              className="phone"
              d="M22 16.92v3a2 2 0 0 1-2.18 2
               19.79 19.79 0 0 1-8.63-3.07
               19.5 19.5 0 0 1-6-6
               19.79 19.79 0 0 1-3.07-8.67
               A2 2 0 0 1 4.12 2h3
               a2 2 0 0 1 2 1.72
               c.12 1 .4 2 .8 3
               a2 2 0 0 1-.45 2.11L8.09 10.9
               a16 16 0 0 0 6 6l2.11-2.38
               a2 2 0 0 1 2.11-.45
               c1 .4 2 .68 3 .8
               a2 2 0 0 1 1.69 2.05z"
            />
          </g>

          <circle
            className="spark"
            cx="6"
            cy="4"
            r="1.1"
            style={{ animationDelay: "0s" }}
          />
          <circle
            className="spark"
            cx="5"
            cy="7"
            r="0.9"
            style={{ animationDelay: "0.2s" }}
          />
          <circle
            className="spark"
            cx="8"
            cy="6"
            r="1"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
      </div>
    </div>
  );
}
