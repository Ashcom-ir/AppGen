"use client";
import { useRef, useState, useEffect } from "react";
import IndicatorNumberFlip from "@/components/ui/controls/IndicatorNumberFlip";
import "./ColorSlider.scss";
//app-gen\\\\IndicatorNumberFlip.jsx
export default function ColorSlider({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange = () => {},
  thumbColor = "#4ade80",
  trackGradient = "linear-gradient(to top, black, white)",
}) {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const resize = () => {
      if (trackRef.current && thumbRef.current) {
        const h = trackRef.current.offsetHeight - thumbRef.current.offsetHeight;
        setTrackHeight(h);
        const clamped = Math.min(Math.max(value, min), max);
        setInternalValue(clamped);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [value, min, max]);

  const valueToPosition = (val) => {
    const percent = (val - min) / (max - min);
    return trackHeight * (1 - percent);
  };

  const positionToValue = (posY) => {
    let p = Math.max(0, Math.min(trackHeight, posY));
    const percent = 1 - p / trackHeight;
    const newValue = Math.round((percent * (max - min) + min) / step) * step;
    return newValue;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbHeight = thumbRef.current.offsetHeight;
    const startY = e.clientY;

    const move = (ev) => {
      const deltaY = ev.clientY - startY;
      const currentTop = valueToPosition(internalValue);
      const newTop = currentTop + deltaY;
      const newVal = positionToValue(newTop);
      setInternalValue(newVal);
      onChange(newVal);
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleTrackClick = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const posY = e.clientY - trackRect.top;
    const newVal = positionToValue(posY);
    setInternalValue(newVal);
    onChange(newVal);
  };

  return (
    <div className="color-slider-container">
      {/* Indicator */}
      <div
        className="color-slider-indicator"
        style={{ top: `${valueToPosition(internalValue)}px`, backgroundColor: thumbColor }}
      >
        <IndicatorNumberFlip number={internalValue} fontSize={"1.2rem"} color={"#fff"} />
      </div>

      {/* Track */}
      <div
        className="color-slider-track"
        ref={trackRef}
        onClick={handleTrackClick}
        style={{ background: trackGradient }}
      >
        {/* Thumb */}
        <div
          ref={thumbRef}
          className="color-slider-thumb"
          style={{ top: `${valueToPosition(internalValue)}px`, backgroundColor: thumbColor }}
          onMouseDown={handleDrag}
        />
      </div>
    </div>
  );
}
