'use client'


import Box from "./Box"
import { Separator } from "./ui/separator"
import {H1, H2, H3, H4, P, Large, InlineCode, Muted} from "./ui/typography"
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  return (
    <> 
    <Box className="flex flex-col w-full h-full gap-2 md:pt-20 md:pb-10 md:px-12 px-6 pt-10 pb-4">
        <Muted className="text-muted-foreground uppercase tracking-widest font-bold text-xs">Tentang Marhalah</Muted>
        <H1 className="md:text-7xl text-4xl font-semibold">Generation Overview.</H1>
        <Box as="span" id="text-container" className="w-full h-auto bg-zinc-50 border-2 border-zinc-200 my-4 p-5 rounded-lg">
            <H2 className="mb-2">Identitas</H2>
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