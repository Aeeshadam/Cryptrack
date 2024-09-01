"use client";
import React, { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db, { auth } from "@/firebase/firebase";
import { createContext, useContext, useState, ReactNode } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AuthContextProps {
  user: User | null;

  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  logOut: () => Promise<boolean>;
  displayName: string;
  setError: (error: string) => void;
  // setDisplayName: (name: string | null) => void;
  error: string;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDisplayName(docSnap.data().name);
        }
      } else {
        setUser(null);
        setDisplayName("");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });
      setDisplayName(name);
      setUser(user);
      return true;
    } catch (error) {
      setError((error as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDisplayName(docSnap.data().name);
      }
      setUser(user);
      return true;
    } catch (error) {
      setError((error as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setError("");
    try {
      await signOut(auth);
      setUser(null);
      setDisplayName("");
      return true;
    } catch (error) {
      setError((error as Error).message);
      return false;
    } finally {
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
        setError,
        loading,
        error,
        signUp,
        signIn,
        displayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
