import { renderHook, act } from '@testing-library/react';
import { useFileUpload } from './useFileUpload';

// Helper function to create mock files
const createMockFile = (name, size, type = 'text/plain') => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('useFileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useFileUpload());
    
    expect(result.current.files).toEqual([]);
    expect(result.current.uploading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.canAddMoreFiles).toBe(true);
    expect(result.current.remainingSlots).toBe(10); // default maxFiles
    expect(typeof result.current.addFiles).toBe('function');
    expect(typeof result.current.removeFile).toBe('function');
    expect(typeof result.current.clearFiles).toBe('function');
  });

  it('should add valid files successfully', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 2000);
    
    act(() => {
      result.current.addFiles([file1, file2]);
    });
    
    expect(result.current.files).toHaveLength(2);
    expect(result.current.files[0]).toBe(file1);
    expect(result.current.files[1]).toBe(file2);
    expect(result.current.error).toBe(null);
    expect(result.current.remainingSlots).toBe(8);
  });

  it('should reject files that exceed maxSize', () => {
    const maxSize = 1000;
    const { result } = renderHook(() => useFileUpload({ maxSize }));
    
    const validFile = createMockFile('small.txt', 500);
    const invalidFile = createMockFile('large.txt', 2000);
    
    act(() => {
      result.current.addFiles([validFile, invalidFile]);
    });
    
    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0]).toBe(validFile);
    expect(result.current.error).not.toBe(null);
    expect(result.current.error.message).toContain('too large');
  });

  it('should reject files with invalid types', () => {
    const { result } = renderHook(() => useFileUpload({ accept: 'image/*' }));
    
    const validFile = createMockFile('image.jpg', 1000, 'image/jpeg');
    const invalidFile = createMockFile('document.txt', 1000, 'text/plain');
    
    act(() => {
      result.current.addFiles([validFile, invalidFile]);
    });
    
    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0]).toBe(validFile);
    expect(result.current.error).not.toBe(null);
    expect(result.current.error.message).toContain('invalid type');
  });

  it('should handle file extension validation', () => {
    const { result } = renderHook(() => useFileUpload({ accept: '.pdf,.jpg' }));
    
    const validFile1 = createMockFile('document.pdf', 1000, 'application/pdf');
    const validFile2 = createMockFile('image.jpg', 1000, 'image/jpeg');
    const invalidFile = createMockFile('document.txt', 1000, 'text/plain');
    
    act(() => {
      result.current.addFiles([validFile1, validFile2, invalidFile]);
    });
    
    expect(result.current.files).toHaveLength(2);
    expect(result.current.error).not.toBe(null);
    expect(result.current.error.message).toContain('invalid type');
  });

  it('should reject duplicate files', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file1 = createMockFile('test.txt', 1000);
    const file2 = createMockFile('test.txt', 1000); // Same name and size
    
    act(() => {
      result.current.addFiles([file1]);
    });
    
    expect(result.current.files).toHaveLength(1);
    expect(result.current.error).toBe(null);
    
    act(() => {
      result.current.addFiles([file2]);
    });
    
    expect(result.current.files).toHaveLength(1); // Should not add duplicate
    expect(result.current.error).not.toBe(null);
    expect(result.current.error.message).toContain('already added');
  });

  it('should enforce maxFiles limit', () => {
    const { result } = renderHook(() => useFileUpload({ maxFiles: 2 }));
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    const file3 = createMockFile('test3.txt', 1000);
    
    act(() => {
      result.current.addFiles([file1, file2, file3]);
    });
    
    expect(result.current.files).toHaveLength(0); // Should reject all due to exceeding limit
    expect(result.current.error).not.toBe(null);
    expect(result.current.error.message).toContain('Maximum 2 files allowed');
  });

  it('should remove file by index', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    const file3 = createMockFile('test3.txt', 1000);
    
    act(() => {
      result.current.addFiles([file1, file2, file3]);
    });
    
    expect(result.current.files).toHaveLength(3);
    
    act(() => {
      result.current.removeFile(1); // Remove middle file
    });
    
    expect(result.current.files).toHaveLength(2);
    expect(result.current.files[0]).toBe(file1);
    expect(result.current.files[1]).toBe(file3);
  });

  it('should handle invalid remove index gracefully', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file1 = createMockFile('test1.txt', 1000);
    
    act(() => {
      result.current.addFiles([file1]);
    });
    
    expect(result.current.files).toHaveLength(1);
    
    act(() => {
      result.current.removeFile(-1); // Invalid index
    });
    
    expect(result.current.files).toHaveLength(1); // Should not change
    
    act(() => {
      result.current.removeFile(5); // Out of bounds
    });
    
    expect(result.current.files).toHaveLength(1); // Should not change
  });

  it('should clear all files', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    
    act(() => {
      result.current.addFiles([file1, file2]);
    });
    
    expect(result.current.files).toHaveLength(2);
    
    act(() => {
      result.current.clearFiles();
    });
    
    expect(result.current.files).toHaveLength(0);
    expect(result.current.error).toBe(null);
  });

  it('should call onError callback when validation fails', () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useFileUpload({ maxSize: 1000, onError }));
    
    const invalidFile = createMockFile('large.txt', 2000);
    
    act(() => {
      result.current.addFiles([invalidFile]);
    });
    
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    expect(onError.mock.calls[0][0].message).toContain('too large');
  });

  it('should call onFilesChange callback when files change', () => {
    const onFilesChange = vi.fn();
    const { result } = renderHook(() => useFileUpload({ onFilesChange }));
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    
    act(() => {
      result.current.addFiles([file1]);
    });
    
    expect(onFilesChange).toHaveBeenCalledWith([file1]);
    
    act(() => {
      result.current.addFiles([file2]);
    });
    
    expect(onFilesChange).toHaveBeenCalledWith([file1, file2]);
    
    act(() => {
      result.current.removeFile(0);
    });
    
    expect(onFilesChange).toHaveBeenCalledWith([file2]);
    
    act(() => {
      result.current.clearFiles();
    });
    
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it('should provide file info with formatted size', () => {
    const { result } = renderHook(() => useFileUpload());
    
    const file = createMockFile('test.txt', 1536, 'text/plain'); // 1.5 KB
    
    const fileInfo = result.current.getFileInfo(file);
    
    expect(fileInfo.name).toBe('test.txt');
    expect(fileInfo.size).toBe(1536);
    expect(fileInfo.type).toBe('text/plain');
    expect(fileInfo.formattedSize).toBe('1.5 KB');
  });

  it('should handle MIME type wildcards correctly', () => {
    const { result } = renderHook(() => useFileUpload({ accept: 'image/*' }));
    
    const jpegFile = createMockFile('image.jpg', 1000, 'image/jpeg');
    const pngFile = createMockFile('image.png', 1000, 'image/png');
    const textFile = createMockFile('document.txt', 1000, 'text/plain');
    
    act(() => {
      result.current.addFiles([jpegFile, pngFile, textFile]);
    });
    
    expect(result.current.files).toHaveLength(2); // Only image files should be added
    expect(result.current.files[0]).toBe(jpegFile);
    expect(result.current.files[1]).toBe(pngFile);
    expect(result.current.error).not.toBe(null);
  });

  it('should clear error when removing files resolves the issue', () => {
    const { result } = renderHook(() => useFileUpload({ maxFiles: 2 }));
    
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    
    // Add files to reach limit
    act(() => {
      result.current.addFiles([file1, file2]);
    });
    
    expect(result.current.files).toHaveLength(2);
    expect(result.current.canAddMoreFiles).toBe(false);
    
    // Try to add another file (should fail)
    const file3 = createMockFile('test3.txt', 1000);
    act(() => {
      result.current.addFiles([file3]);
    });
    
    expect(result.current.error).not.toBe(null);
    
    // Remove a file (should clear error)
    act(() => {
      result.current.removeFile(0);
    });
    
    expect(result.current.files).toHaveLength(1);
    expect(result.current.canAddMoreFiles).toBe(true);
    expect(result.current.error).toBe(null); // Error should be cleared
  });

  it('should handle FileList input', () => {
    const { result } = renderHook(() => useFileUpload());
    
    // Create a mock FileList
    const file1 = createMockFile('test1.txt', 1000);
    const file2 = createMockFile('test2.txt', 1000);
    const mockFileList = {
      0: file1,
      1: file2,
      length: 2,
      [Symbol.iterator]: function* () {
        yield file1;
        yield file2;
      }
    };
    
    act(() => {
      result.current.addFiles(mockFileList);
    });
    
    expect(result.current.files).toHaveLength(2);
    expect(result.current.files[0]).toBe(file1);
    expect(result.current.files[1]).toBe(file2);
  });
});