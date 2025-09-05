import { useState, useCallback } from 'react';
import type { UseFileUploadReturn } from '../types';

/**
 * Configuration options for useFileUpload hook
 */
interface UseFileUploadOptions {
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Maximum number of files allowed (default: 10) */
  maxFiles?: number;
  /** Accepted file types (MIME types or extensions) */
  accept?: string;
  /** Callback function called when validation fails */
  onError?: (error: Error) => void;
  /** Callback function called when files change */
  onFilesChange?: (files: File[]) => void;
}

/**
 * File information interface for display purposes
 */
interface FileInfo {
  name: string;
  size: number;
  type: string;
  formattedSize: string;
  lastModified: number;
}

/**
 * Extended return type for useFileUpload hook
 */
interface ExtendedUseFileUploadReturn extends UseFileUploadReturn {
  /** Get formatted file information for display */
  getFileInfo: (file: File) => FileInfo;
  /** Whether more files can be added */
  canAddMoreFiles: boolean;
  /** Number of remaining file slots */
  remainingSlots: number;
  /** Maximum file size setting */
  maxSize: number;
  /** Maximum files setting */
  maxFiles: number;
  /** Accepted file types setting */
  accept: string;
}

/**
 * useFileUpload hook for managing file uploads, validation, and removal
 * 
 * @param options - Configuration options
 * @returns Object containing files, uploading state, error, and file management functions
 * 
 * @example
 * ```typescript
 * const { files, uploading, error, addFiles, removeFile, clearFiles } = useFileUpload({
 *   maxSize: 5 * 1024 * 1024, // 5MB
 *   maxFiles: 5,
 *   accept: 'image/*,.pdf',
 *   onError: (error) => console.error('File validation error:', error),
 *   onFilesChange: (files) => console.log('Files changed:', files)
 * });
 * ```
 */
export const useFileUpload = (options: UseFileUploadOptions = {}): ExtendedUseFileUploadReturn => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 10,
    accept = '',
    onError,
    onFilesChange,
  } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Helper function to validate file type
  const isValidFileType = useCallback((file: File): boolean => {
    if (!accept) return true;

    const acceptedTypes = accept.split(',').map(type => type.trim());
    
    return acceptedTypes.some(acceptedType => {
      // Handle MIME types (e.g., 'image/*', 'application/pdf')
      if (acceptedType.includes('/')) {
        if (acceptedType.endsWith('/*')) {
          const baseType = acceptedType.split('/')[0];
          return file.type.startsWith(baseType + '/');
        }
        return file.type === acceptedType;
      }
      
      // Handle file extensions (e.g., '.pdf', '.jpg')
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
      }
      
      return false;
    });
  }, [accept]);

  // Helper function to format file size for error messages
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Validate a single file
  const validateFile = useCallback((file: File): string[] => {
    const errors: string[] = [];

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File "${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`);
    }

    // Check file type
    if (!isValidFileType(file)) {
      errors.push(`File "${file.name}" has an invalid type. Accepted types: ${accept || 'any'}.`);
    }

    return errors;
  }, [maxSize, accept, isValidFileType, formatFileSize]);

  // Add files with validation
  const addFiles = useCallback((newFiles: File[] | FileList): void => {
    if (!newFiles || newFiles.length === 0) return;

    // Convert FileList to Array if needed
    const fileArray = Array.from(newFiles);
    
    setError(null);
    
    // Check total file count
    const totalFiles = files.length + fileArray.length;
    if (totalFiles > maxFiles) {
      const errorMsg = `Cannot add ${fileArray.length} file(s). Maximum ${maxFiles} files allowed. Currently have ${files.length} file(s).`;
      setError(new Error(errorMsg));
      if (onError) {
        onError(new Error(errorMsg));
      }
      return;
    }

    // Validate each file
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        validationErrors.push(...fileErrors);
      } else {
        // Check for duplicate files (by name and size)
        const isDuplicate = files.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (isDuplicate) {
          validationErrors.push(`File "${file.name}" is already added.`);
        } else {
          validFiles.push(file);
        }
      }
    });

    // Handle validation errors
    if (validationErrors.length > 0) {
      const errorMsg = validationErrors.join(' ');
      setError(new Error(errorMsg));
      if (onError) {
        onError(new Error(errorMsg));
      }
      
      // If no valid files, return early
      if (validFiles.length === 0) {
        return;
      }
    }

    // Add valid files
    if (validFiles.length > 0) {
      setFiles(prevFiles => {
        const newFileList = [...prevFiles, ...validFiles];
        
        // Call onChange callback
        if (onFilesChange) {
          onFilesChange(newFileList);
        }
        
        return newFileList;
      });
    }
  }, [files, maxFiles, validateFile, onError, onFilesChange]);

  // Remove file by index
  const removeFile = useCallback((index: number): void => {
    if (index < 0 || index >= files.length) return;

    setFiles(prevFiles => {
      const newFileList = prevFiles.filter((_, i) => i !== index);
      
      // Clear error if removing files resolves the issue
      if (error && newFileList.length < maxFiles) {
        setError(null);
      }
      
      // Call onChange callback
      if (onFilesChange) {
        onFilesChange(newFileList);
      }
      
      return newFileList;
    });
  }, [files.length, error, maxFiles, onFilesChange]);

  // Clear all files
  const clearFiles = useCallback((): void => {
    setFiles([]);
    setError(null);
    
    // Call onChange callback
    if (onFilesChange) {
      onFilesChange([]);
    }
  }, [onFilesChange]);

  // Get file info for display
  const getFileInfo = useCallback((file: File): FileInfo => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      formattedSize: formatFileSize(file.size),
      lastModified: file.lastModified,
    };
  }, [formatFileSize]);

  // Check if more files can be added
  const canAddMoreFiles = files.length < maxFiles;

  // Get remaining file slots
  const remainingSlots = maxFiles - files.length;

  return {
    files,
    uploading,
    error,
    addFiles,
    removeFile,
    clearFiles,
    getFileInfo,
    canAddMoreFiles,
    remainingSlots,
    maxSize,
    maxFiles,
    accept,
  };
};