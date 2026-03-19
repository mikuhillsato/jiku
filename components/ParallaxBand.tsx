"use client";

import { useEffect, useRef } from "react";

export default function ParallaxBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const text = textRef.current;
    if (!band || !text) return;

    function update() {
      const rect = band!.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom <= 0 || rect.top >= vh) {
        text!.style.clipPath = "inset(0px 0px 100% 0px)";
        return;
      }

      const top    = Math.max(0, rect.top);
      const bottom = Math.max(0, vh - rect.bottom);
      text!.style.clipPath = `inset(${top}px 0px ${bottom}px 0px)`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("style", "position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;");
    svg.setAttribute("viewBox", "0 0 1200 360");

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    for (let i = 0; i < 180; i++) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const x = rand(0, 1200);
      const y = rand(0, 360);
      const r = rand(0.3, 1.4);
      c.setAttribute("cx", String(x));
      c.setAttribute("cy", String(y));
      c.setAttribute("r",  String(r));
      c.setAttribute("fill", "white");
      c.setAttribute("opacity", String(rand(0.25, 0.9)));
      c.style.animation = `twinkle ${rand(1.8, 5.5)}s ${rand(0, 6)}s ease-in-out infinite`;
      c.style.transformOrigin = `${x}px ${y}px`;
      svg.appendChild(c);
    }

    for (let i = 0; i < 14; i++) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const x = rand(40, 1160);
      const y = rand(20, 340);
      c.setAttribute("cx", String(x));
      c.setAttribute("cy", String(y));
      c.setAttribute("r",  String(rand(1.5, 2.5)));
      c.setAttribute("fill", "white");
      c.setAttribute("opacity", String(rand(0.5, 0.9)));
      c.style.animation = `twinkle ${rand(2, 4)}s ${rand(0, 5)}s ease-in-out infinite`;
      c.style.transformOrigin = `${x}px ${y}px`;
      c.style.filter = "blur(0.3px)";
      svg.appendChild(c);
    }

    band.appendChild(svg);
  }, []);

  return (
    <>
      {/* 窓（帯） */}
      <div
        ref={bandRef}
        className="relative overflow-hidden"
        style={{
          height: "360px",
          borderTop: "1px solid #111",
          borderBottom: "1px solid #111",
          backgroundColor: "#07070B",
          backgroundAttachment: "fixed",
        }}
      />

      {/* 固定テキストオーバーレイ */}
      <div
        ref={textRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "14px",
          clipPath: "inset(0px 0px 100% 0px)",
        }}
      >
        <p style={{ fontSize: "8px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Philosophy — MyJiku
        </p>
        <p style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "38px", fontWeight: 300, fontStyle: "italic",
          color: "rgba(255,255,255,0.8)", lineHeight: 1.45, letterSpacing: "0.01em",
        }}>
          占いは、当てるものじゃない。<br />
          知るためのものだ。
        </p>
        <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.22)", marginTop: "4px" }}>
          Western · Four Pillars · Numerology · Sanmeigaku
        </p>
      </div>
    </>
  );
}
