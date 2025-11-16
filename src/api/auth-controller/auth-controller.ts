import { wrap } from "../../utils/api";

export interface LoginRequest {
    user_id: string;
    password: string;
    type?: "user" | "admin" | "solver";
    department?: string | null;
    admin_key?: string;
}

export interface LoginResponse {
    token: string;
    session_id: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) {
    console.error("VITE_API_URL no está definido");
}

export async function login(req: LoginRequest) {
    if (!req.user_id || !req.password) {
        throw new Error("Faltan credenciales");
    }

    const cleanReq: any = {
        user_id: req.user_id.trim(),
        password: req.password,
    };

    if (req.type) cleanReq.type = req.type;
    if (req.department) cleanReq.department = req.department;
    if (req.admin_key) cleanReq.admin_key = req.admin_key;

    return wrap(
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cleanReq),
        }).then(async (res) => {
            const text = await res.text();

            if (!res.ok) {
                let msg = text;

                try {
                    const parsed = JSON.parse(text);
                    msg = parsed?.message ?? msg;
                } catch { }

                throw new Error(`Login failed: ${msg}`);
            }

            try {
                return JSON.parse(text) as LoginResponse;
            } catch (err) {
                console.error("❌ Error parsing login response:", err);
                throw new Error("Respuesta inválida del servidor");
            }
        })
    );
}