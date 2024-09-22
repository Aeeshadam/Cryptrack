import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSearch } from "@/contexts/SearchContext";
import SearchComponent from "@/components/SearchComponent";
import SearchModal from "@/components/SearchModal";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/SearchContext");

const baseMockState = {
  searchQuery: "",
  setSearchQuery: jest.fn(),
  filteredCoins: [],
  openSearch: false,
  setOpenSearch: jest.fn(),
  handleOpenSearch: jest.fn(),
};

const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  route: "/",
  pathname: "/",
  query: {},
  asPath: "",
};

describe("SearchComponent", () => {
  const mockUseSearch = useSearch as jest.MockedFunction<typeof useSearch>;

  beforeEach(() => {
    mockUseSearch.mockReturnValue({
      ...baseMockState,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly in mobile version", () => {
    render(<SearchComponent mobileVersion={true} />);
    const mobileSearchIcon = screen.getByTestId("mobile-search");
    expect(mobileSearchIcon).toBeInTheDocument();
  });

  it("renders correctly in non-mobile version", () => {
    render(<SearchComponent mobileVersion={false} />);
    const desktopSearch = screen.getByTestId("desktop-search");
    expect(desktopSearch).toBeInTheDocument();
  });

  it("handles editable prop correctly", () => {
    render(<SearchComponent editable={true} mobileVersion={false} />);
    const searchInput = screen.getByPlaceholderText("Search…");
    expect(searchInput).not.toHaveAttribute("readOnly");
  });

  it("handles focus prop correctly", () => {
    render(<SearchComponent focus={true} mobileVersion={false} />);
    const searchInput = screen.getByPlaceholderText("Search…");
    expect(searchInput).toHaveFocus();
  });

  it("handles search input change", () => {
    const setSearchQuery = jest.fn();
    mockUseSearch.mockReturnValue({
      ...baseMockState,
      setSearchQuery,
    });

    render(<SearchComponent mobileVersion={false} />);
    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(setSearchQuery).toHaveBeenCalledWith("test");
  });

  it("handles search icon click", () => {
    const handleOpenSearch = jest.fn();
    mockUseSearch.mockReturnValue({
      ...baseMockState,
      handleOpenSearch,
    });

    render(<SearchComponent mobileVersion={true} />);
    const searchIcon = screen.getByTestId("mobile-search");
    fireEvent.click(searchIcon);
    expect(handleOpenSearch).toHaveBeenCalled();
  });

  it(" search modal renders correctly when open is true", async () => {
    mockUseSearch.mockReturnValue({
      ...baseMockState,
      openSearch: true,
    });

    render(<SearchModal />);

    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  it("does not render search modal when open is false", async () => {
    mockUseSearch.mockReturnValue({
      ...baseMockState,
      openSearch: false,
    });

    render(<SearchModal />);

    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  it("closes the search modal when clicking on the backdrop", async () => {
    const setOpenSearch = jest.fn();
    mockUseSearch.mockReturnValue({
      ...baseMockState,
      openSearch: true,
      setOpenSearch,
    });

    render(<SearchModal />);

    await waitFor(() => {
      const backdrop = screen
        .getByRole("presentation")
        .querySelector(".MuiBackdrop-root");

      if (backdrop) {
        fireEvent.click(backdrop);
        expect(setOpenSearch).toHaveBeenCalledWith(false);
      } else {
        throw new Error("Backdrop not found");
      }
    });
  });
});
