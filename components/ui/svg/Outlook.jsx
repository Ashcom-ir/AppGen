"use client";

export default function Outlook({
      size = 24,
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 468 468" width={size} height={size}>
                  <defs>
                        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="4" result="blur" />
                              <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                              </feMerge>
                        </filter>
                        <mask id="maskLeft">
                              <rect x="0" y="468" width="468" height="0" fill="white">
                                    <animate attributeName="y" values="468;0;0;234;468" keyTimes="0;0.45;0.7;0.85;1" dur="4s" repeatCount="indefinite" />
                                    <animate attributeName="height" values="0;468;468;234;0" keyTimes="0;0.45;0.7;0.85;1" dur="4s" repeatCount="indefinite" />
                              </rect>
                        </mask>
                        <mask id="maskFade">
                              <rect x="0" y="0" width="468" height="468" fill="white">
                                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.45;0.85;1" dur="4s" repeatCount="indefinite" />
                              </rect>
                        </mask>
                  </defs>

                  <path fill="#4c97e3" d="M107.711 110.977H467.95v246.046H107.711z" mask="url(#maskFade)" filter="url(#neonGlow)" />

                  <path fill="#4c97e3" d="M241.694 438.178 13.187 405.229C5.618 404.138 0 397.647 0 389.993V78.007c0-7.654 5.618-14.145 13.187-15.236l228.507-32.949c9.271-1.337 17.573 5.861 17.573 15.236v377.883c.001 9.376-8.302 16.574-17.573 15.237z" mask="url(#maskFade)" filter="url(#neonGlow)" />
                  <path fill="#e3edf0" d="m287.831 206.564 180.12 150.323h-360.24z" mask="url(#maskFade)" filter="url(#neonGlow)" />
                  <path fill="#52c1ff" d="m287.831 264.29-180.12-153.313h360.24z" mask="url(#maskFade)" filter="url(#neonGlow)" />

                  <path fill="#4c97e3" d="M241.694 438.178 13.187 405.229C5.618 404.138 0 397.647 0 389.993V78.007c0-7.654 5.618-14.145 13.187-15.236l228.507-32.949c9.271-1.337 17.573 5.861 17.573 15.236v377.883c.001 9.376-8.302 16.574-17.573 15.237z" mask="url(#maskLeft)" filter="url(#neonGlow)" />

                  <path fill="#fff" d="M130.495 168.028c-36.925 0-62.714 27.534-62.714 66.958 0 38.263 24.979 64.986 60.745 64.986 30.323 0 62.96-20.954 62.96-66.958 0-38.263-25.08-64.986-60.991-64.986zm31.597 65.726c0 24.75-13.702 42.713-32.582 42.713-18.878 0-32.58-17.756-32.58-42.22 0-21.261 10.226-42.715 33.073-42.715 25.383.001 32.089 27.619 32.089 42.222z" mask="url(#maskFade)" filter="url(#neonGlow)" />
            </svg>

      );
}