"use client";
import React, { ReactNode } from "react";
import SearchModal from "@/components/SearchModal";
import { useSearch } from "../contexts/SearchContext";

interface ModalWrapperProps {
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { openSearch } = useSearch();
  return (
    <>
      {openSearch && <SearchModal />}
      {children}
    </>
  );
};

export default ModalWrapper;
