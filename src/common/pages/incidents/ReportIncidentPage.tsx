import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";

const FLOORS = {
    "Sótano 2": ["Parking", "Ascensor", "L021 - Centro de Investigación del Cemento y Concreto II", "L022 - Laboratorio de perforación"],
    "Sótano 1": ["Baño", "Ascensor", "Parking", "Club"],
    "Piso 01": ["Baño", "Ascensor", "UTEC Garage", "UTEC Ventures", "Counter alumnos", "Servicios Académicos", "Bienestar Estudiantil", "Internacionalización", "Tópico", "Auditorio", "L101 - Laboratorio de Manufactura y Metrología", "L102 - Centro de Investigación del Cemento y Concreto", "A101", "A102", "Sala zoom", "Counter de admisión", "Pasadizo"],
    "Piso 02": ["Baño", "Ascensor", "L201 - Laboratorio de Mecatrónica y Robótica", "L202 - Laboratorio de Energía Renovable y Smart Grid", "L203 - Proyectos Energía y Mecánica", "L204 - Laboratorio de Mecánica de Fluidos", "L205 - Laboratorio de Sistemas Térmicos e Hidráulicos", "L206 - Laboratorio de Sistemas Hidráulicos y Neumáticos", "Comedor", "A201", "A202", "A203", "Pasadizo"],
    "Piso 03": ["Baño", "Ascensor", "M301 - Aulas multipropósito", "Pasadizo"],
    "Piso 04": ["Baño", "Ascensor", "L401 - Laboratorio de Ensayos Especiales", "L402 - Laboratorio de Tecnología de los Materiales", "L403 - Laboratorio de Procesos a Escala Piloto 1", "L404 - Laboratorio de Caracterización y Análisis Instrumental", "L405 - Laboratorio de Investigación y Desarrollo de Procesos 1", "L406 - Laboratorio de Química Avanzada", "L407 - Laboratorio de Investigación y Desarrollo de Procesos 2", "L408 - Laboratorio de Electricidad y Automatización", "L409 - Laboratorio de Electrónica y Telecomunicaciones", "L410 - Laboratorio de Prototipado y Fabricación Digital", "L411 - Laboratorio de Prototipado y Fabricación Digital", "L412 - Laboratorio de Hidrocarburos y Simulación", "L413 - Laboratorio de Sistemas de Control", "L414 - Laboratorio de Sistemas Embebidos", "L415 - Laboratorio de Automatización", "A401", "A402", "Pasadizo"],
    "Piso 05": ["Baño", "Ascensor", "L501 - Laboratorio Multiuso de Ciencias", "L502 - Laboratorio Multiuso de Ciencias", "L503 - Laboratorio de Microfluidos y BioMEMS", "L504 - Laboratorio de Ingeniería de Tejidos y Biología Sintética", "L505 - Laboratorio de Ecología, Biotecnología y Microbiología Ambiental", "L506 - Colaboratorio - Diseño de productos", "L507 - Laboratorio de Computación Avanzada", "L508 - Laboratorio de Mecánica de Suelo", "A501", "A502", "Pasadizo"],
    "Piso 06": ["Baño", "Ascensor", "A601", "A602", "Espacio de estudio - jardines", "L601 - Laboratorio de Física de Materiales e Ingeniería de Superficies", "M601 - Aula multipropósito", "M602 - Aula multipropósito", "M603 - Aula multipropósito", "M604 - Aula multipropósito", "Pasadizo"],
    "Piso 07": ["Baño", "Ascensor", "A701", "A702", "A703", "A704", "A705", "A706", "A707", "A708", "Pasadizo"],
    "Piso 08": ["Baño", "Ascensor", "A801", "A802", "A803", "A804", "M801 - Aula multipropósito", "M802 - Aula multipropósito", "M803 - Aula multipropósito", "M804 - Aula multipropósito", "Pasadizo"],
    "Piso 09": ["Baño", "Ascensor", "A901", "A902", "A903", "A904", "A905", "A906", "A907", "A908", "Pasadizo"],
    "Piso 10": ["Baño", "Ascensor", "Biblioteca", "Cubículos de estudio", "A1001", "A1002", "oficinas", "Pasadizo"],
    "Piso 11": ["Baño", "Ascensor", "Pasadizo", "Aula", "Tienda"],
};

type FloorKey = keyof typeof FLOORS;

function ReportIncidentPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<{
        category: string;
        floor: FloorKey | "";
        place_id: string;
        description: string;
    }>({
        category: "",
        floor: "",
        place_id: "",
        description: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "description" && value.length > 155) return;

        setForm({ ...form, [name]: value });
    };


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!token) {
            setError("Debes iniciar sesión para reportar un incidente.");
            return;
        }
        if (!form.category || !form.floor || !form.place_id) {
            setError("Por favor, completa categoría, piso y ambiente.");
            return;
        }

        setLoading(true);
        setError(null);

        const BASE_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${BASE_URL}/incidents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || data.message || "Error reportando el incidente");

            alert(`¡Incidente reportado! ID: ${data.incident_id}`);
            navigate("/home");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 flex flex-col items-center">
            <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Reportar Incidente</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div>
                    <label className="p-2 block text-gray-700 font-medium">
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Infraestructura">Infraestructura</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Mobiliario">Sillas, Mesas, Pizarras o Lockers</option>
                        <option value="Emergencia">Emergencia</option>
                        <option value="Limpieza y Mantenimiento">Limpieza y Mantenimiento</option>
                        <option value="Seguridad">Seguridad, Robos o Accesos no autorizados</option>
                    </select>
                </div>

                <div className="pt-4 space-y-4">
                    <label className="block text-gray-700 font-medium">
                        Piso <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="floor"
                        value={form.floor}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
                    >
                        <option value="">Selecciona un piso</option>
                        {Object.keys(FLOORS).map((floor) => (
                            <option key={floor} value={floor}>
                                {floor}
                            </option>
                        ))}
                    </select>

                    <label className="gap-2 block text-gray-700 font-medium">
                        Ambiente <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="place_id"
                        value={form.place_id}
                        onChange={handleChange}
                        disabled={!form.floor}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        <option value="">Selecciona un ambiente</option>
                        {form.floor &&
                            FLOORS[form.floor].map((place) => (
                                <option key={place} value={place}>
                                    {place}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex-col mt-12">
                    <label className="block text-gray-700 font-medium mb-2">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-400"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {form.description.length}/155
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Reportando..." : "Reportar"}
                </button>
            </div>
        </div>
    );
}

export default ReportIncidentPage;
