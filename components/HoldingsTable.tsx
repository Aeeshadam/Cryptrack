"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";
import {
  clearIconStyles,
  CoinBox,
  DesktopCell,
  IconContainer,
  iconStyles,
  StyledSubtitle,
  StyledTableRow,
  tableContainerStyles,
} from "@/styles/TableStyles";
import { PortfolioCoin } from "@/types/index";
import { formatCurrency } from "@/utils/utils";
import { AppState } from "../store/store";
import { CoinListProps } from "../types/index";
import ChipButton from "./ChipButton";

const HoldingsTable = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };
  const { handleOpenModal } = useTransaction();

  const { handleRemoveCoin, portfolioCoins } = usePortfolio();
  const coinList = useSelector((state: AppState) => state.coinList.coins);

  return (
    <>
      <Typography variant="h3">Holdings</Typography>
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
              <DesktopCell align="right">MarketCap</DesktopCell>
              <TableCell align="right">Holdings</TableCell>
              <DesktopCell align="right">
                <MoreVertIcon />
              </DesktopCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioCoins.map((portfolioCoin: PortfolioCoin) => {
              const coin = coinList.find(
                (coin: CoinListProps) => coin.id === portfolioCoin?.id
              );
              if (!coin) return null;
              return (
                <StyledTableRow
                  key={coin.id}
                  onClick={() => handleRowClick(coin.id)}
                >
                  <DesktopCell scope="row">{coin.market_cap_rank}</DesktopCell>
                  <TableCell align="right">
                    <CoinBox>
                      <Image
                        src={coin.image || "/placeholder.svg"}
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
                  <DesktopCell align="right">
                    {formatCurrency(coin.market_cap)}
                  </DesktopCell>
                  <TableCell align="right">
                    <StyledSubtitle>{portfolioCoin.quantity}</StyledSubtitle>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: isSmallScreen ? "10px" : "16px" }}
                    >
                      {formatCurrency(
                        portfolioCoin.quantity * coin.current_price
                      )}
                    </Typography>
                  </TableCell>
                  <DesktopCell align="right">
                    <IconContainer>
                      <EditIcon
                        sx={iconStyles}
                        onClick={(
                          event: React.MouseEvent<SVGSVGElement, MouseEvent>
                        ) => {
                          event.stopPropagation();
                          handleOpenModal(coin.id);
                        }}
                      />
                      <ClearIcon
                        sx={clearIconStyles}
                        onClick={(
                          event: React.MouseEvent<SVGSVGElement, MouseEvent>
                        ) => {
                          event.stopPropagation();
                          handleRemoveCoin(coin.id);
                        }}
                      />
                    </IconContainer>
                  </DesktopCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HoldingsTable;
