import { z } from "zod";

export const LoginRequestSchema = z.object({ // CORREGIR
    user_id: z.email().min(1, "user_id is required"),
    password: z.string().min(6, "password is required"), // CORREGIR
});

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
