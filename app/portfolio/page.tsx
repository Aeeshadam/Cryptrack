"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { PortfolioCoin } from "@/types";
import PortfolioBalance from "@/components/PortfolioBalance";
import HoldingsTable from "@/components/HoldingsTable";
import EmptyPortfolio from "@/components/EmptyPortfolio";
import usePortfolio from "@/hooks/usePortfolio";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[]>([]);
  const { fetchPortfolioCoins } = usePortfolio();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const coins = await fetchPortfolioCoins();
        setPortfolioCoins(coins);
      } catch (error) {
        console.error("Error fetching portfolio coins: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (portfolioCoins.length === 0) {
    return <EmptyPortfolio />;
  }
  return (
    <Box>
      <PortfolioBalance />
      <HoldingsTable />
    </Box>
  );
};

export default Page;
