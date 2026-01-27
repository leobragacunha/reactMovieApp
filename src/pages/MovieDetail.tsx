import CommentsSection from "@/components/CommentsSection";
import FavouriteIcon from "@/components/FavouriteIcon";
import MySpinner from "@/components/Spinner";

import { useUserContext } from "@/contexts/UserContext";
import { getMovieById, imageBaseURL } from "@/services/API";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaClock, FaDollarSign, FaInfoCircle, FaStar } from "react-icons/fa";
import { useParams } from "react-router";

const MovieDetail = () => {
  const queryClient = useQueryClient();

  // User Parameters
  const { user } = useUserContext();
  const userId = user?.id;

  //Movie Parameters
  const { movieId } = useParams<{ movieId: string }>();

  const {
    isFetching: isFetchingMovie,
    isError: isErrorMovie,
    error: errorMovie,
    data: movie,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: !!movieId,
  });

  if (isFetchingMovie) return <MySpinner />;
  if (isErrorMovie) return <div>Error loading movie, {errorMovie.message}</div>;

  return (
    <div className="flex-1 bg-linear-to-r  from-violet-500 to-cyan-500 ">
      <div className="w-[80%] flex mx-auto gap-x-20 gap-y-8 py-4">
        <div className="flex flex-col gap-6 max-w-sm">
          <img
            src={`${imageBaseURL}original${movie?.poster_path}`}
            className=" w-full h-auto object-contain rounded-[5px] "
          />
          <div className="flex flex-wrap content-start  gap-2  text-gray-700">
            {(movie?.vote_average ?? 0) > 0 && (
              <div className="flex gap-2 w-fit h-fit items-center bg-white/50 p-2 rounded-[5px]">
                <FaStar className="text-yellow-400" />
                <span>{movie?.vote_average.toFixed(1)}</span>
              </div>
            )}
            {(movie?.runtime ?? 0) > 0 && (
              <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
                <FaClock className="text-gray-700" />
                <span>{movie?.runtime} minutes</span>
              </div>
            )}
            {(movie?.budget ?? 0) > 0 && (
              <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
                <FaDollarSign className="text-green-700" />
                <span>
                  {((movie?.budget ?? 0) / 1000000).toFixed(2)} million
                </span>
              </div>
            )}
            <div className="flex h-fit w-fit gap-2 rounded-[5px] items-center bg-white/50 p-2">
              <FaInfoCircle
                className={
                  movie?.status === "Released"
                    ? "text-blue-600"
                    : "text-gray-700"
                }
              />
              <span>{movie?.status}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 ">
            <h2 className="text-white text-5xl">{movie?.title}</h2>

            {userId && movieId && (
              <FavouriteIcon
                userId={userId!}
                movieId={movieId!}
                queryClient={queryClient}
              />
            )}
          </div>
          {movie?.title !== movie?.original_title && (
            <h3 className="text-gray-500 italic">{movie?.original_title}</h3>
          )}
          <div className="text-white flex flex-col items-start gap-4 ">
            <p className=" text-xl italic">{movie?.tagline}</p>
            <p className="text-md">{movie?.overview}</p>
          </div>

          <div className="flex-1">
            <CommentsSection userId={userId!} movieId={movieId!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
