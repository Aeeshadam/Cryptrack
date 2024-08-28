"use client";
import React from "react";
import Image from "next/image";
import {
  HeroContainer,
  HeroContent,
  HeroSpan,
  HeroBox,
  HeroImageContainer,
} from "../styles/HeroStyles";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { StyledButton } from "@/components/StyledButton";
import CommonCoins from "./CommonCoins";

const Hero = () => {
  const router = useRouter();
  const handleCreatePortfolio = () => {
    router.push("/portfolio");
  };

  return (
    <HeroContainer>
      <HeroBox>
        <HeroContent>
          <Typography variant="h1" marginBottom="1rem">
            The Ultimate
            <HeroSpan> Crypto Portfolio </HeroSpan> Tracker
          </Typography>
          <StyledButton variant="contained" onClick={handleCreatePortfolio}>
            Create Portfolio
          </StyledButton>
        </HeroContent>
        <HeroImageContainer>
          <Image
            src="/hero.png"
            alt="hero"
            width={400}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </HeroImageContainer>
      </HeroBox>
      <CommonCoins />
    </HeroContainer>
  );
};
export default Hero;
