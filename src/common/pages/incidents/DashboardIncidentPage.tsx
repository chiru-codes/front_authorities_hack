import { useEffect, useState } from "react";
import IncidentCard from "../../components/incidents/IncidentCard";

type Incident = {
    incident_id: string;
    category: string;
    place_id?: string;
    description?: string;
    created_at?: string;
};

function DashboardIncidentPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchIncidents = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/incidents`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error fetching incidents: ${res.status}`);
                }

                const data = await res.json();
                setIncidents(data.incidents || data || []);
            } catch (err: any) {
                setError(err.message || "Error");
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    const grave = incidents.filter((i) => (i.category || "").toUpperCase() === "GRAVE");
    const others = incidents.filter((i) => (i.category || "").toUpperCase() !== "GRAVE");

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Dashboard de Incidentes</h1>

            {loading && <p>Cargando incidentes...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <section className="mb-6">
                <h2 className="text-lg font-semibold text-red-600 mb-3">Incidentes GRAVE</h2>
                {grave.length === 0 ? (
                    <div className="bg-white rounded-lg p-6 border border-dashed border-gray-200">No hay incidentes graves en este momento.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {grave.map((inc) => (
                            <IncidentCard key={inc.incident_id} incident={inc} compact />
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Otros incidentes</h2>
                {others.length === 0 ? (
                    <div className="bg-white rounded-lg p-6 border border-dashed border-gray-200">No hay incidentes registrados.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {others.map((inc) => (
                            <IncidentCard key={inc.incident_id} incident={inc} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardIncidentPage;
