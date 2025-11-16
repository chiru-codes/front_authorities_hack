import { Bell, ChevronRight } from "lucide-react";
import CardSection from "../components/homepage/CardSection";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="h-[75vh] flex items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('../../public/assets/utecphoto.jpg')" }}
            >
                <div className="w-full bg-black/50 py-26">
                    <section className="max-w-5xl mx-auto text-center text-white">

                        <div className="inline-flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2 mb-8">
                            <Bell className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-bold">
                                Sistema de Alertas en Vivo
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-xl">
                            <span className="text-white">Reporta,</span>{" "}
                            <span className="text-sky-300">Monitorea,</span>{" "}
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
