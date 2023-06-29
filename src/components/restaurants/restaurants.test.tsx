import { render, screen } from "@testing-library/react";
import { Restaurants } from "./Restaurants";

describe("Restaurants component", () => {
  const RESTAURANTS = [
    {
      id: "1",
      name: "Restaurant 1",
      image_url: "https://example.com/image1.jpg",
      rating: 4.5,
      price: "$$$",
      url: "https://example.com/1",
    },
    {
      id: "2",
      name: "Restaurant 2",
      image_url: "https://example.com/image2.jpg",
      rating: 3.8,
      price: "$$",
      url: "https://example.com/2",
    },
  ];
  const isLoading = false;

  test("renders all restaurants correctly", () => {
    render(
      <Restaurants
        restaurants={RESTAURANTS}
        isLoading={isLoading}
      />
    );

    const restaurantElements =
      screen.getAllByTestId("restaurant-card");

    expect(restaurantElements).toHaveLength(RESTAURANTS.length);
  });

  test("displays loading state when isLoading is true", () => {
    render(<Restaurants restaurants={[]} isLoading={true} />);

    const loadingElements =
      screen.getAllByTestId("restaurant-card");

    expect(loadingElements).toHaveLength(9);
  });
});
