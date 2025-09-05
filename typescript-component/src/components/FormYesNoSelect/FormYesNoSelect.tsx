import React from 'react';
import { Select, type SelectProps } from '@mantine/core';
import { useField } from 'formik';
import type { FormYesNoSelectProps } from '../../types';

/**
 * FormYesNoSelect - Yes/No dropdown component with Formik integration and Mantine Select
 * 
 * Features:
 * - Predefined Yes/No options with customizable labels
 * - Formik field integration with automatic error display
 * - Optional clear functionality
 * - Custom width override while maintaining Mantine size properties
 * - Full TypeScript support with proper type definitions
 */
const FormYesNoSelect: React.FC<FormYesNoSelectProps & Omit<SelectProps, keyof FormYesNoSelectProps>> = ({
  name,
  label,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  size = 'sm',
  width,
  height,
  className = '',
  style = {},
  description,
  withAsterisk,
  yesLabel = 'Yes',
  noLabel = 'No',
  clearable = true,
  searchable = false,
  ...mantineProps
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  // Define Yes/No options
  const options = [
    { value: 'yes', label: yesLabel },
    { value: 'no', label: noLabel }
  ];

  return (
    <Select
      {...field}
      {...mantineProps}
      data={options}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      size={size}
      className={className}
      style={customStyle}
      description={description}
      withAsterisk={withAsterisk || required}
      clearable={clearable}
      searchable={searchable}
      error={hasError ? meta.error : undefined}
    />
  );
};

export default FormYesNoSelect;