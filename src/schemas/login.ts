import * as z from "zod";

// Zod Schema
export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid e-mail address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }), // NTH: Implement other validations (LowerCase, UpperCase, special character and number)
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
