"use client";
import { useEffect, useRef, useState } from "react";
import "./ShieldGuard.scss";

export default function ShieldGuard({
      size = 24,
      color = "var(--color-indigo-600)",
      border_color = "var(--color-indigo-500)",
      glow = false
}) {
      const shieldRef = useRef(null);
      const [shieldLength, setShieldLength] = useState(0);

      useEffect(() => {
            if (shieldRef.current) {
                  const length = shieldRef.current.getTotalLength();
                  setShieldLength(length);
            }
      }, []);
      return (
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id="shield-guard"
            >
                  <path
                        ref={shieldRef}
                        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                        strokeDasharray={shieldLength}
                        strokeDashoffset={shieldLength}
                  >
                        <animate
                              attributeName="stroke-dashoffset"
                              from={shieldLength}
                              to="0"
                              dur="3.5s"
                              fill="freeze"
                        />
                  </path>
                  <path
                        d="M9 12l2 2 4-4"
                        strokeDasharray="8"
                        strokeDashoffset="8"
                        opacity="0"
                  >
                        <animate
                              attributeName="stroke-dashoffset"
                              from="8"
                              to="0"
                              dur="0.7s"
                              begin="3.9s"
                              fill="freeze"
                        />
                        <animate
                              attributeName="opacity"
                              from="0"
                              to="1"
                              dur="0.01s"
                              begin="4s"
                              fill="freeze"
                        />
                  </path>
            </svg>

      );
}
