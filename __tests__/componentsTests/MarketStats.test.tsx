import React from "react";

import MarketStats from "@/components/MarketStats";
import useMarketStatsData from "@/hooks/useMarketStatsData";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/useMarketStatsData");

describe("MarketStats Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders market stats correctly without date and change", () => {
    (useMarketStatsData as jest.Mock).mockReturnValue([
      {
        title: "Market Cap",
        value: 1000000,
        description:
          "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.",
      },
    ]);

    render(<MarketStats />);
    expect(screen.getByText("$1,000,000.00")).toBeInTheDocument();
  });

  it("renders correctly with no data", () => {
    (useMarketStatsData as jest.Mock).mockReturnValue([]);
    const { container } = render(<MarketStats />);
    expect(container.firstChild).toBeNull();
  });

  it("renders market stats correctly with change indicator", () => {
    (useMarketStatsData as jest.Mock).mockReturnValue([
      {
        title: "Price Change (24h)",
        value: -0.05,
        change: true,
        description:
          "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.",
      },
    ]);

    render(<MarketStats />);
    expect(screen.getByText("0.05%")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
  });

  it("renders market stats correctly with date", () => {
    (useMarketStatsData as jest.Mock).mockReturnValue([
      {
        title: "All-Time Low",
        value: 10000,
        date: "2021-10-01",
        description:
          "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.",
      },
    ]);

    render(<MarketStats />);
    expect(screen.getByText("$10,000.00")).toBeInTheDocument();
    expect(screen.getByText("2021-10-01")).toBeInTheDocument();
  });
});
