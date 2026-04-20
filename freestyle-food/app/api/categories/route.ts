import { NextResponse } from "next/server";

const FOOD_API = process.env.FOOD_API;

export async function GET () {
    const response = await fetch(`${FOOD_API}/categories.php`)
    const data = await response.json();
    return NextResponse.json(data);
}
