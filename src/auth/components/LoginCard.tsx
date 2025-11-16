import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { FormEvent } from "react";

function LoginCard() {
    const { login } = useContext(AuthContext)!;

    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await login({ user_id, password });

        setLoading(false);

        res.match(
            () => {
                console.log("Login exitoso ✨");
            },
            (err: Error) => {
                console.error(err);
                setError("Credenciales incorrectas.");
            }
        );
    }

    return (
        <div className="p-4 bg-white shadow rounded max-w-sm mx-auto mt-10">
            <h2 className="text-lg font-bold mb-4">Iniciar sesión</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium">User ID</label>
                    <input
                        type="text"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-sm">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Ingresando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginCard;
