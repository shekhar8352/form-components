import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiData } from './useApiData';
import * as apiUtils from '../utils/api';

// Mock the API utilities
vi.mock('../utils/api', () => ({
  fetchData: vi.fn(),
}));

interface TestUser {
  id: number;
  name: string;
  email?: string;
}

describe('useApiData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty data and no loading state when no URL provided', () => {
    const { result } = renderHook(() => useApiData<TestUser>(''));
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should fetch data successfully and update state with proper typing', async () => {
    const mockData: TestUser[] = [
      { id: 1, name: 'Test User', email: 'test@example.com' },
      { id: 2, name: 'Test User 2' }
    ];
    (apiUtils.fetchData as any).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useApiData<TestUser>('/api/users'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).toHaveBeenCalledWith('/api/users', {
      headers: {},
      signal: expect.any(AbortSignal),
    });
  });

  it('should handle API response with data property', async () => {
    const mockResponse = {
      data: [{ id: 1, name: 'Test User' }],
      success: true,
      total: 1
    };
    (apiUtils.fetchData as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApiData<TestUser>('/api/users'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockResponse.data);
  });

  it('should handle API errors and set error state', async () => {
    const mockError = new Error('API Error');
    (apiUtils.fetchData as any).mockRejectedValue(mockError);

    const { result } = renderHook(() => 
      useApiData<TestUser>('/api/users', { retryAttempts: 0 })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });

  it('should retry on failure', async () => {
    const mockError = new Error('Network Error');
    const successData: TestUser[] = [{ id: 1, name: 'Success User' }];
    
    (apiUtils.fetchData as any)
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(successData);

    const { result } = renderHook(() => 
      useApiData<TestUser>('/api/users', { retryAttempts: 2, retryDelay: 10 })
    );

    // Wait for all retries to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 2000 });

    expect(result.current.data).toEqual(successData);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).toHaveBeenCalledTimes(3);
  });

  it('should call onSuccess callback when data is fetched successfully', async () => {
    const mockData: TestUser[] = [{ id: 1, name: 'Test User' }];
    const onSuccess = vi.fn<[TestUser[], any], void>();
    (apiUtils.fetchData as any).mockResolvedValueOnce(mockData);

    renderHook(() => useApiData<TestUser>('/api/users', { onSuccess }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData, mockData);
    });
  });

  it('should not fetch immediately when immediate is false', () => {
    renderHook(() => useApiData<TestUser>('/api/users', { immediate: false }));

    expect(apiUtils.fetchData).not.toHaveBeenCalled();
  });

  it('should refetch data when refetch is called', async () => {
    const mockData: TestUser[] = [{ id: 1, name: 'Test User' }];
    (apiUtils.fetchData as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useApiData<TestUser>('/api/users', { immediate: false })
    );

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

  it('should maintain type safety with generic parameter', () => {
    const { result } = renderHook(() => useApiData<TestUser>('/api/users'));
    
    // TypeScript should enforce that data is TestUser[]
    const data: TestUser[] = result.current.data;
    expect(Array.isArray(data)).toBe(true);
    
    // This should compile without TypeScript errors
    if (data.length > 0) {
      const firstUser = data[0];
      expect(typeof firstUser.id).toBe('number');
      expect(typeof firstUser.name).toBe('string');
    }
  });

  it('should handle empty URL gracefully', () => {
    const { result } = renderHook(() => useApiData<TestUser>(''));
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(apiUtils.fetchData).not.toHaveBeenCalled();
  });
});