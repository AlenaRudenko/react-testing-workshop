import { useState, type FC } from "react";

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => prev && prev - 1);
  };
  return (
    <div
      data-testid="counter-container"
      style={{ display: "flex", gap: 10, flexDirection: "column" }}
    >
      <span>Счетчик: {count}</span>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      {count > 5 && (
        <span data-testid="hight-count-warning">Высокое значение !</span>
      )}
    </div>
  );
};
