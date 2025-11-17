import { Bell, ChevronRight, FileText } from "lucide-react";
import CardSection from "../components/homepage/CardSection";
import IncidentsTable from "../components/homepage/IncidentsTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import utecphoto from "../../../public/assets/utecphoto.jpg";

type Incident = {
  incident_id: string;
  category: string;
  place_id?: string;
  description?: string;
  created_at?: string;
};

function HomePage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            fetchIncidents(token);
        }
    }, []);

    const BASE_URL = import.meta.env.VITE_API_URL;


    const fetchIncidents = async (token: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/incidents`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setIncidents(data.incidents || data || []);
            }
        } catch (err) {
            console.error("Error fetching incidents:", err);
        } finally {
            setLoading(false);
        }
    };

    const graveIncidents = incidents.filter((i) => (i.category || "").toUpperCase() === "GRAVE");
    const otherIncidents = incidents.filter((i) => (i.category || "").toUpperCase() !== "GRAVE");

    if (isLoggedIn) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header con botón de reportar */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800">Inicio</h1>
                        <button
                            onClick={() => navigate("/incidents/report")}
                            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition"
                        >
                            <FileText className="w-5 h-5" />
                            Reportar Incidente
                        </button>
                    </div>

                    {loading && <p className="text-center text-gray-500">Cargando incidentes...</p>}

                    {/* Tabla de Incidentes Graves (azul) */}
                    <IncidentsTable
                        title="Incidentes Graves"
                        incidents={graveIncidents}
                        borderColor="border-blue-500"
                        textColor="text-blue-700"
                    />

                    {/* Tabla de Otros Incidentes (celeste) */}
                    <IncidentsTable
                        title="Incidentes"
                        incidents={otherIncidents}
                        borderColor="border-sky-400"
                        textColor="text-sky-700"
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                className="relative h-[75vh] flex items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${utecphoto})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative w-full py-26">
                    <section className="max-w-5xl mx-auto text-center text-white">
                        <div className="inline-flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2 mb-8">
                            <Bell className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-bold">
                                Sistema de Alertas en Vivo
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-xl">
                            <span className="text-sky-300">Reporta,</span>{" "}
                            <span className="text-white">Monitorea,</span>{" "}
                            <span className="text-white">Resuelve</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow">
                            La plataforma inteligente para gestionar incidentes en el campus UTEC en tiempo real.
                            Conecta a estudiantes, personal y autoridades para resolver problemas al instante.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => navigate("/auth/login")}
                                className="cursor-pointer group bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-2 shadow-lg"
                            >
                                <span>Inicia Sesión</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate("/auth/register")}
                                className="cursor-pointer border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:border-sky-400 hover:text-sky-400 transition-all shadow-lg"
                            >
                                Regístrate
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <CardSection />
        </>
    );
}

export default HomePage;
