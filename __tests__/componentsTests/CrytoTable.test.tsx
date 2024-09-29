import { useRouter } from "next/navigation";
import React from "react";

import CryptoTable from "@/components/CryptoTable";
import { useCoinsData } from "@/hooks/useCoinsData";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/hooks/useCoinsData");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CryptoTable", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCoinsData = (overrides = {}) => {
    (useCoinsData as jest.Mock).mockReturnValue({
      currentCoins: [
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
      ...overrides,
    });
  };

  it("displays a loading spinner while data is loading", () => {
    mockCoinsData({ loading: true, currentCoins: [] });

    render(<CryptoTable />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("displays an error message if data fetching fails", () => {
    mockCoinsData({ error: "Failed to fetch data", currentCoins: [] });

    render(<CryptoTable />);
    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });

  it("renders table rows correctly with data", () => {
    mockCoinsData();

    render(<CryptoTable />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("$50,000.00")).toBeInTheDocument();
    expect(screen.getByText("2.50%")).toBeInTheDocument();
    expect(screen.getByText("$1,000,000,000.00")).toBeInTheDocument();
    expect(screen.getByText("$50,000,000.00")).toBeInTheDocument();
  });

  it("navigates to the coin's page when a table row is clicked", () => {
    mockCoinsData();

    render(<CryptoTable />);

    const row = screen.getByText("Bitcoin").closest("tr");
    fireEvent.click(row!);
    expect(mockPush).toHaveBeenCalledWith("/coin/bitcoin");
  });
});
