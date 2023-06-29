import { render, screen } from "@testing-library/react";
import { Rating } from "./Rating";

describe("Rating component", () => {
  test("renders correct number of stars", () => {
    const rating = 3.5;
    const starCount = 5;
    const isLoading = false;

    render(
      <Rating
        rating={rating}
        starCount={starCount}
        isLoading={isLoading}
      />
    );

    const starElements = screen.getAllByTestId("star");

    expect(starElements).toHaveLength(starCount);
  });
});
