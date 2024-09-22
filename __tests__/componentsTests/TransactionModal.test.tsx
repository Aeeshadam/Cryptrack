import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import TransactionModal from "@/components/TransactionModal";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useTransaction } from "@/contexts/TransactionContext";

jest.mock("@/contexts/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

jest.mock("@/contexts/TransactionContext", () => ({
  useTransaction: jest.fn(),
}));

describe("TransactionModal", () => {
  const mockTransactionContext = {
    openModal: true,
    setOpenModal: jest.fn(),
    transactionType: "buy",
    calculateTotal: jest.fn().mockReturnValue("100.00"),
    handleTransactionTypeChange: jest.fn(),
    selectedCoin: "",
    setSelectedCoin: jest.fn(),
    quantity: 1,
    setQuantity: jest.fn(),
    pricePerCoin: 50,
    setPricePerCoin: jest.fn(),
  };

  const mockPortfolioContext = {
    coins: [
      { id: "bitcoin", name: "Bitcoin", image: "bitcoin.png" },
      { id: "ethereum", name: "Ethereum", image: "ethereum.png" },
    ],
    portfolioCoins: [{ id: "bitcoin", name: "Bitcoin", quantity: 1 }],
    handleAddTransaction: jest.fn(),
  };

  beforeEach(() => {
    (useTransaction as jest.Mock).mockReturnValue(mockTransactionContext);
    (usePortfolio as jest.Mock).mockReturnValue(mockPortfolioContext);
  });

  it("should render correctly when openModal is true", () => {
    render(<TransactionModal />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes when onClose is triggered", () => {
    render(<TransactionModal />);
    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockTransactionContext.setOpenModal).toHaveBeenCalledWith(false);
    } else {
      throw new Error("Backdrop not found");
    }
  });

  it("switches transaction type when button is clicked", () => {
    render(<TransactionModal />);
    fireEvent.click(screen.getByText("SELL"));
    expect(
      mockTransactionContext.handleTransactionTypeChange
    ).toHaveBeenCalled();
  });

  it("updates quantity when input changes", () => {
    render(<TransactionModal />);
    const input = screen.getByPlaceholderText("please enter quantity");
    fireEvent.change(input, { target: { value: "5" } });
    expect(mockTransactionContext.setQuantity).toHaveBeenCalledWith(5);
  });
  it("updates price when input changes", () => {
    render(<TransactionModal />);
    const input = screen.getByTestId("price").querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "100" } });
      expect(mockTransactionContext.setPricePerCoin).toHaveBeenCalledWith(100);
    } else {
      throw new Error("Input element not found");
    }
  });

  it("calculates total when quantity or price changes", () => {
    render(<TransactionModal />);
    const quantityInput = screen.getByPlaceholderText("please enter quantity");
    fireEvent.change(quantityInput, { target: { value: "5" } });
    expect(mockTransactionContext.calculateTotal).toHaveBeenCalled();

    const priceInput = screen.getByTestId("price").querySelector("input");
    if (priceInput) {
      fireEvent.change(priceInput, { target: { value: "100" } });
      expect(mockTransactionContext.calculateTotal).toHaveBeenCalled();
    } else {
      throw new Error("Input element not found");
    }
  });

  it("adds transaction when form is submitted", () => {
    render(<TransactionModal />);
    fireEvent.submit(screen.getByTestId("dialog"));
    expect(mockPortfolioContext.handleAddTransaction).toHaveBeenCalled();
  });

  /*  it("updates selected coin when coin is selected", async () => {
    render(<TransactionModal />);
    const dropdownButton = screen.getByTestId("coin-select");
    userEvent.click(dropdownButton);
    const bitcoinOption = await screen.findByRole("option", {
      name: /Bitcoin/i,
    });
    userEvent.click(bitcoinOption);
    expect(mockTransactionContext.setSelectedCoin).toHaveBeenCalledWith(
      "bitcoin"
    );
  }); */
});
