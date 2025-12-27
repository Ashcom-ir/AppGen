"use client";

import { useState, useEffect } from "react";
import RulerSlider from "@/components/ui/controls/color-picker/RulerSlider";
import HueRulerSlider from "@/components/ui/controls/color-picker/HueRulerSlider";

function hsl2rgb(h, s, l) {
      s /= 100;
      l /= 100;
      const C = (1 - Math.abs(2 * l - 1)) * s;
      const X = C * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - C / 2;

      let r = 0, g = 0, b = 0;
      if (0 <= h && h < 60) [r, g, b] = [C, X, 0];
      else if (60 <= h && h < 120) [r, g, b] = [X, C, 0];
      else if (120 <= h && h < 180) [r, g, b] = [0, C, X];
      else if (180 <= h && h < 240) [r, g, b] = [0, X, C];
      else if (240 <= h && h < 300) [r, g, b] = [X, 0, C];
      else if (300 <= h && h < 360) [r, g, b] = [C, 0, X];

      return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255),
      ];
}
//const [r, g, b] = hsl2rgb(hue, saturation, lightness);
//const a = opacity / 100;
//const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
export default function ColorPicker({ hueVal, saturationVal, lightnessVal, opacityVal, isDark = false, limitMin = 0, limitMax = 100, onChange = () => { } }) {
      const [color, setColor] = useState({
            hue: hueVal,
            saturation: saturationVal,
            lightness: lightnessVal,
            opacity: opacityVal,
      });
  useEffect(() => {
    onChange(color);
  }, [color, onChange]);

  const updateColor = (key, value) => {
    setColor((prev) => ({ ...prev, [key]: value }));
  };


      return (
            <div className="relative w-full h-full">
                  <div className="absolute inset-0 pointer-events-none rounded-md backdrop-blur-12 bg-neutral-900/10">
                        <div style={{ background: `linear-gradient(-30deg, oklch(from var(--color-neutral-500) l c h), transparent, var(--color-neutral-500))` }} className="transform-[scale(.99)] opacity-[.3] blur-[32px] rounded-lg border-pink-500 absolute inset-0"></div>
                  </div>
                  <div className="flex gap-4 mx-2 py-2.5 items-center justify-center">
                        <RulerSlider
                              id={`div${isDark ? "Dark" : "Light"}Opacity`}
                              value={color.opacity}
                              setValue={(v) => updateColor("opacity", v)}
                              label="شفافیت"
                              width={20}
                              height={200}

                        />
                        <RulerSlider
                              id={`div${isDark ? "Dark" : "Light"}Saturation`}
                              value={color.saturation}
                              setValue={(v) => updateColor("saturation", v)}
                              label="اشباع"
                              width={20}
                              height={200}
                        />
                        <RulerSlider
                              id={`div${isDark ? "Dark" : "Light"}Lightness`}
                              value={color.lightness}
                              setValue={(v) => updateColor("lightness", v)}
                              label="روشنایی"
                              width={20}
                              height={200}
                              limitMin={limitMin}
                              limitMax={limitMax}
                              isDark={isDark}
                        />
                        <HueRulerSlider
                              id={`div${isDark ? "Dark" : "Light"}HueRuler`}
                              label="رنگ"
                              value={color.hue}
                              saturation={color.saturation}
                              lightness={color.lightness}
                              opacity={color.opacity}
                              setValue={(v) => updateColor("hue", v)}
                              width={20}
                              height={200}
                        />
                  </div>
                  <div className="relative mt-5 hidden">
                        <div className="text-[#aaa] p-2 text-[15px] font-light text-center">{`hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`}</div>
                        {/*<div className="text-[#aaa] p-2 text-[15px] font-light text-center">{`rgb(${r}, ${g}, ${b})`}</div>
                        <div className="text-[#aaa] p-2 text-[15px] font-light text-center">{ rgba }</div>*/}
                  </div>
            </div>
      );
}
