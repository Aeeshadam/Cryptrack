import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../store/store";

export const useCoinsData = () => {
  const { coins, loading, error } = useSelector(
    (state: AppState) => state.coinList
  );
  const { currentPage, itemsPerPage } = useSelector(
    (state: AppState) => state.pagination
  );

  const currentCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return coins.slice(startIndex, startIndex + itemsPerPage);
  }, [coins, currentPage, itemsPerPage]);

  return { currentCoins, loading, error };
};
