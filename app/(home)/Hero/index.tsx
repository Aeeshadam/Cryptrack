"use client";
import React from "react";
import Image from "next/image";
import {
  HeroContainer,
  HeroContent,
  HeroSpan,
  HeroBox,
  HeroImageContainer,
} from "./styles";
import { Typography } from "@mui/material";
import { StyledButton } from "@/components/StyledButton";
import CommonCoins from "./CommonCoins";

const Hero = () => {
  return (
    <HeroContainer>
      <HeroBox>
        <HeroContent>
          <Typography variant="h1" marginBottom="1rem">
            The Ultimate
            <HeroSpan> Cryto Portfolio </HeroSpan> Tracker
          </Typography>
          <StyledButton variant="contained">Create Portfolio</StyledButton>
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
