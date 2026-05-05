// src/components/EventSection.tsx
"use client";

import Image from "next/image";
import Box from "./Box";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import { useTina } from "tinacms/dist/react";

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

export default function EventSection({
  data,
  query,
  variables,
}: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const events = tinaData.eventConnection.edges?.map((edge: any) => edge.node) || [];
  
  if (events.length === 0) {
    return (
      <Box as="section" id="events" className="py-20 text-center bg-[#FDF9F0]">
        <p className="text-gold-dark/50 italic">No events found at the moment.</p>
      </Box>
    );
  }

  const featured = events.find((e: any) => e.featured) || events[0];
  const rest = events.filter((e: any) => e !== featured);
  return (
    <Box
      as="section"
      id="events"
      className="relative w-full overflow-hidden"
      style={{ background: "#FDF9F0" }}
    >
      {/* Top accent */}
      <motion.div
        className="h-1 w-full"
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

      <div className="px-10 md:px-16 pt-16 pb-6">
        <GlitchText delay={0.1}>
          <p
            className="text-xs uppercase tracking-[0.35em] mb-2"
            style={{ color: "#B8873A" }}
          >
            Kegiatan Marhalah
          </p>
          <h1
            className="text-4xl md:text-5xl uppercase tracking-widest leading-none"
            style={{ color: "#5A2C18" }}
          >
            Our <span style={{ color: "#B8873A" }}>Events.</span>
          </h1>
        </GlitchText>
      </div>

      {/* Bento grid */}
      <div className="px-10 md:px-16 pb-16 grid grid-cols-1 md:grid-cols-3 gap-3">

        <Link href={`/blog/${featured._sys?.filename}`} className="block md:col-span-2">
        <motion.div
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{ minHeight: 520 }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={featured.image || "/assets/images/bg_hero.jpg"}
              alt={featured.title || "Featured Event"}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Scan line reveal */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0.6 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,14,8,0.92) 0%, rgba(26,14,8,0.4) 50%, transparent 100%)",
            }}
          />

          {/* Featured badge */}
          <div className="absolute top-5 left-5 z-10">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium"
              style={{ background: "#C53A24", color: "#FDF9F0" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block"
              />
              Featured
            </motion.span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
            <GlitchText delay={0.5}>
              <span
                className="text-xs uppercase tracking-widest mb-3 block"
                style={{ color: "#D9B26A" }}
              >
                {featured.date}
              </span>
              <h2
                className="text-3xl md:text-4xl uppercase tracking-widest leading-tight mb-3"
                style={{ color: "#F7E6B5" }}
              >
                {featured.title}
              </h2>
              <p
                className="text-sm leading-relaxed max-w-lg"
                style={{ color: "#F7E6B570" }}
              >
                {featured.desc}
              </p>
            </GlitchText>
          </div>
        </motion.div>
        </Link>

        {/* Right column — 4 small cards */}
        <div className="flex flex-col gap-3">
          {rest.map((event: any, i: number) => (
            <Link key={event._sys?.filename || i} href={`/blog/${event._sys?.filename}`} className="flex-1" style={{ minHeight: 120 }}>
            <motion.div
              className="relative rounded-xl overflow-hidden cursor-pointer group h-full w-full"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={event.image || "/assets/images/bg_hero.jpg"}
                  alt={event.title || "Event"}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Scan line reveal */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                }}
              />

              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,14,8,0.88) 0%, rgba(26,14,8,0.2) 60%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                <span
                  className="text-xs uppercase tracking-widest mb-1 block"
                  style={{ color: "#D9B26A80" }}
                >
                  {event.date}
                </span>
                <h3
                  className="text-sm uppercase tracking-wide leading-tight font-medium"
                  style={{ color: "#F7E6B5" }}
                >
                  {event.title}
                </h3>
                {/* Desc on hover */}
                <motion.p
                  className="text-xs leading-relaxed mt-1 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  style={{ color: "#F7E6B560" }}
                >
                  {event.desc}
                </motion.p>
              </div>

              {/* Left accent bar */}
              <div
                className="absolute top-0 bottom-0 left-0 w-0.5"
                style={{ background: "#B8873A60" }}
              />
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
}