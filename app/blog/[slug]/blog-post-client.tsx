"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, BookOpen, Clock, Share2, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

/* ─── Reading progress bar ─── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px]"
      style={{ background: "rgba(59,31,10,0.15)" }}
    >
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #B8873A, #D9B26A, #C53A24)",
        }}
      />
    </div>
  );
}

/* ─── Back-to-top button ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #B8873A, #D9B26A)",
        color: "#1A0E08",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
      aria-label="Back to top"
    >
      <ChevronUp size={18} />
    </button>
  );
}

export default function BlogPostClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const post = data.event;

  // Estimate read time (avg 200 wpm)
  const wordCount =
    typeof post.body === "string"
      ? post.body.split(/\s+/).length
      : 300;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      {/* ─── STICKY TOP NAV ─── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(59,31,10,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(184,135,58,0.18)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
            style={{ color: "#D9B26A" }}
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Kembali ke Events</span>
            <span className="sm:hidden">Kembali</span>
          </Link>

          <div className="flex items-center gap-3">
            {post.featured && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold"
                style={{ background: "#C53A24", color: "#FDF9F0" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                Featured
              </span>
            )}
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(217,178,106,0.12)", color: "#D9B26A" }}
              aria-label="Share"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── FULL-BLEED HERO ─── */}
      <div className="relative w-full" style={{ height: "55vh", minHeight: 280, maxHeight: 520 }}>
        {/* Cover image */}
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
            data-tina-field={tinaField(post, "image")}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #3B1F0A 0%, #7A4520 50%, #5C3317 100%)",
            }}
          />
        )}

        {/* Gradient scrim — heavier at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,10,4,0.15) 0%, rgba(20,10,4,0.4) 40%, rgba(20,10,4,0.92) 100%)",
          }}
        />

        {/* Hero text — anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-8 max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.date && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium"
                  style={{ color: "#D9B26A" }}
                  data-tina-field={tinaField(post, "date")}
                >
                  <CalendarDays size={12} />
                  {post.date}
                </span>
              )}
              <span className="w-1 h-1 rounded-full" style={{ background: "#D9B26A50" }} />
              <span
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider"
                style={{ color: "#D9B26A80" }}
              >
                <BookOpen size={12} />
                Artikel
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "#D9B26A50" }} />
              <span
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider"
                style={{ color: "#D9B26A80" }}
              >
                <Clock size={12} />
                {readMinutes} menit baca
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3"
              style={{ color: "#F7E6B5", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
              data-tina-field={tinaField(post, "title")}
            >
              {post.title}
            </h1>

            {/* Subtitle / desc */}
            {post.desc && (
              <p
                className="text-sm sm:text-base leading-relaxed max-w-xl"
                style={{ color: "rgba(247,230,181,0.75)" }}
                data-tina-field={tinaField(post, "desc")}
              >
                {post.desc}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* ─── PAGE BODY ─── */}
      <div
        className="w-full"
        style={{ background: "#FBF5EC", minHeight: "60vh" }}
      >
        {/* ── Separator accent ── */}
        <div
          className="w-full h-1"
          style={{
            background: "linear-gradient(90deg, #B8873A, #D9B26A 50%, #B8873A)",
          }}
        />

        {/* ── Article container ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          {/* ── Article content ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="prose prose-stone max-w-none"
            style={{
              /* Prose color tokens */
              ["--tw-prose-body" as string]: "#292116",
              ["--tw-prose-headings" as string]: "#3B1F0A",
              ["--tw-prose-lead" as string]: "#4A2C10",
              ["--tw-prose-links" as string]: "#B8873A",
              ["--tw-prose-bold" as string]: "#3B1F0A",
              ["--tw-prose-counters" as string]: "#7A4520",
              ["--tw-prose-bullets" as string]: "#B8873A",
              ["--tw-prose-hr" as string]: "#E2C99A",
              ["--tw-prose-quotes" as string]: "#5C3317",
              ["--tw-prose-quote-borders" as string]: "#D9B26A",
              ["--tw-prose-captions" as string]: "#7A4520",
              ["--tw-prose-code" as string]: "#3B1F0A",
              ["--tw-prose-pre-code" as string]: "#F7E6B5",
              ["--tw-prose-pre-bg" as string]: "#3B1F0A",
              ["--tw-prose-th-borders" as string]: "#E2C99A",
              ["--tw-prose-td-borders" as string]: "#F0E2CC",
              /* Typography */
              fontSize: "clamp(1rem, 2.8vw, 1.1rem)",
              lineHeight: "1.85",
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
            data-tina-field={tinaField(post, "body")}
          >
            {post.body ? (
              <TinaMarkdown content={post.body} />
            ) : (
              <p style={{ color: "#7A4520", fontStyle: "italic" }}>
                Konten artikel belum tersedia. Klik tombol Edit di halaman
                admin untuk menambahkan isi artikel.
              </p>
            )}
          </motion.article>

          {/* ── Decorative end mark ── */}
          <div className="flex items-center justify-center gap-3 mt-14 mb-10">
            <div className="h-px flex-1" style={{ background: "#E2C99A" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#B8873A" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D9B26A" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#B8873A" }} />
            <div className="h-px flex-1" style={{ background: "#E2C99A" }} />
          </div>

          {/* ── CTA card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: "linear-gradient(135deg, #3B1F0A 0%, #5C3317 100%)",
              boxShadow: "0 4px 32px rgba(59,31,10,0.25)",
            }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-1"
                style={{ color: "#D9B26A" }}
              >
                Webmarhalah
              </p>
              <p className="text-base font-semibold" style={{ color: "#F7E6B5" }}>
                Jelajahi artikel &amp; acara lainnya
              </p>
            </div>
            <Link
              href="/#events"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #B8873A, #D9B26A)",
                color: "#1A0E08",
              }}
            >
              <ArrowLeft size={14} />
              Kembali ke Events
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
