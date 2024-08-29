"use client";
import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import ChipButton from "./ChipButton";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { CoinListProps } from "../types/index";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { formatCurrency } from "@/utils/utils";
import { PortfolioCoin } from "@/types/index";
import usePortfolio from "@/hooks/usePortfolio";
import {
  DesktopCell,
  IconContainer,
  iconStyles,
  clearIconStyles,
  StyledTableRow,
  tableContainerStyles,
  StyledSubtitle,
  CoinBox,
} from "@/styles/TableStyles";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

const HoldingsTable = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleRowClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
  };

  const { handleRemoveCoin } = usePortfolio();
  const coinList = useSelector((state: AppState) => state.coinList.coins);
  const potfolioCoins = useSelector((state: AppState) => state.portfolio.coins);

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
              <DesktopCell align="right">Actions</DesktopCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {potfolioCoins.map((portfolioCoin: PortfolioCoin) => {
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
                          alert("Add clicked");
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
