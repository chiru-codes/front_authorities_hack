import { ResultAsync } from "neverthrow";

export interface LoginRequest {
    user_id: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    session_id: string;
}

//const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "https://qzkbh4dev6.execute-api.us-east-1.amazonaws.com";
export function login(req: LoginRequest) {
    return ResultAsync.fromPromise(
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        }).then(async (res) => {
            const text = await res.text();

            if (!res.ok) {
                let msg = text;
                try {
                    msg = JSON.parse(text)?.message ?? msg;
                } catch {}
                throw new Error(msg);
            }

            return JSON.parse(text) as LoginResponse;
        }),
        (err) => err as Error
    );
}
