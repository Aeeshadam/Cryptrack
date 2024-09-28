"use client";
import React from "react";
import { Box } from "@mui/material";
import PortfolioBalance from "@/components/PortfolioBalance";
import HoldingsTable from "@/components/HoldingsTable";
import EmptyPortfolio from "@/components/EmptyPortfolio";
import { usePortfolio } from "@/contexts/PortfolioContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import DoughnutChart from "@/components/DoughnutChart";

const Page = () => {
  const { portfolioCoins, loading } = usePortfolio();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (portfolioCoins.length === 0) {
    return <EmptyPortfolio />;
  }
  return (
    <Box>
      <PortfolioBalance />
      <DoughnutChart portfolioCoins={portfolioCoins} />
      <HoldingsTable />
    </Box>
  );
};

export default Page;
