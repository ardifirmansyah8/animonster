import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Layout from "./Layout";

describe("test Layout", () => {
  test("should render Layout", () => {
    const component = render(
      <MemoryRouter>
        <Layout>test</Layout>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
