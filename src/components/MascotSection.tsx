// src/components/MascotSection.tsx
"use client";

import Image from "next/image";
import Box from "./Box";
import { motion, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

function GlitchText({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: 0 }}
      whileInView={{
        opacity: [0, 1, 0.3, 1, 0.7, 0, 1],
        x: [0, -4, 6, -2, 4, 0, 0],
        skewX: [0, -3, 2, -1, 0, 0, 0],
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        times: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
}

function GlitchLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{
        scaleX: [0, 1.2, 0.8, 1.1, 0.95, 1],
        opacity: [0, 1, 0.4, 1, 0.8, 1],
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "linear",
      }}
      className="origin-left h-px w-16"
      style={{ background: "#C53A24" }}
    />
  );
}

export default function MascotSection() {
  return (
    <Box
      as="section"
      id="mascot"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#1a0e08" }}
    >
      {/* Full bleed image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/maskot.webp"
          alt="Maskot"
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Scan line on load */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{ opacity: 0.6 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #1a0e08 0%, rgba(26,14,8,0.65) 45%, rgba(26,14,8,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #1a0e08 0%, transparent 50%)",
        }}
      />

      {/* RPG corner ornaments */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 pointer-events-none ${pos}`}
          style={{ borderColor: "#D9B26A40" }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.08, ease }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end w-full min-h-screen px-10 md:px-20 pb-16 md:pb-24 gap-4">
        <GlitchText
          delay={0.2}
          className="text-xs uppercase tracking-[0.35em]"
          style={{ color: "#D9B26A" }}
        >
          Maskot Angkatan
        </GlitchText>

        <GlitchText delay={0.35}>
          <h1
            className="text-5xl md:text-7xl xl:text-8xl uppercase tracking-widest leading-none"
            style={{ color: "#F7E6B5" }}
          >
            Zu&apos;aym

          </h1>
        </GlitchText>

        <GlitchLine delay={0.5} />

        <GlitchText
          delay={0.65}
          className="text-sm md:text-base leading-relaxed max-w-md"
          style={{ color: "#F7E6B570" }}
        >
           Berakar dari za&apos;āmah (kepemimpinan), mencerminkan sosok yang siap memikul amanah dan menentukan arah perjuangan—dekat dengan yang dipimpinnya, teguh dalam prinsip, berintegritas, serta konsisten membuktikan seruan melalui tindakan nyata, sehingga kepemimpinannya hidup dalam amal dan berdampak bagi peradaban umat.
        </GlitchText>

        {/* RPG stat bars */}
        <motion.div
          className="flex gap-6 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          {["Kekuatan", "Kebijakan", "Keberanian"].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "#D9B26A60" }}
              >
                {stat}
              </span>
              <div className="w-20 h-px relative" style={{ background: "#F7E6B515" }}>
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  style={{ background: "#D9B26A" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${[85, 70, 90][i]}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 + i * 0.1, ease }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Box>
  );
}