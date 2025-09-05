import { useState, useEffect, useRef } from 'react';
import { fetchData } from '../utils/api.js';

/**
 * useApiData hook for fetching and managing API data with loading states, error handling, and retry mechanisms
 * 
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Configuration options
 * @param {Object} options.headers - Additional headers for the request
 * @param {number} options.retryAttempts - Number of retry attempts on failure (default: 3)
 * @param {number} options.retryDelay - Delay between retries in milliseconds (default: 1000)
 * @param {boolean} options.immediate - Whether to fetch data immediately on mount (default: true)
 * @param {Function} options.onError - Callback function called when an error occurs
 * @param {Function} options.onSuccess - Callback function called when data is successfully fetched
 * @returns {Object} Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data, loading, error, refetch } = useApiData('/api/users', {
 *   headers: { 'Authorization': 'Bearer token' },
 *   retryAttempts: 2,
 *   onError: (error) => console.error('Failed to fetch users:', error)
 * });
 */
export const useApiData = (url, options = {}) => {
  const {
    headers = {},
    retryAttempts = 3,
    retryDelay = 1000,
    immediate = true,
    onError,
    onSuccess,
    ...fetchOptions
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use refs to track current request and prevent state updates on unmounted components
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef(null);
  const optionsRef = useRef(options);

  // Update options ref when options change
  optionsRef.current = options;

  // Fetch function with retry logic
  const fetchWithRetry = async (attemptNumber = 0) => {
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

      const response = await fetchData(url, {
        ...currentFetchOptions,
        headers: currentHeaders,
        signal: abortControllerRef.current.signal,
      });

      if (isMountedRef.current) {
        // Handle different response formats
        let responseData = response;
        
        // If response has a data property (common API pattern), use that
        if (response && typeof response === 'object' && 'data' in response) {
          responseData = response.data;
        }
        
        // Ensure we always have an array
        const finalData = Array.isArray(responseData) ? responseData : [responseData];
        
        setData(finalData);
        setLoading(false);
        setError(null);

        // Call success callback if provided
        if (currentOnSuccess) {
          currentOnSuccess(finalData, response);
        }
      }
    } catch (err) {
      // Don't handle aborted requests as errors
      if (err.name === 'AbortError') {
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
          setError(err);

          // Call error callback if provided
          if (currentOnError) {
            currentOnError(err);
          }
        }
      }
    }
  };

  // Refetch function that can be called manually
  const refetch = () => {
    fetchWithRetry(0);
  };

  // Effect to fetch data on mount or when URL changes
  useEffect(() => {
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
  }, [url, immediate]);

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