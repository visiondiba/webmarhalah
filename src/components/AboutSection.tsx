// src/components/AboutSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Box from "./Box";
import { H1, Muted } from "./ui/typography";
import { motion, AnimatePresence, Variants, cubicBezier } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/content/about.json";

gsap.registerPlugin(ScrollTrigger);

const ease = cubicBezier(0.22, 1, 0.36, 1);

const CARDS = [
  {
    number: "01",
    label: "Identitas",
    tag: "Identity",
    accent: "#B8873A",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: "/assets/images/overview.jpg",
    imageSide: "right" as const,
  },
  {
    number: "02",
    label: "Slogan",
    tag: "Slogan",
    accent: "#C53A24",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: "/assets/images/overview.jpg",
    imageSide: "left" as const,
  },
  {
    number: "03",
    label: "Moto",
    tag: "Motto",
    accent: "#5A2C18",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image: "/assets/images/overview.jpg",
    imageSide: "right" as const,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease },
  }),
};

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefPC = useRef<HTMLDivElement>(null);
  const sectionRefMobile = useRef<HTMLDivElement>(null);
  const { section } = content;

  useEffect(() => {
    const mm = gsap.matchMedia();
    let interval: ReturnType<typeof setInterval> | null = null;

    mm.add("(max-width: 767px)", () => {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % CARDS.length);
      }, 4000);
      return () => { if (interval) clearInterval(interval); };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefPC.current,
            start: "top top",
            end: () => `+=${(CARDS.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * CARDS.length),
                CARDS.length - 1
              );
              setActiveIndex(index);
            },
          });
        },
        "(max-width: 767px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefMobile.current,
            start: "top top",
            end: () => `+=${(CARDS.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * CARDS.length),
                CARDS.length - 1
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

  const card = CARDS[activeIndex];

  return (
    <>
      {/* ── DESKTOP ── */}
      <Box className="hidden md:flex flex-col" style={{ background: "#FDF9F0" }}>
        <div ref={sectionRefPC} className="w-full h-screen flex flex-col overflow-hidden">

          {/* Top bar */}
          <div
            className="h-1 w-full transition-all duration-700"
            style={{ background: card.accent }}
          />

          {/* Header strip */}
          <div className="flex items-center justify-between px-16 py-6 shrink-0 border-b border-neutral-200/60">
            <Muted className="uppercase tracking-[0.35em] font-medium text-xs text-gold-dark">
              {section.eyebrow}
            </Muted>

            {/* Step indicators */}
            <div className="flex items-center gap-6">
              {CARDS.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: activeIndex === i ? 24 : 6,
                      height: 6,
                      background: activeIndex === i ? c.accent : "#d4d4d4",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  <span
                    className="text-xs uppercase tracking-widest transition-colors duration-300"
                    style={{ color: activeIndex === i ? c.accent : "#a3a3a3" }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            <span className="text-xs text-neutral-400 tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Main content */}
          <div className="flex-1 flex overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex"
                style={{
                  flexDirection: card.imageSide === "right" ? "row" : "row-reverse",
                }}
              >
                {/* Text side */}
                <div className="flex flex-col justify-between p-16 flex-1">

                  {/* Top — tag + number */}
                  <div className="flex items-start justify-between">
                    <span
                      className="inline-block text-xs uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full"
                      style={{
                        background: `${card.accent}12`,
                        color: card.accent,
                      }}
                    >
                      {card.tag}
                    </span>
                    <span
                      className="text-8xl font-black leading-none select-none tabular-nums"
                      style={{ color: card.accent, opacity: 0.06 }}
                    >
                      {card.number}
                    </span>
                  </div>

                  {/* Middle — heading */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <H1
                        className="text-6xl xl:text-7xl uppercase leading-none mb-8"
                        style={{ color: card.accent }}
                      >
                        {card.label}
                      </H1>
                    </motion.div>

                    {/* Ornamental line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="origin-left mb-8"
                      style={{ height: 1, background: `${card.accent}40` }}
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="text-neutral-500 leading-relaxed text-base max-w-md"
                    >
                      {card.body}
                    </motion.p>
                  </div>

                  {/* Bottom — scroll hint */}
                  <motion.div
                    animate={{ opacity: activeIndex === CARDS.length - 1 ? 0 : 1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-px"
                      style={{ background: card.accent }}
                    />
                    <span className="text-xs uppercase tracking-widest text-neutral-400">
                      Scroll untuk lanjut
                    </span>
                  </motion.div>
                </div>

                {/* Image side */}
                <div className="relative w-[45%] shrink-0 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover"
                    style={{ scale: 1.05 }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: card.imageSide === "right"
                        ? `linear-gradient(to right, #FDF9F0 0%, transparent 20%)`
                        : `linear-gradient(to left, #FDF9F0 0%, transparent 20%)`,
                    }}
                  />
                  {/* Accent overlay */}
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ background: `${card.accent}25` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Box>

      {/* ── MOBILE ── */}
      <div
        ref={sectionRefMobile}
        className="flex md:hidden flex-col h-screen overflow-hidden"
        style={{ background: "#FDF9F0" }}
      >
        {/* Top accent */}
        <div
          className="h-1 w-full transition-all duration-500"
          style={{ background: card.accent }}
        />

        {/* Header */}
        <div className="px-6 pt-8 pb-4 shrink-0">
          <Muted className="uppercase tracking-[0.3em] font-medium text-xs text-gold-dark mb-1">
            {section.eyebrow}
          </Muted>
        </div>

        {/* Image */}
        <div className="relative mx-6 rounded-xl overflow-hidden shrink-0" style={{ height: 200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `${card.accent}30`, mixBlendMode: "multiply" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Tag on image */}
          <div className="absolute top-4 left-4">
            <span
              className="text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full"
              style={{ background: `${card.accent}`, color: "#fff" }}
            >
              {card.tag}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col justify-center px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <H1
                className="text-4xl uppercase leading-none mb-4"
                style={{ color: card.accent }}
              >
                {card.label}
              </H1>
              <div
                className="h-px mb-4"
                style={{ background: `${card.accent}30` }}
              />
              <p className="text-neutral-500 text-sm leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom dots */}
        <div className="flex flex-col items-center gap-3 pb-8 shrink-0">
          <div className="flex gap-2">
            {CARDS.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 24 : 6,
                  background: activeIndex === i ? c.accent : "#d4d4d4",
                }}
              />
            ))}
          </div>
          <motion.p
            animate={{ opacity: activeIndex === CARDS.length - 1 ? 0 : 1 }}
            className="text-xs text-neutral-400 uppercase tracking-widest"
          >
            Scroll untuk lanjut ↓
          </motion.p>
        </div>
      </div>
    </>
  );
}