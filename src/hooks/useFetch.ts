import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { CustomError, FetchResult } from './hooks.types';

const useFetch = <T = unknown>(url: string, deps: any[] = []): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>('http://127.0.0.1:5000/' + url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError({
          name: 'FetchError',
          message: axiosError.message,
          statusCode: axiosError.response?.status,
        } as CustomError);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;