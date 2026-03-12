"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

const philosophy = [
  {
    title: "Integritas",
    desc: "Kami percaya bahwa kejujuran adalah fondasi dari setiap tindakan.",
    image: "https://placehold.co/400x400",
  },
  {
    title: "Kolaborasi",
    desc: "Kerja sama adalah kunci untuk mencapai tujuan yang lebih besar.",
    image: "https://placehold.co/400x400",
  },
  {
    title: "Inovasi",
    desc: "Kami selalu mencari cara baru untuk berkembang dan beradaptasi.",
    image: "https://placehold.co/400x400",
  },
]

export default function PhilosophySection() {
  const [index, setIndex] = useState(0)

  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % philosophy.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      [imageRef.current, textRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
  }, [index])

  const item = philosophy[index]

  return (
    <section className="py-20 flex flex-col items-center text-center gap-6">

      <img
        ref={imageRef}
        src={item.image}
        alt={item.title}
        className="w-48 h-48 object-cover rounded-xl"
      />

      <div ref={textRef}>
        <h3 className="text-2xl font-bold mb-2">
          {item.title}
        </h3>

        <p className="text-muted-foreground max-w-md">
          {item.desc}
        </p>
      </div>

    </section>
  )
}