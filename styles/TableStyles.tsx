import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DesktopCell = styled(TableCell)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "table-cell",
  },
}));

export const IconContainer = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
}));

export const iconStyles = {
  transition: "transform 0.2s ease-in-out",
  ":hover": {
    cursor: "pointer",
    transform: "scale(2)",
  },
};

export const clearIconStyles = {
  color: "error.main",

  transition: "transform 0.2s ease-in-out",
  ":hover": {
    cursor: "pointer",
    transform: "scale(2)",
  },
};

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 },

  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));
export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "12px",
  variants: "subtitle1",
  [theme.breakpoints.up("sm")]: {
    fontSize: "16px",
  },
}));

export const CoinBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: "6px",
  [theme.breakpoints.up("md")]: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "start",
  },
}));

export const tableContainerStyles = {
  backgroundColor: "secondary.main",
  width: "100%",
};
