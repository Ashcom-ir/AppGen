"use client";
import "./RippleLoading.css"; // فایل CSS جداگانه

export default function RippleLoading() {
  return (
    <div className="ripple-container">
      <span className="ripple-ring"></span>
      <span className="ripple-ring"></span>
      <span className="ripple-ring"></span>
      <span className="ripple-center"></span>
    </div>
    
  );
}
