'use client'
import Image from "next/image";
import * as React from "react";
import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ImageFrame from "@/components/ImageFrame";
import AboutCarousel from "@/components/AboutCarousel";
import PhilosophySection from "@/components/gsapdemo";


export default function Home() {
  return (
    <>
   <Box as="section" id="" className="w-full min-h-screen">
    <Box className="flex flex-col w-full min-h-screen items-center justify-center gap-2 md:gap-4">
      <img src="https://placehold.co/256" alt="Lambang." className="py-12" />
      <h1 className="text-center font-bold text-2xl md:text-4xl uppercase tracking-widest" >Name Generation</h1>
      <p className="text-center font-normal text-xl md:text-2xl md:leading-4">The first gen, the second decade of Gontor.</p>
      <Button size={"lg"} variant={"default"} className="rounded-full">
        Klik disini!
        </Button>
    </Box>
   </Box>
   <Box as="section" id="about" className="w-full min-h-screen bg-accent">
    <Box className="hidden md:grid grid-cols-2">
      <Box className="flex">
        <img src="https://placehold.co/256" alt="Lambang / Photo"/>
      </Box>
    </Box>
    <Box className="flex flex-col md:hidden w-full h-full px-10 py-15 gap-4">
      <h1 className="text-4xl font-bold tracking-tight uppercase mt-10">The Emblem Essence</h1>
      <p className="text-md font-normal tracking-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Maecenas vulputate neque et enim sodales consectetur. 
        Etiam vel enim sit amet tellus posuere auctor.
      </p>
        <PhilosophySection/>
    </Box>
   </Box>
   </>
  );
}
