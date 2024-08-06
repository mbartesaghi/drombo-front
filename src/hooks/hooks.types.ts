export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface CustomError extends Error {
  name: string,
  message: string,
  statusCode: number,
}