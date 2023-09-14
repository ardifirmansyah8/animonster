import { describe, expect, test, vi } from "vitest";

import { getItem, ratingColor, setItem } from ".";

describe("test utils", () => {
  test("ratingColor return green", () => {
    const color = ratingColor(80);

    expect(color).toBe("text-green-500");
  });

  test("ratingColor return orange", () => {
    const color = ratingColor(70);

    expect(color).toBe("text-orange-500");
  });

  test("ratingColor return red", () => {
    const color = ratingColor(60);

    expect(color).toBe("text-red-500");
  });

  test("getItem return value", () => {
    const value = getItem("");

    expect(value).toBe("");
  });
});
