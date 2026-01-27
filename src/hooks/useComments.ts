import {
  createComment,
  deleteComment,
  getCommentsByMovieId,
} from "@/services/supabaseAPI";
import type { CreateCommentProps } from "@/types/comments";
import { type QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useComments = (movieId: string, queryClient: QueryClient) => {
  const stdQueryKey = ["commentsFromMovie", movieId];

  const {
    isFetching,
    isError,
    error,
    data: comments,
  } = useQuery({
    queryKey: stdQueryKey,
    queryFn: () => getCommentsByMovieId(movieId),
  });

  const submitComment = useMutation({
    mutationFn: ({ userId, movieId, comment }: CreateCommentProps) =>
      createComment(userId, movieId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: stdQueryKey,
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: stdQueryKey }),
  });

  return {
    isFetching,
    isError,
    error,
    comments,
    submitComment,
    deleteCommentMutation,
  };
};
