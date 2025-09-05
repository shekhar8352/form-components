import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiData } from './useApiData';
import * as apiUtils from '../utils/api.js';

// Mock the API utilities
vi.mock('../utils/api', () => ({
  fetchData: vi.fn(),
}));

describe('useApiData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty data and no loading state when no URL provided', () => {
    const { result } = renderHook(() => useApiData(''));
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch data successfully and update state', async () => {
    const mockData = [{ id: 1, name: 'Test' }, { id: 2, name: 'Test 2' }];
    apiUtils.fetchData.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useApiData('/api/test'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).toHaveBeenCalledWith('/api/test', {
      headers: {},
      signal: expect.any(AbortSignal),
    });
  });

  it('should handle API response with data property', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'Test' }],
      success: true,
      total: 1
    };
    apiUtils.fetchData.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApiData('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockResponse.data);
  });

  it('should handle single object response by wrapping in array', async () => {
    const mockResponse = { id: 1, name: 'Test' };
    apiUtils.fetchData.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApiData('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([mockResponse]);
  });

  it('should handle API errors and set error state', async () => {
    const mockError = new Error('API Error');
    apiUtils.fetchData.mockRejectedValue(mockError);

    const { result } = renderHook(() => useApiData('/api/test', { retryAttempts: 0 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });

  it('should retry on failure', async () => {
    const mockError = new Error('Network Error');
    apiUtils.fetchData
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce([{ id: 1, name: 'Success' }]);

    const { result } = renderHook(() => 
      useApiData('/api/test', { retryAttempts: 2, retryDelay: 10 })
    );

    // Wait for all retries to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 2000 });

    expect(result.current.data).toEqual([{ id: 1, name: 'Success' }]);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).toHaveBeenCalledTimes(3);
  });

  it('should call onSuccess callback when data is fetched successfully', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    const onSuccess = vi.fn();
    apiUtils.fetchData.mockResolvedValueOnce(mockData);

    renderHook(() => useApiData('/api/test', { onSuccess }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData, mockData);
    });
  });

  it('should call onError callback when API fails', async () => {
    const mockError = new Error('API Error');
    const onError = vi.fn();
    apiUtils.fetchData.mockRejectedValue(mockError);

    renderHook(() => useApiData('/api/test', { onError, retryAttempts: 0 }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(mockError);
    });
  });

  it('should not fetch immediately when immediate is false', () => {
    renderHook(() => useApiData('/api/test', { immediate: false }));

    expect(apiUtils.fetchData).not.toHaveBeenCalled();
  });

  it('should refetch data when refetch is called', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    apiUtils.fetchData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useApiData('/api/test', { immediate: false }));

    expect(apiUtils.fetchData).not.toHaveBeenCalled();

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiUtils.fetchData).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockData);
  });

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useApiData('/api/test'));
    
    // Should not throw any errors on unmount
    expect(() => unmount()).not.toThrow();
  });

  it('should handle empty URL gracefully', () => {
    const { result } = renderHook(() => useApiData(''));
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).not.toHaveBeenCalled();
  });
});