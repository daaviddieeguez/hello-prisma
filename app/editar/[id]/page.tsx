import UserForm from "@/components/UserForm";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";

export default async function EditarUsuarioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const user = await prisma.user.findUnique({
    where: { id: Number(resolvedParams.id) }
  });

  if (!user) {
    notFound(); 
  }

  return <UserForm user={user} />;
}