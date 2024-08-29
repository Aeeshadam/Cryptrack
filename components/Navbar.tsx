"use client";
import React from "react";
import Box from "@mui/material/Box";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import { StyledAppBar, StyledToolbar } from "../styles/NavbarStyles";
import { StyledButton } from "./StyledButton";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <StyledToolbar style={{ padding: 0 }}>
            <Logo />
            <SearchComponent />
            <StyledButton onClick={handleClick} size="small">
              Get Started
            </StyledButton>
          </StyledToolbar>
        </StyledAppBar>
      </Box>
    </>
  );
}
