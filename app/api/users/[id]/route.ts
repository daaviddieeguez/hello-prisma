import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    const user = await prisma.user.findUnique({
      where: { id: Number(resolvedParams.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    await prisma.user.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json(
      { message: "Se elimino correctamente" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar al usuario" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;

    const body = await request.json();

    const updateUser = await prisma.user.update({
      where: { id: Number(resolvedParams.id) },
      data: {
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json(
      updateUser,
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar al usuario" },
      { status: 500 },
    );
  }
}
