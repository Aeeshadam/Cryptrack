"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import { useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SummaryContentContainer } from "../styles/SummaryCardStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChipButton from "./ChipButton";
import { StyledButton } from "./StyledButton";
import AddIcon from "@mui/icons-material/Add";
import { formatCurrency } from "@/utils/utils";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";

const PortfolioBalance = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const { calculateTotalBalance, calculate24HourChangePercentage } =
    usePortfolio();
  const { handleOpenModal } = useTransaction();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const totalBalance = formatCurrency(calculateTotalBalance());
  const stars = Array(totalBalance.length).fill("*").join("");

  return (
    <Box
      sx={{
        marginY: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Card
        sx={{
          width: 250,
          backgroundColor: "secondary.main",
          color: "text.secondary",
        }}
      >
        <CardContent>
          <Typography gutterBottom>Current Balance</Typography>
          <SummaryContentContainer>
            <Typography variant="h3" data-testid="balance-text">
              {isBalanceVisible ? totalBalance || 0 : stars}
            </Typography>
            <IconButton
              onClick={toggleBalanceVisibility}
              data-testid="visibility-button"
              sx={{ color: "text.secondary", fontSize: "30px" }}
            >
              {isBalanceVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </SummaryContentContainer>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <ChipButton
              change={calculate24HourChangePercentage() || 0}
              detailPage
            />
            <Typography variant="body2" color="grey.200">
              24hr change
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <StyledButton onClick={() => handleOpenModal("")}>
        {isSmallScreen ? <AddIcon /> : "Add Transaction"}
      </StyledButton>
    </Box>
  );
};
export default PortfolioBalance;
