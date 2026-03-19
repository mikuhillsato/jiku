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
  { label: "算命学", href: "/sanmeigaku", sub: [] },
  { label: "About", href: "/about", sub: [] },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="relative z-50 border-b border-[#1A1F35] bg-[#0E1020]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.2em] text-[#E8E5F5] hover:text-[#8B7FCC] transition-colors"
        >
          MyJiku
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <div
              key={item.href}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`text-sm tracking-wider transition-colors py-2 ${
                  pathname.startsWith(item.href)
                    ? "text-[#8B7FCC]"
                    : "text-[#8888AA] hover:text-[#E8E5F5]"
                }`}
              >
                {item.label}
              </Link>
              {item.sub.length > 0 && openDropdown === item.href && (
                <div className="absolute top-full left-0 pt-2 w-52">
                  <div className="bg-[#0E1020] border border-[#1A1F35] shadow-sm py-2">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2 text-xs tracking-wider text-[#8888AA] hover:text-[#E8E5F5] hover:bg-[#1A1F35] transition-colors"
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
          className="md:hidden text-[#E8E5F5]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-px bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1A1F35] bg-[#0E1020]">
          {nav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm tracking-wider text-[#E8E5F5] border-b border-[#1A1F35]"
              >
                {item.label}
              </Link>
              {item.sub.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-10 py-2 text-xs tracking-wider text-[#8888AA] border-b border-[#1A1F35]"
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
