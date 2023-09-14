import { render } from "@testing-library/react";
import { Provider } from "urql";
import { describe, test, expect, vi } from "vitest";

import Genres from "./Genres";

const data = {
  Action: true,
};

describe("test Genres", () => {
  const mockClient = {
    executeQuery: vi.fn(),
  };

  test("should render Card", () => {
    const component = render(
      <Provider value={mockClient}>
        <Genres selectedGenres={data} onChangeSelectedGenre={() => {}} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
