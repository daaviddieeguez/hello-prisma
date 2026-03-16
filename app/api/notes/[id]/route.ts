import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "getting single note..."
    })
}

export function DELETE() {
    return NextResponse.json({
        message: "deleting single note..."
    })
}

export function UPDATE() {
    return NextResponse.json({
        message: "updating single note..."
    })
}