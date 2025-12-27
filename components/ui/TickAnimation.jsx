"use client";
import './TickAnimation.scss';

export default function TickAnimation({ show=false, color = "text-green-500" }) {
      return (
            <span className={`absolute top-0 ${color} ${show ? "tick-show" : "tick-hide"}`}>
                  <svg className={show ? "tick-show" : "tick-hide"}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" className="tick-path"/>
                  </svg>
            </span>
      );
}
