import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ChipButton from "./ChipButton";
import { formatCurrency } from "@/utils/utils";

const CoinDetail = () => {
  const { coin, error, loading } = useSelector(
    (state: AppState) => state.coinDetails
  );

  if (
    !coin ||
    !coin.market_data?.current_price?.usd ||
    coin.market_data.price_change_percentage_24h == null ||
    !coin.market_cap_rank ||
    !coin.name ||
    !coin.image?.large
  ) {
    return null;
  }

  const currentPrice = coin?.market_data?.current_price?.usd;
  const priceChange24h = coin?.market_data?.price_change_percentage_24h;
  const rank = coin?.market_cap_rank;
  const name = coin?.name;
  const image = coin?.image?.large;

  return (
    <Box display="flex" flexDirection="column" gap="6px">
      <Box>
        <Typography
          display="inline-block"
          padding="0.1rem 0.5rem"
          bgcolor="primary.light"
          color="secondary.main"
        >
          Rank #{rank}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="6px"
      >
        <Image src={image} alt={name} width={24} height={24} />
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>
      </Box>
      <Box display="flex" gap="6px">
        <Typography variant="h4" fontWeight={600}>
          {formatCurrency(currentPrice)}
        </Typography>
        <ChipButton change={priceChange24h} detailPage={true} />
      </Box>
    </Box>
  );
};
export default CoinDetail;
