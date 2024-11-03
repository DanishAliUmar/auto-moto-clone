// hooks/useFetch.ts

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFetchGet = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response?.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const useFetchPost = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export {useFetchGet, useFetchPost};
