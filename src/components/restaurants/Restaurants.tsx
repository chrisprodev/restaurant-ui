import { RestaurantType } from "../../interfaces/restaurant.interface";
import { RestaurantCard } from "../restaurantCard/RestaurantCard";
import styles from "./restaurants.module.scss";

interface Props {
  restaurants: RestaurantType[];
  isLoading: boolean;
}

export const Restaurants = ({ restaurants, isLoading }: Props) => {
  return (
    <div className={styles.container}>
      {isLoading &&
        [...Array(9)].map(() => (
          <RestaurantCard
            key={crypto.randomUUID()}
            isLoading={isLoading}
          />
        ))}
      {!isLoading &&
        restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};
