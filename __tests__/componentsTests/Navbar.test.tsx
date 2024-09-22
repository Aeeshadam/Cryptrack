import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/SearchContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/contexts/SearchContext", () => ({
  useSearch: jest.fn(),
}));

describe("Navbar", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearch as jest.Mock).mockReturnValue({
      search: "",
      setSearch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly when user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "123", email: "demo@gmail.com" },
      displayName: "Demo Demo",
    });
    render(<Navbar />);
    expect(screen.getByText("DD")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Portfolio" })
    ).toBeInTheDocument();
  });

  it("should navigate to portfolio page when Portfolio button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "123", email: "demo@gmail.com" },
    });
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Portfolio" }));
    expect(mockPush).toHaveBeenCalledWith("/portfolio");
  });

  it("should navigate to sign-in page when Get Started button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Get Started" }));
    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });
});
