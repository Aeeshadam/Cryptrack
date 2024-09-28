"use client";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatCurrency } from "@/utils/utils";

interface TransactionHistoryProps {
  coinId: string;
}
const TransactionHistory: React.FC<TransactionHistoryProps> = ({ coinId }) => {
  const portfolioCoins = useSelector(
    (state: AppState) => state.portfolio.coins
  );
  const transactions = portfolioCoins
    .filter((coin) => coin.id === coinId)
    .flatMap((coin) =>
      coin.transactions.map((t) => ({
        ...t,
        id: coin.id,
        coinName: coin.name,
      }))
    );

  return (
    <Box data-testid="transaction-history">
      <Typography variant="h5">Transaction History</Typography>
      <List
        sx={{ backgroundColor: "secondary.main", marginY: "2rem" }}
        data-testid="transaction-list"
      >
        {transactions.map((transaction) => (
          <ListItem key={transaction.timestamp}>
            <ListItemAvatar>
              {transaction.type === "buy" ? (
                <ArrowForwardIcon sx={{ color: "success.main" }} />
              ) : (
                <ArrowBackIcon sx={{ color: "error.main" }} />
              )}
            </ListItemAvatar>
            <Stack width="100%">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                color="white"
              >
                <Typography>
                  {transaction.type === "buy" ? "Bought" : "Sold"}{" "}
                </Typography>
                <Typography>
                  {transaction.quantity} {transaction.coinName}{" "}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography variant="body2">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {transaction.type === "buy" ? "paid" : "received"}{" "}
                  {formatCurrency(transaction.quantity * transaction.price)}
                </Typography>
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionHistory;
