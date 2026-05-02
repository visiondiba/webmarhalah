"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const BG = "#3D1A0A";
const LIGHT = "#F7E6B5";
const ACCENT = "#D9B26A";
const ACCENT2 = "#E25930";

// Decorative orbiting ring config
const RINGS = [
  { size: 320, duration: 30, dir: 1, dash: "3 10", opacity: 0.12, thick: 1 },
  { size: 280, duration: 18, dir: -1, dash: "6 6", opacity: 0.18, thick: 1 },
  { size: 240, duration: 12, dir: 1, dash: "2 8", opacity: 0.25, thick: 1.5 },
];

type Particle = { id: number; x: number; y: number; size: number; duration: number; delay: number; opacity: number };

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "loading" | "done">("enter");
  const [particles, setParticles] = useState<Particle[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controls = useAnimationControls();

  // Generate particles only on client to avoid SSR hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 8 + 5,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  useEffect(() => {
    // Brief entrance pause before progress starts
    const enterTimeout = setTimeout(() => {
      setPhase("loading");

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          const inc = Math.floor(Math.random() * 3) + 1;
          return Math.min(prev + inc, 100);
        });
      }, 40);
    }, 400);

    const handleLoad = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setPhase("done");
      setTimeout(() => setLoading(false), 1200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(enterTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Drive the glow pulsing based on progress
  useEffect(() => {
    controls.start({
      filter: `drop-shadow(0 0 ${12 + progress * 0.3}px ${ACCENT}80) drop-shadow(0 0 ${30 + progress * 0.6}px ${ACCENT}30)`,
    });
  }, [progress, controls]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: `radial-gradient(ellipse at center, #4a2012 0%, ${BG} 70%)` }}
        >

          {/* ── Floating Particles ── */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: ACCENT,
                opacity: p.opacity,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Background Radial Glow ── */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 900,
              height: 900,
              background: `conic-gradient(from 0deg, ${ACCENT}, ${ACCENT2}, ${ACCENT})`,
              filter: "blur(140px)",
            }}
          />

          {/* ── Main Content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* ── Emblem Zone ── */}
            <div className="relative flex items-center justify-center mb-14">
              {/* Orbiting Rings */}
              {RINGS.map((ring, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ width: ring.size, height: ring.size }}
                  animate={{ rotate: ring.dir * 360 }}
                  transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                >
                  <svg width={ring.size} height={ring.size} viewBox={`0 0 ${ring.size} ${ring.size}`}>
                    <circle
                      cx={ring.size / 2}
                      cy={ring.size / 2}
                      r={ring.size / 2 - 2}
                      fill="none"
                      stroke={i % 2 === 0 ? LIGHT : ACCENT}
                      strokeWidth={ring.thick}
                      strokeDasharray={ring.dash}
                      strokeOpacity={ring.opacity}
                    />
                    {/* Cardinal dots */}
                    {[0, 90, 180, 270].map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      const cx = ring.size / 2 + (ring.size / 2 - 4) * Math.cos(rad);
                      const cy = ring.size / 2 + (ring.size / 2 - 4) * Math.sin(rad);
                      return (
                        <circle
                          key={deg}
                          cx={cx} cy={cy} r={2}
                          fill={ACCENT}
                          fillOpacity={ring.opacity * 3}
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              ))}

              {/* Pulse Ring */}
              <motion.div
                className="absolute rounded-full border pointer-events-none"
                animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 200, height: 200, borderColor: ACCENT, borderWidth: 1 }}
              />

              {/* Emblem Container (192x192) */}
              <div className="relative w-48 h-48">
                {/* Ghost / dim layer */}
                <img
                  src="/assets/images/lambang.webp"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain grayscale"
                  style={{ opacity: 0.12 }}
                />

                {/* Filling layer — clips from bottom */}
                <motion.div
                  className="absolute inset-0 w-full overflow-hidden"
                  style={{ bottom: 0, top: "auto" }}
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "linear" }}
                >
                  <motion.img
                    src="/assets/images/lambang.webp"
                    alt="Lambang"
                    animate={controls}
                    className="absolute bottom-0 left-0 w-48 h-48 object-contain"
                  />
                </motion.div>

                {/* Shimmering glare */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden w-48 h-48"
                  style={{ borderRadius: 4 }}
                >
                  <motion.div
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: [0.4, 0, 0.6, 1] }}
                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 30%, rgba(247,230,181,0.18) 50%, transparent 70%)`,
                      transform: "skewX(-10deg)",
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* ── Brand Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center flex flex-col items-center"
            >
              <span
                className="text-[9px] uppercase tracking-[0.75em] font-semibold mb-3"
                style={{ color: `${ACCENT}80` }}
              >
                Impervious Generation · 6101 · Golden Age Catalyst
              </span>
              <h1
                className="uppercase font-bold leading-none tracking-[0.06em] mb-1"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3rem)",
                  color: LIGHT,
                  textShadow: `0 0 40px ${ACCENT}40`,
                }}
              >
                Impervious Generation
              </h1>
              <span
                className="text-[9px] uppercase tracking-[0.6em] font-medium mt-2"
                style={{ color: `${LIGHT}30` }}
              >
                Unshaken · Unbroken
              </span>

              {/* ── Progress System ── */}
              <div className="mt-10 flex flex-col items-center gap-3 w-64">
                {/* Label row */}
                <div className="flex justify-between w-full text-[9px] uppercase tracking-[0.4em]">
                  <span style={{ color: `${LIGHT}25` }}>Initializing</span>
                  <motion.span
                    key={progress}
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="tabular-nums font-bold"
                    style={{ color: ACCENT }}
                  >
                    {String(progress).padStart(3, "0")}%
                  </motion.span>
                </div>

                {/* Progress track */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: 2, background: `${LIGHT}08`, borderRadius: 1 }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    style={{ background: `linear-gradient(90deg, ${ACCENT2}80, ${ACCENT}, ${LIGHT})` }}
                  />
                  {/* Glowing tip */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    animate={{ left: `calc(${progress}% - 4px)` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    style={{
                      background: LIGHT,
                      boxShadow: `0 0 10px ${ACCENT}, 0 0 20px ${ACCENT}`,
                    }}
                  />
                </div>

                {/* Phase text */}
                <motion.p
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] uppercase tracking-[0.5em]"
                  style={{ color: `${LIGHT}20` }}
                >
                  {phase === "enter" ? "Preparing..." : phase === "loading" ? "Loading assets..." : "System ready —"}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* ── Decorative Frame ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner brackets */}
            {[
              "top-8 left-8 border-t border-l",
              "top-8 right-8 border-t border-r",
              "bottom-8 left-8 border-b border-l",
              "bottom-8 right-8 border-b border-r",
            ].map((cls, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.35, scale: 1 }}
                transition={{ duration: 1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute w-12 h-12 ${cls}`}
                style={{ borderColor: LIGHT }}
              />
            ))}

            {/* Horizontal scan line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}15, transparent)` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
