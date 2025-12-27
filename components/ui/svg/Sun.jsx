"use client";

export default function Sun({
      size = 24,
      color = "--color-yellow-400"
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={size}
                  height={size}
                  fill="none"
                  stroke={`var(${color})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" fill={`var(${color})`} />
                  <g>
                        <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 12 12"
                              to="360 12 12"
                              dur="10s"
                              repeatCount="indefinite" />
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="M12 2v2; M12 1.4v2.6; M12 2v2" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="M12 20v2; M12 20v2.6; M12 20v2" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="M2 12h2; M1.4 12h2.6; M2 12h2" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="M20 12h2; M20 12h2.6; M20 12h2" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="m4.93 4.93 1.41 1.41; m4.5 4.5 1.8 1.8; m4.93 4.93 1.41 1.41" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="m17.66 17.66 1.41 1.41; m17.66 17.66 1.8 1.8; m17.66 17.66 1.41 1.41" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="m6.34 17.66 -1.41 1.41; m6.7 18 -1.8 1.8; m6.34 17.66 -1.41 1.41" />
                        </path>
                        <path>
                              <animate attributeName="d" dur="1.6s" repeatCount="indefinite"
                                    values="m19.07 4.93 -1.41 1.41; m19.5 4.5 -1.8 1.8; m19.07 4.93 -1.41 1.41" />
                        </path>
                  </g>
            </svg>
      );
}
