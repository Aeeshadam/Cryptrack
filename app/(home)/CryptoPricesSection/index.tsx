"use client";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SummaryCard from "./SummaryCard";
import CryptoTable from "@/components/CryptoTable";
import Pagination from "@/components/Pagination";

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
