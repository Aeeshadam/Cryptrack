import React from "react";
import ClientProvider from "./StoreProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { SearchProvider } from "./SearchContext";
import { TransactionProvider } from "./TransactionContext";

export default function ContextsProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientProvider>
        <TransactionProvider>
          <SearchProvider>{children}</SearchProvider>
        </TransactionProvider>
      </ClientProvider>
    </ThemeProvider>
  );
}
