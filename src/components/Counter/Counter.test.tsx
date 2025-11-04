import { Counter } from "./Counter";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Counter Component", () => {
  test("renders counter wuth initil value 0", () => {
    render(<Counter />);

    expect(screen.getByText("Счетчик: 0")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /increment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrement/i })
    ).toBeInTheDocument();
  });

  test("increment count when increment button is clecked", () => {
    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: /increment/i,
    });
    const countElement = screen.getByText(/Счетчик: \d+/);

    expect(countElement).toHaveTextContent("Счетчик: 0");
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent("Счетчик: 1");
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent("Счетчик: 2");
  });

  test("no changes count when decrement button is clicked in initial state", () => {
    render(<Counter />);

    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const countElement = screen.getByText(/Счетчик: \d+/);

    expect(countElement).toHaveTextContent("Счетчик: 0");
    fireEvent.click(decrementButton);
    expect(countElement).toHaveTextContent("Счетчик: 0");
  });

  test("decrement count when decrement button is clicked and count > 0", () => {
    render(<Counter />);
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const countElement = screen.getByText(/Счетчик: \d+/);

    expect(countElement).toHaveTextContent("Счетчик: 0");
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent("Счетчик: 1");
    fireEvent.click(decrementButton);
    expect(countElement).toHaveTextContent("Счетчик: 0");
  });
  test("show warning when count exceeds 5", () => {
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });

    for (let i = 0; i < 6; i++) {
      fireEvent.click(incrementButton);
    }

    expect(screen.getByTestId("hight-count-warning")).toBeInTheDocument();
    expect(screen.getByText("Высокое значение !")).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(screen.queryByTestId("hight-count-warning")).not.toBeInTheDocument();
  });

  test("snapshot test for counter component", () => {
    const { container } = render(<Counter />);

    expect(container).toMatchSnapshot();
  });
});
