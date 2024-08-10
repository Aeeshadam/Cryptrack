import { NextResponse } from "next/server";
import axios from "axios";
import { SummaryDataProps } from "@/types";

let cachedData: SummaryDataProps = {} as SummaryDataProps;
let cacheTime = 0;

const options = {
  method: "GET",
  url: "https://api.coingecko.com/api/v3/global",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-Zn9GstsVcCfuiZNwvacRTZAC",
  },
};

const fetchSummaryData = async () => {
  try {
    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch summary data:", error);
    throw new Error("Failed to fetch summary data");
  }
};

export async function GET() {
  if (Date.now() - cacheTime > 5 * 60 * 1000 || !cachedData) {
    try {
      cachedData = await fetchSummaryData();
      cacheTime = Date.now();
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(cachedData);
}
