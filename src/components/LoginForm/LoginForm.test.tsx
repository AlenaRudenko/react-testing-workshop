import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

const consoleSpy = jest.spyOn(console, "error");

describe("LoginForm component", () => {
  const mockOnSubmit = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("render login form correcttly", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    const unsernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    expect(unsernameInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("validate empty fields", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toHaveTextContent("Заполните все поля");
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test("submit with valid credentials", async () => {
    mockOnSubmit.mockResolvedValue(undefined);

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.submit(screen.getByTestId("login-form"));

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Logging in...");

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        userName: "testuser",
        password: "password123",
      });

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent("Login");
    });
  });

  test("submit with invalid credentials", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    mockOnSubmit.mockRejectedValue(new Error("Invalid credentials"));
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });
});
