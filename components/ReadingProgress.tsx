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
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent overflow-visible">
      {/* Progress bar */}
      <div
        className="h-full bg-gradient-to-r from-[#8B5E3C] via-[#C4926A] to-[#C4926A] transition-all duration-100 ease-out relative overflow-visible"
        style={{ width: `${progress}%` }}
      >
        {/* Saturn at the tip */}
        <div
          className="absolute right-0 top-0 translate-x-1/2 -translate-y-[35%]"
          style={{ filter: "drop-shadow(0 0 6px #C4926A)" }}
        >
          <span className="text-[22px] leading-none star-tip block">🪐</span>
        </div>
      </div>
    </div>
  );
}
