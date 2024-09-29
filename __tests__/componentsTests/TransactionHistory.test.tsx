import React from "react";

import {  screen } from "@testing-library/react";
import TransactionHistory from "@/components/TransactionHistory";
import { AppState } from "@/store/store";
import { renderWithRedux } from "@/utils/test-util";

const basePortfolioCoins = {
  coins: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      transactions: [
        { quantity: 1, price: 40000, type: "buy", timestamp: 1626133664236 },
        { quantity: 1, price: 50000, type: "sell", timestamp: 1626133664239 },
      ],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      transactions: [
        { quantity: 2, price: 2000, type: "buy", timestamp: 1626133664236 },
      ],
    },
  ],
} as unknown as AppState["portfolio"];

describe("TransactionHistory", () => {
  it("should render correctly and only display relevant transactions", () => {
    const { store } = renderWithRedux(<TransactionHistory coinId="bitcoin" />, {
      currentState: {
        portfolio: basePortfolioCoins,
      },
    });
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
  });

  it("should render correct transaction history", () => {
    const { store } = renderWithRedux(<TransactionHistory coinId="bitcoin" />, {
      currentState: {
        portfolio: basePortfolioCoins,
      },
    });
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should render correct data for each transaction", () => {
    const { store } = renderWithRedux(<TransactionHistory coinId="bitcoin" />, {
      currentState: {
        portfolio: basePortfolioCoins,
      },
    });
    expect(screen.getByText("Bought")).toBeInTheDocument();
    expect(screen.getByText("Sold")).toBeInTheDocument();
    expect(screen.queryAllByText("1 Bitcoin")).toHaveLength(2);
    expect(screen.getByText("paid $40,000.00")).toBeInTheDocument();
    expect(screen.getByText("received $50,000.00")).toBeInTheDocument();
  });

  it("should render timestamp correctly", () => {
    const { store } = renderWithRedux(<TransactionHistory coinId="bitcoin" />, {
      currentState: {
        portfolio: basePortfolioCoins,
      },
    });
    expect(screen.queryAllByText("7/13/2021")).toHaveLength(2);
  });
});
