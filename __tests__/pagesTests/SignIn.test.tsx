import React from "react";
import { useRouter } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInForm from "@/app/sign-in/page";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("SignInForm", () => {
  const mockSignIn = jest.fn();
  const mockSetError = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      setError: mockSetError,
      error: "",
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign-in form", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("calls signIn with email and password on form submit", async () => {
    mockSignIn.mockResolvedValue(true);

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password");
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("displays error message when signIn fails", async () => {
    mockSignIn.mockResolvedValue(false);
    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("Invalid credentials");
    });
    /*  await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    }); */
  });
});
