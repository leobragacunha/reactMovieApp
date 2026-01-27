import type { UseMutationResult } from "@tanstack/react-query";

export interface CommentSectionProps {
  userId: string;
  movieId: string;
}

export interface CreateCommentProps extends CommentSectionProps {
  comment: string;
}

export interface CommentProps {
  id: number;
  created_at: string;
  created_by: string;
  movie_id: number;
  comment: string;
  profiles: { fullName: string; photoPath: string } | null;
}

export type DeleteCommentMutationProps = UseMutationResult<
  void,
  Error,
  {
    commentId: string;
  },
  unknown
>;
