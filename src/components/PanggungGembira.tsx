"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ── UI components ── */
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

/* ── Constants ── */
const COLORS = {
  bg: "#170800",
  gold: "#e3a419",
  cream: "#f2e3d0",
  goldFaint: "rgba(227, 164, 25, 0.1)",
};

/* Sub-components */

function CornerBracket({
  flip = false,
  flipY = false,
}: {
  flip?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      style={{
        transform: `scaleX(${flip ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
        opacity: 0.45,
      }}
    >
      <path d="M2 50 L2 2 L50 2" stroke="#e3a419" strokeWidth="0.8" />
      <path d="M2 18 L18 2" stroke="#e3a419" strokeWidth="0.5" opacity="0.6" />
      <path d="M2 30 L30 2" stroke="#e3a419" strokeWidth="0.3" opacity="0.3" />
      <circle cx="2" cy="2" r="3" fill="#e3a419" />
      <circle cx="50" cy="2" r="1.2" fill="#e3a419" opacity="0.45" />
      <circle cx="2" cy="50" r="1.2" fill="#e3a419" opacity="0.45" />
    </svg>
  );
}

function DiamondOrnament() {
  return (
    <div className="flex items-center gap-4 my-1">
      <div
        className="flex-1 h-px max-w-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(227,164,25,0.6))",
        }}
      />
      <div className="flex gap-2 items-center">
        <div
          className="w-1.5 h-1.5 rotate-45"
          style={{ background: "rgba(227,164,25,0.5)" }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ background: "#e3a419" }}
        />
        <div
          className="w-1.5 h-1.5 rotate-45"
          style={{ background: "rgba(227,164,25,0.5)" }}
        />
      </div>
      <div
        className="flex-1 h-px max-w-20"
        style={{
          background: "linear-gradient(90deg, rgba(227,164,25,0.6), transparent)",
        }}
      />
    </div>
  );
}

function ArtDecoArch() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ width: "min(520px, 90vw)", height: "300px" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 520 300"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M10 300 Q10 10 260 10 Q510 10 510 300"
          stroke="rgba(227,164,25,0.1)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M30 300 Q30 30 260 30 Q490 30 490 300"
          stroke="rgba(227,164,25,0.06)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M50 300 Q50 50 260 50 Q470 50 470 300"
          stroke="rgba(227,164,25,0.04)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function PanggungGembiraSec() {
  return (
    <section
      id="panggung-gembira"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: COLORS.bg }}
    >
      {/* ════ BACKGROUND LAYERS ════ */}

      {/* Fine dot grid */}
      <DotPattern
        className="absolute inset-0 opacity-[0.055]"
        cx={1}
        cy={1}
        cr={0.7}
        width={22}
        height={22}
        style={{ color: COLORS.gold }}
      />

      {/* Gold particles floating */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        staticity={25}
        color="#d4930a"
        ease={90}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 15%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Warm glow center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(212,147,10,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Art Deco top arch */}
      <ArtDecoArch />

      {/* Horizontal deco lines */}
      <div
        className="absolute top-13 left-0 right-0 h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e3a419 20%, #ffeec7 50%, #e3a419 80%, transparent)",
        }}
      />
      <div
        className="absolute bottom-13 left-0 right-0 h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e3a419 20%, #ffeec7 50%, #e3a419 80%, transparent)",
        }}
      />

      {/* Corner ornaments */}
      <div className="hidden md:block absolute top-14 left-8">
        <CornerBracket />
      </div>
      <div className="hidden md:block absolute top-14 right-8">
        <CornerBracket flip />
      </div>
      <div className="hidden md:block absolute bottom-14 left-8">
        <CornerBracket flipY />
      </div>
      <div className="hidden md:block absolute bottom-14 right-8">
        <CornerBracket flip flipY />
      </div>

      {/* ════ MAIN CONTENT ════ */}

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-5 pt-20 pb-16 gap-y-6">

        {/* Edition badge */}
        <BlurFade delay={0.1} inView>
          <Badge
            variant="outline"
            className="px-4 py-1 rounded-none tracking-[0.3em] uppercase text-[9px] font-normal"
            style={{
              fontFamily: "var(--font-sans)",
              color: COLORS.gold,
              borderColor: "rgba(227,164,25,0.3)",
              background: "rgba(227,164,25,0.05)",
            }}
          >
            Special Event · Impervious Generation 6101
          </Badge>
        </BlurFade>

        {/* ── LOGO ── */}
        <BlurFade delay={0.3} inView>
          <div className="relative w-full max-w-[220px] sm:max-w-[320px] md:max-w-[420px] mx-auto px-4">
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 30px rgba(227,164,25,0.15))",
                  "drop-shadow(0 0 50px rgba(227,164,25,0.35))",
                  "drop-shadow(0 0 30px rgba(227,164,25,0.15))"
                ],
                y: [0, -5, 0]
              }}
              transition={{
                filter: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img
                src="/assets/images/logo/logo-y.webp"
                alt="Panggung Gembira"
                className="w-full h-auto object-contain pointer-events-none select-none"
              />
            </motion.div>
          </div>
        </BlurFade>

        {/* Subtitle */}
        <BlurFade delay={0.5} inView>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-pg)", color: COLORS.cream }}
          >
            Panggung Gembira
          </h2>
        </BlurFade>

        {/* Roman numeral edition mark */}
        <BlurFade delay={0.6} inView>
          <p
            className="tracking-[0.55em] text-[11px] opacity-40 uppercase"
            style={{ fontFamily: "var(--font-pg)", color: COLORS.gold }}
          >
            · M · M · X · V · I · I ·
          </p>
        </BlurFade>

        {/* Diamond ornament divider */}
        <BlurFade delay={0.7} inView>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <DiamondOrnament />
          </motion.div>
        </BlurFade>

        {/* Tagline */}
        <BlurFade delay={0.8} inView>
          <p
            className="text-sm md:text-base max-w-xl leading-relaxed opacity-70 tracking-wide"
            style={{ fontFamily: "var(--font-sans)", color: COLORS.cream }}
          >
            Rayakan perjalanan bersama dalam satu malam penuh seni, musik, dan semangat.
            Sebuah pertunjukan eksklusif untuk Angkatan Impervious Generation — 6101.
          </p>
        </BlurFade>

        {/* CTA BUTTONS */}
        <BlurFade delay={0.9} inView>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto justify-center mt-4">
            <a
              href="https://absolute-pg.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1"
            >
              <ShimmerButton
                shimmerColor={COLORS.gold}
                background="rgba(212,147,10,0.12)"
                borderRadius="0px"
                className="w-full h-14 border border-[rgba(227,164,25,0.4)] px-8 hover:border-[#e3a419] transition-all group"
              >
                <span
                  className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#e3a419] group-hover:text-[#ffeec7] transition-colors"
                  style={{ fontFamily: "var(--font-pg)" }}
                >
                  Masuk ke Absolute PG
                </span>
              </ShimmerButton>
            </a>


          </div>
        </BlurFade>

        {/* URL hint */}
        <BlurFade delay={1.0} inView>
          <p
            className="text-[9px] uppercase tracking-[0.5em] opacity-20"
            style={{ color: COLORS.cream }}
          >
            pg.imperviousgeneration.my.id
          </p>
        </BlurFade>

      </div>

      {/* ── Bottom Stage Border ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(227,164,25,0.3), transparent)",
        }}
      />
    </section>
  );
}
