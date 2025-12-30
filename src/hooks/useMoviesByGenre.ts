import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { getMoviesByGenre } from "@/services/API";
import type { Genre } from "@/types/genres";
import type { MoviesResponse } from "@/types/movies";

// Getting movies by genre
export function useMoviesByGenre(
  genresArray: Genre[],
  pageNumber: number = 1
): UseQueryResult<MoviesResponse, Error>[] {
  return useQueries({
    queries:
      genresArray?.map((genre: { id: number; name: string }) => {
        return {
          queryKey: ["movieListByGenre", genre?.id, pageNumber],
          queryFn: () => getMoviesByGenre(genre.id, pageNumber),
          enabled: genresArray.length > 0 && pageNumber > 0, //only runs after genresArray has something in it
        };
      }) || [],
  });
}
