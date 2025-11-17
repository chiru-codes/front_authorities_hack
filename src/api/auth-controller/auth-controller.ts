import { ResultAsync } from "neverthrow";

export interface LoginRequest {
    user_id: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    session_id: string;
}

export interface RegisterRequest {
  user_id: string;
  password: string;
  name: string;
  type: "admin" | "user" | "solver";
  admin_key?: string;
  solver_key?: string;
}

export interface RegisterResponse {
  message: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

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

export function register(
  req: RegisterRequest
): ResultAsync<RegisterResponse, Error> {
  return ResultAsync.fromPromise(
    fetch(`${BASE_URL}/auth/register`, {
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

      // lambda register_user.py devuelve { message: "User X created successfully" }
      return JSON.parse(text) as RegisterResponse;
    }),
    (err) => err as Error
  );
}
