//?לא בטוחה אם צריך את זה או לא
export const dynamic = 'force-dynamic';

//מרגלית ויטמן:
//0527671630

import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";
import Recipe from "@/app/DB/models/recipeModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        const recipes = await Recipe.find({});
        console.log("recipes in server", recipes);

        if (!recipes || recipes.length === 0) {
            return NextResponse.json({ message: "No recipes found" }
                , { status: 404 });
        }

        return NextResponse.json({  message: "ok", recipes: recipes },
            { status: 200 }
        );
    }
    catch (err) {
        console.error("Error retrieving recipes:", err);
        return NextResponse.json({ message: "Server error getting recipes", err },
            {status:500}
        );
    }
    finally {
        await disconnectFromDB();
    }
}
