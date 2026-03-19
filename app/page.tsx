"use client";

import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";
import EmblemEssence from "@/components/EmblemEssence";
import { motion, Variants, cubicBezier } from "framer-motion";
import MascotSection from "@/components/MascotSection";
import KetuaSection from "@/components/KetuaSection";
import EventSection from "@/components/EventsSection";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease },
  }),
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <Box
        as="section"
        className="relative w-full min-h-screen bg-gold-dark overflow-hidden"
      >
        {/* Background photo dengan vignette mask */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('/assets/images/bg_hero.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: `radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)`,
              opacity: 0.2, // sesuaikan 0.1 - 0.4
            }}
          />

        {/* Diagonal lines texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #fff,
              #fff 1px,
              transparent 1px,
              transparent 12px
            )`,
          }}
        />

        {/* Top-right corner ornament */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20"
          style={{
            background: `conic-gradient(from 180deg at 100% 0%, #C53A24, #B8873A, transparent)`,
          }}
        />

        {/* Bottom-left corner ornament */}
        <div
          className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-15"
          style={{
            background: `conic-gradient(from 0deg at 0% 100%, #D9B26A, #C53A24, transparent)`,
          }}
        />

        {/* Horizontal rule top */}
        <div className="absolute top-8 left-12 right-12 h-px bg-gold-light/10 pointer-events-none" />
        <div className="absolute bottom-8 left-12 right-12 h-px bg-gold-light/10 pointer-events-none" />

        <Box className="relative flex flex-col w-full min-h-screen items-center justify-center gap-4 px-6 sm:px-12 py-20">

          {/* Lambang */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
            className="mb-2"
          >
            <img
              src="/assets/images/lambang.webp"
              width={320}
              height={320}
              alt="Lambang Generasi"
              className="w-100 h-auto sm:w-64 md:w-86 object-contain"
              style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.4))" }}
            />
          </motion.div>

          {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="text-gold-light/60 text-xs sm:text-sm tracking-[0.35em] uppercase text-center font-medium"
            >
              Pondok Modern Darussalam Gontor
            </motion.p>
            {/**Header */}
<motion.h1
  variants={fadeUp}
  custom={2}
  initial="hidden"
  animate="show"
  className="text-center text-4xl sm:text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest leading-none"
>
  <motion.span
    className="inline-block"
    style={{
      backgroundImage: "linear-gradient(105deg, #D9B26A 0%, #F7E6B5 40%, #fffdf5 50%, #F7E6B5 60%, #D9B26A 100%)",
      backgroundSize: "300% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      WebkitTextStroke: "1px #D9B26A",
    }}
    animate={{ backgroundPosition: ["200% center", "-200% center"] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      repeatDelay: 3,
    }}
  >
    Impervious
  </motion.span>

  <br />

  <span className="text-white">Generation</span>
</motion.h1>
          {/* Ornamental divider */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 my-1"
          >
            <div className="w-12 h-px bg-redbrand/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-redbrand" />
            <div className="w-12 h-px bg-redbrand/60" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="text-center uppercase tracking-widest text-gold-light font-extrabold text-base sm:text-lg md:text-xl max-w-sm leading-relaxed"
          >
           Golden Age Catalyst
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            custom={6}
            initial="hidden"
            animate="show"
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <span className="text-gold-light/40 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-linear-to-b from-gold-light/40 to-transparent" />
          </motion.div>
        </Box>
      </Box>

      {/* ── ABOUT ── */}
      <Box
        as="section"
        id="about"
        className="w-full min-h-screen bg-neutralbg border-y border-gold/20"
      >
        <AboutSection />
      </Box>

      {/* ── EMBLEM ESSENCE ── */}
      <Box
        as="section"
        id="emblem-essence"
        className="w-full min-h-screen bg-accent"
      >
        <EmblemEssence />
      </Box>
      <Box as="section" id="mascot" className="w-full">
          <MascotSection />
      </Box>
      <Box as="section" id="ketua" className="w-full">
          <KetuaSection />
      </Box>
    {/**
     * 
     * <Box as="section" id="events" className="w-full">
        <EventSection />
      </Box>
     */}
     
    
    </>
  );
}