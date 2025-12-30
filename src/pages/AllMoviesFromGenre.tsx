import type { Genre } from "@/types/genres";
import { useParams } from "react-router";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import { Spinner } from "@/components/ui/spinner";
import CardWithInfo from "@/components/CardWithInfo";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { useGenrePagination } from "@/hooks/useGenrePagination";

const AllMoviesFromGenre = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const {
    isFetching: isFetchingGenres,
    isError: isErrorGenres,
    error: errorGenres,
    genresObject,
  } = useMovieGenres();

  const currentGenre = genresObject.find(
    (genre: Genre) => genre.id === parseInt(genreId!)
  );

  const {
    hasMore,
    loadMore,
    allMovies,
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
    error: errorMovies,
  } = useGenrePagination(currentGenre ? [currentGenre] : ([{}] as Genre[]));

  // Sentinel ref for infinite scrolling
  const sentinelRef = useInfiniteScrollObserver(loadMore, hasMore);

  // const {
  //   isPending: isPendingMovies,
  //   isError: isErrorMovies,
  //   error: errorMovies,
  //   data: movieRecords,
  // } = genreQuery;

  // Guard clauses
  // GenreId
  if (!genreId) return;

  // useMovieGenres
  if (isFetchingGenres) return <Spinner />;
  if (isErrorGenres) {
    return (
      <div>
        Error loading genres:{" "}
        {errorGenres ? errorGenres.message : "Unknown error"}
      </div>
    );
  }

  // Variable
  if (!currentGenre) return;

  // useGenrePagination
  if (isFetchingMovies && allMovies.length === 0) return <Spinner />;
  if (isErrorMovies) {
    return (
      <div>
        Error loading movies:{" "}
        {errorMovies ? errorMovies.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-violet-500 to-cyan-500 text-white px-8">
      <header className="mb-4">
        <h2 className="text-2xl font-bold">All {currentGenre?.name} movies</h2>
      </header>
      <section className="w-[90%] grid gap-8 grid-cols-5 mx-auto pb-4">
        {allMovies?.map((movie) => (
          <CardWithInfo key={movie.id} movie={movie} className="" />
        ))}
      </section>
      {hasMore && (
        <div
          ref={sentinelRef}
          className="h-10 w-full flex justify-center items-center pt-8 bg-linear-to-r from-violet-500 to-cyan-500"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AllMoviesFromGenre;
