import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import Recipe from "@/app/DB/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        
        const recipes = await Recipe.find({});
        console.log("recipes in server", recipes); 

        
        if (!recipes || recipes.length === 0) {
            return NextResponse.json({ status: 404, message: "No recipes found" }, { status: 404 });
        }
         
        return NextResponse.json({ status: 200, message: "ok", recipes: recipes });
    }
    catch (err) {
        console.error("Error retrieving recipes:", err); 
        return NextResponse.json({ status: 500, message: "Server error getting recipes", err });
    }
    finally{
        await disconnectFromDB();
      }
}
