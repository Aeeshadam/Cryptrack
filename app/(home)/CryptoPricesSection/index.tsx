"use client";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SummaryCard from "./SummaryCard";
import CryptoTable from "@/components/CryptoTable";
import Pagination from "@/components/Pagination";
import { CoinProps } from "@/types";
import SearchModal from "@/components/SearchModal";
import { useSearch } from "@/contexts/SearchContext";

type CryptoPricesSectionProps = {
  initialData: CoinProps[];
};

const CryptoPricesSection: React.FC<CryptoPricesSectionProps> = ({
  initialData,
}) => {
  const { openSearch } = useSearch();
  return (
    <>
      {openSearch && <SearchModal />}
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
          <CryptoTable initialData={initialData} />
          <Pagination />
        </Box>
      </Box>
    </>
  );
};

export default CryptoPricesSection;
