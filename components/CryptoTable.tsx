import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import ChipButton from "./ChipButton";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { CoinListProps } from "../types/index";
import { useCoinsData } from "@/hooks/useCoinsData";
import { formatCurrency } from "@/utils/utils";
import LoadingSpinner from "./LoadingSpinner";
import { useTransaction } from "@/contexts/TransactionContext";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  DesktopCell,
  StyledTableRow,
  tableContainerStyles,
  StyledSubtitle,
  CoinBox,
  iconStyles,
} from "@/styles/TableStyles";

export default function CryptoTable() {
  const theme = useTheme();
  const { handleOpenModal } = useTransaction();
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
            <DesktopCell align="right">Actions</DesktopCell>
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
              <DesktopCell align="right">
                <AddIcon
                  sx={iconStyles}
                  onClick={(
                    event: React.MouseEvent<SVGSVGElement, MouseEvent>
                  ) => {
                    event.stopPropagation();
                    handleOpenModal(coin.id);
                  }}
                />
              </DesktopCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
