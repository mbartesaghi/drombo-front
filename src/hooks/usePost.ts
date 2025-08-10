import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CustomError, FetchResult } from './hooks.types';
import { Route } from '../utils/common.types';

type PostResult<T> = FetchResult<T> & {
  postData: (body: unknown) => Promise<T | undefined>;
};

const usePost = <T,>(url: string): PostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<T>('http://127.0.0.1:5000' + url, body);
      setData(response.data);
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError;
      setError({
        name: 'PostError',
        message: axiosError.message,
        statusCode: axiosError.response?.status,
      } as CustomError);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
