"use client";

import React from "react";
import Image from "next/image";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import { StyledButton } from "./StyledButton";
import { style } from "@/styles/ModalStyles";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";
import { FormControl, Select } from "@mui/material";

const TransactionModal = () => {
  const {
    openModal,
    setOpenModal,
    transactionType,
    calculateTotal,
    handleTransactionTypeChange,
    selectedCoin,
    setSelectedCoin,
    quantity,
    setQuantity,
    pricePerCoin,
    setPricePerCoin,
  } = useTransaction();
  const { coins, handleAddTransaction, portfolioCoins } = usePortfolio();

  const transactionCoins =
    transactionType === "buy"
      ? coins
      : coins.filter((coin) =>
          portfolioCoins.some((portfolioCoin) => portfolioCoin.id === coin.id)
        );
  return (
    <Box data-testid="outsideElement">
      <Modal
        data-testid="modal"
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-transaction"
        aria-describedby="modal-transaction buy and sell"
      >
        <Box
          sx={style}
          data-testid="dialog"
          component="form"
          onSubmit={handleAddTransaction}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Transaction
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={transactionType}
            exclusive
            onChange={handleTransactionTypeChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="buy">BUY</ToggleButton>
            <ToggleButton value="sell">SELL</ToggleButton>
          </ToggleButtonGroup>
          <FormControl fullWidth>
            <Select
              fullWidth
              required
              label="Cryptocurrency"
              data-testid="coin-select"
              variant="outlined"
              sx={{ mb: 2 }}
              value={selectedCoin || ""}
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              {transactionCoins.map((coin) => (
                <MenuItem
                  key={coin.id}
                  value={coin.id}
                  data-testid={`coin-item-${coin.id}`}
                  sx={{ backgroundColor: "transparent" }}
                >
                  <Box display="flex" alignItems="center" gap="8px">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={30}
                      height={30}
                    />
                    {coin.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              required
              placeholder="please enter quantity"
              label="Quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              variant="outlined"
              sx={{ mb: 2 }}
              className="no-spinner"
            />
            <TextField
              fullWidth
              value={pricePerCoin}
              data-testid="price"
              onChange={(e) => setPricePerCoin(parseFloat(e.target.value))}
              label="Price per coin"
              type="number"
              variant="outlined"
              sx={{ mb: 2 }}
              className="no-spinner"
            />

            <TextField
              fullWidth
              label={
                transactionType === "buy"
                  ? "Total Spent in USD"
                  : "Total Received in USD"
              }
              value={calculateTotal()}
              type="number"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <StyledButton fullWidth type="submit">
              Add Transaction
            </StyledButton>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default TransactionModal;
