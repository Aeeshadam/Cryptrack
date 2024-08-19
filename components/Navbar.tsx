"use client";
import React from "react";
import Box from "@mui/material/Box";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import { StyledAppBar, StyledToolbar } from "../styles/NavbarStyles";
import { StyledButton } from "./StyledButton";

export default function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <StyledToolbar style={{ padding: 0 }}>
            <Logo />
            <SearchComponent />
            <StyledButton size="small">Get Started</StyledButton>
          </StyledToolbar>
        </StyledAppBar>
      </Box>
    </>
  );
}
