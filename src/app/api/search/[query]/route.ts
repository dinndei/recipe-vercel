// import { NextRequest, NextResponse } from "next/server";
// import Recipe from "@/app/DB/models/recipeModel";
// import { connectToDB, disconnectFromDB } from "@/app/DB/connection/conDB";

// export async function GET(req: NextRequest,{ params }: { params: { query: string } }) {
//     const query =params.query;

//     if (!query) {
//         return NextResponse.json({ message: "Query parameter is required" }, { status: 400 });
//     }

//     try {
//         await connectToDB();
//         const results = await Recipe.find({
//             $or: [
//                 { name: { $regex: query, $options: "i" } },
//                 { category: { $regex: query, $options: "i" } },
//                 { instructions: { $regex: query, $options: "i" } },
//             ],
//         }).exec();

//         return NextResponse.json({ recipes: results }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Error occurred during search" }, { status: 500 });
//     } finally {
//         await disconnectFromDB();
//     }
// }
