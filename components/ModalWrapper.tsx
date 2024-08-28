"use client";

import React, { ReactNode } from "react";
import SearchModal from "@/components/SearchModal";
import TransactionModal from "./TransactionModal";
import { useSearch } from "../contexts/SearchContext";
import { useTransaction } from "../contexts/TransactionContext";

interface ModalWrapperProps {
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { openSearch } = useSearch();
  const { openModal } = useTransaction();
  return (
    <>
      {openSearch && <SearchModal />}
      {openModal && <TransactionModal />}
      {children}
    </>
  );
};

export default ModalWrapper;
