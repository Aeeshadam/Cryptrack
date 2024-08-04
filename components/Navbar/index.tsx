"use client";
import Box from "@mui/material/Box";
import Logo from "../Logo";
import SearchComponent from "../SearchComponent";
import SearchModal from "../SearchModal";
import { StyledAppBar, StyledToolbar } from "./styles";
import { StyledButton } from "../StyledButton";
import { useState } from "react";

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      {openSearch && (
        <SearchModal setOpenSearch={setOpenSearch} open={openSearch} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <StyledToolbar style={{ padding: 0 }}>
            <Logo />
            <SearchComponent setOpenSearch={setOpenSearch} />
            <StyledButton size="small">Get Started</StyledButton>
          </StyledToolbar>
        </StyledAppBar>
      </Box>
    </>
  );
}
