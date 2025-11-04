import { act, render, screen, waitFor } from "@testing-library/react";
import { UsersList } from "./UsersList";
import * as userService from "../../services/userService";

jest.mock("../../services/userService");

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
  { id: 6, name: "Diana Wilson", email: "diana@example.com" },
];

describe("UsersList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    (userService.fetchUsers as jest.Mock).mockResolvedValue([]);

    render(<UsersList />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });
  });

  test("renders users after successful fetch", async () => {
    (userService.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    await act(async () => {
      render(<UsersList />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Brown")).toBeInTheDocument();
      expect(screen.getByText("Charlie Davis")).toBeInTheDocument();

      expect(screen.queryByText("Diana Wilson")).not.toBeInTheDocument();
      const userListItems = screen.getAllByTestId(/^user-item-/);
      expect(userListItems).toHaveLength(5);
    });
  });

  test("displays error message when fetch fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const errorMessage = "Network Error";
    (userService.fetchUsers as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await act(async () => {
      render(<UsersList />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Failed to load users"
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

    consoleErrorSpy.mockRestore();
  });

  test("render empty state when no users foung", async () => {
    (userService.fetchUsers as jest.Mock).mockResolvedValue([]);
    await act(async () => render(<UsersList />));
    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });
});
