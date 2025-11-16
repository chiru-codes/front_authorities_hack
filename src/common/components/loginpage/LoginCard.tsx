import { useState, useContext } from "react";
import { AuthContext } from "../../../auth/contexts/AuthContext.tsx";
import { Link } from "react-router-dom";

import type { FormEvent } from "react";

import isologo from "../../../../public/assets/isologo-utec.png";

import { User, Lock } from "lucide-react";

function LoginCard() {
    const { login } = useContext(AuthContext)!;

    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await login({ user_id, password });

        setLoading(false);

        res.match(
            () => console.log("Login exitoso."),
            (err: Error) => {
                console.error(err);
                setError("Credenciales incorrectas.");
            }
        );
    }

    return (
        <div className="flex flex-col w-full max-w-md items-center justify-center gap-4">
            <div className="flex flex-col w-full max-w-md items-center justify-center gap-4">
                <img src={isologo} alt="isologo icon" className="w-20 h-24" />

                <h1 className="text-4xl font-bold text-center text-gray-900">
                    Iniciar sesión
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full mt-4">

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                            <User className="w-4 h-4 text-gray-900" />
                            Correo institucional
                        </label>

                        <input
                            type="text"
                            value={user_id}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
                            placeholder="tucorreo@utec.edu.pe"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                            <Lock className="w-4 h-4 text-gray-900" />
                            Contraseña
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3.5 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
                                placeholder="••••••••"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center text-sm text-gray-700">
                        <p>¿No tienes una cuenta?</p>
                        <Link to="/auth/register" className="text-blue-600 font-medium hover:underline ml-1">
                            Regístrate
                        </Link>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default LoginCard;
