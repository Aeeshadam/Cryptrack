"use client";
import React from "react";
import Box from "@mui/material/Box";
import Logo from "./Logo";
import SearchComponent from "./SearchComponent";
import { StyledAppBar, StyledToolbar } from "../styles/NavbarStyles";
import { StyledButton } from "./StyledButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials } from "@/utils/utils";
import InitialsMenu from "./InitialsMenu";

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
