import { RestaurantType } from "../../interfaces/restaurant.interface";
import Rating from "../rating";
import styles from "./restaurantCard.module.scss";

interface Props {
  restaurant?: RestaurantType;
  isLoading: boolean;
}

export const RestaurantCard = ({
  restaurant = {
    name: "",
    id: "",
    image_url: "",
    rating: 0,
    price: "",
    url: "",
  },
  isLoading,
}: Props) => {
  const { name, image_url, rating, price, url } = restaurant;

  return (
    <article
      data-testid="restaurant-card"
      className={`${styles["restaurant-card"]} ${
        isLoading ? styles.loading : ""
      }`}
    >
      <div className={styles["image-container"]}>
        {image_url && <img src={image_url} alt={name} />}
      </div>
      <div className={styles["restaurant-details-container"]}>
        <p className={styles["restaurant-title"]}>{name}</p>
        <div className={styles["restaurant-details"]}>
          <Rating rating={rating} isLoading={isLoading} />
          <span>{price}</span>
        </div>
        <a
          className={styles["restaurant-button"]}
          href={url}
          target="_blank"
        >
          VIEW
        </a>
      </div>
    </article>
  );
};
