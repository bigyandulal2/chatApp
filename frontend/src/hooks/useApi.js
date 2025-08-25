import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useApi = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("data from hoook", data);
  const fetchData = useCallback(
    async (bodyData = null) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,

          data: bodyData,
        });

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
