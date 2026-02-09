"use client";
import { useRef, useEffect } from "react";
import "./NumberRulerSlider.scss";

export default function NumberRulerSliderH({
  id = "divNumberRulerSliderH",
  value,
  setValue,
  label = "Value",
  width = 400,
  height = 20,
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
  const isDraggingRef = useRef(false);
  const dragStartedRef = useRef(false);
  const startXRef = useRef(0);

  const totalTicks = Math.floor(max / step);
  const trackWidth = width - knobSize;
  const unitWidth = trackWidth / totalTicks;


  useEffect(() => {
    const scaleContainer = scaleRef.current;
    if (!scaleContainer) return;
    scaleContainer.innerHTML = "";

    for (let i = 0; i <= max; i += step) {
      const col = document.createElement("div");
      col.className =
        "number-scale-row flex flex-col items-center justify-start will-change-transform";
      col.style.width = `${unitWidth}px`;

      const num = document.createElement("span");
      num.className = "number-num text-3 text-white/80 h-3 text-center mb-2";

      if (step === 1) num.textContent = i;
      if (step === 2 && i % 2 === 0) num.textContent = i;
      if (step === 3 && i % 3 === 0) num.textContent = i;
      if (step === 4 && i % 4 === 0) num.textContent = i;
      if (step === 5 && i % 5 === 0) num.textContent = i;

      const tick = document.createElement("span");
      tick.className = "number-tick h-2.5 w-0.5 bg-white/30";

      col.appendChild(num);
      col.appendChild(tick);
      scaleContainer.appendChild(col);
    }
  }, [width, step, max, unitWidth]);
  function getHueRainbowGreenToRed(value, min, max) {
    const progress = (value - min) / (max - min);
    const hue = 120 + progress * 240;
    return Math.round(hue > 360 ? hue - 360 : hue);
  }
  const setKnobColor = (newValue) => {

    let hue = getHueRainbowGreenToRed(newValue, min, max);

    const initColor = `hsl(${hue}, 80%, 50%)`;
    const initColor2 = `hsla(${hue}, 70%, 50%,.65)`;
    const counterColor = `hsl(${hue}, 80%, 88%)`;
    const initBorderColor = `hsla(${hue}, 90%, 50%,.65)`;
    const newShadow = `hsla(${hue}, 90%, 58%,.75)`;

    const knob = knobRef.current;

    knob.style.background = `linear-gradient(135deg, ${initColor}, ${initColor2})`;
    knob.style.borderColor = initBorderColor;
    knob.style.boxShadow = `0 -20px 20px 6px ${newShadow}, inset 0 0 5px rgba(255,255,255,.3), 0 0 10px ${newShadow}`;

    lineRef.current.style.background = `linear-gradient(135deg, ${initColor}, ${initColor2})`;
    lineRef.current.style.stroke = initColor;

    counterRef.current.style.color = counterColor;
    labelRef.current.style.color = counterColor;
  };

  function updateLineWave(knobLeft) {
    const centerX = knobLeft + knobSize / 2;
    const pixelsPerUnit = trackWidth / max;
    const rangePx = rulerM * pixelsPerUnit;
    const centerY = 30;

    let d = `M 0 ${centerY} `;

    const startX = 0;
    const endX = width;
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const x = startX + ((endX - startX) * i) / steps;
      const distX = Math.abs(x - centerX);
      const distUnit = distX / pixelsPerUnit;

      let offset = 0;
      if (distUnit < rulerM) {
        const sel = 1 - distUnit / rulerM;
        offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;
      }

      const currentY = centerY - offset;
      d += `L ${x} ${currentY} `;
    }

    lineRef.current.setAttribute("d", d);
  }

  useEffect(() => {
    if (scaleRef.current && barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const knobLeft = (value / max) * trackWidth;
      updateKnob(rect.left + knobLeft);
    }
  }, []); // فقط یک بار در mount

  function updateKnob(posX) {
    const bar = barRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    let offsetX = posX - rect.left - knobSize / 2;
    offsetX = Math.max(0, Math.min(trackWidth, offsetX));

    //let newValue = Math.round((offsetX / trackWidth) * max);
    const ratio = offsetX / trackWidth;
    let rawValue = min + ratio * (max - min);
    let newValue = min + Math.round((rawValue - min) / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));
    if (newValue == min) {
      newValue = min;
      setValue(newValue);
    } else if (newValue == max) {
      newValue = max;
      setValue(newValue);
    } else {
      setKnobColor(newValue);
    }
    if (newValue !== value) setValue(newValue);
    const knobLeft = (newValue / max) * trackWidth;
    knobRef.current.style.left = `${knobLeft}px`;
    updateLineWave(knobLeft);

    [...scaleRef.current.children].forEach((col, i) => {
      const idx = i * step;
      const distance = Math.abs(newValue - idx);
      const sel = Math.max(0, 1 - distance / rulerM);
      const offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;

      col.style.transform = `translateY(${-offset}px)`;

      const numEl = col.querySelector(".number-num");
      const tickEl = col.querySelector(".number-tick");

      if (numEl) {
        const op = Math.max(0.2, 1 - distance / (rulerM * 1.5));
        numEl.style.opacity = op;
        numEl.style.color = distance < step ? "#fff" : "#888";
      }

      if (tickEl) {
        const op = Math.max(0.2, 1 - distance / (rulerM * 1.5));
        tickEl.style.opacity = op;
        tickEl.style.background = distance < step ? "#fff" : "#888";
      }
    });
  }
  useEffect(() => {
    const bar = barRef.current;
    const knob = knobRef.current;
    if (!bar || !knob) return;

    const startDrag = (clientX, fromKnob = false) => {
      isDraggingRef.current = true;
      dragStartedRef.current = !fromKnob; // اگر از bar شروع شد، بلافاصله فعال
      startXRef.current = clientX;

      if (!fromKnob) {
        updateKnob(clientX);
      }

      const onMove = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;

        // فقط برای knob: تشخیص drag واقعی
        if (!dragStartedRef.current) {
          if (Math.abs(x - startXRef.current) < 3) return; // threshold
          dragStartedRef.current = true;
        }

        updateKnob(x);
      };

      const onEnd = () => {
        isDraggingRef.current = false;
        dragStartedRef.current = false;

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

    const onTouchStartBar = (e) => {
      e.preventDefault();
      e.stopPropagation();
      startDrag(e.touches[0].clientX, false);
    };
    const onTouchStartKnob = (e) => {
      e.preventDefault();
      e.stopPropagation();
      startDrag(e.touches[0].clientX, true);
    };
    const onMouseDownBar = (e) => {
      e.preventDefault();
      startDrag(e.clientX, false);
    };

    const onMouseDownKnob = (e) => {
      e.preventDefault();
      e.stopPropagation(); // 🔥 مهم‌ترین خط
      startDrag(e.clientX, true);
    };

    bar.addEventListener("mousedown", onMouseDownBar);
    bar.addEventListener("touchstart", onTouchStartBar, { passive: false });
    knob.addEventListener("mousedown", onMouseDownKnob);
    knob.addEventListener("touchstart", onTouchStartKnob, { passive: false });
    return () => {
      bar.removeEventListener("mousedown", onMouseDownBar);
      bar.removeEventListener("touchstart", onTouchStartBar);
      knob.removeEventListener("mousedown", onMouseDownKnob);
      knob.removeEventListener("touchstart", onTouchStartKnob);
    };
  }, [value, min, max]);

  useEffect(() => {
    setKnobColor(value);
    const knobLeft = (value / max) * trackWidth;
    if (knobRef.current) knobRef.current.style.left = `${knobLeft}px`;
    updateLineWave(knobLeft);
  }, [value]);

  return (
    <div id={id} className="number-ruler-wrap gap-1 flex flex-col items-center relative m-2">
      <div className="relative flex flex-row justify-start" ref={scaleRef}></div>
      <div
        ref={barRef}
        className="h-5 relative flex items-center cursor-grab active:cursor-grabbing"
        style={{ "--shadow": "#fff", width, height }}
      >
        <svg className="absolute left-0 top-1/5 transform-[translateY(-50%)] w-full h-[60px] z-0 pointer-events-none overflow-visible">
          <path ref={lineRef} className="number-ruler-path fill-none stroke-[4px]" d=""></path>
        </svg>
        <div
          ref={knobRef}
          className="number-ruler-knob absolute top-8/10 rounded-full z-10 flex items-center justify-center transform-[translateY(-50%)]"
          style={{ width: knobSize, height: knobSize }}
        >
          <div
            ref={counterRef}
            className="p-1 bg-transparent font-semibold text-shadow-[0_0_10px] text-shadow-white pointer-events-none whitespace-nowrap"
          >
            {value}
          </div>
        </div>
      </div>
      <div ref={labelRef} className="relative flex mt-2 flex-row justify-center items-center">
        {label}
      </div>
    </div>
  );
}
