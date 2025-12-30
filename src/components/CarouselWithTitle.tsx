import type { Movie } from "@/types/movies";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CardWithInfo from "./CardWithInfo";

const CarouselWithTitle = ({
  children,
  movieArray,
}: {
  children: React.ReactNode;
  movieArray: Movie[];
}) => {
  return (
    <>
      {children}
      <Carousel className="w-[90%] mx-auto">
        <CarouselContent>
          {movieArray?.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/6 py-8">
              <CardWithInfo movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-700" />
        <CarouselNext className="text-gray-700" />
      </Carousel>
    </>
  );
};

export default CarouselWithTitle;
