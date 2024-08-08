import type { Metadata } from "next";
import Container from "@mui/material/Container";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextsProviders from "@/contexts/ContextsProviders";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextsProviders>
          <Container maxWidth="lg">
            <Navbar />
            {children}
            <Footer />
          </Container>
        </ContextsProviders>
      </body>
    </html>
  );
}
