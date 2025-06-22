import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useApi = (url, method = "GET", options = {}) => {
  console.log("option", options);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (bodyData = null) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          ...options,
          data: bodyData,
        });

        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
    [url, method, options]
  );

  useEffect(() => {
    if (method.toUpperCase() === "GET") {
      fetchData();
    }
  }, [fetchData, method]);

  return { data, loading, error, refetch: fetchData };
};
