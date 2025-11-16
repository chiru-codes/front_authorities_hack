import { z } from "zod";

export const LoginRequestSchema = z.object({
    user_id: z.string().min(1, "user_id is required"),
    password: z.string().min(1, "password is required"),
});

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
