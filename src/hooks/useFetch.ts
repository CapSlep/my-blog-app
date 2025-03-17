import { useState, useEffect } from "react";
import axios from "axios";

/**
 * custom hook to fetch data from endpoint and cache it in local storage
 * @param key - key to store data in local storage
 * @param endpoint - endpoint to fetch data from
 * @returns isLoading - boolean to check if data is loading, data - fetched data from server or from cache
 */
const useFetch = (endpoint: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); //state to check if data is loaded

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [endpoint]);

  return { isLoading, data }; //returning properties of useUser hook to use elsewhere
};

// export default useFetch;
