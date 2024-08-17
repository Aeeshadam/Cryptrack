import ClientProvider from "./StoreProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { SearchProvider } from "./SearchContext";

export default function ContextsProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientProvider>
        <SearchProvider>{children}</SearchProvider>
      </ClientProvider>
    </ThemeProvider>
  );
}
