"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Box from "@/components/Box"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/content/lambang.json"
import { Button } from "./ui/button"

export default function EmblemEssence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefPC = useRef<HTMLDivElement>(null);
  const sectionRefMobile = useRef<HTMLDivElement>(null);

  // Auto interval untuk mobile
  useEffect(() => {
    const mm = gsap.matchMedia();
    let interval: ReturnType<typeof setInterval> | null = null;

    mm.add("(max-width: 767px)", () => {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % data.length);
      }, 4000);
      return () => { if (interval) clearInterval(interval); };
    });

    return () => mm.revert();
  }, []);

  // ScrollTrigger pin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefPC.current,
            start: "top top",
            end: () => `+=${(data.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * data.length),
                data.length - 1
              );
              setActiveIndex(index);
            },
          });
        },
        "(max-width: 767px)": () => {
          ScrollTrigger.create({
            trigger: sectionRefMobile.current,
            start: "top top",
            end: () => `+=${(data.length - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * data.length),
                data.length - 1
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

  const item = data[activeIndex];

  return (
    <>
      {/* ========== PC ========== */}
      <Box className="hidden md:flex flex-col bg-zinc-50">
        <div ref={sectionRefPC} className="w-full h-screen flex flex-col">

          {/* Header */}  
          <div className="flex flex-col gap-2 px-12 py-12 shrink-0 border-b border-zinc-200">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Identitas Visual
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
              The Emblem Essence.
            </h1>
          </div>

          {/* Main */}
          <div className="flex flex-1 overflow-hidden">

            {/* Sidebar */}
            <div className="flex flex-col w-64 border-r border-zinc-200 py-10 px-6 gap-1 justify-center shrink-0">
              {data.map((item, index) => (
                <Button
                  key={item.title}
                  
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase tracking-wide text-sm pointer-events-none ${
                    activeIndex === index
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {item.title}
                </Button>
              ))}

              {/* Progress bar */}
              <div className="mt-8 px-4">
                <div className="w-full h-[2px] bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-zinc-900 rounded-full"
                    animate={{ width: `${((activeIndex + 1) / data.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  {activeIndex + 1} / {data.length}
                </p>
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-center justify-center px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full max-w-4xl"
                >
                  <Card className="w-full flex flex-row items-center gap-10 p-10 border-zinc-200 shadow-sm bg-white">
                    <div className="shrink-0 w-52 h-52 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                      <Badge variant="outline" className="w-fit text-zinc-500 border-zinc-300 uppercase tracking-widest text-xs">
                        Filosofi Lambang
                      </Badge>
                      <CardHeader className="p-0">
                        <CardTitle className="text-3xl font-bold uppercase tracking-tight text-zinc-900">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <Separator className="bg-zinc-200" />
                      <CardContent className="p-0 text-zinc-500 text-base leading-relaxed">
                        {item.desc}
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Scroll hint */}
          <div className="flex justify-center pb-6 shrink-0">
            <motion.p
              animate={{ opacity: activeIndex === data.length - 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-zinc-400 uppercase tracking-widest"
            >
              Scroll untuk lanjut ↓
            </motion.p>
          </div>

        </div>
      </Box>

      {/* ========== MOBILE ========== */}
      <div ref={sectionRefMobile} className="flex md:hidden flex-col h-screen bg-zinc-50">

        {/* Header */}
        <div className="flex flex-col gap-1 px-6 pt-10 pb-4 shrink-0 border-b border-zinc-200">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Identitas Visual
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            The Emblem Essence
          </h1>
        </div>

        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <Card className="w-full flex flex-col items-center gap-6 p-6 border-zinc-200 shadow-sm bg-white">
                <div className="w-40 h-40 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-3"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Badge variant="outline" className="w-fit text-zinc-500 border-zinc-300 uppercase tracking-widest text-xs">
                    Filosofi Lambang
                  </Badge>
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold uppercase tracking-tight text-zinc-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <Separator className="bg-zinc-200" />
                  <CardContent className="p-0 text-zinc-500 text-sm leading-relaxed">
                    {item.desc}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom indicator */}
        <div className="flex flex-col items-center gap-3 pb-8 shrink-0">
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}
          </div>
          <motion.p
            animate={{ opacity: activeIndex === data.length - 1 ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-zinc-400 uppercase tracking-widest"
          >
            Scroll untuk lanjut ↓
          </motion.p>
        </div>

      </div>
    </>
  );
}