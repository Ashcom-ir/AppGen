"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function SelectIosPicker({
      options,
      onChange,
      selectedValue,
      iconBorderColor = "var(--color-white)",
      selectedColor = "text-rose-800",
      className = "",
}) {
      const listRef = useRef(null);
      const [value, setValue] = useState(0);

      const offset = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;
      const wheelAccumulator = useRef(0);
      const WHEEL_THRESHOLD = 40;

      const scrollToValue = useCallback((index, behavior = "smooth") => {
            if (!listRef.current) return;
            listRef.current.scrollTo({
                  top: index * ITEM_HEIGHT,
                  behavior,
            });
      }, []);

      const updateValue = useCallback(
            (newValue) => {
                  let nextValue;
                  if (typeof newValue === "function") {
                        nextValue = newValue(value); // مقدار فعلی state رو به callback می‌دهیم
                  } else {
                        nextValue = newValue;
                  }

                  const clamped = Math.max(0, Math.min(nextValue, options.length - 1));

                  setValue(clamped);
                  onChange?.(options[clamped]);

                  if (listRef.current) {
                        listRef.current.scrollTo({
                              top: clamped * ITEM_HEIGHT,
                              behavior: "smooth",
                        });
                  }
            },
            [options, onChange, value]
      );

      const handleWheel = (e) => {
            e.preventDefault();
            wheelAccumulator.current += e.deltaY;

            if (wheelAccumulator.current >= WHEEL_THRESHOLD) {
                  setValue((prev) => {
                        const next = Math.min(prev + 1, options.length - 1);
                        scrollToValue(next);
                        onChange?.(options[next]);
                        return next;
                  });
                  wheelAccumulator.current = 0;
            } else if (wheelAccumulator.current <= -WHEEL_THRESHOLD) {
                  setValue((prev) => {
                        const next = Math.max(prev - 1, 0);
                        scrollToValue(next);
                        onChange?.(options[next]);
                        return next;
                  });
                  wheelAccumulator.current = 0;
            }
      };

      const handleScroll = () => {
            if (!listRef.current) return;
            const scrollTop = listRef.current.scrollTop;
            const centerIndex = Math.round(scrollTop / ITEM_HEIGHT);
            if (centerIndex !== value) {
                  setValue(centerIndex);
                  onChange?.(options[centerIndex]);
            }
      };

      const handleClick = (index) => updateValue(index);

      const renderIcon = (icon, isSelected) => {
            if (!icon) return null;
            return React.isValidElement(icon)
                  ? icon
                  : React.createElement(icon, {
                        size: 18,
                        className: isSelected ? selectedColor : "text-gray-300/70",
                  });
      };

      const getItemClass = (index) => {
            if (index === value) return `opacity-100 ${selectedColor}`;
            else if (index === value - 1 || index === value + 1)
                  return "opacity-50 text-gray-400";
            else return "opacity-20 text-gray-500";
      };

      useEffect(() => {
            scrollToValue(value, "auto");
      }, []);
      useEffect(() => {
            const handle = Arrow;
            document.addEventListener('keydown', handle);
            return () => document.removeEventListener('keydown', handle);
      }, [value]);
      function Arrow(e) {
            switch (e.code) {
                  case 'ArrowLeft':
                  case 'ArrowUp':
                        updateValue(prev => prev - 1);
                        break;
                  case 'ArrowRight':
                  case 'ArrowDown':
                        updateValue(prev => prev + 1);
                        break;
            }
      }
      return (
            <div id="divSlectPickerParent" className={`${className} w-full relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out`} style={{ height: `${CONTAINER_HEIGHT}px` }}>
                  <div className="absolute top-1/2 left-0 right-0 border-t border-b border-white/5 pointer-events-none" style={{ height: `${ITEM_HEIGHT}px`, transform: "translateY(-50%)" }}/>
                  <button className={`${value === 0 ? "invisible" : ""} w-full flex items-center justify-center absolute top-0 right-0 p-2 z-10 transition-all duration-100 ease-in-out cursor-pointer`} onClick={() => updateValue(value - 1)} disabled={value === 0}>
                        <span className="bg-white/2 opacity-40 backdrop-blur-2xl rounded-full p-1">
                              <ChevronUp color={iconBorderColor} size={20} />
                        </span>
                  </button>
                  <ul ref={listRef} onScroll={handleScroll} onWheel={handleWheel}
                        className="w-full sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md overflow-y-auto scroll-snap-y-mandatory scroll-smooth"
                        style={{paddingTop: `${offset}px`,paddingBottom: `${offset}px`,height: `${CONTAINER_HEIGHT}px`,WebkitOverflowScrolling: "touch",msOverflowStyle: "none",scrollbarWidth: "none",}}>
                        {options.map((option, index) => (
                              <li key={index} className={`h-[40px] flex flex-row-reverse justify-between items-center gap-3 font-semibold cursor-pointer transition-opacity duration-300 ${getItemClass(index)}`}
                                    style={{ scrollSnapAlign: "center" }}
                                    onClick={() => handleClick(index)}>
                                    {renderIcon(option.icon, index === value)}
                                    <span>{option.label}</span>
                              </li>
                        ))}
                  </ul>
                  <button className={`${value === options.length - 1 ? "invisible" : ""} w-full flex items-center justify-center absolute bottom-0 right-0 p-2 z-10 transition-all duration-100 ease-in-out cursor-pointer`} onClick={() => updateValue(value + 1)} disabled={value === options.length - 1}>
                        <span className="bg-white/1 opacity-40 backdrop-blur-2xl rounded-full p-1">
                              <ChevronDown color={iconBorderColor} size={22} />
                        </span>
                  </button>
            </div>
      );
}
