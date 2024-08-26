import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const SummaryCardsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  justifyContent: "center",

  "@media (min-width: 900px)": {
    flexDirection: "row",
    gap: "2rem",
  },
});

export const SummaryContentContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});
