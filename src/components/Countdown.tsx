// src/components/Countdown.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// ─────────────────────────────────────────
const TARGET = new Date(2026, 2, 20, 7, 0);
const SECRET_CODE = "gontor";
// ─────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    hours:   Math.floor(diff / 1000 / 60 / 60),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          width: "clamp(72px, 14vw, 140px)",
          height: "clamp(80px, 16vw, 160px)",
          background: "#1a0e08",
          border: "1px solid #B8873A25",
        }}
      >
        <div
          className="absolute left-0 right-0 h-px z-10 pointer-events-none"
          style={{ background: "#B8873A20", top: "50%" }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="text-5xl md:text-7xl font-black tabular-nums select-none"
            style={{ color: "#F7E6B5", lineHeight: 1 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
      </div>
      <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "#B8873A80" }}>
        {label}
      </span>
    </div>
  );
}

function PinModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleChar = useCallback((char: string) => {
    if (input.length >= SECRET_CODE.length) return;
    const next = input + char;
    setInput(next);
    setError(false);

    if (next.length === SECRET_CODE.length) {
      if (next === SECRET_CODE) {
        setTimeout(onSuccess, 200);
      } else {
        setError(true);
        setTimeout(() => {
          setInput("");
          setError(false);
        }, 800);
      }
    }
  }, [input, onSuccess]);

  const handleBackspace = useCallback(() => {
    setInput((p) => p.slice(0, -1));
    setError(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Backspace") { handleBackspace(); return; }
      if (e.key.length === 1) handleChar(e.key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleChar, handleBackspace, onClose]);

  const keys = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["z","x","c","v","b","n","m","⌫"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="flex flex-col items-center gap-6 p-8 rounded-2xl"
        style={{
          background: "#1a0e08",
          border: "1px solid #B8873A25",
          minWidth: 320,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-widest" style={{ color: "#B8873A" }}>
          Masukkan Kode Akses
        </p>

        {/* Input dots */}
        <div className="flex gap-2">
          {Array.from({ length: SECRET_CODE.length }).map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              animate={{
                background: error ? "#C53A2420" : input[i] ? "#B8873A20" : "#ffffff08",
                borderColor: error ? "#C53A24" : input[i] ? "#B8873A" : "#B8873A20",
              }}
              style={{ border: "1px solid" }}
            >
              {input[i] && (
                <span className="text-sm" style={{ color: error ? "#C53A24" : "#F7E6B5" }}>
                  •
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs -mt-2"
              style={{ color: "#C53A24" }}
            >
              Kode salah
            </motion.p>
          )}
        </AnimatePresence>

        {/* On-screen keyboard */}
        <div className="flex flex-col items-center gap-2">
          {keys.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((key) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => key === "⌫" ? handleBackspace() : handleChar(key)}
                  className="flex items-center justify-center rounded-lg text-sm font-medium"
                  style={{
                    width: key === "⌫" ? 48 : 32,
                    height: 36,
                    background: "#ffffff08",
                    border: "1px solid #B8873A15",
                    color: key === "⌫" ? "#C53A24" : "#F7E6B5",
                  }}
                >
                  {key}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="text-xs uppercase tracking-widest"
          style={{ color: "#B8873A40" }}
        >
          Batal
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [bypassed, setBypassed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const bypass = useCallback(() => {
    setBypassed(true);
    setShowPin(false);
  }, []);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Desktop — ketik secret code langsung
  useEffect(() => {
    if (bypassed || showPin) return;
    let typed = "";

    const handleKey = (e: KeyboardEvent) => {
      typed = (typed + e.key).slice(-SECRET_CODE.length);
      if (typed === SECRET_CODE) bypass();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [bypassed, showPin, bypass]);

  // Hint muncul setelah 5 detik
  useEffect(() => {
    if (bypassed) return;
    const t = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(t);
  }, [bypassed]);

  if (!mounted) return null;
  if (!timeLeft || bypassed) return null;

  const { hours, minutes, seconds } = timeLeft;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#0f0a06" }}
      >
        {/* RPG rings */}
        {[600, 480, 360].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border pointer-events-none"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{
              width: size,
              height: size,
              borderColor: "#B8873A12",
              borderWidth: 1,
              borderStyle: i === 1 ? "dashed" : "solid",
            }}
          />
        ))}

        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#B8873A08",
            filter: "blur(80px)",
          }}
        />

        {/* Corner ornaments */}
        {[
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 pointer-events-none ${pos}`}
            style={{ borderColor: "#B8873A30" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-10 px-6">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: "#B8873A" }}>
              Pondok Modern Darussalam Gontor
            </p>
            <h1
              className="text-2xl md:text-4xl uppercase tracking-widest text-center leading-tight"
              style={{ color: "#F7E6B5" }}
            >
              The Next
              <br />
              <span style={{ color: "#D9B26A" }}>Generation</span>
            </h1>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="flex items-end gap-3 md:gap-6"
          >
            <FlipUnit value={pad(hours)} label="Jam" />
            <span className="text-4xl md:text-6xl font-black mb-8 select-none" style={{ color: "#B8873A40" }}>:</span>
            <FlipUnit value={pad(minutes)} label="Menit" />
            <span className="text-4xl md:text-6xl font-black mb-8 select-none" style={{ color: "#B8873A40" }}>:</span>
            <FlipUnit value={pad(seconds)} label="Detik" />
          </motion.div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#B8873A40" }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: "#B8873A60" }}>
                Menuju hari peluncuran
              </p>
              <div className="w-8 h-px" style={{ background: "#B8873A40" }} />
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setShowPin(true)}
                  className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300"
                  style={{ color: "#B8873A50", borderColor: "#B8873A20" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D9B26A";
                    e.currentTarget.style.borderColor = "#B8873A60";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#B8873A50";
                    e.currentTarget.style.borderColor = "#B8873A20";
                  }}
                >
                  Preview →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPin && (
          <PinModal onSuccess={bypass} onClose={() => setShowPin(false)} />
        )}
      </AnimatePresence>
    </>
  );
}