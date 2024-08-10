import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import { fetchCoins, setCoins } from "../slice/coinSlice";

export const useCoinsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coins, loading, error } = useSelector(
    (state: AppState) => state.crypto
  );
  const { currentPage, itemsPerPage } = useSelector(
    (state: AppState) => state.pagination
  );

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const currentCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return coins.slice(startIndex, startIndex + itemsPerPage);
  }, [coins, currentPage, itemsPerPage]);

  return { currentCoins, loading, error };
};