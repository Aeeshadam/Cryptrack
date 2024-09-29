import React from "react";

import { screen } from "@testing-library/react";
import About from "@/components/About";
import { AppState } from "@/store/store";
import { renderWithRedux } from "@/utils/test-util";

describe("About Component", () => {
  it("renders correctly with market less than 10", () => {
    const currentState: Partial<AppState> = {
      coinDetails: {
        coin: {
          description: { en: "This is a mock description" },
          tickers: [
            { market: { name: "Market 1" } },
            { market: { name: "Market 2" } },
          ],
        },
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<About />, { currentState });

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("This is a mock description")).toBeInTheDocument();
    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Market 1")).toBeInTheDocument();
    expect(screen.getByText("Market 2")).toBeInTheDocument();
  });

  it("handles missing data gracefully", () => {
    const currentState: Partial<AppState> = {
      coinDetails: {
        coin: {},
        loading: false,
        error: null,
      },
    };

    const { container } = renderWithRedux(<About />, { currentState });

    expect(container.firstChild).toBeNull();
  });

  it("renders correct length of market when market data greater than 10", () => {
    const currentState: Partial<AppState> = {
      coinDetails: {
        coin: {
          description: { en: "This is a mock description" },
          tickers: [
            { market: { name: "Market 1" } },
            { market: { name: "Market 3" } },
            { market: { name: "Market 4" } },
            { market: { name: "Market 5" } },
            { market: { name: "Market 6" } },
            { market: { name: "Market 7" } },
            { market: { name: "Market 8" } },
            { market: { name: "Market 9" } },
            { market: { name: "Market 10" } },
            { market: { name: "Market 11" } },
            { market: { name: "Market 12" } },
          ],
        },
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<About />, { currentState });

    const marketNames = screen.getAllByText(/Market \d+/);
    expect(marketNames).toHaveLength(10);
  });
});
