"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCoin } from "../slice/portfolioSlice";
import { TransactionContextProps, PotfolioCoin } from "@/types";
import { AppState } from "@/store/store";

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState("buy");
  const portfolioCoins = useSelector(
    (state: AppState) => state.portfolio.coins
  );

  const coins = useSelector((state: AppState) => state.coinList.coins);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Updated portfolioCoins:", portfolioCoins);
  }, [portfolioCoins]);

  const calculateTotal = () => {
    return (quantity * pricePerCoin).toFixed(2);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleTransactionTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTransactionType: string | null
  ) => {
    if (newTransactionType !== null) {
      setTransactionType(newTransactionType);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
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

        const updatedCoin: PotfolioCoin = {
          id: coin.id,
          name: coin.name,
          quantity: updatedQuantity,
        };
        dispatch(addCoin(updatedCoin));
      }
    }
    setOpenModal(false);
    setSelectedCoin("");
    setQuantity(0);
    setPricePerCoin(0);
    console.log(portfolioCoins);
  };

  return (
    <TransactionContext.Provider
      value={{
        openModal,
        handleFormSubmit,
        setOpenModal,
        coins,
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
