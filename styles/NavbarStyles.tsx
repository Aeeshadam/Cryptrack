import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  backgroundImage: "none",
  boxShadow: "none",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: 0,
  paddingRight: 0,
}));
