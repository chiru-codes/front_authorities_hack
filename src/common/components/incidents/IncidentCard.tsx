import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type Incident = {
  incident_id: string;
  category: string;
  place_id?: string;
  description?: string;
  created_at?: string;
};

const IncidentCard: FC<{ incident: Incident; compact?: boolean }> = ({ incident, compact }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border ${incident.category === "GRAVE" ? "border-red-400" : "border-gray-200"} cursor-pointer hover:shadow-md transition`}
      onClick={() => navigate(`/incidents/details/${incident.incident_id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{incident.category}</h3>
          {!compact && (
            <p className="text-xs text-gray-500">{incident.place_id || "Sin ubicación"}</p>
          )}
        </div>
        <span className={`text-xs font-medium ${incident.category === "GRAVE" ? "text-red-600" : "text-sky-600"}`}>
          {incident.created_at ? new Date(incident.created_at).toLocaleString() : "--"}
        </span>
      </div>

      {!compact && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">{incident.description || "Sin descripción"}</p>
      )}
    </div>
  );
};

export default IncidentCard;
