import { useEffect, useRef, useState } from "react";
import Categories from "../../components/categories";
import styles from "./home.module.scss";
import { getRestaurants } from "../../services/restaurant.services";
import { mappedRestaurant } from "../../mappers/restaurant.mapper";
import {
  type Category,
  type RestaurantType,
} from "../../interfaces/restaurant.interface";
import Restaurants from "../../components/restaurants";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState<RestaurantType[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] =
    useState<string>("newamerican");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantsResponse = await getRestaurants(
          categorySelected,
          page
        );

        const { availableCategories, restaurantsListMapped } =
          mappedRestaurant(restaurantsResponse.businesses);

        setCategories(availableCategories);

        if (page === 1) {
          setRestaurants(restaurantsListMapped);
        } else {
          setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...restaurantsListMapped,
          ]);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categorySelected, page]);

  const setCategory = (alias: string) => {
    setCategorySelected(alias);
    setPage(1);
  };

  useEffect(() => {
    const handleIntersection = (
      entries: IntersectionObserverEntry[]
    ) => {
      const target = entries[0];

      if (target.intersectionRatio > 0 && !loading) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const isNearEnd =
          scrollHeight - (scrollTop + clientHeight) <=
          clientHeight * 6;

        if (isNearEnd) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      options
    );

    if (observerRef.current && observerElementRef.current) {
      observerRef.current.observe(observerElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading]);

  return (
    <div className={styles["app-container"]}>
      <h1 className={styles.h1}>Restaurants</h1>
      <Categories
        categories={categories}
        categorySelected={categorySelected}
        onClick={setCategory}
      />
      <Restaurants restaurants={restaurants} isLoading={loading} />
      <div
        ref={observerElementRef}
        style={{ marginTop: "50px" }}
      ></div>
    </div>
  );
};

export default Home;
