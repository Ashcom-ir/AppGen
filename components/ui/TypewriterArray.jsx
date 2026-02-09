"use client";
import { useState, useEffect } from "react";
import Typewriter from "./Typewriter";

export default function TypewriterArray({
  items = [],
  show = true,
  hideAfterType = true,
  speed = 50,
  pause = 1200,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [readyForNext, setReadyForNext] = useState(false);

  useEffect(() => {
    if (!readyForNext) return;
    const timer = setTimeout(() => {
      setIndex(prev => prev < items.length - 1 ? prev + 1 : prev);
      setReadyForNext(false);
    }, pause);

    return () => clearTimeout(timer);
  }, [readyForNext, pause]);

  return show ? (
    <Typewriter
      key={index}
      text={items[index]}
      speed={speed}
      hideAfterType={hideAfterType}
      className={className}
      onDone={() => setReadyForNext(true)}
    />
  ) : null;
}
