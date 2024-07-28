"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../Logo";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledAppBar,
  StyledToolbar,
  MobileSearchIconWrapper,
} from "./styles";
import { StyledButton } from "../StyledButton";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar style={{ padding: 0 }}>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box
            sx={{
              marginRight: "0.5rem",
              display: { xs: "block", sm: "none" },
              ml: "auto",
            }}
          >
            <MobileSearchIconWrapper>
              <SearchIcon />
            </MobileSearchIconWrapper>
          </Box>
          <StyledButton size="small">Get Started</StyledButton>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}
