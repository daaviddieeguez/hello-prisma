"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  name: string | null;
  email: string;
}

export default function UserForm({ user }: { user?: User | null }) {
  const router = useRouter();
  
  const [nombre, setNombre] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!user; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const url = isEditing ? `/api/users/${user.id}` : "/api/users";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombre, email: email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ocurrió un error al guardar");
      }

      router.refresh();
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex justify-center items-center h-screen">
      <main className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h1>
          <Link href="/" className="text-slate-400 hover:text-slate-600">✕ Cancelar</Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={cargando}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-all ${
              cargando ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {cargando ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </form>
      </main>
    </div>
  );
}