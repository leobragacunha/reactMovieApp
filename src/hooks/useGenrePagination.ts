import { useEffect, useState } from "react";
import { useMoviesByGenre } from "./useMoviesByGenre";
import type { Genre } from "@/types/genres";

export function useGenrePagination(currentGenre: Genre[]) {
  const [pageNumber, setPageNumber] = useState(1);
  const [allMovies, setAllMovies] = useState<any[]>([]);

  const query = useMoviesByGenre(currentGenre, pageNumber);

  const { isFetching, isError, error, data } = query[0];

  useEffect(() => {
    // if there are any results, we update the allMovies array
    if (data?.results) {
      setAllMovies((prev) => {
        const newMovies = data.results.filter(
          (newMovie: any) =>
            !prev.some((existing) => existing.id === newMovie.id)
        );
        return [...prev, ...newMovies];
      });
    }
  }, [data]);

  const loadMore = () => {
    if (!data?.results || isFetching || !hasMore) return;
    setPageNumber((prev) => prev + 1);
  };

  // Adding ?? 0 as a default condition while there is no data
  const hasMore = (data?.page ?? 0) <= (data?.total_pages ?? 0);

  return {
    isFetching,
    isError,
    error,
    pageNumber,
    loadMore,
    hasMore,
    allMovies,
  };
}
