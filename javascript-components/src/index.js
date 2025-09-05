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
export * from './components/index.js';

// Re-export hooks directly for convenience
export { useDebounce } from './hooks/useDebounce.js';
export { useApiData } from './hooks/useApiData.js';
export { useFileUpload } from './hooks/useFileUpload.js';

// Re-export utilities
export * from './utils/validation.js';
export * from './utils/api.js';

// Library information
export const LIBRARY_INFO = {
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