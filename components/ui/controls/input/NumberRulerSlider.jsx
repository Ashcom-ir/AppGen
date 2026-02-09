"use client";
import { useRef, useEffect, useState } from "react";
import "./NumberRulerSlider.scss";

export default function NumberRulerSlider({
  id = "divNumberRulerSlider",
  value,
  setValue,
  label = "Value",
  width = 20,
  height = 400,
  inputD = 11,
  rulerM = 16,
  min = 0,
  max = 100,
  step = 1,
  knobSize = 35
}) {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const labelRef = useRef(null);
  const scaleRef = useRef(null);
  const knobRef = useRef(null);
  const totalTicks = Math.floor(max / step);
  const trackHeight = height - knobSize;
  const unitHeight = (height - knobSize) / totalTicks;
  useEffect(() => {
    const scaleContainer = scaleRef.current;
    if (!scaleContainer) return;
    scaleContainer.innerHTML = "";

    for (let i = 0; i <= max; i += step) {
      const row = document.createElement("div");
      row.className = "number-scale-row flex items-center justify-end will-change-transform";
      row.style.height = `${unitHeight}px`;

      const num = document.createElement("span");
      num.className = "number-num text-3 text-white/80 w-3 text-right mr-2";
      /*if (i % 2 === 0)*/
      if (step === 1) num.textContent = i;
      if (step === 2 && i % 2 === 0) num.textContent = i;
      if (step === 3 && i % 3 === 0) num.textContent = i;
      if (step === 4 && i % 4 === 0) num.textContent = i;
      if (step === 5 && i % 5 === 0) num.textContent = i;

      const tick = document.createElement("span");
      tick.className = "number-tick w-2.5 h-0.5 bg-white/30";

      row.appendChild(num);
      row.appendChild(tick);
      scaleContainer.appendChild(row);
    }
  }, [height, step, max, unitHeight]);
  const setKnobColor = (newValue) => {
    let hueMap = {
      0: 120, 1: 95, 2: 70, 3: 40, 4: 0,
      5: 10, 6: 30, 7: 55, 8: 75, 9: 120,
    };
    if (step === 1) {
      hueMap = {
        0: 0, 1: 10, 2: 20, 3: 30, 4: 40,
        5: 50, 6: 60, 7: 70, 8: 80, 9: 100,
      };
    }
    const range = Math.min(Math.floor(newValue / 10), 9);

    let hue;
    let initColor;
    let initColor2;
    let initBorderColor;
    let counterColor;
    let newShadow;
    if (min == 0 && max == 100) {
      const hueStart = 0;
      const hueEnd = 120;
      hue = hueStart + (hueEnd - hueStart) * (newValue / 100);
    }
    else {
      hue = hueMap[newValue];
    }

    initColor = `hsl(${hue}, 80%, 50%)`;
    initColor2 = `hsla(${hue}, 70%, 50%,.65)`;
    counterColor = `hsl(${hue}, 80%, 88%)`;
    initBorderColor = `hsla(${hue}, 90%, 50%,.65)`;
    newShadow = `hsla(${hue}, 90%, 58%,.75)`;

    const knob = knobRef.current;

    knob.style.background = `linear-gradient(135deg, ${initColor}, ${initColor2})`;
    knob.style.borderColor = `${initBorderColor}`;
    lineRef.current.style.background = `linear-gradient(135deg, ${initColor}, ${initColor2})`;
    counterRef.current.style.color = `${counterColor}`;
    labelRef.current.style.color = `${counterColor}`;
    lineRef.current.style.stroke = initColor;
    knob.style.boxShadow = `-20px 0px 20px 6px ${newShadow}, inset 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px ${newShadow}`;

  };

  function updateLineWave(knobTopY) {
    const centerY = knobTopY + knobSize / 2;
    const pixelsPerUnit = trackHeight / max;
    const rangePx = rulerM * pixelsPerUnit;
    const centerX = 30;
    let d = `M ${centerX} 0 `;
    const curveStart = Math.max(-1, centerY - rangePx);
    const curveEnd = Math.min(height + 1, centerY + rangePx);
    const linePath = lineRef.current;
    d += `L ${centerX} ${curveStart} `;
    const steps = 50;

    for (let y = curveStart - 2; y <= curveEnd - 2; y += (rangePx * 2) / steps) {
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

    linePath.setAttribute('d', d);
  }
  function updateKnob(posY) {
    const bar = barRef.current;
    const knob = knobRef.current;
    if (!bar || !knob) return;
    const rect = bar.getBoundingClientRect();
    let offsetY = posY - rect.top - knobSize / step;
    offsetY = Math.max(0, Math.min(trackHeight, offsetY));
    let newValue = Math.round((1 - offsetY / (rect.height - knobSize)) * max);

    const minLimit = Math.min(min, max);
    const maxLimit = Math.max(min, max);
    const redColor = `hsla(0, 88%, 51%,1)`;

    if (newValue < minLimit) {
      newValue = minLimit;
      knob.style.background = lineRef.current.style.background = lineRef.current.style.stroke = redColor;
    } else if (newValue > maxLimit) {
      newValue = maxLimit;
      knob.style.background = lineRef.current.style.background = lineRef.current.style.stroke = redColor;
    } else {
      setKnobColor(newValue);
    }

    if (newValue !== value) setValue(newValue);

    const knobTop = (1 - newValue / max) * (height - knobSize);
    knob.style.top = `${knobTop}px`;
    updateLineWave(knobTop);
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
        const knob = knobRef.current;
        //if (knob) knob.style.background = knobOriginalBgRef.current;
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

    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientY);
    };
    const onTouchStart = (e) => {
      e.preventDefault();
      startDrag(e.touches[0].clientY);
    };

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
  }, [value, min, max]);

  useEffect(() => {
    const knob = knobRef.current;
    const scaleContainer = scaleRef.current;
    if (!knob || !scaleContainer) return;

    const knobTop = (1 - value / max) * (height - knobSize);
    knob.style.top = `${knobTop}px`;

    [...scaleContainer.children].forEach((row, i) => {
      const idx = i * step;
      const distance = Math.abs(value - idx);
      const sel = Math.max(0, 1 - distance / rulerM);
      const offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;
      row.style.transform = `translateX(${-offset}px)`;

      const numEl = row.querySelector(".number-num");
      const tickEl = row.querySelector(".number-tick");

      if (numEl) {
        const op = Math.max(0.2, 1 - distance / (rulerM * 1.5));
        numEl.style.opacity = op;
        numEl.style.color = distance < step ? '#fff' : '#888';
      }

      if (tickEl) {
        const tickOpacity = Math.max(0.2, 1 - distance / (rulerM * 1.5));
        const tickColor = distance < step ? '#fff' : '#888';
        tickEl.style.opacity = tickOpacity;
        tickEl.style.background = tickColor;
      }
    });
  }, [value, max, height, knobSize, step, rulerM, inputD]);

  useEffect(() => {
    setKnobColor(value);
    const knobTop = (1 - value / max) * (height - knobSize);
    updateLineWave(knobTop);
  }, []);

  useEffect(() => {
    setKnobColor(value);
    const knobTop = (1 - value / max) * (height - knobSize);
    if (knobRef.current) knobRef.current.style.top = `${knobTop}px`;
    updateLineWave(knobTop);
  }, [value]);

  return (
    <div id={id} className="number-ruler-wrap grid items-center relative p-2 pt-0 pb-12">
      <div className="relative flex flex-col-reverse justify-start" ref={scaleRef}></div>
      <div ref={barRef} className="w-5 relative flex justify-start items-center cursor-grab active:cursor-grabbing" style={{ "--shadow": "#fff", width, height }}>
        <svg className="absolute t-0 left-1/5 transform-[translateX(-50%)] w-[60px] h-full z-0 pointer-events-none overflow-visible">
          <path ref={lineRef} className="number-ruler-path fill-none stroke-[4px]" d=""></path>
        </svg>
        <div ref={knobRef} className="number-ruler-knob absolute left-8/10 rounded-full z-10 flex flex-col items-center justify-between p-0 transform-[translateX(-50%)] " style={{ width: knobSize, height: knobSize }}>
          <div ref={counterRef} className="p-1 bg-transparent font-semibold text-shadow-[0_0_10px] text-shadow-white pointer-events-none whitespace-nowrap">{value}</div>
        </div>
        <div ref={labelRef} className="min-max-label" style={{ top: height + 10 }}>
          {label}
        </div>
      </div>
    </div>

  );
}
