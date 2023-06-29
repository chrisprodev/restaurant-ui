import {
  Category,
  RestaurantInterface,
} from "../interfaces/restaurant.interface";

export const mappedRestaurant = (
  restaurantsList: RestaurantInterface[]
) => {
  const flattenedArray = restaurantsList.reduce(
    (acc: Category[], innerArr: RestaurantInterface) => {
      return acc.concat(innerArr.categories);
    },
    []
  );

  const availableCategories = flattenedArray.reduce(
    (acc: Category[], obj: Category) => {
      const isDuplicate = acc.some(
        (uniqueObj) =>
          uniqueObj.alias === obj.alias &&
          uniqueObj.title === obj.title
      );

      if (!isDuplicate) {
        acc.push(obj);
      }

      return acc;
    },
    []
  );

  const restaurantsListMapped = restaurantsList.map(
    ({ id, name, image_url, rating, price, url }) => ({
      id,
      name,
      image_url,
      rating,
      price,
      url,
    })
  );

  return {
    availableCategories,
    restaurantsListMapped,
  };
};
