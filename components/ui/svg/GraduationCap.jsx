"use client";

export default function GraduationCap({
      size = 24,
      color = "--color-rose-500",
      color2 = "--color-rose-500"
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z">
                        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2; 0,0" dur="1s" repeatCount="indefinite" />
                  </path>
                  <path d="M22 10v6" stroke={`var(${color2})`}>
                        <animateTransform attributeName="transform" type="rotate" values="0 22 10; 20 22 10; -20 22 10; 0 22 10" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
      );
}
