// pages or component
"use client";
import { useState } from "react";
import NumberSlider from "@/components/ui/controls/NumberSlider";

export default function SliderDemo() {
      const [val, setVal] = useState(30);

      return (
            <div className="relative p-8" style={"direction:ltr"}>
                  <h2 className="mb-4">Motion Slider demo — value: {val}</h2>
                  <div className="p-10 text-white">
                        <NumberSlider
                              min={0}
                              max={100}
                              step={5}
                              value={50}
                              thumbColor="#9911ff"
                              trackColor="#e5e7eb"
                              trackFillColor="#9911ff"
                              onChange={(val) => console.log("Value:", val)}
                        />

                        <div className="mt-4 text-xl text-white">
                              مقدار: {val}
                        </div>
                  </div>
            </div>
      );
}
