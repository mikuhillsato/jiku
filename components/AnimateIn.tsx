"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "left" | "fade";
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const base = "transition-all duration-700 ease-out";
  const hidden =
    direction === "up"
      ? "opacity-0 translate-y-8"
      : direction === "left"
        ? "opacity-0 -translate-x-8"
        : "opacity-0";
  const shown = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div ref={ref} className={`${base} ${visible ? shown : hidden} ${className}`}>
      {children}
    </div>
  );
}
