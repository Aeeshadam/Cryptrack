"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SummaryDataContextProps, SummaryDataProps } from "@/types";
import { formatCurrency, formatPercentage } from "@/utils";

const SummaryDataContext = createContext<SummaryDataContextProps | undefined>(
  undefined
);

export const SummaryDataProvider = ({ children }: { children: ReactNode }) => {
  const [summaryData, setSummaryData] = useState({} as SummaryDataProps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);
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
        console.error("Failed to fetch summary data:", error);
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

  return (
    <SummaryDataContext.Provider
      value={{ summaryData, loading, error, cardsData }}
    >
      {children}
    </SummaryDataContext.Provider>
  );
};

export const useSummaryData = () => {
  const context = useContext(SummaryDataContext);

  if (!context) {
    throw new Error("useSummaryData must be used within a SummaryDataProvider");
  }

  return context;
};
