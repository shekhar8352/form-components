/**
 * Reusable Form Components Library - Main Entry Point
 * 
 * A comprehensive library of reusable form components built with Mantine UI and Formik.
 * Provides consistent, customizable, and accessible form inputs for React applications.
 * 
 * @version 1.0.0
 * @author Reusable Form Components Team
 * @license MIT
 */

// Re-export everything from components
export * from './components';

// Re-export hooks directly for convenience
export { useDebounce } from './hooks/useDebounce';
export { useApiData } from './hooks/useApiData';
export { useFileUpload } from './hooks/useFileUpload';

// Re-export utilities
export * from './utils/validation';
export * from './utils/api';

// Re-export TypeScript types (excluding conflicting ValidationRule)
export type {
  BaseFormComponentProps,
  FormTextInputProps,
  FormTextAreaProps,
  SelectOption,
  FormYesNoSelectProps,
  FormStaticSelectProps,
  FormDynamicSelectProps,
  FormSearchableSelectProps,
  FormFileUploadProps,
  FormRadioGroupProps,
  FormDatePickerProps,
  ApiResponse,
  UseApiDataReturn,
  UseFileUploadReturn
} from './types';

// Library information with TypeScript support
export interface LibraryInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

export const LIBRARY_INFO: LibraryInfo = {
  name: 'reusable-form-components',
  version: '1.0.0',
  description: 'A comprehensive library of reusable form components built with Mantine UI and Formik',
  author: 'Reusable Form Components Team',
  license: 'MIT',
  dependencies: {
    react: '^19.1.1',
    '@mantine/core': '^8.2.8',
    '@mantine/dates': '^8.2.8',
    '@mantine/form': '^8.2.8',
    '@mantine/hooks': '^8.2.8',
    formik: '^2.4.6',
  },
  peerDependencies: {
    react: '>=18.0.0',
    'react-dom': '>=18.0.0',
  }
};