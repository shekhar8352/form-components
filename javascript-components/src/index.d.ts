/**
 * TypeScript Declaration File for Reusable Form Components Library
 * 
 * Provides TypeScript support for the JavaScript implementation of the component library.
 * This allows TypeScript projects to use the JavaScript components with full type safety.
 * 
 * @version 1.0.0
 */

import React from 'react';

// Base component props interface
export interface BaseFormComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  description?: string;
  withAsterisk?: boolean;
}

// Text input specific props
export interface FormTextInputProps extends BaseFormComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

// Textarea specific props
export interface FormTextAreaProps extends BaseFormComponentProps {
  rows?: number;
  maxRows?: number;
  minRows?: number;
  maxLength?: number;
  autosize?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

// Select option interface
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Yes/No select props
export interface FormYesNoSelectProps extends BaseFormComponentProps {
  yesLabel?: string;
  noLabel?: string;
  clearable?: boolean;
  searchable?: boolean;
}

// Static select props
export interface FormStaticSelectProps extends BaseFormComponentProps {
  options: SelectOption[];
  clearable?: boolean;
  searchable?: boolean;
  nothingFoundMessage?: string;
}

// Dynamic select props
export interface FormDynamicSelectProps extends BaseFormComponentProps {
  apiUrl: string;
  apiHeaders?: Record<string, string>;
  valueKey?: string;
  labelKey?: string;
  clearable?: boolean;
  searchable?: boolean;
  onApiError?: (error: Error) => void;
}

// Searchable select props
export interface FormSearchableSelectProps extends BaseFormComponentProps {
  searchApiUrl: string;
  searchParam?: string;
  debounceMs?: number;
  apiHeaders?: Record<string, string>;
  valueKey?: string;
  labelKey?: string;
  minSearchLength?: number;
  onApiError?: (error: Error) => void;
}

// File upload props
export interface FormFileUploadProps extends BaseFormComponentProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  uploadButtonText?: string;
  showFileList?: boolean;
}

// Radio group props
export interface FormRadioGroupProps extends BaseFormComponentProps {
  options: SelectOption[];
  orientation?: 'horizontal' | 'vertical';
  spacing?: string | number;
}

// Date picker props
export interface FormDatePickerProps extends BaseFormComponentProps {
  type?: 'default' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: string) => boolean;
  locale?: string;
  dateFormat?: string;
  clearable?: boolean;
}

// API response interface
export interface ApiResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
  total?: number;
}

// Validation rule interface
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

// Hook return types
export interface UseApiDataReturn<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseFileUploadReturn {
  files: File[];
  uploading: boolean;
  error: Error | null;
  addFiles: (files: File[] | FileList) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

// Component declarations
export declare const FormTextInput: React.FC<FormTextInputProps>;
export declare const FormTextArea: React.FC<FormTextAreaProps>;
export declare const FormYesNoSelect: React.FC<FormYesNoSelectProps>;
export declare const FormStaticSelect: React.FC<FormStaticSelectProps>;
export declare const FormDynamicSelect: React.FC<FormDynamicSelectProps>;
export declare const FormSearchableSelect: React.FC<FormSearchableSelectProps>;
export declare const FormFileUpload: React.FC<FormFileUploadProps>;
export declare const FormRadioGroup: React.FC<FormRadioGroupProps>;
export declare const FormDatePicker: React.FC<FormDatePickerProps>;

// Hook declarations
export declare function useDebounce<T>(value: T, delay: number): T;
export declare function useApiData<T>(url: string, headers?: Record<string, string>): UseApiDataReturn<T>;
export declare function useFileUpload(options?: {
  maxSize?: number;
  maxFiles?: number;
  accept?: string;
}): UseFileUploadReturn;

// Utility function declarations
export declare function validateRequired(value: any): string | undefined;
export declare function validateEmail(value: string): string | undefined;
export declare function validateMinLength(value: string, minLength: number): string | undefined;
export declare function validateMaxLength(value: string, maxLength: number): string | undefined;
export declare function validatePattern(value: string, pattern: RegExp): string | undefined;

// API utility declarations
export declare function apiRequest<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>>;

// Library metadata
export declare const LIBRARY_VERSION: string;
export declare const LIBRARY_NAME: string;

// Component groups
export declare const FormComponents: {
  FormTextInput: React.FC<FormTextInputProps>;
  FormTextArea: React.FC<FormTextAreaProps>;
  FormYesNoSelect: React.FC<FormYesNoSelectProps>;
  FormStaticSelect: React.FC<FormStaticSelectProps>;
  FormDynamicSelect: React.FC<FormDynamicSelectProps>;
  FormSearchableSelect: React.FC<FormSearchableSelectProps>;
  FormFileUpload: React.FC<FormFileUploadProps>;
  FormRadioGroup: React.FC<FormRadioGroupProps>;
  FormDatePicker: React.FC<FormDatePickerProps>;
};

export declare const FormHooks: {
  useDebounce: typeof useDebounce;
  useApiData: typeof useApiData;
  useFileUpload: typeof useFileUpload;
};

// Library information interface
export interface LibraryInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

export declare const LIBRARY_INFO: LibraryInfo;