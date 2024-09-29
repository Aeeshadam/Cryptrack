import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";

import PortfolioBalance from "../../components/PortfolioBalance";

jest.mock("@/contexts/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

jest.mock("@/contexts/TransactionContext", () => ({
  useTransaction: jest.fn(),
}));

describe("PortfolioBalance", () => {
  const mockCalculateTotalBalance = jest.fn();
  const mockCalculate24HourChangePercentage = jest.fn();
  const mockHandleOpenModal = jest.fn();

  beforeEach(() => {
    (usePortfolio as jest.Mock).mockReturnValue({
      calculateTotalBalance: mockCalculateTotalBalance,
      calculate24HourChangePercentage: mockCalculate24HourChangePercentage,
    });
    (useTransaction as jest.Mock).mockReturnValue({
      handleOpenModal: mockHandleOpenModal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    mockCalculateTotalBalance.mockReturnValue(1000);
    mockCalculate24HourChangePercentage.mockReturnValue(5);

    render(<PortfolioBalance />);

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
  });

  it("should toggle balance visibility", () => {
    mockCalculateTotalBalance.mockReturnValue(1000);

    render(<PortfolioBalance />);
    const visibilityButton = screen.getByTestId("visibility-button");
    fireEvent.click(visibilityButton);
    expect(screen.getByTestId("balance-text").textContent).toBe("*********");
  });

  it("should open modal when 'Add Transaction' button is clicked", () => {
    render(<PortfolioBalance />);
    const addButton = screen.getByRole("button", { name: /add transaction/i });
    fireEvent.click(addButton);
    expect(mockHandleOpenModal).toHaveBeenCalledWith("");
  });
});
