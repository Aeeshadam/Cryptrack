"use client";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin } from "../slice/portfolioSlice";
import { getPortfolioCoins } from "@/firebase/firestoreService";
import { CoinListProps, PortfolioCoin } from "@/types";
import { AppDispatch, AppState } from "@/store/store";
import {
  addCoinToPortfolio,
  updateCoinInPortfolio,
  removeCoinFromPortfolio,
} from "@/firebase/firestoreService";
import { useTransaction } from "@/contexts/TransactionContext";
import { removeCoin } from "../slice/portfolioSlice";

const usePortfolio = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const portfolioCoins = useSelector(
    (state: AppState) => state.portfolio.coins
  );
  const coins = useSelector((state: AppState) => state.coinList.coins);
  const {
    selectedCoin,
    setSelectedCoin,
    quantity,
    setQuantity,
    setPricePerCoin,
    transactionType,
    setOpenModal,
  } = useTransaction();

  /*  const fetchPortfolioCoins = async () => {
    setLoading(true);
    try {
      const fetchedCoins = await getPortfolioCoins();
      const validCoins: PortfolioCoin[] = [];

      await Promise.all(
        fetchedCoins.map(async (coin: PortfolioCoin) => {
          if (coin.quantity === 0) {
            await removeCoinFromPortfolio(coin.id);
          } else {
            validCoins.push(coin);
            dispatch(addCoin(coin));
          }
        })
      );

      return validCoins;
    } catch (error) {
      console.error("Error fetching and cleaning portfolio coins:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }; */

  const calculateTotalBalance = () => {
    return portfolioCoins.reduce((acc, portfolioCoin) => {
      const coin: any = coins.find((c) => c.id === portfolioCoin.id);
      if (coin) {
        return acc + portfolioCoin.quantity * coin.current_price;
      }
      return acc;
    }, 0);
  };

  const calculate24HourChangePercentage = () => {
    const { totalValue, totalPreviousValue } = portfolioCoins.reduce(
      (totals, portfolioCoin) => {
        const coin = coins.find((c) => c.id === portfolioCoin.id);
        if (coin) {
          const currentCoinValue = portfolioCoin.quantity * coin.current_price;
          const previousCoinValue =
            portfolioCoin.quantity *
            (coin.current_price / (1 + coin.price_change_percentage_24h / 100));

          totals.totalValue += currentCoinValue;
          totals.totalPreviousValue += previousCoinValue;
        }
        return totals;
      },
      { totalValue: 0, totalPreviousValue: 0 }
    );

    if (totalPreviousValue === 0) return 0;

    const percentageChange =
      ((totalValue - totalPreviousValue) / totalPreviousValue) * 100;
    return percentageChange;
  };

  const handleAddTransaction = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCoin && quantity > 0) {
      const coin = coins.find((coin) => coin.id === selectedCoin);
      if (coin) {
        const existingPortfolioCoin = portfolioCoins.find(
          (c) => c.id === coin.id
        );
        const updatedQuantity =
          transactionType === "buy"
            ? (existingPortfolioCoin?.quantity || 0) + quantity
            : (existingPortfolioCoin?.quantity || 0) - quantity;

        const updatedCoin: PortfolioCoin = {
          id: coin.id,
          name: coin.name,
          quantity: updatedQuantity,
        };
        dispatch(addCoin(updatedCoin));
        if (existingPortfolioCoin) {
          updateCoinInPortfolio(updatedCoin);
        } else {
          addCoinToPortfolio(updatedCoin);
        }
      }
    }
    setOpenModal(false);
    setSelectedCoin("");
    setQuantity(0);
    setPricePerCoin(0);
    console.log(portfolioCoins);
  };

  const handleRemoveCoin = (coinId: string) => {
    try {
      removeCoinFromPortfolio(coinId);
      dispatch(removeCoin(coinId));
    } catch (error) {
      console.error("Error removing coin from portfolio:", error);
    }
  };
  return {
    // fetchPortfolioCoins,
    handleAddTransaction,
    handleRemoveCoin,
    coins,
    loading,
    calculate24HourChangePercentage,
    calculateTotalBalance,
    setLoading,
  };
};

export default usePortfolio;
