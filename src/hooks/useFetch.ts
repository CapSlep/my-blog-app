import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * custom hook to fetch data from endpoint and cache it in local storage
 * @param key - key to store data in query storage
 * @param endpoint - endpoint to fetch data from
 * @returns isLoading - boolean to check if data is loading, data - fetched data from server or from cache
 */
const useFetch = (
  key: string,
  endpoint: string,
  enabledCondition: boolean = true
) => {
  const { data: response, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await axios.get(endpoint);
    },
    enabled: enabledCondition,
  });

  return { isLoading, response }; //returning properties of useUser hook to use elsewhere
};

export default useFetch;
