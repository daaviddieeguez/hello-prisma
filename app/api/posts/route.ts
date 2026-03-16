import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET() {
    try{
        const posts = await prisma.post.findMany();

        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        return NextResponse.json(
            {error: "Error interno del servidor"},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try{
        const body = await request.json();

        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                published: body.published,
                authorId: body.authorId
            }
        });

        return NextResponse.json(newPost, {status: 201});
    } catch (error) {
        console.error("Error al crear el post", error);
        return NextResponse.json(
            {error: "No se pudo crear el post"},
            { status: 500 }
        );
    }
}