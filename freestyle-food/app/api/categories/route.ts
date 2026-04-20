import { NextResponse } from "next/server";

const FOOD_API = process.env.FOOD_API;

export async function GET() {
  if (!FOOD_API) {
    return NextResponse.json(
      { error: "FOOD_API is undefined" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${FOOD_API}/categories.php`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: "Upstream API request failed",
          status: response.status,
          body: text.slice(0, 300),
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Fetch to FOOD_API failed",
        detail: String(err),
      },
      { status: 500 }
    );
  }
}