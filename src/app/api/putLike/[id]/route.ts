import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import Recipe from "@/app/DB/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connectToDB();
        
        const id =params.id;
        const body = await req.json();
        const { like } = body;

        // בדיקה שה-id וה-like התקבלו
        if (!id || typeof like !== "boolean") {
            throw new Error("Missing or invalid parameters: 'id' and 'like' are required.");
        }

        // חיפוש העוגה לפי id ועדכון המאפיין like
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { like: like },
            { new: true } // מחזיר את האובייקט המעודכן
        );

        // בדיקה אם נמצא ועדכן
        if (!updatedRecipe) {
            return NextResponse.json(
                { status: 404, message: "Recipe not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { status: 200, message: "Recipe updated successfully", recipe: updatedRecipe },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating recipe:", err);
        
        return NextResponse.json(
            { status: 500, message: "Server error updating recipe", error: err },
            { status: 500 }
        );
    } finally {
        await disconnectFromDB();
    }
}
