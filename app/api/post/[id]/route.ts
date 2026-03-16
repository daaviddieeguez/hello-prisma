import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    const user = await prisma.post.findUnique({
      where: { id: Number(resolvedParams.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    await prisma.post.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json(
      { message: "Se elimino correctamente" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el post" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    const body = await request.json();

    const updateUser = await prisma.post.update({
      where: { id: Number(resolvedParams.id) },
      data: {
        title: body.title,
        authorId: body.authorId,
        published: body.published
      },
    });

    return NextResponse.json( updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el post" },
      { status: 500 },
    );
  }
}