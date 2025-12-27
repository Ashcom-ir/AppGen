"use client";
import { useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./RulerSlider.scss";

export default function RulerSlider({
  value,
  setValue,
  gradient = "linear-gradient(135deg, #00ffcc, #00aa88)",
  color = "#00ffcc",
  label = "Value",
  width = 20,
  height = 400,
  minor = 5,
  knobSize = 40,
  inputD = 11,
  rulerM = 16,
  max = 100,
  limitMin = 0,
  limitMax = 100,
  isDark = false,
}) {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const tooltipRef = useRef(null);
  const scaleRef = useRef(null);
  const knobRef = useRef(null);
  const arrowUpRef = useRef(null);
  const arrowDownRef = useRef(null);

  const totalTicks = Math.floor(max / minor);
  const unitHeight = (height - knobSize) / totalTicks;

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
  const setKnobColor = (newValue, knob) => {
    const hueMap = { 4: 0, 3: 330, 2: 30, 1: 55, 0: 120, 5: 0, 6: 330, 7: 30, 8: 55, 9: 120, };
    const range = Math.floor(newValue / 10);
    const step = newValue % 10;
    if (hueMap[range] !== undefined) {
      const invertedStep = 9 - step; // 👈 این خط کل ماجراست
      const lightness = 35 + invertedStep * 3;
      let initColor = `hsl(${hueMap[range]}, 80%, ${lightness}%)`;
      knob.style.background = initColor
      lineRef.current.style.background = initColor;
      tooltipRef.current.style.background = initColor;
    }
  };
  const updateKnob = (posY) => {
    const bar = barRef.current;
    const knob = knobRef.current;
    if (!bar || !knob) return;

    const rect = bar.getBoundingClientRect();
    let offsetY = posY - rect.top - knobSize / 2;
    offsetY = Math.max(0, Math.min(rect.height - knobSize, offsetY));

    let newValue = Math.round((1 - offsetY / (rect.height - knobSize)) * max);
    const minLimit = Math.min(limitMin, limitMax);
    const maxLimit = Math.max(limitMin, limitMax);
    if (limitMin === 50 || limitMax === 50) setKnobColor(newValue, knob);
    const redColor = `hsl(0, 88%, 51%,1)`;
    if (newValue < minLimit) {
      newValue = minLimit;
      knob.style.background = redColor
      lineRef.current.style.background = redColor;
      tooltipRef.current.style.background = redColor;

    } else if (newValue > maxLimit) {
      newValue = maxLimit;
      knob.style.background = redColor;
      lineRef.current.style.background = redColor;
      tooltipRef.current.style.background = redColor;
    }

    if (newValue !== value) setValue(newValue);

    const knobTop = (1 - newValue / max) * (height - knobSize);
    knob.style.top = `${knobTop}px`;
  };

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
  }, [value, limitMin, limitMax]);

  useEffect(() => {
    const knob = knobRef.current;
    const arrowUp = arrowUpRef.current;
    const arrowDown = arrowDownRef.current;
    const scaleContainer = scaleRef.current;
    if (!knob || !arrowUp || !arrowDown || !scaleContainer) return;

    const knobTop = (1 - value / max) * (height - knobSize);
    knob.style.top = `${knobTop}px`;
    arrowUp.style.top = `${knobTop - 12}px`;
    arrowDown.style.top = `${knobTop + knobSize + 2}px`;

    [...scaleContainer.children].forEach((row, i) => {
      const idx = i * minor;
      const distance = Math.abs(value - idx);
      const sel = Math.max(0, 1 - distance / rulerM);
      const offset = 0.5 * (1 - Math.cos(sel * Math.PI)) * inputD;
      row.style.transform = `translateX(${-offset}px)`;
      const numEl = row.querySelector(".num");
      if (numEl) numEl.style.opacity = Math.max(0, 1 - distance / (rulerM * 2));
    });
  }, [value, max, height, knobSize, minor, rulerM, inputD]);
  useEffect(() => {
    const knob = knobRef.current;
    setKnobColor(value, knob);
  }, []);

  return (
    <div className="ruler-wrap">
      <div className="ruler-scale" ref={scaleRef}></div>
      <div ref={barRef} className="ruler-bar" style={{ width, height }}>
        <div ref={lineRef} className="ruler-line" />
        <div ref={knobRef} className="ruler-knob" style={{ width: knobSize, height: knobSize }}>
          <ChevronUp className="animate-bounce" ref={arrowUpRef} />
          <ChevronDown className="animate-bounce" ref={arrowDownRef} />
          <div ref={tooltipRef} className="absolute top-[-33px] py-0.5 px-2 rounded-sm border border-cyan-500 text-white font-semibold text-shadow-[0_0_10px] text-shadow-white pointer-events-none whitespace-nowrap">{value}</div>
        </div>
        <div className="min-max-label" style={{ top: -12 }}>
          {max}
        </div>
        <div className="min-max-label" style={{ top: height - 12 }}>
          0
        </div>
        <div className="min-max-label" style={{ top: height + 10 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
