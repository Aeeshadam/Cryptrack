import { styled } from "@mui/material/styles";

export const HeroContainer = styled("section")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  flexDirection: "column",
  background:
    "conic-gradient( from 170deg, rgba(10, 9, 8, 0.05) 0%, rgba(7, 7, 7, 0.05) 40%, rgba(223, 191, 123, 0.01) 100%)",
}));

export const HeroBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const HeroContent = styled("div")(({ theme }) => ({
  margin: "auto",
  textAlign: "center",
  width: "100%",
  height: "auto",
  maxWidth: "600px",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    width: "50%",
  },
}));

export const HeroImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxWidth: "400px",

  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    width: "50%",
    maxWidth: "600px",
  },
}));

export const HeroSpan = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));
