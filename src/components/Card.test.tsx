import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Card from "./Card";

const data = {
  id: 0,
  bannerImage: "",
  description: "",
  genres: [""],
  title: {
    romaji: "",
    english: "",
    native: "",
  },
  coverImage: {
    large: "",
    medium: "",
  },
  averageScore: 0,
  episodes: 0,
  studios: {
    nodes: [{ name: "" }],
  },
};

describe("test Card", () => {
  test("should render Card", () => {
    const component = render(
      <MemoryRouter>
        <Card data={data} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  test("Card should show episode", () => {
    data.episodes = 100;
    const component = render(
      <MemoryRouter>
        <Card data={data} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  test("Card should show button bookmark", () => {
    const component = render(
      <MemoryRouter>
        <Card data={data} isBookmark />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
