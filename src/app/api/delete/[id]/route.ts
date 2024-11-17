import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import Recipe from "@/app/DB/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const id =params.id;
        const recipe = await Recipe.findByIdAndDelete(id);
        console.log("recipe in server", recipe); 

        
        if (!recipe) {
            return NextResponse.json({ status: 404, message: "No recipe found" }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "ok", recipe: recipe });
    }
    catch (err) {
        console.error("Error retrieving recipes:", err); 
        return NextResponse.json({ status: 500, message: "Server error getting recipe", err });
    }
    finally{
        await disconnectFromDB();
      }
}
