"use client";

import { Arbutus, Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const arbutus = Arbutus({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#dfbf7b;",
      light: "#d8a353",
      dark: "#685f4c",
    },
    secondary: {
      main: "#191714",
      dark: "#0a0908",
    },
    success: {
      main: "#00a478",
      dark: "rgba(0, 164, 120, 0.14)",
    },
    error: {
      main: "#d41515",
      dark: "rgba(212, 21, 21, 0.14)",
    },
    grey: {
      100: "#c5c5c5",
      200: "#a7a7a7",
      300: "#454545",
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontFamily: arbutus.style.fontFamily,
      fontSize: "2.8rem",
      textAlign: "center",
      lineHeight: "3.7rem",
      letterSpacing: "0.1rem",

      "@media (min-width: 768px)": {
        fontSize: "3.4rem",
        lineHeight: "4rem",
        textAlign: "center",
      },

      "@media (min-width: 900px)": {
        fontSize: "4rem",
        lineHeight: "5rem",
        textAlign: "left",
      },
    },
    h2: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: "1.5rem",
      textAlign: "center",
      lineHeight: "3.2rem",
      fontWeight: 500,

      "@media (min-width: 768px)": {
        fontSize: "2rem",
        lineHeight: "3.7rem",
      },
    },
    h3: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: "1.2rem",
      lineHeight: "2.5rem",
      fontWeight: 500,

      "@media (min-width: 768px)": {
        fontSize: "1.5rem",
        lineHeight: "2.7rem",
      },
    },
  },
});

export default theme;
