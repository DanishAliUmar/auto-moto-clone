import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const useFetchGet = <T>(url: string, shouldFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false); // Ensure loading is false if skipping fetch
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, shouldFetch]);

  return { data, loading, error };
};

const useFetchPost = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (formdata: object) => {
    setLoading(true);
    setError(null); // Reset error state on new post
    try {
      const res = await axios.post<T>(url, formdata);
      setData(res.data); // Set response data
      console.log("Message sent successfully", res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

const useFetchPut = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (formdata: object) => {
    setLoading(true);
    setError(null); // Reset error state on new post
    try {
      const res = await axios.put<T>(url, formdata);
      setData(res.data); // Set response data
      console.log("Message sent successfully", res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export { useFetchGet, useFetchPost, useFetchPut };