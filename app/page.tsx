"use client";

import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";
import EmblemEssence from "@/components/EmblemEssence";
import { motion, Variants, cubicBezier } from "framer-motion";

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
              src="/assets/images/lambang2.webp"
              width={320}
              height={320}
              alt="Lambang Generasi"
              className="w-48 sm:w-64 md:w-86 object-contain"
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

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="text-center text-4xl sm:text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest text-gold-light leading-none"
          >
            Name
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
            className="text-center text-gold-light/70 tracking-wide font-light text-base sm:text-lg md:text-xl max-w-sm leading-relaxed"
          >
            The first generation of Gontor&apos;s second decade.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate="show"
            className="mt-6"
          >
            <Button
              size="lg"
              className="rounded-full px-10 py-6 text-sm sm:text-base md:text-lg uppercase tracking-widest bg-redbrand hover:bg-redbrand-dark text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 4px 24px rgba(197,58,36,0.35)" }}
            >
              Klik disini!
            </Button>
          </motion.div>

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
    </>
  );
}