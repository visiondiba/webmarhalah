// src/components/EmblemEssence.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Box from "@/components/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import data from "@/content/lambang.json";

gsap.registerPlugin(ScrollTrigger);

const ease = cubicBezier(0.22, 1, 0.36, 1);

const ACCENTS = ["#D9B26A", "#E25930", "#F7E6B5", "#D9B26A", "#E25930"];
const BG = "#5A2C18";
const LIGHT = "#F7E6B5";

const rings = [
  { size: 760, duration: 32, reverse: false, dash: "4 8",  opacity: 0.15, thick: 1   },
  { size: 680, duration: 20, reverse: true,  dash: "2 12", opacity: 0.25, thick: 1.5 },
  { size: 600, duration: 14, reverse: false, dash: "8 4",  opacity: 0.2,  thick: 1   },
  { size: 520, duration: 10, reverse: true,  dash: "1 6",  opacity: 0.35, thick: 2   },
  { size: 440, duration: 7,  reverse: false, dash: "6 3",  opacity: 0.2,  thick: 1   },
];

const mobileRings = [
  { size: 280, duration: 28, reverse: false, dash: "4 8",  opacity: 0.15, thick: 1   },
  { size: 240, duration: 18, reverse: true,  dash: "2 12", opacity: 0.25, thick: 1.5 },
  { size: 200, duration: 12, reverse: false, dash: "8 4",  opacity: 0.2,  thick: 1   },
  { size: 160, duration: 8,  reverse: true,  dash: "1 6",  opacity: 0.35, thick: 2   },
];

function RingSystem({
  rings: ringList,
  accent,
}: {
  rings: typeof rings;
  accent: string;
}) {
  return (
    <>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ background: `${accent}18`, scale: [1, 1.08, 1] }}
        transition={{
          background: { duration: 0.8 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          width: ringList[0].size * 0.6,
          height: ringList[0].size * 0.6,
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ background: `${accent}08` }}
        style={{
          width: ringList[0].size * 0.9,
          height: ringList[0].size * 0.9,
          filter: "blur(100px)",
        }}
      />

      {ringList.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ width: ring.size, height: ring.size }}
          animate={{ rotate: ring.reverse ? -360 : 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width={ring.size}
            height={ring.size}
            viewBox={`0 0 ${ring.size} ${ring.size}`}
          >
            <circle
              cx={ring.size / 2}
              cy={ring.size / 2}
              r={ring.size / 2 - 2}
              fill="none"
              stroke={accent}
              strokeWidth={ring.thick}
              strokeDasharray={ring.dash}
              strokeOpacity={ring.opacity}
            />
            {i % 2 === 0 &&
              [0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const cx = ring.size / 2 + (ring.size / 2 - 6) * Math.cos(rad);
                const cy = ring.size / 2 + (ring.size / 2 - 6) * Math.sin(rad);
                return (
                  <circle
                    key={deg}
                    cx={cx}
                    cy={cy}
                    r={2.5}
                    fill={accent}
                    fillOpacity={ring.opacity * 2}
                  />
                );
              })}
            {i % 2 === 1 &&
              [45, 135, 225, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const cx = ring.size / 2 + (ring.size / 2 - 6) * Math.cos(rad);
                const cy = ring.size / 2 + (ring.size / 2 - 6) * Math.sin(rad);
                return (
                  <rect
                    key={deg}
                    x={cx - 2}
                    y={cy - 2}
                    width={4}
                    height={4}
                    fill={accent}
                    fillOpacity={ring.opacity * 2}
                    transform={`rotate(45, ${cx}, ${cy})`}
                  />
                );
              })}
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="absolute rounded-full border pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0, 0.3],
          borderColor: accent,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: ringList[2].size, height: ringList[2].size, borderWidth: 1 }}
      />
    </>
  );
}

