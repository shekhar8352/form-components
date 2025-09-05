import React from 'react';
import { TextInput, type TextInputProps } from '@mantine/core';
import { useField } from 'formik';
import type { FormTextInputProps } from '../../types';

/**
 * FormTextInput - Text input component with Formik integration and Mantine TextInput
 * 
 * Features:
 * - Formik field integration with automatic error display
 * - Support for various input types (text, email, password, number, tel, url)
 * - Custom width override while maintaining Mantine size properties
 * - Left and right section support for icons and additional elements
 * - Full TypeScript support with proper type definitions
 */
const FormTextInput: React.FC<FormTextInputProps & Omit<TextInputProps, keyof FormTextInputProps>> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  size = 'sm',
  width,
  height,
  className = '',
  style = {},
  description,
  withAsterisk,
  type = 'text',
  maxLength,
  minLength,
  pattern,
  autoComplete,
  leftSection,
  rightSection,
  ...mantineProps
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  return (
    <TextInput
      {...field}
      {...mantineProps}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      size={size}
      className={className}
      style={customStyle}
      description={description}
      withAsterisk={withAsterisk || required}
      type={type}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      autoComplete={autoComplete}
      leftSection={leftSection}
      rightSection={rightSection}
      error={hasError ? meta.error : undefined}
    />
  );
};

export default FormTextInput;