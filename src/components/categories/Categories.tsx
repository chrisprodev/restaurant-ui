import { Category } from "../../interfaces/restaurant.interface";
import styles from "./categories.module.scss";

interface Props {
  categories: Category[];
  categorySelected: string;
  onClick: (alias: string) => void;
}

export const Categories = ({
  categories,
  categorySelected,
  onClick,
}: Props) => {
  return (
    <div className={styles["container"]}>
      {categories.map((category) => (
        <div
          key={category.alias}
          data-testid="category_test"
          className={`${styles["category"]} ${
            categorySelected === category.alias &&
            styles["selected-category"]
          }`}
          onClick={() => onClick(category.alias)}
        >
          {category.title}
        </div>
      ))}
    </div>
  );
};