export default function EmblemEssence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const sectionRefPC = useRef<HTMLDivElement>(null);
  const sectionRefMobile = useRef<HTMLDivElement>(null);

  const accent = ACCENTS[activeIndex % ACCENTS.length];
  const item = data[activeIndex];
  const isLast = activeIndex === data.length - 1;

  // Mobile auto-interval
  useEffect(() => {
    const mm = gsap.matchMedia();
    let interval: ReturnType<typeof setInterval> | null = null;

    mm.add("(max-width: 767px)", () => {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % data.length);
      }, 4000);
      return () => { if (interval) clearInterval(interval); };
    });

    return () => mm.revert();
  }, []);

  // ScrollTrigger pin
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefPC.current,
            start: "top top",
            end: () => `+=${(data.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * data.length),
                data.length - 1
              );
              setActiveIndex(index);
            },
          });
        },
        "(max-width: 767px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefMobile.current,
            start: "top top",
            end: () => `+=${(data.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * data.length),
                data.length - 1
              );
              setActiveIndex(index);
            },
          });
        },
      });
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  // Show skip after 2s
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Skip to end
  const skipToEnd = () => {
    ScrollTrigger.getAll().forEach((st) => {
      if (
        st.trigger === sectionRefPC.current ||
        st.trigger === sectionRefMobile.current
      ) {
        st.scroll(st.end);
      }
    });
    setActiveIndex(data.length - 1);
  };

  const SkipButton = () => (
    <AnimatePresence>
      {showSkip && !isLast && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          onClick={skipToEnd}
          className="absolute bottom-6 right-10 text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300"
          style={{ color: `${LIGHT}35`, borderColor: `${LIGHT}12` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = LIGHT;
            e.currentTarget.style.borderColor = `${LIGHT}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = `${LIGHT}35`;
            e.currentTarget.style.borderColor = `${LIGHT}12`;
          }}
        >
          Skip →
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ── DESKTOP ── */}
      <Box className="hidden md:flex flex-col" style={{ background: BG }}>
        <div ref={sectionRefPC} className="relative w-full h-screen flex flex-col overflow-hidden">

          <motion.div
            className="h-1 w-full shrink-0"
            animate={{ background: accent }}
            transition={{ duration: 0.6 }}
          />

          <div className="flex items-center justify-between px-16 py-5 shrink-0">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em]" style={{ color: `${LIGHT}60` }}>
                Identitas Visual
              </p>
              <h1 className="text-2xl font-semibold tracking-tight leading-none mt-0.5" style={{ color: LIGHT }}>
                The Emblem Essence.
              </h1>
            </div>

            <span className="text-xs tabular-nums" style={{ color: `${LIGHT}30` }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(data.length).padStart(2, "0")}
            </span>
          </div>

          <Separator style={{ background: `${LIGHT}10` }} />

          <div className="flex flex-1 overflow-hidden">
            {/* Left */}
            <div className="flex flex-col justify-center w-72 px-16 shrink-0 gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col gap-4"
                >
                  <Badge
                    variant="outline"
                    className="w-fit uppercase tracking-widest text-xs"
                    style={{ borderColor: `${accent}50`, color: accent, background: `${accent}12` }}
                  >
                    Filosofi Lambang
                  </Badge>
                  <div>
                    <span
                      className="text-6xl font-black leading-none select-none tabular-nums"
                      style={{ color: LIGHT, opacity: 0.08 }}
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="text-3xl font-semibold uppercase tracking-widest leading-none -mt-2"
                      style={{ color: LIGHT }}
                    >
                      {item.title}
                    </h2>
                  </div>
                  <div className="h-px w-12" style={{ background: `${accent}50` }} />
                  <p className="text-sm leading-relaxed" style={{ color: `${LIGHT}60` }}>
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center */}
            <div className="flex-1 flex items-center justify-center relative">
              <RingSystem rings={rings} accent={accent} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.5, ease }}
                  className="relative z-10 flex items-center justify-center"
                  style={{ width: 512, height: 512 }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 0 32px ${accent}60) drop-shadow(0 0 80px ${accent}25)` }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center justify-center w-24 shrink-0 gap-4">
              {data.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full cursor-default"
                  animate={{
                    width: 4,
                    height: activeIndex === i ? 32 : 8,
                    background: activeIndex === i ? accent : `${LIGHT}20`,
                  }}
                  transition={{ duration: 0.35 }}
                />
              ))}
              <div className="h-px w-4 mt-4" style={{ background: `${LIGHT}10` }} />
              <span
                className="text-xs tabular-nums"
                style={{ color: `${LIGHT}25`, writingMode: "vertical-rl" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex justify-center py-5 shrink-0">
            <motion.p
              animate={{ opacity: isLast ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs uppercase tracking-widest"
              style={{ color: `${LIGHT}35` }}
            >
              Scroll untuk lanjut ↓
            </motion.p>
          </div>

          <SkipButton />
        </div>
      </Box>

      {/* ── MOBILE ── */}
      <div
        ref={sectionRefMobile}
        className="relative flex md:hidden flex-col h-screen overflow-hidden"
        style={{ background: BG }}
      >
        <motion.div
          className="h-1 w-full shrink-0"
          animate={{ background: accent }}
          transition={{ duration: 0.6 }}
        />

        <div className="px-6 pt-8 pb-4 shrink-0 border-b" style={{ borderColor: `${LIGHT}10` }}>
          <p className="text-xs font-medium uppercase tracking-[0.35em] mb-1" style={{ color: `${LIGHT}50` }}>
            Filosofi Logo
          </p>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: LIGHT }}>
            The Emblem Essence.
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
          <div className="relative flex items-center justify-center">
            <RingSystem rings={mobileRings} accent={accent} />
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={item.image}
                  alt={item.title}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.45, ease }}
                  className="w-36 h-36 object-contain"
                  style={{ filter: `drop-shadow(0 0 20px ${accent}60) drop-shadow(0 0 50px ${accent}25)` }}
                />
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <Badge
                variant="outline"
                className="uppercase tracking-widest text-xs"
                style={{ borderColor: `${accent}50`, color: accent, background: `${accent}12` }}
              >
                Filosofi Lambang
              </Badge>
              <h2 className="text-2xl font-semibold uppercase tracking-widest" style={{ color: LIGHT }}>
                {item.title}
              </h2>
              <div className="h-px w-8" style={{ background: `${accent}50` }} />
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${LIGHT}60` }}>
                {item.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-3 pb-8 shrink-0">
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 24 : 6,
                  background: activeIndex === i ? accent : `${LIGHT}20`,
                }}
              />
            ))}
          </div>
          <motion.p
            animate={{ opacity: isLast ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-xs uppercase tracking-widest"
            style={{ color: `${LIGHT}35` }}
          >
            Scroll untuk lanjut ↓
          </motion.p>
        </div>

        <SkipButton />
      </div>
    </>
  );
}