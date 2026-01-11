import { increment } from "../math";

describe.only("math", () => {
  beforeAll(() => console.log("start"));

  it("adds 2 and 3 to get 5", () => {
    const result = increment(2, 3);
    expect(result).toBe(5);
  });
});
