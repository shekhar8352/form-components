// Shared configuration for the component library

export const DEFAULT_DEBOUNCE_MS = 300;
export const DEFAULT_API_TIMEOUT = 5000;
export const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DEFAULT_MAX_FILES = 10;

export const MANTINE_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export const DEFAULT_COMPONENT_PROPS = {
  size: 'sm',
  clearable: true,
  searchable: true,
  withAsterisk: false,
};

export const API_ENDPOINTS = {
  // Placeholder for API endpoints configuration
};

export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`,
  fileSize: (max) => `File size must be less than ${max}MB`,
  fileType: 'Invalid file type',
};