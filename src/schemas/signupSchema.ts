import { z } from "zod";

export const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 20 characters")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .trim(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password is too long"),
});


export type SignupSchema = z.infer<typeof signupSchema>;