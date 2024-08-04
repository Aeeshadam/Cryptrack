"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SummaryCardsContainer } from "./styles";
import { SummaryContentContainer } from "./styles";
import ChipButton from "@/components/ChipButton";

const CardData = [
  {
    title: "Market Cap",
    value: "$1,000,000,000",
    change: Number(-0.15),
  },
  {
    title: "Volume",
    value: "$1,000,000,000",
    change: Number(-0.15),
  },
  {
    title: "Circulating Supply",
    value: "$1,000,000,000",
    change: Number(0.15),
  },
];

export default function SummaryCard() {
  return (
    <SummaryCardsContainer marginY="2rem">
      {CardData.map((card) => {
        const isNegativeChange = card.change < 0;
        return (
          <Card
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
                <ChipButton change={card.change} />
              </SummaryContentContainer>
            </CardContent>
          </Card>
        );
      })}
    </SummaryCardsContainer>
  );
}
