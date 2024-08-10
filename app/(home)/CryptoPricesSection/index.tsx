"use client";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SummaryCard from "./SummaryCard";
import CryptoTable from "@/components/CryptoTable";
import Pagination from "@/components/Pagination";
import SearchModal from "@/components/SearchModal";
import { useSearch } from "@/contexts/SearchContext";
import { SummaryDataProvider } from "@/contexts/SummaryDataContext";

const CryptoPricesSection: React.FC = () => {
  const { openSearch } = useSearch();
  return (
    <>
      {openSearch && <SearchModal />}
      <Box marginY="3rem">
        <Typography variant="h2">
          Today's Crypto Prices by Market Cap
        </Typography>
        <SummaryDataProvider>
          <SummaryCard />
        </SummaryDataProvider>
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
