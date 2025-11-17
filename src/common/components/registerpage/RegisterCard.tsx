// src/ui/components/registerpage/RegisterCard.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import {
  register,
  type RegisterRequest,
} from "../../../api/auth-controller/auth-controller";

import isologo from "../../../../public/assets/isologo-utec.png";

function RegisterCard() {
  const navigate = useNavigate();

  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<"user" | "solver" | "admin">("user");
  const [admin_key, setAdminKey] = useState("");
  const [solver_key, setSolverKey] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload: RegisterRequest = {
      user_id,
      password,
      name,
      type,
      ...(type === "admin" && admin_key ? { admin_key } : {}),
      ...(type === "solver" && solver_key ? { solver_key } : {}),
    };

    const res = await register(payload);

    setLoading(false);

    res.match(
      (okResp) => {
        setSuccess(okResp.message || "Usuario creado correctamente.");
        setTimeout(() => navigate("/auth/login"), 1500);
      },
      (err) => {
        console.error(err);
        setError(err.message || "Error al registrar usuario.");
      }
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md items-center justify-center gap-4">
      <div className="flex flex-col w-full max-w-md items-center justify-center gap-4">
        <img src={isologo} alt="isologo icon" className="w-20 h-24" />

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Crear cuenta
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full mt-4"
        >
          {/* user_id */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-semibold text-sm">
              Correo institucional
            </label>
            <input
              type="email"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
              placeholder="tucorreo@utec.edu.pe"
              required
            />
          </div>

          {/* name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-semibold text-sm">
              Nombre completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
              placeholder="Nombre Apellido"
              required
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-semibold text-sm">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {/* type */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-semibold text-sm">
              Tipo de usuario
            </label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "user" | "solver" | "admin")
              }
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900"
            >
              <option value="user">Estudiante / Usuario</option>
              <option value="solver">Solver</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* admin_key solo si es admin */}
          {type === "admin" && (
            <div className="flex flex-col gap-1">
              <label className="text-gray-900 font-semibold text-sm">
                Clave de administrador
              </label>
              <input
                type="password"
                value={admin_key}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
                placeholder="Admin master key"
                required
              />
            </div>
          )}

          {type === "solver" && (
            <div className="flex flex-col gap-1">
                <label className="text-gray-900 font-semibold text-sm">
                    Clave de solver
                </label>
                <input
                    type="password"
                    value={solver_key}
                    onChange={(e) => setSolverKey(e.target.value)}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-900 placeholder-gray-400"
                    placeholder="Solver master key"
                    required
                />
            </div>
          )}


          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 py-2 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>

          <div className="flex justify-center items-center text-sm text-gray-700">
            <p>¿Ya tienes una cuenta?</p>
            <Link
              to="/auth/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;

