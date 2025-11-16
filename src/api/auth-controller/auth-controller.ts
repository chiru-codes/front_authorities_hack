import { wrap } from "../../utils/api";

export interface LoginRequest {
    user_id: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    session_id: string;
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export function login(req: LoginRequest) {
    return wrap(
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error(`Login failed: ${await res.text()}`);
            }
            return res.json() as Promise<LoginResponse>;
        })
    );
}