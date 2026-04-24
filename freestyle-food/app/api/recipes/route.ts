import { NextRequest, NextResponse } from "next/server";

const FOOD_API = process.env.FOOD_API;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ingredient1 = searchParams.get("ingredient1") ?? "";
    const ingredient2 = searchParams.get("ingredient2") ?? "";
    const ingredient3 = searchParams.get("ingredient3") ?? "";
    const ingredient4 = searchParams.get("ingredient4") ?? "";

    // optimize the below sometime in future
    const response = await fetch
    (`${FOOD_API}/filter.php?i=${ingredient1 === "" ? "" : ingredient1}
        ${ingredient2 === "" ? "" : "," + ingredient2}
        ${ingredient3 === "" ? "" : "," + ingredient3}
        ${ingredient4 === "" ? "" : "," + ingredient4}`);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
}