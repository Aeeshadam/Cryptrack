"use client";
import React from "react";

import { Box, Typography } from "@mui/material";
import CryptoTable from "@/components/CryptoTable";
import Pagination from "@/components/Pagination";

import SummaryCard from "./SummaryCard";

const CryptoPricesSection: React.FC = () => {
  return (
    <>
      <Box marginY="3rem">
        <Typography variant="h2">
          Today's Crypto Prices by Market Cap
        </Typography>

        <SummaryCard />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CryptoTable />
          <Pagination />
        </Box>
      </Box>
    </>
  );
};

export default CryptoPricesSection;
