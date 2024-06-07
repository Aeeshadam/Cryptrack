import React from "react";
import MarketStatItem from "./MarketStatsItem";

const marketStatsData = [
  {
    label: "Market Cap",
    value: "$ 200B",
    tooltip:
      "The total market value of a company’s outstanding shares of stock or all the coins a company have mined",
  },
  {
    label: "Circulating Supply",
    value: "$ 1,765,034,000",
    tooltip: "The total number of coins that are currently in circulation",
  },
  {
    label: "Total Supply",
    value: "$ 22.4B",
    tooltip: "The total number of coins that will ever be produced",
  },
  {
    label: "Fully Diluted Valuation",
    value: "$ 1.4B",
    tooltip: "The market cap if all coins were mined",
  },
  {
    label: "Volume 24h",
    value: "$ 1.23B",
    tooltip: "Total volume traded in the last 24 hours",
  },
  {
    label: "Price Change 24h",
    value: "0.51%",
    tooltip: "Percentage change in price in the last 24 hours",
    isNegative: true,
  },
  {
    label: "All Time High",
    value: "$745",
    tooltip: "Highest price ever reached",
    date: "May 24, 2022",
  },
  {
    label: "All Time Low",
    value: "$125",
    tooltip: "Lowest price ever reached",
    date: "May 12, 2020",
  },
];

const MarketStats = () => (
  <section className="container">
    <div className="bg-midnight flex flex-col gap-10 items-start p-5 md:p-12">
      <h3 className="font-semibold">Market Stats</h3>
      <div className="grid grid-flow-dense w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {marketStatsData.map((item) => (
          <MarketStatItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default MarketStats;
