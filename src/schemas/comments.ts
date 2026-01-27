import * as z from "zod";

export const CommentSchema = z.object({
  comment: z.string().optional(),
});

export type CommentFormData = z.infer<typeof CommentSchema>;
