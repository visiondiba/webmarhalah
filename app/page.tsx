'use client'

import * as React from "react";
import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";
import EmblemEssence from "@/components/EmblemEssence";
import { Separator } from "@/components/ui/separator";



export default function Home() {
  return (
    <>
   <Box as="section" id="" className="w-full min-h-screen px-12">
    <Box className="flex flex-col w-full min-h-screen items-center justify-center gap-2 md:gap-4">
      <img src="https://placehold.co/256" alt="Lambang." className="py-12" />
      <h1 className="text-center font-bold text-2xl md:text-4xl uppercase tracking-widest" >Name Generation</h1>
      <p className="text-center text-muted-foreground tracking-tight font-normal text-xl md:text-2xl md:leading-4">The first generation of Gontor’s second decade.</p>
      <Button size={"lg"} variant={"default"} className="rounded-full md:text-xl md:p-6 uppercase tracking-widest mt-6">
        Klik disini!
        </Button>
    </Box>
   </Box>
   <Box as="section" id="about" className="w-full min-h-screen bg-zinc-50 border-y-2 border-zinc-200">
    <AboutSection/>
   </Box> 
   <Box as="section" id="emblem-essence" className="w-full min-h-screen bg-accent">
    <EmblemEssence/>
   </Box>
   </>
  );
}
