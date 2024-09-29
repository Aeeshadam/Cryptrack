import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useCoinsData } from "@/hooks/useCoinsData";
import {
  CoinBox,
  DesktopCell,
  StyledSubtitle,
  StyledTableRow,
  tableContainerStyles,
} from "@/styles/TableStyles";
import { formatCurrency } from "@/utils/utils";
import { CoinListProps } from "../types/index";
import ChipButton from "./ChipButton";
import LoadingSpinner from "./LoadingSpinner";

export default function CryptoTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };
  const { currentCoins, loading, error } = useCoinsData();

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table
        aria-label=" holding table"
        sx={{ width: "100%", tableLayout: "auto" }}
      >
        <TableHead>
          <TableRow>
            <DesktopCell>#</DesktopCell>
            <TableCell align="left">Crypto</TableCell>
            <TableCell align="left">Prices</TableCell>
            <TableCell align="right">
              {isSmallScreen ? "24HR" : "24H Change"}
            </TableCell>
            <TableCell align="right">MarketCap</TableCell>
            <DesktopCell align="right">Volume</DesktopCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCoins.map((coin: CoinListProps) => (
            <StyledTableRow
              key={coin.id}
              onClick={() => handleRowClick(coin.id)}
            >
              <DesktopCell scope="row">{coin.market_cap_rank}</DesktopCell>
              <TableCell align="right">
                <CoinBox>
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={isSmallScreen ? 16 : 24}
                    height={isSmallScreen ? 16 : 24}
                  />
                  <StyledSubtitle>
                    {isSmallScreen ? coin.symbol.toUpperCase() : coin.name}
                  </StyledSubtitle>
                </CoinBox>
              </TableCell>
              <TableCell align="left">
                <StyledSubtitle>
                  {formatCurrency(coin.current_price)}
                </StyledSubtitle>
              </TableCell>
              <TableCell align="right">
                <ChipButton change={coin.price_change_percentage_24h} />
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: isSmallScreen ? "12px" : "16px" }}
              >
                {formatCurrency(coin.market_cap)}
              </TableCell>
              <DesktopCell align="right">
                {formatCurrency(coin.total_volume)}
              </DesktopCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
