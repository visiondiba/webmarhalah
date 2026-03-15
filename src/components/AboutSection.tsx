'use client'


import Image from "next/image";
import Box from "./Box"
import { Separator } from "./ui/separator"
import {H1, H2, H3, H4, P, Large, InlineCode, Muted} from "./ui/typography"
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  return (
    <> 
    {/** Media PC */}
    <Box className="hidden md:flex flex-row w-full h-full gap-10 pt-12 pb-10 px-12">
        <Box as="span" className="gap-5">
          <Muted className="text-muted-foreground uppercase tracking-[0.3em] font-bold text-xs opacity-75 mb-3">Tentang Marhalah</Muted>
          <H1 className="md:text-7xl text-4xl font-semibold mb-6">Generation Overview.</H1>
          <Separator className="bg-zinc-200" />
        </Box>
        <Separator orientation="vertical" className="bg-zinc-200" />
       <Box as="span" className="flex flex-col gap-1">
         <Box as="span" id="text-container" className="w-full h-full bg-zinc-50 border-2 border-zinc-200 my-4 p-5 rounded-lg">
            <H2 className="mb-2 uppercase tracking-widest">Identitas</H2>
            <P className="">
               Generasi yang diharapkan bukan hanya cerdas secara intelektual, 
               tetapi mampu menjadikan ilmu sebagai cahaya yang menerangi setiap sisi kehidupannya. 
               Cahaya itu tampak dari cara berpikir yang jernih, sistematis, dan jauh pandangannya, 
               sehingga ia tidak hanya mengejar nilai dan prestasi, tetapi juga memahami makna dan tanggung jawab di balik setiap pengetahuan. 
            </P>
            
        </Box>
         <Box as="span" id="text-container" className="w-full h-full bg-zinc-50 border-2 border-zinc-200 my-4 p-5 rounded-lg">
            <H2 className="mb-2 uppercase tracking-widest">Identitas</H2>
            <P className="">
               Generasi yang diharapkan bukan hanya cerdas secara intelektual, 
               tetapi mampu menjadikan ilmu sebagai cahaya yang menerangi setiap sisi kehidupannya. 
               Cahaya itu tampak dari cara berpikir yang jernih, sistematis, dan jauh pandangannya, 
               sehingga ia tidak hanya mengejar nilai dan prestasi, tetapi juga memahami makna dan tanggung jawab di balik setiap pengetahuan. 
            </P>
        </Box>
         <Box as="span" id="text-container" className="w-full h-full bg-zinc-50 border-2 border-zinc-200 my-4 p-5 rounded-lg">
            <H2 className="mb-2 uppercase tracking-widest">Identitas</H2>
            <P className="">
               Generasi yang diharapkan bukan hanya cerdas secara intelektual, 
               tetapi mampu menjadikan ilmu sebagai cahaya yang menerangi setiap sisi kehidupannya. 
               Cahaya itu tampak dari cara berpikir yang jernih, sistematis, dan jauh pandangannya, 
               sehingga ia tidak hanya mengejar nilai dan prestasi, tetapi juga memahami makna dan tanggung jawab di balik setiap pengetahuan. 
            </P>
        </Box>
       </Box>
        <Box as="span" className="relative flex self-stretch h-screen w-full -mt-12 -mb-10 -mr-12">
            <Image src="/assets/images/overview.jpg" alt="Illustration about" fill className="object-cover" />
        </Box>
    </Box>
    <Box className="flex flex-col md:hidden w-full h-full gap-2 md:pt-12 md:pb-10 md:px-12 px-6 pt-10 pb-4">
        <Muted className="text-muted-foreground uppercase tracking-[0.3em] font-bold text-xs opacity-75">Tentang Marhalah</Muted>
        <H1 className="md:text-7xl text-4xl font-semibold">Generation Overview.</H1>
        <Box as="span" id="text-container" className="w-full h-auto bg-zinc-50 border-2 border-zinc-200 my-4 p-5 rounded-lg">
            <H2 className="mb-2 uppercase tracking-widest">Identitas</H2>
            <P className="">
               Generasi yang diharapkan bukan hanya cerdas secara intelektual, 
               tetapi mampu menjadikan ilmu sebagai cahaya yang menerangi setiap sisi kehidupannya. 
               Cahaya itu tampak dari cara berpikir yang jernih, sistematis, dan jauh pandangannya, 
               sehingga ia tidak hanya mengejar nilai dan prestasi, tetapi juga memahami makna dan tanggung jawab di balik setiap pengetahuan. 
               
               </P>
        </Box>
    </Box>
    
    </>
 ) 
}