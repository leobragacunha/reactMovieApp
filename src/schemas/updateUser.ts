import * as z from "zod";

export const updateUserSchema = z.object({
  name: z.string().nullish(),
  email: z.email({ message: "Please enter a valid e-mail address" }).nullish(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .nullish(),
  photoPath: z.string().nullish(),
  isPhotoModified: z.enum(["update", "delete", "none"]).optional(),
});

export type updateUserFormData = z.infer<typeof updateUserSchema>;

export interface userUpdateObject {
  email?: string;
  password?: string;
  data?: { fullName?: string; photoPath?: string | null };
}
