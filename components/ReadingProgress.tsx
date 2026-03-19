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
      {/* Bar line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#8B5E3C] via-[#C4926A] to-[#C4926A]"
          style={{
            width: `${progress}%`,
            transform: "translateZ(0)",
            willChange: "width",
            transition: "width 80ms linear",
          }}
        />
      </div>
      {/* Saturn floating below the bar tip */}
      <div
        className="absolute top-[3px]"
        style={{
          left: `${progress}%`,
          transform: "translateX(-50%) translateZ(0)",
          willChange: "left",
          transition: "left 80ms linear",
          filter: "drop-shadow(0 0 6px #C4926A)",
        }}
      >
        <span className="text-[22px] leading-none star-tip block">🪐</span>
      </div>
    </div>
  );
}
