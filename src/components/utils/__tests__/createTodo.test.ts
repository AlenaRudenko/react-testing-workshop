import { beforeEach } from "node:test";
import { createTodo, createTodoOnServer } from "../createTodo";
import { mockTodo } from "../__mocks__/todo.mock";
import { API_URL } from "../../../services/userService";

const mockedV4 = jest.fn(() => "123");

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTodo),
  } as Response)
);

jest.mock("uuid", () => ({
  v4: () => mockedV4(),
}));

describe("createTodo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create todo object with id 1", () => {
    const title = "mock title";
    const todo = createTodo(title);
    const expectedResult = { title, id: "123", completed: false };

    expect(todo).toEqual(expectedResult);
    expect(mockedV4).toHaveBeenCalledTimes(1);
  });

  it("should create todo on server", async () => {
    const result = await createTodoOnServer("todo");

    expect(result).toEqual(mockTodo);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle server error and log it", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      } as Response)
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const result = await createTodoOnServer("bad todo");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/todos`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(result).toBeUndefined();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(consoleSpy.mock.calls[0][0].message).toBe("Cannot create todo");

    consoleSpy.mockRestore();
  });
});
