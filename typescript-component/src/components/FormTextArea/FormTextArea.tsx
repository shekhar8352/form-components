import React from 'react';
import { Textarea, type TextareaProps } from '@mantine/core';
import { useField } from 'formik';
import type { FormTextAreaProps } from '../../types';

/**
 * FormTextArea - Textarea component with Formik integration and Mantine Textarea
 * 
 * Features:
 * - Formik field integration with automatic error display
 * - Support for auto-resizing and custom dimensions
 * - Character count and validation feedback
 * - Custom width and height override capabilities
 * - Full TypeScript support with proper type definitions
 */
const FormTextArea: React.FC<FormTextAreaProps & Omit<TextareaProps, keyof FormTextAreaProps>> = ({
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
  rows = 4,
  maxRows,
  minRows,
  maxLength,
  autosize = false,
  resize = 'vertical',
  ...mantineProps
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width and height overrides
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
    ...(resize && { resize })
  };

  return (
    <Textarea
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
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      maxLength={maxLength}
      autosize={autosize}
      resize={resize}
      error={hasError ? meta.error : undefined}
    />
  );
};

export default FormTextArea;