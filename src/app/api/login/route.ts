export const dynamic = 'force-dynamic';

import { generateToken } from "@/app/authentication/jwt";
import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const {email} = await req.json();
        if (!email) throw new Error("Missing body");

    const token=generateToken(email);

        return NextResponse.json(
            { status: 200, message: "recipe created successfully", token: token },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error creating recipe:", err);

        return NextResponse.json(
            { status: 500, message: "Server error creating user login", error: err },
            { status: 500 }
        );
    }
    finally {
        await disconnectFromDB();
    }
}
