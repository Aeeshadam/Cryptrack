import Hero from "./Hero";
import CryptoPricesSection from "./CryptoPricesSection";
import { CoinProps } from "@/types";

export default async function Home() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/coins`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }

    const data: CoinProps[] = await response.json();
    return (
      <div>
        <Hero />
        <CryptoPricesSection initialData={data} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch initial data:", error);

    return (
      <div>
        <Hero />
        <CryptoPricesSection initialData={[]} />
      </div>
    );
  }
}
