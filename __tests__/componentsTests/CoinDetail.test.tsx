import React from "react";

import { fireEvent, screen } from "@testing-library/react";
import CoinDetail from "@/components/CoinDetail";
import { useAuth } from "@/contexts/AuthContext";
import { AppState } from "@/store/store";
import { mockUseTransaction, renderWithRedux } from "@/utils/test-util";

const baseCoinDetail = {
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
};

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/contexts/TransactionContext");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe("CoinDetail Component", () => {
  let handleOpenModalMock: jest.Mock;

  const setupMocks = (user: any) => {
    (useAuth as jest.Mock).mockReturnValue({ user });
    handleOpenModalMock = jest.fn();
    mockUseTransaction({ handleOpenModal: handleOpenModalMock });
  };

  const renderComponent = (state: Partial<AppState>) => {
    renderWithRedux(<CoinDetail />, { currentState: state });
  };

  beforeEach(() => {
    setupMocks({ uid: "123", email: "test@ex.com" });
  });

  describe("when user is logged in", () => {
    it("renders correctly with mock data", () => {
      renderComponent({ coinDetails: baseCoinDetail });

      expect(screen.getByText("Rank #1")).toBeInTheDocument();
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("$50,000.00")).toBeInTheDocument();
      expect(screen.getByText("5.00%")).toBeInTheDocument();
    });

    it("renders add button", () => {
      renderComponent({ coinDetails: baseCoinDetail });
      expect(screen.getByTestId("add button")).toBeInTheDocument();
    });

    it("renders modal when add button is clicked", () => {
      renderComponent({ coinDetails: baseCoinDetail });
      const addButton = screen.getByTestId("add button");
      fireEvent.click(addButton);
      expect(handleOpenModalMock).toHaveBeenCalled();
    });
  });

  describe("when user is not logged in", () => {
    beforeEach(() => {
      setupMocks(null);
    });
    it("does not render add button", () => {
      renderComponent({ coinDetails: baseCoinDetail });
      expect(screen.queryByTestId("add button")).toBeNull();
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
});
