import type {
  CommentProps,
  DeleteCommentMutationProps,
} from "@/types/comments";
import { convertTimeStampToDateString } from "@/utils/helpers";

import { FaTrashAlt, FaUser } from "react-icons/fa";

const Comment = ({
  comment,
  deleteMutation,
}: {
  comment: CommentProps;
  deleteMutation: DeleteCommentMutationProps;
}) => {
  const commentDate = convertTimeStampToDateString(comment.created_at);

  const handleDelete = (commentId: string) => {
    deleteMutation.mutate({ commentId });
  };

  return (
    <div className="grid grid-cols-[.1fr_1fr_.2fr_.1fr] grid-rows-[auto] gap-2">
      {comment.profiles && comment.profiles.photoPath ? (
        <img
          className="col-start-1 w-8 h-8 rounded-full object-contain self-center"
          src={comment?.profiles?.photoPath}
          alt=""
        />
      ) : (
        <FaUser className="col-start-1 w-8 h-8 rounded-full object-contain self-center border-2 border-white p-0.5" />
      )}
      <h3 className="col-start-2 font-bold self-center">
        {comment?.profiles?.fullName}
      </h3>
      <p className="col-start-3 col-span-2 self-center place-self-end italic text-sm">
        {commentDate}
      </p>
      <p className="row-start-2 col-start-1 col-span-3 text-sm">
        {comment.comment}
      </p>
      <span className="col-start-4 row-start-2 self-start place-self-end">
        <FaTrashAlt
          className="hover:text-red-500 transition-colors duration-150"
          onClick={() => handleDelete(String(comment.id))}
        />
      </span>
    </div>
  );
};

export default Comment;
