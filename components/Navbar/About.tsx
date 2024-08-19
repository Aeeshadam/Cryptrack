import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const About = () => {
  const { coin } = useSelector((state: AppState) => state.coinDetails);
  const about = coin?.description?.en;

  return (
    <Box bgcolor="secondary.main" marginY="2rem" padding="2rem">
      <Typography variant="h3">About</Typography>
      <Typography variant="body1" color="grey">
        {about}
      </Typography>
      <Typography marginTop="2rem" variant="subtitle1" fontWeight="600">
        Markets
      </Typography>
      <Stack
        direction="row"
        gap="1rem"
        marginTop="1rem"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {coin?.tickers.slice(0, 10).map((ticker: any) => (
          <Typography
            color="primary.main"
            fontWeight={500}
            key={ticker.market?.name}
            variant="body2"
          >
            {ticker.market?.name}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};
export default About;
