import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { CustomError, FetchResult } from './hooks.types';

const useFetch = <T = unknown>(url: string, deps: any[] = []): FetchResult<T> & { refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<T>('http://127.0.0.1:5000/' + url);
      setData(response.data);
      setError(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError({
        name: 'FetchError',
        message: axiosError.message,
        statusCode: axiosError.response?.status,
      } as CustomError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, ...deps]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;