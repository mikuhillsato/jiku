"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-7 pointer-events-none">
      {/* Bar line — scaleX is GPU-accelerated */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent origin-left">
        <div
          className="h-full w-full bg-gradient-to-r from-[#111111] via-[#555555] to-[#888888] origin-left"
          style={{
            transform: `scaleX(${progress / 100})`,
            willChange: "transform",
            transition: "transform 80ms linear",
          }}
        />
      </div>
      {/* Saturn — translateX only, GPU-accelerated */}
      <div
        className="absolute top-[3px] left-0"
        style={{
          transform: `translateX(calc(${progress}vw - 11px))`,
          willChange: "transform",
          transition: "transform 80ms linear",
          filter: "drop-shadow(0 0 6px #C4926A)",
        }}
      >
        <span className="text-[22px] leading-none star-tip block">🪐</span>
      </div>
    </div>
  );
}
