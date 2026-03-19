// src/components/AboutSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Box from "./Box";
import { motion, AnimatePresence, Variants, cubicBezier } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/content/about.json";

gsap.registerPlugin(ScrollTrigger);

const ease = cubicBezier(0.22, 1, 0.36, 1);

const CARDS = [
  {
    number: "01",
    label: "Landasan Angkatan",
    tag: "Landasan",
    accent: "#B8873A",
    body: "Generasi tonggak 100 Tahun Kedua Gontor yang tangguh dalam mengupayakan perbaikan umat dan menegakkan kebenaran, teguh dalam mempertahankan prinsip Islam, identitas, dan nilai Gontori, kokoh dalam integritas, selaras antara seruan dan perbuatan, serta dinamis meningkatkan kualitas umat demi mewujudkan pusat peradaban dunia.",
    image: "/assets/images/master_text_logo_horizontal.webp",
  },
  {
    number: "02",
    label: "Landasan Ayat",
    tag: "Slogan",
    accent: "#B8873A",
    body: "“...Dan aku tidak berkehendak menyalahi kamu (dengan mengerjakan) apa yang aku larang. Aku tidak bermaksud kecuali (mendatangkan) perbaikan selama aku masih berkesanggupan. Dan tidak ada taufik bagiku melainkan dengan (pertolongan) Allah. Hanya kepada Allah aku bertawakkal dan hanya kepada-Nya-lah aku kembali.” (QS Huud: 88)",
    image: "/assets/images/ayat.webp",
  }
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
  const card = CARDS[activeIndex];

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

  return (
    <>
      {/* ── DESKTOP ── */}
      <Box className="hidden md:flex flex-col" style={{ background: "#FDF9F0" }}>
        <div ref={sectionRefPC} className="w-full h-screen flex flex-col overflow-hidden">

          {/* Top accent bar */}
          <motion.div
            className="h-px w-full shrink-0"
            animate={{ background: card.accent }}
            transition={{ duration: 0.6 }}
          />

          {/* Header */}
          <div className="flex items-center justify-between px-16 py-5 shrink-0">
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: `${card.accent}80` }}>
              {section.eyebrow}
            </p>

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
                  <motion.span
                    className="text-xs uppercase tracking-widest"
                    animate={{ color: activeIndex === i ? c.accent : "#a3a3a3" }}
                    transition={{ duration: 0.3 }}
                  >
                    {c.label}
                  </motion.span>
                </div>
              ))}
            </div>

            <span className="text-xs tabular-nums" style={{ color: "#a3a3a3" }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="h-px mx-16" style={{ background: "#00000008" }} />

          {/* Main — centered */}
          <div className="flex-1 flex items-center justify-center px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col items-center text-center gap-8 max-w-2xl w-full"
              >
                {/* Supporting image — kecil, di atas teks */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden shrink-0"
                  style={{ width: 640, height: 240 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.05, ease }}
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-contain"
                  />
                
                </motion.div>

                {/* Tag */}
                <motion.span
                  className="inline-block text-xs uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: `${card.accent}10`, color: card.accent }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {card.tag}
                </motion.span>

                {/* Heading */}
                <div>
                  <motion.h1
                    className="text-5xl xl:text-6xl uppercase leading-none"
                    style={{ color: card.accent }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                  >
                    {card.label}
                  </motion.h1>

                  {/* Ghost number */}
                  <motion.span
                    className="text-9xl font-black leading-none select-none tabular-nums block -mt-4"
                    style={{ color: card.accent, opacity: 0.04 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.04 }}
                    transition={{ duration: 0.4 }}
                  >
                    {card.number}
                  </motion.span>
                </div>

                {/* Divider */}
                <motion.div
                  className="h-px w-12 origin-center"
                  style={{ background: `${card.accent}50` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                {/* Body */}
                <motion.p
                  className="leading-relaxed text-base"
                  style={{ color: "#6b6b6b" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {card.body}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center pb-6 shrink-0">
            <motion.p
              animate={{ opacity: activeIndex === CARDS.length - 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs uppercase tracking-widest"
              style={{ color: "#a3a3a3" }}
            >
              Scroll untuk lanjut ↓
            </motion.p>
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
        <motion.div
          className="h-px w-full shrink-0"
          animate={{ background: card.accent }}
          transition={{ duration: 0.5 }}
        />

        {/* Header */}
        <div className="px-6 pt-8 pb-4 shrink-0">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-1" style={{ color: `${card.accent}80` }}>
            {section.eyebrow}
          </p>
        </div>

        {/* Content — centered */}
        <div className="flex-1 flex items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center text-center gap-2 w-full"
            >
              {/* Supporting image */}
              <div
                className="relative rounded-xl overflow-hidden bg-transparent shrink-0"
                style={{ width: 320, height: 240 }}
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Tag */}
              <span
                className="text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full"
                style={{ background: `${card.accent}10`, color: card.accent }}
              >
                {card.tag}
              </span>

              {/* Heading */}
              <h1
                className="text-3xl uppercase leading-none"
                style={{ color: card.accent }}
              >
                {card.label}
              </h1>

              {/* Divider */}
              <div className="h-px w-10" style={{ background: `${card.accent}40` }} />

              {/* Body */}
              <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
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
            className="text-xs uppercase tracking-widest"
            style={{ color: "#a3a3a3" }}
          >
            Scroll untuk lanjut ↓
          </motion.p>
        </div>
      </div>
    </>
  );
}