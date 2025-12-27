"use client";
import { useRef, useEffect, useState } from "react";
import "./RulerSlider.scss";

export default function HueRulerSlider({
  id = "divHueRulerSlider",
  label = "lbl",
  value,
  setValue,
  saturation = 100,
  lightness = 50,
  opacity = 100,
  width = 20,
  height = 400,
  knobSize = 35,
  minor = 15,
  inputD = 11,
  rulerM = 70,
  max = 360,
}) {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const labelRef = useRef(null);
  const scaleRef = useRef(null);
  const knobRef = useRef(null);
  const [shadow, setShadow] = useState("#ffffff00");

  const totalTicks = Math.floor(max / minor);
  const trackHeight = height - knobSize;
  const unitHeight = (height - knobSize) / totalTicks;

  // ساخت scale فقط یکبار
  useEffect(() => {
    const scaleContainer = scaleRef.current;
    if (!scaleContainer) return;
    scaleContainer.innerHTML = "";
    for (let i = 0; i <= max; i += minor) {
      const row = document.createElement("div");
      row.className = "scale-row";
      row.style.height = `${unitHeight}px`;

      const num = document.createElement("span");
      num.className = "num";
      if (i % 10 === 0) num.textContent = i;

      const tick = document.createElement("span");
      tick.className = "tick";

      row.appendChild(num);
      row.appendChild(tick);
      scaleContainer.appendChild(row);
    }
  }, [height, minor, max, unitHeight]);

  // تابع خط wave
  function updateLineWave(knobTopY) {
    const centerY = knobTopY + knobSize / 2;
    const pixelsPerUnit = trackHeight / max;
    const rangePx = rulerM * pixelsPerUnit;
    const centerX = 30;
    let d = `M ${centerX} 0 `;
    const curveStart = Math.max(0, centerY - rangePx);
    const curveEnd = Math.min(height, centerY + rangePx);

    for (let y = curveStart; y <= curveEnd; y += (rangePx * 2) / 50) {
      const distY = Math.abs(y - centerY);
      const distUnit = distY / pixelsPerUnit;
      let offset = 0;
      if (distUnit < rulerM) {
        const sel = 1 - distUnit / rulerM;
        offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;
      }
      const currentX = centerX - offset;
      d += `L ${currentX} ${y} `;
    }
    d += `L ${centerX} ${height}`;
    if (lineRef.current) lineRef.current.setAttribute("d", d);
  }

  // آپدیت knob و رنگ و counter
  useEffect(() => {
    const knobTop = (1 - value / max) * trackHeight;

    if (knobRef.current) {
      knobRef.current.style.top = `${knobTop}px`;

      // رنگ knob
      const step = value % 10;
      const invertedStep = 9 - step;
      const knobLightness = 30 + invertedStep * 3;
      knobRef.current.style.background = `linear-gradient(135deg, hsl(${value},80%,${knobLightness}%), hsla(${value},70%,${Math.min(knobLightness+7,95)}%,.5))`;
      knobRef.current.style.borderColor = `hsla(${value},90%,${Math.min(knobLightness+15,95)}%,.5)`;

      setShadow(`hsla(${value}, 80%, ${knobLightness}%, 0.5)`);
    }

    if (counterRef.current) {
      counterRef.current.style.color = `hsl(${value},80%,88%)`;
      counterRef.current.textContent = `${value}°`;
    }
    if (labelRef.current) labelRef.current.style.color = `hsl(${value},80%,88%)`;

    // آپدیت line wave
    updateLineWave(knobTop);

    // آپدیت scale
    if (scaleRef.current) {
      [...scaleRef.current.children].forEach((row, i) => {
        const idx = i * minor;
        const distance = Math.abs(value - idx);
        const sel = Math.max(0, 1 - distance / rulerM);
        const offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;
        row.style.transform = `translateX(${-offset}px)`;

        const numEl = row.querySelector(".num");
        const tickEl = row.querySelector(".tick");

        if (numEl) {
          numEl.style.opacity = Math.max(0.2, 1 - distance / (rulerM * 1.5));
          numEl.style.color = distance < minor ? "#fff" : "#888";
        }
        if (tickEl) {
          tickEl.style.opacity = Math.max(0.2, 1 - distance / (rulerM * 1.5));
          tickEl.style.background = distance < minor ? "#fff" : "#888";
        }
      });
    }
  }, [value, max, height, knobSize, minor, rulerM, inputD]);

  // Drag کردن knob
  function updateKnob(posY) {
    const rect = barRef.current.getBoundingClientRect();
    let offsetY = posY - rect.top - knobSize / 2;
    offsetY = Math.max(0, Math.min(trackHeight, offsetY));
    const newHue = Math.round((1 - offsetY / trackHeight) * max);
    setValue(newHue);
  }

  useEffect(() => {
    const bar = barRef.current;
    const knob = knobRef.current;
    if (!bar || !knob) return;

    const startDrag = (clientY) => {
      updateKnob(clientY);
      const onMove = (e) => {
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        updateKnob(y);
      };
      const onEnd = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onEnd);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    };

    const onMouseDown = (e) => { e.preventDefault(); startDrag(e.clientY); };
    const onTouchStart = (e) => { e.preventDefault(); startDrag(e.touches[0].clientY); };

    bar.addEventListener("mousedown", onMouseDown);
    bar.addEventListener("touchstart", onTouchStart, { passive: false });
    knob.addEventListener("mousedown", onMouseDown);
    knob.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      bar.removeEventListener("mousedown", onMouseDown);
      bar.removeEventListener("touchstart", onTouchStart);
      knob.removeEventListener("mousedown", onMouseDown);
      knob.removeEventListener("touchstart", onTouchStart);
    };
  }, [trackHeight]);

  return (
    <div id={id} className="ruler-wrap">
      <div className="ruler-scale" ref={scaleRef}></div>
      <div ref={barRef} className="ruler-bar" style={{ "--shadow": shadow, width, height }}>
        <svg className="ruler-line-svg">
          <defs>
            <linearGradient id={`hueGradient${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
              {Array.from({ length: 360 }).map((_, i) => (
                <stop
                  key={i}
                  offset={`${(i / 359) * 100}%`}
                  stopColor={`hsla(${i},${saturation}%,${lightness}%,${opacity / 100})`}
                />
              ))}
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            className="ruler-path"
            stroke={`url(#hueGradient${id})`}
            strokeWidth="8"
            fill="none"
          />
        </svg>

        <div ref={knobRef} className="ruler-knob" style={{ width: knobSize, height: knobSize }}>
          <div ref={counterRef} className="p-1 bg-transparent font-semibold text-shadow-[0_0_10px] text-shadow-white pointer-events-none whitespace-nowrap">
            {value}
          </div>
        </div>
        <div ref={labelRef} className="min-max-label" style={{ top: height + 10 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
