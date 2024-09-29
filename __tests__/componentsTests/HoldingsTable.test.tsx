import React from "react";
import { useRouter } from "next/navigation";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import HoldingsTable from "@/components/HoldingsTable";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";
import { CoinListState } from "@/types";
import { renderWithRedux } from "@/utils/test-util";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/contexts/TransactionContext", () => ({
  useTransaction: jest.fn(),
}));
jest.mock("@/contexts/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

const baseCoinList = {
  coins: [
    {
      id: "bitcoin",
      market_cap_rank: 1,
      image: "https://example.com/bitcoin.png",
      name: "Bitcoin",
      current_price: 50000,
      price_change_percentage_24h: 2.5,
      market_cap: 1000000000,
      total_volume: 50000000,
    },
  ],
  loading: false,
  error: null,
} as unknown as CoinListState;

const basePortfolio = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    quantity: 10,
    transactions: [
      {
        quantity: 10,
        price: 1,
        type: "buy",
        timestamp: 1726133664236,
      },
    ],
  },
];

describe("CryptoTable", () => {
  const mockPush = jest.fn();
  const mockHandleOpenModal = jest.fn();
  const mockHandleRemoveCoin = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useTransaction as jest.Mock).mockReturnValue({
      handleOpenModal: mockHandleOpenModal,
    });
    (usePortfolio as jest.Mock).mockReturnValue({
      handleRemoveCoin: mockHandleRemoveCoin,
      portfolioCoins: basePortfolio,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays correct coin information when passed valid data", () => {
    renderWithRedux(<HoldingsTable />, {
      currentState: { coinList: baseCoinList },
    });

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("$50,000.00")).toBeInTheDocument();
    expect(screen.getByText("2.50%")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("$500,000.00")).toBeInTheDocument();
  });

  it("navigates to the coin details page when a row is clicked", async () => {
    renderWithRedux(<HoldingsTable />, {
      currentState: { coinList: baseCoinList },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText("Bitcoin"));
    });
    expect(mockPush).toHaveBeenCalledWith("/coin/bitcoin");
  });

  it("opens the transaction modal when the more icon is clicked", async () => {
    renderWithRedux(<HoldingsTable />, {
      currentState: { coinList: baseCoinList },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("EditIcon"));
    });
    expect(mockHandleOpenModal).toHaveBeenCalled();
  });

  it("removes the coin from the portfolio when the clear icon is clicked", async () => {
    renderWithRedux(<HoldingsTable />, {
      currentState: { coinList: baseCoinList },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("ClearIcon"));
    });
    expect(mockHandleRemoveCoin).toHaveBeenCalledWith("bitcoin");
  });
});
