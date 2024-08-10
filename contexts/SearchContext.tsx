"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SearchContextProps } from "@/types";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const coins = useSelector((state: AppState) => state.crypto.coins);

  const filteredCoins = searchQuery
    ? coins?.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coins?.slice(0, 10);

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredCoins,
        openSearch,
        setOpenSearch,
        handleOpenSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
