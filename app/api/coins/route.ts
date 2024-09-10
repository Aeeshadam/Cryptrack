import { NextResponse } from "next/server";
import axios from "axios";
import { CoinListProps } from "@/types";

let cachedData: CoinListProps[] = [];
let cacheTime = 0;

const fetchCryptoData = async () => {
  const totalPages = 5;
  const perPage = 200;

  const headers = {
    accept: "application/json",
    "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
  };

  const pagePromises = Array.from({ length: totalPages }, (_, i) =>
    axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${
        i + 1
      }`,
      { headers }
    )
  );
  const results = await Promise.all(pagePromises);
  const allCoins = results.flatMap((result) => result.data);
  return allCoins;
};

export async function GET() {
  if (Date.now() - cacheTime > 5 * 60 * 1000 || cachedData.length === 0) {
    try {
      cachedData = await fetchCryptoData();
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
