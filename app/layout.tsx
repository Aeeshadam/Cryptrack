import React from "react";
import type { Metadata } from "next";
import Container from "@mui/material/Container";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContextsProviders from "@/contexts/ContextsProviders";
import ModalWrapper from "../components/ModalWrapper";

export const metadata: Metadata = {
  title: "Cryptrack",
  description: "Track your crypto portfolio",
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
            <ModalWrapper>
              <Navbar />
              {children}
              <Footer />
            </ModalWrapper>
          </Container>
        </ContextsProviders>
      </body>
    </html>
  );
}
