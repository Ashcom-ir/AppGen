"use client";

export default function Direction({ size = 24, color = "--color-rose-500", isLtr = true, strokeWidth = 2 }) {
      return (
            isLtr ?
                  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`var(${color})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6v12" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" /></path>
                        <path d="M21 6v9" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" /></path>
                        <path d="M24 6v6" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="0.6s" repeatCount="indefinite" /></path>
                        <g transform="translate(-3 0)">
                              <g>
                                    <path d="M17 12H3" />
                                    <path d="m11 18 6-6-6-6" />
                                    <animateTransform attributeName="transform" type="translate" values="-0.8 0;0.8 0;-0.8 0" dur="1.5s" repeatCount="indefinite" />
                              </g>
                        </g>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`var(${color})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
                        <g transform="translate(24 0) scale(-1 1)">
                              <path d="M18 6v12" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" /></path>
                              <path d="M21 6v9" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" /></path>
                              <path d="M24 6v6" opacity="0.4"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="0.6s" repeatCount="indefinite" /></path>
                              <g transform="translate(-3 0)"><g>
                                    <path d="M17 12H3" />
                                    <path d="m11 18 6-6-6-6" />
                                    <animateTransform attributeName="transform" type="translate" values="-0.8 0;0.8 0;-0.8 0" dur="1.5s" repeatCount="indefinite" />
                              </g></g>
                        </g>
                  </svg>
      );
}
