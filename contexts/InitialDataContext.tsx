"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { InitialDataContextProps, CoinProps } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const InitialDataContext = createContext<InitialDataContextProps | undefined>(
  undefined
);

export const InitialDataProvider = ({ children }: { children: ReactNode }) => {
  const [initialData, setInitialData] = useState([] as CoinProps[]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/coins`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }
        const data: CoinProps[] = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    // fetchData();
  }, [dispatch]);

  return (
    <InitialDataContext.Provider value={{ initialData, setInitialData }}>
      {children}
    </InitialDataContext.Provider>
  );
};

export const useInitialData = () => {
  const context = useContext(InitialDataContext);

  if (!context) {
    throw new Error("useInitialData must be used within a InitialDataProvider");
  }

  return context;
};

export default InitialDataContext;
