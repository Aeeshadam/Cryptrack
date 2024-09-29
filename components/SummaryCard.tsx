import React from "react";

import { Card, CardContent, Typography } from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSummaryData } from "@/hooks/useSummaryData";

import {
  SummaryCardsContainer,
  SummaryContentContainer,
} from "@/styles/SummaryCardStyles";

export default function SummaryCard() {
  const { cardsData, loading, error } = useSummaryData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }
  return (
    <SummaryCardsContainer marginY="2rem">
      {cardsData.map((card) => {
        return (
          <Card
            key={card.title}
            sx={{
              minWidth: 250,
              backgroundColor: "secondary.main",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {card.title}
              </Typography>
              <SummaryContentContainer>
                <Typography variant="h3">{card.value}</Typography>
              </SummaryContentContainer>
            </CardContent>
          </Card>
        );
      })}
    </SummaryCardsContainer>
  );
}
