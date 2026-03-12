import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AboutCarousel() {
  return (
    <Carousel className="w-full max-w-40 sm:max-w-xs md:max-w-sm lg:max-w-md">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 sm:p-2">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-3 sm:p-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}