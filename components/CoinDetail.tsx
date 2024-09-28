import React from "react";
import { useSelector } from "react-redux";
import { useTheme, useMediaQuery } from "@mui/material";
import { AppState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ChipButton from "./ChipButton";
import { formatCurrency } from "@/utils/utils";
import { StyledButton } from "./StyledButton";
import AddIcon from "@mui/icons-material/Add";
import { useTransaction } from "@/contexts/TransactionContext";
import { useAuth } from "@/contexts/AuthContext";

const CoinDetail = () => {
  const { user } = useAuth();
  const { coin } = useSelector((state: AppState) => state.coinDetails);
  const { handleOpenModal } = useTransaction();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!coin || Object.keys(coin).length === 0) {
    return null;
  }

  const currentPrice = coin?.market_data?.current_price?.usd;
  const priceChange24h = coin?.market_data?.price_change_percentage_24h;
  const rank = coin?.market_cap_rank;
  const name = coin?.name;
  const image = coin?.image?.large || coin?.image?.small;

  return (
    <Box
      data-testid="coin-detail"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={24}
            height={24}
          />
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
      {user && (
        <StyledButton
          onClick={() => handleOpenModal(coin.id)}
          data-testid="add button"
        >
          {isSmallScreen ? <AddIcon /> : "Add Transation"}
        </StyledButton>
      )}
    </Box>
  );
};
export default CoinDetail;
