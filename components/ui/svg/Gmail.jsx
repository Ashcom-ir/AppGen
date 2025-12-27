"use client";

export default function Gmail({
      size = 24,
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.7 141.7" width={size} height={size}>
                  <defs>
                        <filter id="neonGlow" x="-60%" y="-60%" width="220%" height="220%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feColorMatrix type="saturate" values="1.4" result="saturated" />
                              <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="saturated" />
                                    <feMergeNode in="SourceGraphic" />
                              </feMerge>
                        </filter>

                        <mask id="blueMask">
                              <rect x="0" y="141.7" width="141.7" height="0" fill="white">
                                    <animate attributeName="y" values="141.7;0;0;141.7" keyTimes="0;0.35;0.65;1" dur="6s" repeatCount="indefinite" />
                                    <animate attributeName="height" values="0;141.7;141.7;0" keyTimes="0;0.35;0.65;1" dur="6s" repeatCount="indefinite" />
                              </rect>
                        </mask>

                        <mask id="midMask">
                              <rect x="0" y="141.7" width="141.7" height="0" fill="white">
                                    <animate attributeName="y" values="141.7;0;0;141.7" keyTimes="0;0.4;0.7;1" dur="6s" repeatCount="indefinite" />
                                    <animate attributeName="height" values="0;141.7;141.7;0" keyTimes="0;0.4;0.7;1" dur="6s" repeatCount="indefinite" />
                              </rect>
                        </mask>

                        <mask id="topMask">
                              <rect x="0" y="0" width="0" height="141.7" fill="white">
                                    <animate attributeName="width" values="0;141.7;141.7;0" keyTimes="0;0.45;0.7;1" dur="6s" repeatCount="indefinite" />
                              </rect>
                        </mask>

                  </defs>

                  <path filter="url(#neonGlow)" fill="#4285f4" mask="url(#blueMask)"
                        d="M24.3,111.3h17.2V69.6L16.9,51.3V104C16.9,108,20.2,111.3,24.3,111.3z" />

                  <path filter="url(#neonGlow)" fill="#34a853" mask="url(#midMask)"
                        d="M100.3,111.3h17.2c4.1,0,7.4-3.3,7.4-7.4V51.3l-24.5,18.4V111.3z" />

                  <path filter="url(#neonGlow)" fill="#fbbc04" mask="url(#topMask)"
                        d="M100.3,37.8v31.9l24.5-18.4v-9.8c0-9.1-10.4-14.3-17.7-8.8L100.3,37.8z" />

                  <path filter="url(#neonGlow)" fill="#ea4335" mask="url(#topMask)"
                        d="M41.4,69.6V37.8l29.4,22.1l29.4-22.1v31.9L70.9,91.7L41.4,69.6z" />

                  <path filter="url(#neonGlow)" fill="#c5221f" mask="url(#topMask)"
                        d="M16.9,41.4v9.8l24.5,18.4V37.8l-6.9-5.2C27.3,27.2,16.9,32.4,16.9,41.4z" />

            </svg>
      );
}