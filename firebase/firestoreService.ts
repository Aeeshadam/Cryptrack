import db from "./firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { PortfolioCoin } from "../types";

export const addCoinToPortfolio = async (coin: PortfolioCoin) => {
  try {
    const coinRef = doc(db, "portfolio", coin.id);
    await setDoc(coinRef, coin);
  } catch (e) {
    console.error("Error adding coin: ", e);
  }
};

export const updateCoinInPortfolio = async (coin: PortfolioCoin) => {
  try {
    const coinRef = doc(db, "portfolio", coin.id);
    await updateDoc(coinRef, {
      quantity: coin.quantity,
    });
  } catch (e) {
    console.error("Error updating coin: ", e);
  }
};

export const getPortfolioCoins = async (): Promise<PortfolioCoin[]> => {
  try {
    const coinsCollection = collection(db, "portfolio");
    const coinsSnapshot = await getDocs(coinsCollection);
    const coinsList = coinsSnapshot.docs.map((doc) => {
      const data = doc.data() as PortfolioCoin;
      return data;
    });
    return coinsList;
  } catch (e) {
    console.error("Error getting portfolio coins: ", e);
    return [];
  }
};

export const removeCoinFromPortfolio = async (coinId: string) => {
  try {
    const coinRef = doc(db, "portfolio", coinId);
    await deleteDoc(coinRef);
  } catch (e) {
    console.error("Error removing coin: ", e);
  }
};
