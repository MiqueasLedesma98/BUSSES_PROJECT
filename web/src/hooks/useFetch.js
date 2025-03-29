import { useState, useEffect, useMemo } from "react";
import api from "../api";

export const useFetch = ({ url, params = {}, shouldFetch = true }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memorizar la URL con los parámetros de consulta
  const queryUrl = useMemo(() => {
    const queryString = new URLSearchParams(params).toString();
    return `${url}?${queryString}`;
  }, [url, params]);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(queryUrl);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryUrl, shouldFetch]);

  return { data, error, loading };
};

