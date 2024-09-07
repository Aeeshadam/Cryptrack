"use client";
import React from "react";
import { Box } from "@mui/material";
import { AppDispatch, AppState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/slice/coinDetailsSlice";
import CoinDetail from "@/components/CoinDetail";
import { ParamsProps } from "@/types";
import { useEffect } from "react";
import MarketStats from "@/components/MarketStats";
import About from "@/components/About";
import LoadingSpinner from "@/components/LoadingSpinner";
import TransactionHistory from "@/components/TransactionHistory";

const CoinDetailPage = ({ params }: { params: ParamsProps }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: AppState) => state.coinDetails
  );
  const coinInPortfolio = useSelector((state: AppState) =>
    state.portfolio.coins.find((coin) => coin.id === params.slug)
  );

  useEffect(() => {
    if (params.slug) {
      dispatch(fetchCoinDetails(params.slug));
    }
  }, [params.slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box marginTop="5rem">
      <CoinDetail />
      <MarketStats />
      <About />
      {coinInPortfolio && <TransactionHistory coinId={params.slug} />}
    </Box>
  );
};

export default CoinDetailPage;
