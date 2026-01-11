import axios from "axios";
import { fetchUsers, fetchUserById } from "../userService";

const axiosSpy = jest.spyOn(axios, "get");
const errorSpy = jest.spyOn(console, "error");

describe("fetchUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array in case of error and print error to console", async () => {
    const errorMessage = "Mock error";

    axiosSpy.mockRejectedValueOnce(errorMessage);

    const data = await fetchUsers();

    expect(errorSpy).toHaveBeenCalledWith(errorMessage);
    expect(data).toEqual([]);
  });

  it("should return an array of users using axios get", async () => {
    const result = await fetchUsers();

    expect(axiosSpy).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(result).toHaveLength(10);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe("fetchUserById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null in case of error and print error to console", async () => {
    const errorMessage = "Mock error";

    axiosSpy.mockRejectedValueOnce(errorMessage);

    const data = await fetchUserById("");
    expect(errorSpy).toHaveBeenCalledWith(errorMessage);
    expect(data).toBeNull();
  });

  it("should return a user using axios get", async () => {
    const result = await fetchUserById("1");

    expect(axiosSpy).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    expect(result).not.toBeNull();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
