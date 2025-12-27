"use client";

export default function Sun({
      size = 24,
      color = "--color-slate-300"
}) {
      return (
            <svg fill={`var(${color})`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
                  <defs>
                        <filter id="moon-glow3" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                              <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                              </feMerge>
                        </filter>
                  </defs>
                  <path filter="url(#moon-glow3)"
                        d="M20.985 12.486
           a9 9 0 1 1-9.473-9.472
           c.405-.022.617.46.402.803
           a6 6 0 0 0 8.268 8.268
           c.344-.215.825-.004.803.401
           m-2-3
           c-0.2 0.3-0.5 0.2-0.7 0.5
           m1 2
           c-0.1-0.2-0.4-0.1-0.5-0.3
           m-3 1
           c0.15 0.1 0.3 0.05 0.45 0.15
           "/>
                  <g stroke={`var(${color})`} strokeWidth="1">
                        <g transform="translate(5,5) rotate(15)">
                              <line x1="0" y1="-0.2" x2="0" y2="0.2">
                                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                              </line>
                              <line x1="-0.2" y1="0" x2="0.2" y2="0">
                                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                              </line>
                        </g>
                        <g transform="translate(18,6) rotate(-10)">
                              <line x1="0" y1="-0.2" x2="0" y2="0.2">
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                              </line>
                              <line x1="-0.2" y1="0" x2="0.2" y2="0">
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                              </line>
                        </g>
                        <g transform="translate(17,17) rotate(5)">
                              <line x1="0" y1="-0.2" x2="0" y2="0.2">
                                    <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite" />
                              </line>
                              <line x1="-0.2" y1="0" x2="0.2" y2="0">
                                    <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite" />
                              </line>
                        </g>
                  </g>
            </svg>

      );
}
