import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "@/services/API";

const PAGE_SIZE = 5;

// Gets movies genres according to the amount of genres to be shown (due to the pagination)
export function useMovieGenres() {
  const [visibleGenresCounter, setVisibleGenresCounter] = useState(PAGE_SIZE);

  // Getting genres
  const {
    isFetching,
    data: genresObject = [],
    error,
    isError,
  } = useQuery({
    queryKey: ["allMovies"],
    queryFn: getMovieGenres,
  });

  const visibleGenres = genresObject?.slice(0, visibleGenresCounter) || [];

  // Update the value of visibleGenresCounter to load more genres
  const loadMore = () => {
    // Update the visible genres counter to load more genres. We make sure it doesn't exceed the total number of genres available.
    setVisibleGenresCounter((prev) =>
      Math.min(prev + PAGE_SIZE, genresObject.length)
    );
  };

  const hasMore = visibleGenres.length < genresObject?.length;

  return {
    visibleGenresCounter,
    setVisibleGenresCounter,
    isFetching,
    genresObject,
    error,
    isError,
    visibleGenres,
    loadMore,
    hasMore,
  };
}
