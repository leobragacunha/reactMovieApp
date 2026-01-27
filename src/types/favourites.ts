import type { QueryClient } from "@tanstack/react-query";

export interface AddFavouriteProps {
  userId: string;
  movieId: string;
}

export interface RemoveFavouriteProps extends AddFavouriteProps {}

export interface FavouriteIconProps extends AddFavouriteProps {
  queryClient: QueryClient;
}
