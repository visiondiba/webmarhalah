// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero",           label: "Home" },
  { id: "about",          label: "About" },
  { id: "emblem-essence", label: "Emblem" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    // Scroll state untuk blur effect
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active section via ScrollTrigger
    const triggers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    }).filter(Boolean);

    return () => {
      window.removeEventListener("scroll", onScroll);
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  const activeAccent = "#D9B26A"; // gold

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent border-transparent"
      )}
      style={
        scrolled
          ? {
              background: "rgba(26, 14, 8, 0.75)",
              borderColor: "#B8873A20",
            }
          : {}
      }
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background: scrolled
            ? "linear-gradient(to right, #B8873A, #C53A24, #5A2C18)"
            : "transparent",
          transition: "all 0.5s",
        }}
      />

      <div className="flex items-center justify-between px-8 md:px-16 py-4">

        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex flex-col gap-0.5 group"
        >
          <span
            className="text-sm uppercase tracking-[0.3em] font-medium transition-colors duration-300"
            style={{ color: scrolled ? "#D9B26A" : "#F7E6B5" }}
          >
            Name
          </span>
          <span
            className="text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: scrolled ? "#B8873A80" : "#F7E6B580" }}
          >
            Generation
          </span>
        </button>

        {/* Nav items — dot + label */}
        <div className="flex items-center gap-8">
          {SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredDot === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredDot(id)}
                onMouseLeave={() => setHoveredDot(null)}
                className="flex items-center gap-2.5 group"
              >
                {/* Dot */}
                <div className="relative flex items-center justify-center w-4 h-4">
                  {/* Outer ring — visible on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: activeAccent }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Inner dot */}
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: isActive ? 6 : isHovered ? 5 : 4,
                      height: isActive ? 6 : isHovered ? 5 : 4,
                      background: isActive
                        ? activeAccent
                        : isHovered
                        ? "#D9B26A80"
                        : scrolled
                        ? "#ffffff40"
                        : "#F7E6B540",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Label */}
                <motion.span
                  className="text-xs uppercase tracking-widest hidden md:block"
                  animate={{
                    color: isActive
                      ? activeAccent
                      : isHovered
                      ? "#D9B26A80"
                      : scrolled
                      ? "#ffffff40"
                      : "#F7E6B550",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}