import React from "react";

import Page from "@/app/portfolio/page";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/PortfolioBalance", () => () => (
  <div data-testid="portfolio-balance">PortfolioBalance</div>
));
jest.mock("@/components/HoldingsTable", () => () => (
  <div data-testid="holdings-table">HoldingsTable</div>
));
jest.mock("@/components/EmptyPortfolio", () => () => (
  <div data-testid="empty-portfolio">EmptyPortfolio</div>
));
jest.mock("@/components/LoadingSpinner", () => () => (
  <div data-testid="loading-spinner">LoadingSpinner</div>
));
jest.mock("@/components/DoughnutChart", () => () => (
  <div data-testid="doughnut-chart">DoughnutChart</div>
));

jest.mock("@/contexts/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

describe("Page", () => {
  it("renders loading spinner when loading", () => {
    (usePortfolio as jest.Mock).mockReturnValue({
      portfolioCoins: [],
      loading: true,
    });

    render(<Page />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders empty portfolio message when there are no portfolio coins", () => {
    (usePortfolio as jest.Mock).mockReturnValue({
      portfolioCoins: [],
      loading: false,
    });

    render(<Page />);

    expect(screen.getByTestId("empty-portfolio")).toBeInTheDocument();
  });

  it("renders portfolio balance, doughnut chart, and holdings table when there are portfolio coins", () => {
    (usePortfolio as jest.Mock).mockReturnValue({
      portfolioCoins: [{ id: "bitcoin", name: "Bitcoin" }],
      loading: false,
    });

    render(<Page />);

    expect(screen.getByTestId("portfolio-balance")).toBeInTheDocument();
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
    expect(screen.getByTestId("holdings-table")).toBeInTheDocument();
  });
});
