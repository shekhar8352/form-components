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
export { default as FormTextInput } from './FormTextInput';
export { default as FormTextArea } from './FormTextArea';
export { default as FormYesNoSelect } from './FormYesNoSelect';
export { default as FormStaticSelect } from './FormStaticSelect';
export { default as FormDynamicSelect } from './FormDynamicSelect';
export { default as FormSearchableSelect } from './FormSearchableSelect';
export { default as FormFileUpload } from './FormFileUpload';
export { default as FormRadioGroup } from './FormRadioGroup';
export { default as FormDatePicker } from './FormDatePicker';

// Custom Hooks - Utility hooks for enhanced functionality
export { useDebounce } from '../hooks/useDebounce';
export { useApiData } from '../hooks/useApiData';
export { useFileUpload } from '../hooks/useFileUpload';

// Utilities - Helper functions and validation utilities
export * from '../utils/validation';
export * from '../utils/api';

// TypeScript Types - All type definitions (excluding conflicting ValidationRule)
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
} from '../types';

// Import components for grouped exports
import FormTextInput from './FormTextInput';
import FormTextArea from './FormTextArea';
import FormYesNoSelect from './FormYesNoSelect';
import FormStaticSelect from './FormStaticSelect';
import FormDynamicSelect from './FormDynamicSelect';
import FormSearchableSelect from './FormSearchableSelect';
import FormFileUpload from './FormFileUpload';
import FormRadioGroup from './FormRadioGroup';
import FormDatePicker from './FormDatePicker';
import { useDebounce } from '../hooks/useDebounce';
import { useApiData } from '../hooks/useApiData';
import { useFileUpload } from '../hooks/useFileUpload';

// Library metadata
export const LIBRARY_VERSION = '1.0.0';
export const LIBRARY_NAME = 'reusable-form-components';

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