import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";

function ReportIncidentPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        category: "",
        place_id: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/incidents`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to report incident");
            }

            const data = await res.json();
            alert(`¡Incidente reportado! ID: ${data.incident_id}`);
            navigate("/home");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-6"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">Reportar Incidente</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Categoría</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Lugar / Ubicación</label>
                    <input
                        type="text"
                        name="place_id"
                        value={form.place_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                >
                    {loading ? "Reportando..." : "Reportar Incidente"}
                </button>
            </form>
        </div>
    );
}

export default ReportIncidentPage;