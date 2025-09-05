/**
 * Reusable Form Components Library
 * 
 * A comprehensive library of reusable form components built with Mantine UI and Formik.
 * Provides consistent, customizable, and accessible form inputs for React applications.
 * 
 * @version 1.0.0
 * @author Reusable Form Components Team
 * @license MIT
 */

// Form Components - Main exports for tree-shaking support
export { default as FormTextInput } from './FormTextInput/index.js';
export { default as FormTextArea } from './FormTextArea/index.js';
export { default as FormYesNoSelect } from './FormYesNoSelect/index.js';
export { default as FormStaticSelect } from './FormStaticSelect/index.js';
export { default as FormDynamicSelect } from './FormDynamicSelect/index.js';
export { default as FormSearchableSelect } from './FormSearchableSelect/index.js';
export { default as FormFileUpload } from './FormFileUpload/index.js';
export { default as FormRadioGroup } from './FormRadioGroup/index.js';
export { default as FormDatePicker } from './FormDatePicker/index.js';

// Custom Hooks - Utility hooks for enhanced functionality
export { useDebounce } from '../hooks/useDebounce.js';
export { useApiData } from '../hooks/useApiData.js';
export { useFileUpload } from '../hooks/useFileUpload.js';

// Utilities - Helper functions and validation utilities
export * from '../utils/validation.js';
export * from '../utils/api.js';

// Library metadata
export const LIBRARY_VERSION = '1.0.0';
export const LIBRARY_NAME = 'reusable-form-components';

// Import components for grouped exports
import FormTextInput from './FormTextInput/index.js';
import FormTextArea from './FormTextArea/index.js';
import FormYesNoSelect from './FormYesNoSelect/index.js';
import FormStaticSelect from './FormStaticSelect/index.js';
import FormDynamicSelect from './FormDynamicSelect/index.js';
import FormSearchableSelect from './FormSearchableSelect/index.js';
import FormFileUpload from './FormFileUpload/index.js';
import FormRadioGroup from './FormRadioGroup/index.js';
import FormDatePicker from './FormDatePicker/index.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { useApiData } from '../hooks/useApiData.js';
import { useFileUpload } from '../hooks/useFileUpload.js';

// Component groups for easier imports
export const FormComponents = {
  FormTextInput,
  FormTextArea,
  FormYesNoSelect,
  FormStaticSelect,
  FormDynamicSelect,
  FormSearchableSelect,
  FormFileUpload,
  FormRadioGroup,
  FormDatePicker,
};

export const FormHooks = {
  useDebounce,
  useApiData,
  useFileUpload,
};