"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";

export default function UserActions({ userId }: { userId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmado = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?",
    );
    if (!confirmado) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error interno al intentar eliminar");
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
      <Link
        href={`/editar/${userId}`}
        className="flex text-sm font-medium text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-md transition-colors"
      >
        <div className="items-center flex">
          <CiEdit />
          <div className="px-2">Modificar</div>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="flex text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
      >
        <div className="items-center flex">
          <GoTrash />
          <div className="px-2">Eliminar</div>
        </div>
      </button>
    </div>
  );
}
