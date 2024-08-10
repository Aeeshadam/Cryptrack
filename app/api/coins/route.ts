import { NextResponse } from "next/server";
import axios from "axios";

let cachedData: any[] = [];
let cacheTime = 0;

const fetchCryptoData = async () => {
  const allCoins: any[] = [];
  const perPage = 200;
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}`,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
      },
    };
    const response = await axios.request(options);
    const data = response.data;
    allCoins.push(...data);
    if (page >= 10) {
      hasMore = false;
    } else {
      page++;
    }
  }
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
