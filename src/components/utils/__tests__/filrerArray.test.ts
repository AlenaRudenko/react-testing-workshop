import {
  basketWithNoQuantity,
  filtreredBasketWithQuantityOnly,
  TProduct,
} from "../__mocks__/basket.mock";
import { filterArray } from "../filterArray";

const cb = jest.fn();

const logSpy = jest.spyOn(console, "log");

describe("filterArray", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should invoke provided function as many time as the length of an array", () => {
    const arr = [1, 2, 3, 4, 5];

    filterArray(arr, cb);
    expect(cb).toHaveBeenCalledTimes(arr.length);
  });

  it("should not invoke callback when array is empty", () => {
    filterArray([], cb);

    expect(cb).toHaveBeenCalledTimes(0);
    expect(cb).not.toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("should filter an array using provided predicate", () => {
    const cb = ({ qty }: TProduct) => !!qty;

    const result = filterArray(basketWithNoQuantity, cb);

    expect(result).toEqual(filtreredBasketWithQuantityOnly);
    expect(logSpy).toHaveBeenCalledTimes(basketWithNoQuantity.length);
  });
});
