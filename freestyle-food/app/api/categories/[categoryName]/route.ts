import { NextRequest, NextResponse } from "next/server";

const FOOD_API = process.env.FOOD_API;

export async function GET(request: NextRequest, {params}: {params: Promise<{categoryName: string}>}) {
    const { categoryName } = await params;
    const response = await fetch(`${FOOD_API}/filter.php?c=${encodeURIComponent(categoryName)}`);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
}