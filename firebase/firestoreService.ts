import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { PortfolioCoin } from "../types";
import db from "./firebase";

export const addCoinToPortfolio = async (
  userId: string,
  coin: PortfolioCoin
) => {
  try {
    const coinRef = doc(db, "users", userId, "portfolio", coin.id);
    await setDoc(coinRef, coin);
  } catch (e) {
    console.error("Error adding coin: ", e);
  }
};

export const updateCoinInPortfolio = async (
  userId: string,
  coin: PortfolioCoin
) => {
  try {
    const coinRef = doc(db, "users", userId, "portfolio", coin.id);
    await updateDoc(coinRef, {
      quantity: coin.quantity,
      transactions: coin.transactions,
    });
  } catch (e) {
    console.error("Error updating coin: ", e);
  }
};

export const getPortfolioCoins = async (
  userId: string
): Promise<PortfolioCoin[]> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const coinsCollection = collection(userDocRef, "portfolio");
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

export const removeCoinFromPortfolio = async (
  userId: string,
  coinId: string
) => {
  try {
    const coinRef = doc(db, "users", userId, "portfolio", coinId);
    await deleteDoc(coinRef);
  } catch (e) {
    console.error("Error removing coin: ", e);
  }
};
