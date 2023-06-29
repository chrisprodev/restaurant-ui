import { RestaurantInterface } from "../interfaces/restaurant.interface";
import { mappedRestaurant } from "./restaurant.mapper";

describe("mappedRestaurant function", () => {
  test("correctly maps and extracts categories from restaurant list", () => {
    const RESTAURANTSLIST = [
      {
        id: "1",
        name: "Restaurant 1",
        categories: [
          { alias: "category1", title: "Category 1" },
          { alias: "category2", title: "Category 2" },
        ],
      },
      {
        id: "2",
        name: "Restaurant 2",
        categories: [
          { alias: "category2", title: "Category 2" },
          { alias: "category3", title: "Category 3" },
        ],
      },
    ];

    const { availableCategories } = mappedRestaurant(
      RESTAURANTSLIST as RestaurantInterface[]
    );

    expect(availableCategories).toEqual([
      { alias: "category1", title: "Category 1" },
      { alias: "category2", title: "Category 2" },
      { alias: "category3", title: "Category 3" },
    ]);
  });

  test("correctly maps restaurant properties", () => {
    const RESTAURANTSLIST = [
      {
        id: "1",
        name: "Restaurant 1",
        image_url: "image1.jpg",
        rating: 4.5,
        price: "$$",
        url: "https://restaurant1.com",
        categories: [{ alias: "category1", title: "Category 1" }],
      },
      {
        id: "2",
        name: "Restaurant 2",
        image_url: "image2.jpg",
        rating: 3.8,
        price: "$",
        url: "https://restaurant2.com",
        categories: [{ alias: "category2", title: "Category 2" }],
      },
    ];

    const { restaurantsListMapped } = mappedRestaurant(
      RESTAURANTSLIST as RestaurantInterface[]
    );

    expect(restaurantsListMapped).toEqual([
      {
        id: "1",
        name: "Restaurant 1",
        image_url: "image1.jpg",
        rating: 4.5,
        price: "$$",
        url: "https://restaurant1.com",
      },
      {
        id: "2",
        name: "Restaurant 2",
        image_url: "image2.jpg",
        rating: 3.8,
        price: "$",
        url: "https://restaurant2.com",
      },
    ]);
  });
});
