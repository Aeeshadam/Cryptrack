"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { TransactionContextProps, TransactionType } from "@/types";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(TransactionType.Buy);
  const coins = useSelector((state: AppState) => state.coinList.coins);

  useEffect(() => {
    if (selectedCoin) {
      const coin = coins.find((coin) => coin.id === selectedCoin);
      if (coin) {
        setPricePerCoin(coin.current_price);
      }
    }
  }, [selectedCoin, coins]);

  const calculateTotal = () => {
    return (quantity * pricePerCoin).toFixed(2);
  };

  const handleOpenModal = (coinId: string) => {
    setOpenModal(true);
    setSelectedCoin(coinId);
  };

  const handleTransactionTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTransactionType: string | null
  ) => {
    if (
      newTransactionType === TransactionType.Buy ||
      newTransactionType === TransactionType.Sell
    ) {
      setTransactionType(newTransactionType);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        openModal,
        setOpenModal,
        handleOpenModal,
        transactionType,
        setTransactionType,
        calculateTotal,
        handleTransactionTypeChange,
        quantity,
        setQuantity,
        selectedCoin,
        setSelectedCoin,
        pricePerCoin,
        setPricePerCoin,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
