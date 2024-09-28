import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

const useMarketStatsData = () => {
  const { coin } = useSelector((state: AppState) => state.coinDetails);
  const marketCap = coin?.market_data.market_cap?.usd;
  const circulatingSupply = coin?.market_data?.circulating_supply;
  const totalSupply = coin?.market_data?.total_supply;
  const fullyDilutedValuation = coin?.market_data?.fully_diluted_valuation?.usd;
  const marketCapChange24h =
    coin?.market_data?.market_cap_change_percentage_24h;
  const priceChange24h = coin?.market_data?.price_change_percentage_24h;
  const allTimeLow = coin?.market_data.atl?.usd;
  const allTimeHigh = coin?.market_data.ath?.usd;
  const allTimeLowDate = coin?.market_data.atl_date?.usd;
  const allTimeHighDate = coin?.market_data.ath_date?.usd;

  return [
    {
      title: "Market Cap",
      value: marketCap,
      description:
        "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.",
    },
    {
      title: "Circulating Supply",
      value: circulatingSupply,
      description:
        "The amount of a cryptocurrency that is currently in circulation.",
    },
    {
      title: "Total Supply",
      value: totalSupply,
      description: "The total amount of a cryptocurrency that is in existence.",
    },
    {
      title: "Price Change (24h)",
      value: priceChange24h,
      description:
        "The percentage change in the price of the cryptocurrency in the last 24 hours.",
      change: true,
    },
    {
      title: "Fully Diluted Valuation",
      value: fullyDilutedValuation,
      description:
        "The market capitalization if the max supply was in circulation.",
    },

    {
      title: "Market Cap Change (24h)",
      value: marketCapChange24h,
      description:
        "The percentage change of the market capitalization in the last 24 hours.",
      change: true,
    },
    {
      title: "All-Time Low",
      value: allTimeLow,
      date: allTimeLowDate,
      description: "The lowest price ever for this cryptocurrency.",
    },
    {
      title: "All-Time High",
      value: allTimeHigh,
      date: allTimeHighDate,
      description: "The highest price ever for this cryptocurrency.",
    },
  ];
};
export default useMarketStatsData;
