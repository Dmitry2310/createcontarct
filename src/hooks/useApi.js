import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const request = async (...args) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(true);
    } else {
      setData(response.data);
      setSuccess(true);
    }
    return response;
  };

  return { data, error, loading, request, success };
};

export default useApi;
