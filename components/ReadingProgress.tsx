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
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      {/* Progress bar */}
      <div
        className="h-full bg-gradient-to-r from-[#8B5E3C] via-[#C4926A] to-[#C4926A] transition-all duration-100 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Shooting star at the tip */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 0 4px #C4926A) drop-shadow(0 0 8px #8B5E3C)" }}
        >
          {/* Star body */}
          <div className="relative">
            <span className="text-[14px] leading-none star-tip">🪐</span>
            {/* Tail glow */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-6 h-[2px] bg-gradient-to-l from-[#C4926A] to-transparent opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
