import fetchMock from "jest-fetch-mock";
import React from "react";

import CoinDetailPage from "@/app/coin/[slug]/page";
import { useAuth } from "@/contexts/AuthContext";
import { renderWithRedux } from "@/utils/test-util";
import { act, screen, waitFor } from "@testing-library/react";

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/components/CoinDetail", () => () => (
  <div data-testid="coin-detail">CoinDetail</div>
));
jest.mock("@/components/MarketStats", () => () => (
  <div data-testid="market-stats">MarketStats</div>
));
jest.mock("@/components/About", () => () => (
  <div data-testid="about">About</div>
));
jest.mock("@/components/Chart", () => () => (
  <div data-testid="chart">Chart</div>
));
jest.mock("@/components/TransactionHistory", () => () => (
  <div data-testid="transaction-history">TransactionHistory</div>
));

const mockCoin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  image: {
    large: "https://bitcoin.image/large.png",
    small: "https://bitcoin.image/small.png",
  },
  current_price: 50000,
  market_cap: 1000000,
  market_cap_rank: 1,
  total_volume: 1000000,
  price_change_percentage_24h: 1,
  market_data: {
    market_cap_change_percentage_24h: 1,
    market_cap_rank: 1,
    total_volume: 1000000,
  },
};

describe("CoinDetailPage", () => {
  const setupMocks = (user: any) => {
    (useAuth as jest.Mock).mockReturnValue({ user });
  };

  beforeEach(() => {
    setupMocks({ uid: "123", email: "test@ex.com" });
    fetchMock.resetMocks();
    fetchMock.mockResponse((req) => {
      if (req.url.includes("coinDetails")) {
        return Promise.resolve(JSON.stringify(mockCoin));
      } else if (req.url.includes("historicData")) {
        return Promise.resolve(
          JSON.stringify([
            [1704067241331, 42261.0406175669],
            [1704070847420, 42493.2764087546],
            [1704074443652, 42654.0731066594],
          ])
        );
      }
      return Promise.resolve(JSON.stringify({}));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /* 
  it("renders loading spinner when loading", async () => {
    await act(async () => {
      renderWithRedux(<CoinDetailPage params={{ slug: "bitcoin" }} />, {
        currentState: {
          coinDetails: { loading: true, error: null, coin: null },
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  }); */

  it("renders error message after loading", async () => {
    await act(async () => {
      renderWithRedux(<CoinDetailPage params={{ slug: "bitcoin" }} />, {
        currentState: {
          coinDetails: {
            loading: false,
            error: "Error: Failed to fetch details",
            coin: null,
          },
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Error: Failed to fetch details"
      );
    });
  });

  it("renders coin details, market stats, charts and about sections", async () => {
    await act(async () => {
      renderWithRedux(<CoinDetailPage params={{ slug: "bitcoin" }} />, {
        currentState: {
          coinDetails: {
            loading: false,
            error: null,
            coin: mockCoin,
          },
          historicData: {
            loading: false,
            error: "",
            data: [
              [1704067241331, 42261.0406175669],
              [1704070847420, 42493.2764087546],
              [1704074443652, 42654.0731066594],
            ],
          },
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("coin-detail")).toBeInTheDocument();
      expect(screen.getByTestId("market-stats")).toBeInTheDocument();
      expect(screen.getByTestId("about")).toBeInTheDocument();
      expect(screen.getByTestId("chart")).toBeInTheDocument();
    });
  });

  it("renders transaction history if coin is in portfolio", async () => {
    await act(async () => {
      renderWithRedux(<CoinDetailPage params={{ slug: "bitcoin" }} />, {
        currentState: {
          coinDetails: {
            loading: false,
            error: null,
            coin: mockCoin,
          },
          historicData: {
            loading: false,
            error: "",
            data: [],
          },
          portfolio: {
            coins: [
              {
                id: "bitcoin",
                name: "Bitcoin",
                quantity: 1,
                transactions: [
                  {
                    quantity: 1,
                    price: 50000,
                    type: "buy",
                    timestamp: 1630000000000,
                  },
                ],
              },
            ],
          },
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("transaction-history")).toBeInTheDocument();
    });
  });

  it("does not render transaction history if coin is not in portfolio", async () => {
    await act(async () => {
      renderWithRedux(<CoinDetailPage params={{ slug: "bitcoin" }} />, {
        currentState: {
          coinDetails: {
            loading: false,
            error: null,
            coin: mockCoin,
          },
          historicData: {
            loading: false,
            error: "",
            data: [],
          },
          portfolio: {
            coins: [],
          },
        },
      });
    });
    await waitFor(() => {
      expect(screen.queryByTestId("transaction-history")).toBeNull();
    });
  });
});
