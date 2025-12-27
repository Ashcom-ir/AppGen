"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./Select.scss";

export default function Select({
      options,
      placeholder = "انتخاب کنید...",
      onChange,
      className = "",
      id = "cmbId",
      name = "cmbName",
      isSelectedFirstItem = false,
      bgColor = 'bg-neutral-secondary-medium',
      selectedbgColor = 'bg-rose-300',
      hoverbgColor = 'hover:bg-emerald-300/15 active:bg-emerald-500/33 focus:bg-emerald-300/50',
      textColor = 'text-rose-100',
      selectedColor = 'text-rose-800',
      border = 'border border-emerald-600/50 rounded-lg',
      borderChild = 'border border-emerald-600/5 rounded-lg'
}) {
      const [isOpen, setIsOpen] = useState(false);
      const [selected, setSelected] = useState(null);
      const containerRef = useRef(null);

      // بستن منو با کلیک به بیرون
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (containerRef.current && !containerRef.current.contains(event.target)) {
                        setIsOpen(false);
                  }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      // انتخاب آیتم اول در mount
      useEffect(() => {
            if (isSelectedFirstItem && options.length > 0 && !selected) {
                  setSelected(options[0]);
            }
      }, [isSelectedFirstItem, options]);

      const handleSelect = (option) => {
            setSelected(option);
            setIsOpen(false);
            if (onChange) onChange(option);
      };

      const renderIcon = (icon, isSelectedItem) => {
            if (!icon) return null;
            return React.isValidElement(icon)
                  ? icon // اگر JSX هست مستقیم render شود
                  : <icon size={18} className={isSelectedItem ? selectedColor : 'text-gray-300/70'} />; // اگر کامپوننت
      };

      return (
            <div className={`relative z-999 w-full custom-select-container ${className}`} ref={containerRef}>
                  {/* Trigger Button */}
                  <button
                        type="button"
                        className={`flex flex-row-reverse items-center justify-between w-full p-2 transition-all duration-300 cursor-pointer ${bgColor} ${border} ${isOpen ? "active" : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        id={id}
                        name={name}
                  >
                        <ChevronDown className={`chevron text-gray-400 transition-transform duration-300 ${isOpen ? "rotate" : ""}`} size={18} />
                        <div className="flex flex-row-reverse items-center gap-3">
                              {renderIcon(selected?.icon, true)}
                              <span className={`whitespace-nowrap ${selected ? selectedColor : 'text-gray-400'} ${textColor}`}>
                                    {selected ? selected.label : placeholder}
                              </span>
                        </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                        className={`select-menu ${bgColor} ${borderChild} min-w-fit backdrop-blur-3xl absolute left-0 right-0 mt-2 border ${isOpen ? "menu-open" : "menu-closed"}`}
                  >
                        <ul className="py-2">
                              {options.map((option) => (
                                    <li
                                          key={option.value}
                                          className={`flex flex-row-reverse items-center justify-between px-4 py-3 cursor-pointer transition-colors ${hoverbgColor} ${textColor} ${selected?.value === option.value ? selectedbgColor : bgColor}`}
                                          onClick={() => handleSelect(option)}
                                    >
                                          <div className="flex flex-row-reverse items-center gap-3">
                                                {renderIcon(option.icon, selected?.value === option.value)}
                                                {selected?.value === option.value && (
                                                      <Check size={16} className={`${selectedColor}`} />
                                                )}
                                          </div>
                                          <span>{option.label}</span>
                                    </li>
                              ))}
                        </ul>
                  </div>
            </div>
      );
}
