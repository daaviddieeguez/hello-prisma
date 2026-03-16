import UserActions from "@/components/UserActions";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <main className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Directorio de Usuarios
          </h1>

          <Link
            href="/alta"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
          >
            + Añadir Usuario
          </Link>
        </div>
        <div className="grid gap-6">
          {users.map((user) => ( 
            user.role === "ADMIN" ? null :
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
            >
              <div className="border-b border-slate-100 pb-4 mb-4">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Rol: {user.role}
                </p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {user.name || "Usuario sin nombre"}
                </h2>
                <p className="text-blue-600 font-medium">{user.email}</p>
                <UserActions userId={user.id} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  Publicaciones ({user.posts.length}):
                </p>

                {user.posts.length > 0 ? (
                  <ul className="space-y-2">
                    {user.posts.map((post) => (
                      <li
                        key={post.id}
                        className="text-slate-600 bg-slate-50 p-3 rounded-md flex justify-between items-center"
                      >
                        <span className="font-medium">{post.title}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {post.published ? "Publicado" : "Borrador"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    No ha publicado nada aún.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
