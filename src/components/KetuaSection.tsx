// src/components/KetuaSection.tsx
"use client";

import Image from "next/image";
import Box from "./Box";
import { motion, cubicBezier } from "framer-motion";
import data from "@/content/ketua.json";

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

export default function KetuaSection() {
  return (
    <Box
      as="section"
      id="ketua"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#FDF9F0" }}
    >
      {/* Top accent */}
      <motion.div
        className="h-1 w-full shrink-0"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        style={{
          background: "linear-gradient(to right, #B8873A, #C53A24, #5A2C18)",
          transformOrigin: "left",
        }}
      />

      {/* RPG corner ornaments */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 pointer-events-none ${pos}`}
          style={{ borderColor: "#B8873A30" }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.08, ease }}
        />
      ))}

      {/* Header */}
      <div className="px-10 md:px-16 pt-16 pb-10">
        <GlitchText delay={0.1}>
          <p
            className="text-xs uppercase tracking-[0.35em] mb-2"
            style={{ color: "#B8873A" }}
          >
            Pimpinan Marhalah
          </p>
          <h1
            className="text-4xl md:text-5xl uppercase tracking-widest leading-none"
            style={{ color: "#5A2C18" }}
          >
            Ketua <span style={{ color: "#B8873A" }}>Marhalah.</span>
          </h1>
        </GlitchText>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 flex-1 min-h-[70vh]">
        {data.map((ketua, i) => (
          <motion.div
            key={i}
            className="relative flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease }}
            style={{
              borderRight: i < data.length - 1 ? "1px solid #B8873A15" : "none",
            }}
          >
            {/* Top accent bar per card */}
            <motion.div
              className="h-0.5 w-full shrink-0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease }}
              style={{ background: ketua.accent, transformOrigin: "left" }}
            />

            {/* Photo */}
            <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease }}
              >
                <Image
                  src={ketua.image}
                  alt={ketua.name}
                  fill
                  className="object-cover object-top"
                />
                {/* Scan line */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                  }}
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, #FDF9F0 100%)",
                  }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-8 pb-12 gap-5">
              {/* Name & jabatan */}
              <GlitchText delay={0.5 + i * 0.15}>
                <h2
                  className="text-2xl uppercase tracking-widest leading-tight"
                  style={{ color: "#5A2C18" }}
                >
                  {ketua.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-5 h-px"
                    style={{ background: ketua.accent }}
                  />
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: ketua.accent }}
                  >
                    {ketua.jabatan}
                  </span>
                </div>
              </GlitchText>

              {/* Divider */}
              <motion.div
                className="h-px origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.15, ease }}
                style={{ background: `${ketua.accent}30` }}
              />

              {/* Quote */}
              <GlitchText delay={0.75 + i * 0.15}>
                <span
                  className="text-4xl leading-none font-serif select-none block -mb-2"
                  style={{ color: `${ketua.accent}25` }}
                >
                  &ldquo;
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5A2C18AA" }}
                >
                  {ketua.quote}
                </p>
                <span
                  className="text-xs uppercase tracking-widest mt-3 block"
                  style={{ color: `${ketua.accent}70` }}
                >
                  — {ketua.name}
                </span>
              </GlitchText>
            </div>
          </motion.div>
        ))}
      </div>
    </Box>
  );
}