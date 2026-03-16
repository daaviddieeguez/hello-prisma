import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Error al obtener los usuarios" },
            { status: 200 }
        );
    }
}

export async function POST(request: Request) {
    try{
        const body = await request.json();

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error(error);
        
        return NextResponse.json(
            {error: "Error al crear el usuario"},
            {status: 500}
        )
    }
}