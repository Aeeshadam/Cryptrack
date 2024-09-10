import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
    },
  };

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&community_data=false&developer_data=false`,
      options
    );
    const data = response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch coin details data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin details data" },
      { status: 500 }
    );
  }
}
