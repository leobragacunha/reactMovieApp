import { Spinner } from "@/components/ui/spinner";
import { getMovieById, imageBaseURL } from "@/services/API";
import { useQuery } from "@tanstack/react-query";
import { FaClock, FaDollarSign, FaInfoCircle, FaStar } from "react-icons/fa";
import { useParams } from "react-router";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    isFetching,
    isError,
    error,
    data: movie,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: !!movieId,
  });

  if (isFetching) return <Spinner />;

  if (isError) return <div>Error loading movie, {error.message}</div>;

  return (
    <div className="flex-1 bg-linear-to-r  from-violet-500 to-cyan-500 ">
      <div className="w-[80%]  mx-auto grid grid-cols-[1fr_2fr] grid-rows-[1fr_3fr_3fr] gap-x-20 gap-y-8 py-8">
        <img
          src={`${imageBaseURL}original${movie.poster_path}`}
          className="w-60 h-auto object-contain col-1 rounded-[5px] row-span-2"
        />
        <div className="col-2 row-1">
          <h2 className="text-white text-5xl">{movie.title}</h2>
          {movie.title !== movie.original_title && (
            <h3 className="text-gray-500 italic">{movie.original_title}</h3>
          )}
        </div>
        <div className="text-white flex flex-col items-start gap-4 col-2 row-2">
          <p className=" text-3xl italic">{movie.tagline}</p>
          <p className="text-xl">{movie.overview}</p>
        </div>
        <div className="flex flex-wrap content-start  gap-2 row-3 col-1 text-gray-700">
          {movie?.vote_average > 0 && (
            <div className="flex gap-2 w-fit h-fit items-center bg-white/50 p-2 rounded-[5px]">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
          {movie?.runtime > 0 && (
            <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
              <FaClock className="text-gray-700" />
              <span>{movie.runtime} minutes</span>
            </div>
          )}
          {movie?.budget > 0 && (
            <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
              <FaDollarSign className="text-green-700" />
              <span>{(movie.budget / 1000000).toFixed(2)} million</span>
            </div>
          )}
          <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
            <FaInfoCircle
              className={
                movie?.status === "Released" ? "text-blue-600" : "text-gray-700"
              }
            />
            <span>{movie.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
