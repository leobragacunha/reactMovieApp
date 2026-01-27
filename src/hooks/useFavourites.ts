import {
  addUserFavourite,
  isMovieFavouriteForUser,
  RemoveUserFavourite,
} from "@/services/supabaseAPI";
import type {
  AddFavouriteProps,
  RemoveFavouriteProps,
} from "@/types/favourites";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useFavourites(
  userId: string | undefined,
  movieId: string | undefined,
  queryClient: QueryClient
) {
  const {
    isFetching: isFetchingFavourite,
    isError: isErrorFavourite,
    error: errorFavourite,
    data: isFavourite,
  } = useQuery({
    queryKey: ["favourite", userId, movieId],
    queryFn: () => isMovieFavouriteForUser(userId!, movieId!),
    enabled: !!userId && !!movieId,
  });

  const favouriteMovie = useMutation({
    mutationFn: ({ userId, movieId }: AddFavouriteProps) =>
      addUserFavourite(userId, movieId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["favourite", userId, movieId],
      });
    },
    onError: (error) => {
      console.error("Error adding favourite:", error);
    },
  });

  const unfavouriteMovie = useMutation({
    mutationFn: ({ userId, movieId }: RemoveFavouriteProps) =>
      RemoveUserFavourite(userId, movieId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["favourite", userId, movieId],
      });
    },
    onError: (error) => {
      console.error("Error removing favourite:", error);
    },
  });

  return {
    isFetchingFavourite,
    isErrorFavourite,
    errorFavourite,
    isFavourite,
    favouriteMovie,
    unfavouriteMovie,
  };
}
