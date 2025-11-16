import { z } from "zod";

export const AuthResponseSchema = z.object({
    token: z.string(),
    session_id: z.string(),
});

export type AuthResponseDTO = z.infer<typeof AuthResponseSchema>;
