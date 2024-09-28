import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import ChipButton from "./ChipButton";
import { formatCurrency } from "@/utils/utils";
import useMarketStatsData from "@/hooks/useMarketStatsData";

const MarketStats = () => {
  const marketData = useMarketStatsData();

  if (!marketData || marketData.length === 0) return null;

  return (
    <Box
      data-testid="market-stats"
      bgcolor="secondary.main"
      marginY="2rem"
      sx={{ padding: { sm: "1rem", md: "2rem", xs: "1rem" } }}
    >
      <Typography variant="h3">Market Stats</Typography>

      <Grid container marginTop="0.5rem" spacing={2}>
        {marketData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.title}>
            <Stack direction="row" justifyContent="start" alignItems="center">
              <Typography variant="subtitle2" color="grey.200">
                {data.title}
              </Typography>
              <Tooltip title={data.description}>
                <IconButton>
                  <InfoOutlinedIcon
                    sx={{ color: "grey.200", fontSize: "14px" }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>

            {data.change ? (
              <ChipButton change={data.value} detailPage={true} />
            ) : (
              <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
                gap="0.5rem"
              >
                <Typography variant="h6">
                  {formatCurrency(data.value)}
                </Typography>
                <Typography variant="subtitle2" color="grey.200">
                  {data.date?.slice(0, 10)}
                </Typography>
              </Stack>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketStats;
