import CarouselWithTitle from "@/components/CarouselWithTitle";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import { useMoviesByGenre } from "@/hooks/useMoviesByGenre";
import { Link } from "react-router";

const AllMovies = () => {
  const {
    visibleGenresCounter,
    isFetching,
    genresObject,
    error,
    isError,
    visibleGenres,
    loadMore,
    hasMore,
  } = useMovieGenres();

  // Getting movies by genres
  const genreQueries = useMoviesByGenre(visibleGenres);

  // Sentinel ref for infinite scroll (div at the end of the list)
  // Also updates the length of visible genres when the sentinel comes into view
  const sentinelRef = useInfiniteScrollObserver(loadMore, hasMore);

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>Error loading movies: {error ? error.message : "Unknown error"}</div>
    );
  }

  // After fetching genres and movies, we start to render the main visual of the page
  return (
    <>
      <div className="bg-linear-to-r from-violet-500 to-cyan-500 text-white py-8 px-8">
        <h2 className="mb-4 text-2xl font-bold">🍿 All Movies</h2>
        {genreQueries?.map((genreQuery, index: number) => {
          if (!genreQuery) return null;

          const query = genreQueries[index];

          if (query.isPending)
            return (
              <div key={index} className="min-h-40">
                <h2>{genresObject[index]?.name}</h2>
                <Spinner key={index} className="mx-auto" />
              </div>
            );
          if (query.isError)
            return (
              <div key={index}>
                <h2>{genresObject[index]?.name}</h2>
                <p>
                  Error loading movies (
                  {query.error?.message || "Unknown error"}
                  ).
                </p>
              </div>
            );
          return (
            <CarouselWithTitle
              key={index}
              movieArray={genreQuery?.data?.results || []}
            >
              <header className="flex items-end mb-4 gap-4">
                <h2 className="text-2xl font-bold text-white">
                  {genresObject[index]?.name}
                </h2>
                <Link
                  to={`/movies/${genresObject[index]?.id}`}
                  className="hover:underline"
                >
                  See All →
                </Link>
              </header>
            </CarouselWithTitle>
          );
        })}
      </div>

      {visibleGenresCounter < genresObject.length && (
        <div
          ref={sentinelRef}
          className="h-10 w-full flex justify-center items-center pt-8 bg-linear-to-r from-violet-500 to-cyan-500"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default AllMovies;
