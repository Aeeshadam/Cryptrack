import React from "react";
import Image from "next/image";
import Link from "next/link";


import { useMediaQuery, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const logoWidth = isSmallScreen ? 120 : 150;
  return (
    <Link href="/">
      <Image src="/Logo.svg" alt="Logo" width={logoWidth} height={50} />
    </Link>
  );
};

export default Logo;
