import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type Incident = {
  incident_id: string;
  category: string;
  place?: string;
  description?: string;
  created_at?: string;
};

type IncidentsTableProps = {
  title: string;
  incidents: Incident[];
  borderColor: string;
  textColor: string;
};

const IncidentsTable: FC<IncidentsTableProps> = ({ title, incidents, borderColor, textColor }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white rounded-2xl border-4 ${borderColor} shadow-lg overflow-hidden`}>
      <div className={`${textColor} px-6 py-4 font-bold text-xl`}>
        {title}
      </div>
      
      {incidents.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          No hay incidentes en esta categoría
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.incident_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{incident.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{incident.place || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {incident.description || "Sin descripción"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {incident.created_at ? new Date(incident.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/incidents/details/${incident.incident_id}`)}
                      className="text-sky-600 hover:text-sky-800 font-medium text-sm"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncidentsTable;
