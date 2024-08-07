"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppDispatch } from "../store/store";
import { fetchCoins } from "../slice/coinSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ChipButton from "./ChipButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { CoinProps } from "../types/index";

export default function CryptoTable() {
  const coinRef = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: AppState) => state.crypto.coins);
  const { currentPage, itemsPerPage } = useSelector(
    (state: AppState) => state.pagination
  );

  useEffect(() => {
    if (coinRef.current === false) {
      dispatch(fetchCoins());
    }
    return () => {
      coinRef.current = true;
    };
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCoins = coins.slice(startIndex, startIndex + itemsPerPage);

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "secondary.main",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Crypto</TableCell>
            <TableCell align="right">Prices</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right">MarketCap</TableCell>
            <TableCell align="right">Volume(24h)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCoins.map((coin: CoinProps) => (
            <TableRow
              key={coin.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {coin.market_cap_rank}
              </TableCell>
              <TableCell align="left">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="6px"
                >
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {coin.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight={600}>
                  ${coin.current_price}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <ChipButton change={coin.price_change_percentage_24h} />
              </TableCell>
              <TableCell align="right">${coin.market_cap}</TableCell>
              <TableCell align="right">${coin.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
