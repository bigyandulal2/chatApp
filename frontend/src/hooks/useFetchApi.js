import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export const useFetchApi = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("data from hoook", data);
  // Modify your fetchData in useFetchApi.js
const fetchData = useCallback(
  async (bodyData = null) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (method.toUpperCase() === "GET") {
        response = await api.get(url); // ✅ correct usage
      } else {
        response = await api({
          url,
          method,
          data: bodyData,
        });
      }

      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  },
  [url, method]
);


  useEffect(() => {
    if (method.toUpperCase() === "GET") {
      fetchData();
    }
  }, [fetchData, method]);

  return { data, loading, error, refetch: fetchData };
};
