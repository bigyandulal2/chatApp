import { useState, useEffect, useCallback } from "react";
import api from "../utils/api"; // Axios instance

export const useApi = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (bodyData = null) => {
      setLoading(true);
      setError(null);

      try {
       
        const response= await api.get(url);
        console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",response)
        if(!response){
           throw new Error("something wrong in the code");
        }
        console.log("data hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",response.data)
        setData(response.data);
      } catch (err) {
        console.error("API error:", err);
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  useEffect(() => {
    // Automatically fetch for GET requests only
    if (method.toUpperCase() === "GET") {
      fetchData();
    }
  }, [fetchData, method]);

  return {
    data,
    loading,
    error,
    refetch: fetchData, // for manual calls (e.g., POST, PUT)
  };
};
