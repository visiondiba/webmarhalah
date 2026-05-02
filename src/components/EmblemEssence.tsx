"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import Box from "@/components/Box";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import data from "@/content/lambang.json";

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
  const [apiPC, setApiPC] = useState<CarouselApi>();
  const [apiMobile, setApiMobile] = useState<CarouselApi>();

  const accent = ACCENTS[activeIndex % ACCENTS.length];
  const item = data[activeIndex];

  const updateIndex = useCallback((index: number) => {
    setActiveIndex(index);
    apiPC?.scrollTo(index);
    apiMobile?.scrollTo(index);
  }, [apiPC, apiMobile]);

  useEffect(() => {
    if (!apiPC) return;
    apiPC.on("select", () => {
      setActiveIndex(apiPC.selectedScrollSnap());
    });
  }, [apiPC]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.on("select", () => {
      setActiveIndex(apiMobile.selectedScrollSnap());
    });
  }, [apiMobile]);

  // Auto-slide for mobile
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isMobile) {
      interval = setInterval(() => {
        if (apiMobile) {
          if (apiMobile.canScrollNext()) {
            apiMobile.scrollNext();
          } else {
            apiMobile.scrollTo(0);
          }
        }
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [apiMobile]);

  return (
    <>
      {/* ── DESKTOP ── */}
      <Box className="hidden md:flex flex-col min-h-screen" style={{ background: BG }}>
        <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
          <motion.div
            className="h-1 w-full shrink-0"
            animate={{ background: accent }}
            transition={{ duration: 0.6 }}
          />

          <div className="flex items-center justify-between px-16 py-5 shrink-0 relative z-20">
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

          <div className="flex flex-1 overflow-hidden py-10">
            {/* Left */}
            <div className="flex flex-col justify-center w-72 px-16 shrink-0 gap-6 relative z-20">
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
              
              <Carousel setApi={setApiPC} className="w-full max-w-lg z-10" opts={{ loop: true }}>
                <CarouselContent className="h-[512px]">
                  {data.map((slideItem, index) => {
                    const itemAccent = ACCENTS[index % ACCENTS.length];
                    return (
                      <CarouselItem key={index} className="flex items-center justify-center h-full">
                        <motion.img
                          src={slideItem.image}
                          alt={slideItem.title}
                          className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          style={{ filter: `drop-shadow(0 0 32px ${itemAccent}60) drop-shadow(0 0 80px ${itemAccent}25)` }}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-3rem] bg-transparent border-white/20 text-white hover:bg-white/10" />
                <CarouselNext className="absolute right-[-3rem] bg-transparent border-white/20 text-white hover:bg-white/10" />
              </Carousel>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center justify-center w-24 shrink-0 gap-4 relative z-20">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateIndex(i)}
                  className="rounded-full transition-all duration-300 outline-none"
                  style={{
                    width: 4,
                    height: activeIndex === i ? 32 : 8,
                    background: activeIndex === i ? accent : `${LIGHT}20`,
                  }}
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
        </div>
      </Box>

      {/* ── MOBILE ── */}
      <div
        className="relative flex md:hidden flex-col min-h-screen overflow-hidden"
        style={{ background: BG }}
      >
        <motion.div
          className="h-1 w-full shrink-0"
          animate={{ background: accent }}
          transition={{ duration: 0.6 }}
        />

        <div className="px-6 pt-8 pb-4 shrink-0 border-b relative z-20" style={{ borderColor: `${LIGHT}10` }}>
          <p className="text-xs font-medium uppercase tracking-[0.35em] mb-1" style={{ color: `${LIGHT}50` }}>
            Filosofi Logo
          </p>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: LIGHT }}>
            The Emblem Essence.
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-8">
          <div className="relative flex items-center justify-center w-full">
            <RingSystem rings={mobileRings} accent={accent} />
            
            <Carousel setApi={setApiMobile} className="w-full z-10" opts={{ loop: true }}>
              <CarouselContent>
                {data.map((slideItem, index) => {
                  const itemAccent = ACCENTS[index % ACCENTS.length];
                  return (
                    <CarouselItem key={index} className="flex justify-center items-center h-48">
                      <motion.img
                        src={slideItem.image}
                        alt={slideItem.title}
                        className="w-36 h-36 object-contain"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ filter: `drop-shadow(0 0 20px ${itemAccent}60) drop-shadow(0 0 50px ${itemAccent}25)` }}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="min-h-[200px] flex items-start justify-center w-full relative z-20">
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
        </div>

        <div className="flex flex-col items-center gap-3 pb-8 shrink-0 relative z-20">
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => updateIndex(i)}
                className="h-1.5 rounded-full transition-all duration-300 outline-none"
                style={{
                  width: activeIndex === i ? 24 : 6,
                  background: activeIndex === i ? accent : `${LIGHT}20`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}