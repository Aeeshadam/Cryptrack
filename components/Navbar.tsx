"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { getInitials } from "@/utils/utils";
import Box from "@mui/material/Box";

import { StyledAppBar, StyledToolbar } from "../styles/NavbarStyles";
import InitialsMenu from "./InitialsMenu";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import { StyledButton } from "./StyledButton";

export default function Navbar() {
  const { user, displayName } = useAuth();
  const router = useRouter();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <StyledToolbar style={{ padding: 0 }}>
            <Logo />
            <SearchComponent />
            {user ? (
              <>
                <StyledButton
                  size="small"
                  onClick={() => router.push("/portfolio")}
                >
                  Portfolio
                </StyledButton>
                <InitialsMenu name={getInitials(displayName)} />
              </>
            ) : (
              <StyledButton
                size="small"
                onClick={() => router.push("/sign-in")}
              >
                Get Started
              </StyledButton>
            )}
          </StyledToolbar>
        </StyledAppBar>
      </Box>
    </>
  );
}
