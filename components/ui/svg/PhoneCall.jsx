"use client";
import "./PhoneCall.scss";

export default function PhoneCall({
  neon_color = "--color-pink-300",
  ring_dur = "900ms",
  wave_dur = "1200ms",
}) {
  return (
    <div
      style={{
        "--neon-color": `var(${neon_color})`,
        "--ring-dur": ring_dur,
        "--wave-dur": wave_dur,
      }}
      className="relative rounded-full neon-back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--neon-color)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* موج اول */}
        <path className="wave wave-1" d="M13 2a9 9 0 0 1 9 9" />

        {/* موج دوم */}
        <path className="wave wave-2" d="M13 6a5 5 0 0 1 5 5" />

        {/* بدنه گوشی */}
        <g className="phone-body">
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </g>
      </svg>
    </div>
  );
}
