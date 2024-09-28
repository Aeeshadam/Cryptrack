"use client";
import React from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { StyledButton } from "./StyledButton";
import { useTransaction } from "@/contexts/TransactionContext";

const EmptyPortfolio = () => {
  const { handleOpenModal } = useTransaction();
  return (
    <Stack
      data-testid="empty-portfolio"
      marginY="4rem"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box width={{ sm: "50%", xs: "75%" }} maxWidth="300px">
        <Image
          src="/empty.png"
          alt="hero"
          width={300}
          height={300}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
      <Typography variant="h2" fontWeight="600">
        Your Portfolio needs some work!
      </Typography>
      <StyledButton onClick={() => handleOpenModal("")}>
        Start By Adding a coin
      </StyledButton>
    </Stack>
  );
};
export default EmptyPortfolio;
