"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import data from "@/content/lambang.json"

export default function LambangFilosofi() {
    const [index, setIndex] = useState(0);

    const imageRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
           setIndex((prev) => (prev + 1) % data.length)
        }, 4000)

        return () => clearInterval(interval);
    })

    useEffect(() => {
        if (imageRef.current && textRef.current) {
            gsap.set([imageRef.current, textRef.current], {opacity: 0, y: 20})

            gsap.to([imageRef.current, textRef.current], 
                {opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power1.out"}
            )
        }
    }, [index])

    const item = data[index];

  return (
    <section className="py-10 flex flex-col items-center text-center gap-6">
    
          <img
            ref={imageRef}
            src={item.image}
            alt={item.title}
            className="max-w-full h-auto rounded-xl"
            width={400}
            height={400}
          />
          <div ref={textRef}>
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground max-w-md">{item.desc}</p>
          </div>
          

    </section>
  )
}