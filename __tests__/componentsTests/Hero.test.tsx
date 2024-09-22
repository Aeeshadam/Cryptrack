import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../../components/Hero";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Hero", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });

  it("navigate to portfolio if user is logged in and button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: "123" } });
    render(<Hero />);
    const button = screen.getByRole("button", { name: /view portfolio/i });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/portfolio");
  });

  it("navigate to login if user is not logged in and button is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<Hero />);
    const button = screen.getByRole("button", { name: /create portfolio/i });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });
});
