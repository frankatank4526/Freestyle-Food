import { NextRequest, NextResponse } from "next/server";

const FOOD_API = process.env.FOOD_API;

export async function GET(request: NextRequest, {params}: {params: Promise<{recipeId: string}>}) {
    const { recipeId } = await params;
    const response = await fetch(`${FOOD_API}/lookup.php?i=${encodeURIComponent(recipeId)}`);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
}