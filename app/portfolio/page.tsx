import React from "react";
import { Box } from "@mui/material";
import PortfolioBalance from "@/components/PortfolioBalance";
import HoldingsTable from "@/components/HoldingsTable";
import EmptyPortfolio from "@/components/EmptyPortfolio";

const page = () => {
  return (
    <Box>
      <PortfolioBalance />
      <HoldingsTable />
    </Box>
  );
};
export default page;
