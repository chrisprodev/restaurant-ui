import { render, screen } from "@testing-library/react";
import { RestaurantCard } from "./RestaurantCard";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("RestaurantCard component", () => {
  const RESTAURANT = {
    name: "Restaurant Name",
    id: "123",
    image_url: "https://example.com/image.jpg",
    rating: 4.5,
    price: "$$$",
    url: "https://example.com",
  };
  const isLoading = false;

  test("renders restaurant details correctly", () => {
    render(
      <RestaurantCard
        restaurant={RESTAURANT}
        isLoading={isLoading}
      />
    );

    const restaurantTitle = screen.getByText(RESTAURANT.name);
    const priceElement = screen.getByText(RESTAURANT.price);
    const viewLink = screen.getByRole("link", { name: "VIEW" });

    expect(restaurantTitle).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(viewLink).toBeInTheDocument();
    expect(viewLink).toHaveAttribute("href", RESTAURANT.url);
  });

  test("displays loading state when isLoading is true", () => {
    render(<RestaurantCard isLoading={true} />);

    const cardElement = screen.getByTestId("restaurant-card");

    expect(cardElement.className).toContain("loading");
  });

  test("does not display image when image_url is not provided", () => {
    const restaurantWithoutImage = { ...RESTAURANT, image_url: "" };
    render(
      <RestaurantCard
        restaurant={restaurantWithoutImage}
        isLoading={isLoading}
      />
    );

    const imageElement = screen.queryByAltText(RESTAURANT.name);

    expect(imageElement).not.toBeInTheDocument();
  });
});
