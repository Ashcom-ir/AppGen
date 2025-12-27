"use client";

export default function Yahoo({
      size = 24,
}) {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size}>
                  <defs>
                        <mask id="bodyMask">
                              <rect x="0" y="16" width="16" height="0" fill="white">
                                    <animate attributeName="y" values="16;0;0;16" keyTimes="0;0.45;0.7;1" dur="3.2s" repeatCount="indefinite"
                                          keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" calcMode="spline" />
                                    <animate attributeName="height" values="0;16;16;0" keyTimes="0;0.45;0.7;1" dur="3.2s" repeatCount="indefinite"
                                          keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" calcMode="spline" />
                              </rect>
                        </mask>
                        <mask id="dotMask">
                              <circle cx="12.5" cy="14" r="0" fill="white">
                                    <animate attributeName="r" values="0;1;1;0" keyTimes="0;0.45;0.7;1" dur="3.2s" repeatCount="indefinite"
                                          keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" calcMode="spline" />
                              </circle>
                        </mask>
                  </defs>
                  <path fill="#A855F7" mask="url(#bodyMask)"
                        d="M15.699 1.289A.96.96 0 0 0 15.008 1a1 1 0 0 0-.993.894l-1.509 9.528a.5.5 0 0 0 .977.207l2.475-9.311a.31.31 0 0 0 .011-.051.476.476 0 0 0 .031-.163c.007-.321-.1-.61-.301-.815zM10.079.107a2.13 2.13 0 0 1-.683-.086.5.5 0 0 0-.604.287L6.007 7.017 3.207.308a.5.5 0 0 0-.604-.287 2.291 2.291 0 0 1-.68.086.501.501 0 0 0-.475.699L5 8.978V15.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5l.006-6.536L10.552.806a.502.502 0 0 0-.045-.479.53.53 0 0 0-.428-.22z" />
                  <circle cx="12.5" cy="14" r="1" fill="#C084FC" mask="url(#dotMask)" />
            </svg>
      );
}