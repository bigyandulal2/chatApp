import { useState } from "react";
import axios from "axios";

export const usePost = (url, config = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(config);
  const postData = async (body) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(url, body, config);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { postData, response, error, loading };
};
