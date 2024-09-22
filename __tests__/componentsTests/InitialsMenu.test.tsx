import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InitialsMenu from "../../components/InitialsMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("InitialsMenu", () => {
  const mockPush = jest.fn();
  const mockLogOut = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "123", email: "demo@gmail.com" },
      displayName: "Demo Demo",
      logOut: mockLogOut,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when user is logged in", () => {
    render(<InitialsMenu name="DD" />);
    expect(screen.getByText("DD")).toBeInTheDocument();
  });

  it("should navigate to sign-in page and log out when log out button is clicked", async () => {
    render(<InitialsMenu name="DD" />);
    const nameButton = screen.getByRole("button", { name: "DD" });
    fireEvent.click(nameButton);
    const logoutButton = screen.getByRole("menuitem", { name: "Logout" });
    fireEvent.click(logoutButton);
    expect(mockLogOut).toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });
});
