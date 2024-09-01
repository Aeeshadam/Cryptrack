import React from "react";
import ClientProvider from "./StoreProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { SearchProvider } from "./SearchContext";
import { AuthProvider } from "./AuthContext";
import { TransactionProvider } from "./TransactionContext";
import { PortfolioProvider } from "./PortfolioContext";

export default function ContextsProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientProvider>
        <AuthProvider>
          <TransactionProvider>
            <PortfolioProvider>
              <SearchProvider>{children}</SearchProvider>
            </PortfolioProvider>
          </TransactionProvider>
        </AuthProvider>
      </ClientProvider>
    </ThemeProvider>
  );
}
