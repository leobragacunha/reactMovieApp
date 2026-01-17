//Shad cn

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/services/API";

import CarouselWithTitle from "./CarouselWithTitle";
import MySpinner from "./Spinner";

const TrendingMovies = () => {
  const {
    isPending,
    isError,
    data: trendingMovies,
    error,
  } = useQuery({ queryKey: ["trendingMovies"], queryFn: getTrendingMovies });

  if (isPending) {
    return <MySpinner />;
  }

  if (isError) {
    return (
      <div>
        Errorloading trending movies: {error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="py-8 px-8 bg-linear-to-r from-violet-500 to-cyan-500">
      <CarouselWithTitle movieArray={trendingMovies.results}>
        <header className="flex items-end mb-4 gap-4">
          <h2 className="text-2xl font-bold text-white">Trending Movies</h2>
        </header>
      </CarouselWithTitle>
    </div>
  );
};

export default TrendingMovies;
