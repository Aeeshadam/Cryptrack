"use client";
import React from "react";
import Card from "@mui/material/Card";
import { useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SummaryContentContainer } from "../styles/SummaryCardStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChipButton from "./ChipButton";
import { StyledButton } from "./StyledButton";
import AddIcon from "@mui/icons-material/Add";
import { useTransaction } from "@/contexts/TransactionContext";

const PortfolioBalance = () => {
  const { handleOpenModal } = useTransaction();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
            <Typography variant="h3">£24,000</Typography>
            <VisibilityIcon
              sx={{ color: "text.secondary", fontSize: "30px" }}
            />
          </SummaryContentContainer>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <ChipButton change={0.15} detailPage />
            <Typography variant="body2" color="grey.200">
              24hr change
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <StyledButton onClick={() => handleOpenModal("")}>
        {isSmallScreen ? <AddIcon /> : "Add Transation"}
      </StyledButton>
    </Box>
  );
};
export default PortfolioBalance;
