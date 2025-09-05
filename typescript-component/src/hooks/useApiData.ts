import { useState, useEffect, useRef } from 'react';
import { fetchData } from '../utils/api';
import type { UseApiDataReturn } from '../types';

/**
 * Configuration options for useApiData hook
 */
interface UseApiDataOptions extends RequestInit {
  /** Additional headers for the request */
  headers?: Record<string, string>;
  /** Number of retry attempts on failure (default: 3) */
  retryAttempts?: number;
  /** Delay between retries in milliseconds (default: 1000) */
  retryDelay?: number;
  /** Whether to fetch data immediately on mount (default: true) */
  immediate?: boolean;
  /** Callback function called when an error occurs */
  onError?: (error: Error) => void;
  /** Callback function called when data is successfully fetched */
  onSuccess?: (data: T[], response: any) => void;
}

/**
 * useApiData hook for fetching and managing API data with loading states, error handling, and retry mechanisms
 * 
 * @template T - The type of data items returned by the API
 * @param url - The API endpoint URL
 * @param options - Configuration options
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * const { data, loading, error, refetch } = useApiData<User>('/api/users', {
 *   headers: { 'Authorization': 'Bearer token' },
 *   retryAttempts: 2,
 *   onError: (error) => console.error('Failed to fetch users:', error)
 * });
 * ```
 */
export const useApiData = <T = any>(
  url: string,
  options: UseApiDataOptions = {}
): UseApiDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Use refs to track current request and prevent state updates on unmounted components
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const optionsRef = useRef<UseApiDataOptions>(options);

  // Update options ref when options change
  optionsRef.current = options;

  // Fetch function with retry logic
  const fetchWithRetry = async (attemptNumber: number = 0): Promise<void> => {
    if (!url || !isMountedRef.current) return;

    const currentOptions = optionsRef.current;
    const {
      headers: currentHeaders = {},
      retryAttempts: currentRetryAttempts = 3,
      retryDelay: currentRetryDelay = 1000,
      onError: currentOnError,
      onSuccess: currentOnSuccess,
      ...currentFetchOptions
    } = currentOptions;

    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }

      const response = await fetchData<any>(url, {
        ...currentFetchOptions,
        headers: currentHeaders,
        signal: abortControllerRef.current.signal,
      });

      if (isMountedRef.current) {
        // Handle different response formats
        let responseData: any = response;
        
        // If response has a data property (common API pattern), use that
        if (response && typeof response === 'object' && 'data' in response) {
          responseData = response.data;
        }
        
        // Ensure we always have an array
        const finalData: T[] = Array.isArray(responseData) ? responseData : [responseData];
        
        setData(finalData);
        setLoading(false);
        setError(null);

        // Call success callback if provided
        if (currentOnSuccess) {
          currentOnSuccess(finalData, response);
        }
      }
    } catch (err) {
      const error = err as Error;
      
      // Don't handle aborted requests as errors
      if (error.name === 'AbortError') {
        return;
      }

      if (isMountedRef.current) {
        // Retry logic with exponential backoff
        if (attemptNumber < currentRetryAttempts) {
          const delay = currentRetryDelay * Math.pow(2, attemptNumber); // Exponential backoff
          
          retryTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              fetchWithRetry(attemptNumber + 1);
            }
          }, delay);
        } else {
          // All retries exhausted, set error state
          setLoading(false);
          setError(error);

          // Call error callback if provided
          if (currentOnError) {
            currentOnError(error);
          }
        }
      }
    }
  };

  // Refetch function that can be called manually
  const refetch = (): void => {
    fetchWithRetry(0);
  };

  // Effect to fetch data on mount or when URL changes
  useEffect(() => {
    const { immediate = true } = optionsRef.current;
    
    if (immediate && url) {
      fetchWithRetry(0);
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [url]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
};