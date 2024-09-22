import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchResult from "../../components/SearchResult";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/SearchContext", () => ({
  useSearch: jest.fn(),
}));

describe("SearchResult", () => {
  const mockPush = jest.fn();
  const mockSetOpenSearch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearch as jest.Mock).mockReturnValue({
      filteredCoins: [
        { id: "bitcoin", name: "Bitcoin", image: "/bitcoin.png" },
        { id: "ethereum", name: "Ethereum", image: "/ethereum.png" },
      ],
      setOpenSearch: mockSetOpenSearch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with filtered coins", () => {
    render(<SearchResult />);

    expect(screen.getByText("Coin List 🔥")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("should handle click on a coin item", () => {
    render(<SearchResult />);

    const bitcoinItem = screen.getByText("Bitcoin");
    fireEvent.click(bitcoinItem);

    expect(mockPush).toHaveBeenCalledWith("/coin/bitcoin");
    expect(mockSetOpenSearch).toHaveBeenCalledWith(false);
  });

  it("should display 'No result found' when there are no filtered coins", () => {
    (useSearch as jest.Mock).mockReturnValue({
      filteredCoins: [],
      setOpenSearch: mockSetOpenSearch,
    });

    render(<SearchResult />);

    expect(screen.getByText("No result found")).toBeInTheDocument();
  });
});
