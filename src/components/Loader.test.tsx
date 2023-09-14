import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Loader from "./Loader";

describe("test Loader", () => {
  test("should render Loader", () => {
    const component = render(<Loader />);

    expect(component).toMatchSnapshot();
  });
});
