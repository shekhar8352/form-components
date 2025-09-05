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