import axios from "axios";

export const getRestaurants = async (
  category: string,
  page: number
) => {
  const response = await axios({
    method: "get",
    url: `${
      import.meta.env.VITE_API
    }/restaurants/${category}/${page}`,
  });

  return response.data;
};
