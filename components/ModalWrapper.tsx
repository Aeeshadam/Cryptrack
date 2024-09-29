"use client";

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCoins } from "@/slice/coinListSlice";
import { AppDispatch } from "@/store/store";
import { useSearch } from "../contexts/SearchContext";
import { useTransaction } from "../contexts/TransactionContext";
import TransactionModal from "./TransactionModal";
import SearchModal from "@/components/SearchModal";

interface ModalWrapperProps {
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { openSearch } = useSearch();
  const { openModal } = useTransaction();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);
  return (
    <>
      {openSearch && <SearchModal />}
      {openModal && <TransactionModal />}
      {children}
    </>
  );
};

export default ModalWrapper;
