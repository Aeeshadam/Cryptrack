"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, removeCoin } from "../slice/portfolioSlice";
import {
  getPortfolioCoins,
  addCoinToPortfolio,
  updateCoinInPortfolio,
  removeCoinFromPortfolio,
} from "@/firebase/firestoreService";
import { PortfolioCoin, PortfolioContextProps, Transaction } from "@/types";
import { AppDispatch, AppState } from "@/store/store";
import { useAuth } from "@/contexts/AuthContext";
import { useTransaction } from "@/contexts/TransactionContext";

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
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
    pricePerCoin,
    transactionType,
    setOpenModal,
  } = useTransaction();

  const fetchPortfolioCoins = async (userUid: string) => {
    if (!user) return;
    try {
      const fetchedCoins = await getPortfolioCoins(user.uid);
      const validCoins: PortfolioCoin[] = [];

      await Promise.all(
        fetchedCoins.map(async (coin: PortfolioCoin) => {
          if (coin.quantity === 0) {
            await removeCoinFromPortfolio(user.uid, coin.id);
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
    }
  };

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
    if (!user) return;
    if (selectedCoin && quantity > 0) {
      const coin = coins.find((coin) => coin.id === selectedCoin);
      if (coin) {
        const existingPortfolioCoin = portfolioCoins.find(
          (c) => c.id === coin.id
        );

        const newTransaction: Transaction = {
          quantity,
          price: pricePerCoin,
          type: transactionType,
          timestamp: Date.now(),
        };

        const updatedQuantity =
          transactionType === "buy"
            ? (existingPortfolioCoin?.quantity || 0) + quantity
            : (existingPortfolioCoin?.quantity || 0) - quantity;

        const updatedCoin: PortfolioCoin = {
          id: coin.id,
          name: coin.name,
          quantity: updatedQuantity,
          transactions: existingPortfolioCoin
            ? [...existingPortfolioCoin.transactions, newTransaction]
            : [newTransaction],
        };
        dispatch(addCoin(updatedCoin));

        if (existingPortfolioCoin) {
          updateCoinInPortfolio(user.uid, updatedCoin);
        } else {
          addCoinToPortfolio(user.uid, updatedCoin);
        }
      }
    }

    setOpenModal(false);
    setSelectedCoin("");
    setQuantity(0);
    setPricePerCoin(0);
  };

  const handleRemoveCoin = (coinId: string) => {
    if (!user) return;
    const confirm = window.confirm("Are you sure you want to remove this coin from your portfolio?");
    if (confirm) {
      try {
        removeCoinFromPortfolio(user.uid, coinId);
        dispatch(removeCoin(coinId));
      } catch (error) {
        console.error("Error removing coin from portfolio:", error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      if (user) {
        try {
          await fetchPortfolioCoins(user.uid);
        } catch (error) {
          console.error("Error fetching portfolio coins: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCoins();
  }, [user]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioCoins,
        coins,
        loading,
        fetchPortfolioCoins,
        handleAddTransaction,
        handleRemoveCoin,
        calculateTotalBalance,
        calculate24HourChangePercentage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
