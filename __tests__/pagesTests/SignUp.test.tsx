import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SignUpForm from "@/app/sign-up/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("SignUpForm", () => {
  const mockSignUp = jest.fn();
  const mockSetError = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      setError: mockSetError,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders the sign-up form", () => {
    render(<SignUpForm />);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("calls signUp and displays snackbar on successful sign-up", async () => {
    mockSignUp.mockResolvedValue(true);

    render(<SignUpForm />);

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@gmail.com",
        "password",
        "Test User"
      );
      expect(
        screen.getByText(/signed up successfully! redirecting/i)
      ).toBeInTheDocument();
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("displays error message when passwords do not match", async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
