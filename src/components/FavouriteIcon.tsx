import { useFavourites } from "@/hooks/useFavourites";
import type { FavouriteIconProps } from "@/types/favourites";
import { FaRegStar, FaStar } from "react-icons/fa";

const FavouriteIcon = ({
  userId,
  movieId,
  queryClient,
}: FavouriteIconProps) => {
  const {
    isFavourite,
    isErrorFavourite,
    errorFavourite,
    favouriteMovie,
    unfavouriteMovie,
  } = useFavourites(userId!, movieId!, queryClient);

  if (isErrorFavourite)
    return <div>Error loading favourite status, {errorFavourite?.message}</div>;

  return (
    <>
      {isFavourite ? (
        <FaStar
          size={28}
          className="text-yellow-400 inline-block ml-2"
          onClick={() =>
            unfavouriteMovie.mutate({
              userId: userId!,
              movieId: movieId!,
            })
          }
        />
      ) : (
        <FaRegStar
          size={28}
          className="text-white inline-block ml-2 cursor-pointer "
          onClick={() =>
            favouriteMovie.mutate({ userId: userId!, movieId: movieId! })
          }
        />
      )}
    </>
  );
};

export default FavouriteIcon;
