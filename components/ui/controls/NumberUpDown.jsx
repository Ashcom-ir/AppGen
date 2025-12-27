import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import IndicatorNumberFlip from "./IndicatorNumberFlip";

export default function NumberUpDown({
      min = 0,
      max = 999,
      step = 1,
      fontSize = "2rem",
      color = "#000",
      buttonColor = "#0070f3",
      iconBorderColor = "#9911ffff",
      onChange = () => { },
}) {
      const [value, setValue] = useState(0);
      const updateValue = (newValue) => {
            setValue(newValue);
            onChange(newValue);     // ⬅️ مقدار جدید را به parent ارسال می‌کنیم
      };
      const increment = () => updateValue(Math.min(value + step, max));
      const decrement = () => updateValue(Math.max(value - step, min));

      return (
            <div
                  style={{
                        backgroundColor: "#1d2628",
                        padding: "10px 20px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "1rem",
                        direction: "ltr",
                        borderRadius: "1000px"
                  }}
            >
                  <button
                        onClick={decrement}
                        disabled={value <= min}
                        style={{
                              backgroundColor: value <= min ? "#ff1155" : buttonColor,
                              padding: "0.5rem",
                              borderRadius: "50rem",
                              border: "2px solid",
                              borderColor: iconBorderColor,
                              cursor: value <= min ? "not-allowed" : "pointer",
                              boxShadow: (value <= min ? "#ff1155 0px 0px 6px" : buttonColor + " 0px 0px 12px"),
                              transition: "background-color 1.2s cubic-bezier(0.22, 1, 0.36, 1), \
                                          box-shadow 1s cubic-bezier(0.25, 0.1, 0.25, 1), \
                                          border-color 1.1s ease"
                        }}

                  >
                        <Minus color={iconBorderColor} />

                  </button>

                  <IndicatorNumberFlip number={value} fontSize={fontSize} color={color} />

                  <button
                        onClick={increment}
                        disabled={value >= max}
                        style={{
                              backgroundColor: value >= max ? "#ff1155" : buttonColor,
                              border: "2px solid",
                              borderColor: iconBorderColor,
                              padding: "0.5rem",
                              borderRadius: "50rem",
                              cursor: value >= max ? "not-allowed" : "pointer",
                              boxShadow: (value >= max ? "#ff1155 0px 0px 6px" : buttonColor + " 0px 0px 12px")
                        }}
                  >
                        <Plus color={iconBorderColor} />
                  </button>
            </div>
      );
}
