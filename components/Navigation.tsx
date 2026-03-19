"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  {
    label: "西洋占星術",
    href: "/astrology",
    sub: [
      { label: "惑星の意味", href: "/astrology/planets" },
      { label: "ハウスの意味", href: "/astrology/houses" },
      { label: "12星座の意味", href: "/astrology/signs" },
    ],
  },
  {
    label: "四柱推命",
    href: "/shichusuimei",
    sub: [
      { label: "年柱・月柱・日柱・時柱", href: "/shichusuimei/pillars" },
      { label: "十干・十二支と星", href: "/shichusuimei/stars" },
    ],
  },
  { label: "数秘術", href: "/numerology", sub: [] },
  { label: "九星気学", href: "/kyusei", sub: [] },
  { label: "算命学", href: "/sanmeigaku", sub: [] },
  { label: "統合鑑定", href: "/diagnosis", sub: [] },
  { label: "About", href: "/about", sub: [] },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-[#111111] bg-[#F9F9F7]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[52px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[17px] tracking-[0.25em] uppercase text-[#111111] hover:opacity-60 transition-opacity"
        >
          MyJiku
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item, i) => (
            <div
              key={item.href}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {i > 0 && <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[#CCC] text-xs pointer-events-none">·</span>}
              <Link
                href={item.href}
                className={`text-[9px] tracking-[0.3em] uppercase transition-opacity py-2 ${
                  pathname.startsWith(item.href)
                    ? "text-[#111111]"
                    : "text-[#888888] hover:text-[#111111]"
                }`}
              >
                {item.label}
              </Link>
              {item.sub.length > 0 && openDropdown === item.href && (
                <div className="absolute top-full left-0 pt-2 w-52">
                  <div className="bg-[#F9F9F7] border border-[#E0DDD6] shadow-sm py-2">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2 text-[9px] tracking-wider text-[#888888] hover:text-[#111111] hover:bg-[#F4F4F2] transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#111111]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E0DDD6] bg-[#F9F9F7]">
          {nav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-[9px] tracking-[0.3em] uppercase text-[#111111] border-b border-[#E0DDD6]"
              >
                {item.label}
              </Link>
              {item.sub.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-10 py-2 text-[9px] tracking-wider text-[#888888] border-b border-[#E0DDD6]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
