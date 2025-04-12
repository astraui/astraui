import * as React from "react"

import { Card, CardContent } from "../../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel"

const OurComponents: React.FC = () => {
  return (
    <section className="flex-center">
      <Carousel className="w-3/4 md:w-9/10">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-rectangle items-center justify-center p-6">
                    <h2 className="text-center">{index + 1}</h2>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default OurComponents;