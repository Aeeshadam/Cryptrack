import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SummaryCardsContainer } from "../styles/SummaryCardStyles";
import { SummaryContentContainer } from "../styles/SummaryCardStyles";
import { useSummaryData } from "@/hooks/useSummaryData";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function SummaryCard() {
  const { cardsData, loading } = useSummaryData();

  if (loading) {
    return <LoadingSpinner />;
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