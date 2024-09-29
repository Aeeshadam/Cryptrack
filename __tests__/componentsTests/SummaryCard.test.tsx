import React from "react";

import SummaryCard from "@/components/SummaryCard";
import { useSummaryData } from "@/hooks/useSummaryData";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/useSummaryData");

describe("SummaryCard Component", () => {
  it("should render loading spinner", () => {
    (useSummaryData as jest.Mock).mockReturnValue({
      cardsData: [],
      loading: true,
      error: null,
    });

    render(<SummaryCard />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should render error message", () => {
    (useSummaryData as jest.Mock).mockReturnValue({
      cardsData: [],
      loading: false,
      error: "Failed to fetch summary data",
    });

    render(<SummaryCard />);

    expect(
      screen.getByText("Failed to fetch summary data")
    ).toBeInTheDocument();
  });

  it("should render summary cards", () => {
    (useSummaryData as jest.Mock).mockReturnValue({
      cardsData: [
        { title: "Market Cap", value: "$1,000,000,000" },
        { title: "Volume", value: "$500,000,000" },
        { title: "BTC Dominance", value: "50%" },
      ],
      loading: false,
      error: null,
    });

    render(<SummaryCard />);

    expect(screen.getByText("Market Cap")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("BTC Dominance")).toBeInTheDocument();
  });
});
