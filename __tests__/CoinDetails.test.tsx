import React from "react";
import { screen } from "@testing-library/react";
import CoinDetail from "@/components/CoinDetail";
import { renderWithRedux } from "@/utils/test-util";
import { AppState } from "@/store/store";

describe("CoinDetail Component", () => {
  it("renders correctly with mock data", () => {
    const currentState: Partial<AppState> = {
      coinDetails: {
        coin: {
          market_data: {
            current_price: { usd: 50000 },
            price_change_percentage_24h: 5,
          },
          market_cap_rank: 1,
          name: "Bitcoin",
          image: { large: "/path/to/bitcoin-image.png" },
        },
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<CoinDetail />, { currentState });

    expect(screen.getByText("Rank #1")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("$50,000.00")).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
  });

  it("handles missing data gracefully", () => {
    const currentState: Partial<AppState> = {
      coinDetails: {
        coin: {},
        loading: false,
        error: null,
      },
    };

    const { container } = renderWithRedux(<CoinDetail />, { currentState });

    expect(container.firstChild).toBeNull();
  });
});
