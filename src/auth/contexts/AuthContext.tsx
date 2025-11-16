import { createContext, useState, type ReactNode } from "react";
import { ResultAsync } from "neverthrow";
import { login } from "../../api/auth-controller/auth-controller";
import type { LoginRequestDTO } from "../../api/schemas/LoginRequestDTO";
import type { AuthResponseDTO } from "../../api/schemas/AuthResponseDTO";

interface AuthContextType {
    login: (loginRequest: LoginRequestDTO) => ResultAsync<AuthResponseDTO, Error>;
    logout: () => void;
    session?: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<string | null>(() =>
        localStorage.getItem("token")
    );

    const loginHandler = (
        data: LoginRequestDTO
    ): ResultAsync<AuthResponseDTO, Error> => {
        return login(data).map((res) => {
            // res = { token, session_id }
            localStorage.setItem("token", res.token);
            setSession(res.token);
            return res; // devolvemos el AuthResponseDTO
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                login: loginHandler,
                logout,
                session,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}