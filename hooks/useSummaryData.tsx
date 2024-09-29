"use client";

import React, { useEffect, useState } from "react";

import { SummaryDataProps } from "@/types";
import { formatCurrency, formatPercentage } from "@/utils/utils";

export const useSummaryData = () => {
  const [summaryData, setSummaryData] = useState({} as SummaryDataProps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/summary");
        if (!response.ok) {
          throw new Error("Failed to fetch summary data");
        }
        const data: SummaryDataProps = await response.json();
        setSummaryData(data);
      } catch (error) {
        setError("Failed to fetch summary data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalMarketCap = summaryData.data?.total_market_cap?.usd;
  const totalVolume = summaryData.data?.total_volume?.usd;
  const btcDominance = summaryData.data?.market_cap_percentage?.btc;

  const cardsData = [
    {
      title: "Market Cap",
      value: formatCurrency(totalMarketCap),
    },
    {
      title: "Volume",
      value: formatCurrency(totalVolume),
    },
    {
      title: "BTC Dominance",
      value: formatPercentage(btcDominance),
    },
  ];

  return {
    summaryData,
    loading,
    error,
    cardsData,
  };
};
