import type { CommentProps } from "@/types/comments";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
);

// FAVOURITES SECTION
// Getting favourites for a specific user
export const getUserFavourites = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("created_by", userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user favourites:", error);
    throw error;
  }
};

export const isMovieFavouriteForUser = async (
  userId: string,
  movieId: string,
) => {
  try {
    const favourites = await getUserFavourites(userId);

    if (!favourites) return;

    const isFavourite = Boolean(
      favourites.some((movie) => movie.movie_id === Number(movieId)),
    );

    return isFavourite;
  } catch (error) {
    console.error("Error checking if movie is favourite for user:", error);
    throw error;
  }
};

// Adding a favourite movie for a user
export const addUserFavourite = async (userId: string, movieId: string) => {
  try {
    const { error } = await supabase
      .from("favourites")
      .insert({ created_by: userId, movie_id: movieId });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error adding user favourite:", error);
    throw error;
  }
};

// Removing a favourite movie for a user
export const RemoveUserFavourite = async (userId: string, movieId: string) => {
  try {
    const response = await supabase
      .from("favourites")
      .delete()
      .eq("created_by", userId)
      .eq("movie_id", movieId);

    if (response.status !== 204) {
      throw new Error(
        `Error deleting favourite! Status: ${response.status}, Message: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error removing user favourite:", error);
    throw error;
  }
};

//////////////////////////////////////////////
// COMMENTS SECTION
export const getCommentsByMovieId = async (
  movieId: string,
): Promise<CommentProps[]> => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(
        "id, created_at, created_by, movie_id, comment, profiles(fullName, photoPath)",
      )
      .eq("movie_id", Number(movieId));

    if (error) throw error;
    console.log(data);
    // IMPORTANT: This is necessary because the query interprets it is possible that the join results in an array of profiles. We know this is impossible, so the return will be always a profile object .
    return (data as unknown as CommentProps[] | null) ?? [];
  } catch (error) {
    console.error("Error getting comments for this movie:", error);
    throw error;
  }
};

export const createComment = async (
  userId: string,
  movieId: string,
  comment: string,
) => {
  try {
    const { error } = await supabase.from("comments").insert({
      created_by: userId,
      movie_id: Number(movieId),
      comment: comment,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId: string, newComment: string) => {
  try {
    const { error } = await supabase
      .from("comments")
      .update({ comment: newComment })
      .eq("id", commentId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (response?.status !== 204) {
      const error = new Error(
        `Error deleting comment: ${response.statusText} (Response status: ${response.status})`,
      );
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//////////////////////////////////////////////
// PROFILES SECTION
export const createProfile = async (userId: string) => {
  try {
    const { error } = await supabase.from("profiles").insert({ id: userId });

    if (error) throw error;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateProfile = async (
  userId: string,
  fullName: string | undefined,
  photoPath: string | undefined | null,
) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ fullName: fullName, photoPath: photoPath })
      .eq("id", userId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};
