import { CommentSchema, type CommentFormData } from "@/schemas/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { useComments } from "@/hooks/useComments";
import type { CommentSectionProps } from "@/types/comments";
import MySpinner from "./Spinner";
import { useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";

const CommentsSection = ({ userId, movieId }: CommentSectionProps) => {
  const queryClient = useQueryClient();

  const {
    isFetching,
    isError,
    error,
    comments,
    submitComment: submitMutation,
    deleteCommentMutation: deleteMutation,
  } = useComments(movieId, queryClient);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { comment: "" },
  });

  const handleSubmit = (data: CommentFormData) => {
    if (!data || !data.comment) return;
    const { comment } = data;
    submitMutation.mutate({ userId, movieId, comment });
  };

  if (isError) return <div> {`Error Loading comments: ${error}`}</div>;

  return (
    <div className="text-white max-h-[60vh] flex flex-col">
      <h2 className="text-xl font-medium border-b-2 border-white mb-2">
        Comments
      </h2>
      {comments && comments.length > 0 ? (
        <ul className="flex-1 overflow-y-scroll border-b-2 border-b-white">
          {comments?.map((comment) => (
            <li
              key={comment.id}
              className={` border-b-white border-b-2 py-2 last:border-0`}
            >
              <Comment comment={comment} deleteMutation={deleteMutation} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-2 italic">
          No comments yet. Be the first one to comment!
        </p>
      )}
      {isFetching && <MySpinner />}
      {/* <h2 className="my-2 font-medium">Enter your comment!</h2> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            name="comment"
            control={form.control}
            render={({ field }) => (
              <InputGroup
                className={`mt-2 text-white hover:shadow-sm hover:shadow-white transition-all duration-100 has-[data-[slot="input-group-control"]:focus-visible]:ring-0 has-[data-[slot="input-group-control"]:focus-visible]:ring-offset-0`}
              >
                <InputGroupTextarea
                  placeholder="Enter your comment"
                  className="placeholder:text-white "
                  {...field}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    type="submit"
                    className="mt-2 text-white"
                    variant="ghost"
                    size="sm"
                  >
                    Send
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CommentsSection;
