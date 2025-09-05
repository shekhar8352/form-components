import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes with default delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'updated', delay: 300 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by 299ms (just before delay)
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by 1ms more (completing the delay)
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should debounce value changes with custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });

  it('should reset timer when value changes before delay completes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    // First change
    rerender({ value: 'first', delay: 300 });
    expect(result.current).toBe('initial');

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial');

    // Second change before first delay completes
    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('initial');

    // Advance time by original remaining time (150ms)
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Advance time by full delay from second change
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('second'); // Should now be second
  });

  it('should handle rapid value changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    );

    // Rapid changes
    rerender({ value: 'change1', delay: 100 });
    rerender({ value: 'change2', delay: 100 });
    rerender({ value: 'change3', delay: 100 });
    rerender({ value: 'final', delay: 100 });

    expect(result.current).toBe('initial');

    // Only the final change should take effect after delay
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('final');
  });

  it('should handle different data types with proper typing', () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }: { value: number; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 100 } }
    );

    numberRerender({ value: 42, delay: 100 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(numberResult.current).toBe(42);

    // Test with object
    interface TestObject {
      id: number;
      name?: string;
    }

    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }: { value: TestObject; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: { id: 1 }, delay: 100 } }
    );

    const newObj: TestObject = { id: 2, name: 'test' };
    objectRerender({ value: newObj, delay: 100 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(objectResult.current).toBe(newObj);

    // Test with array
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value, delay }: { value: number[]; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: [1, 2], delay: 100 } }
    );

    const newArray = [3, 4, 5];
    arrayRerender({ value: newArray, delay: 100 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(arrayResult.current).toBe(newArray);
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    rerender({ value: 'updated', delay: 300 });
    
    // Change delay while debouncing
    rerender({ value: 'updated', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should cleanup timeouts on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderHook(() => useDebounce('test', 300));
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('should maintain type safety', () => {
    // This test ensures TypeScript compilation works correctly
    const stringHook = renderHook(() => useDebounce<string>('test', 300));
    const numberHook = renderHook(() => useDebounce<number>(42, 300));
    const booleanHook = renderHook(() => useDebounce<boolean>(true, 300));

    // These should compile without TypeScript errors
    expect(typeof stringHook.result.current).toBe('string');
    expect(typeof numberHook.result.current).toBe('number');
    expect(typeof booleanHook.result.current).toBe('boolean');
  });
});