import React from 'react';
import { Select, type SelectProps } from '@mantine/core';
import { useField } from 'formik';
import type { FormStaticSelectProps } from '../../types';

/**
 * FormStaticSelect - Single-select dropdown with static options using Mantine Select
 * 
 * Features:
 * - Static option list with value/label pairs
 * - Searchable functionality with client-side filtering
 * - Clear selection capability with icon
 * - Support for custom option formatting and disabled states
 * - Formik field integration with automatic error display
 * - Custom width override while maintaining Mantine size properties
 * - Full TypeScript support with proper type definitions
 */
const FormStaticSelect: React.FC<FormStaticSelectProps & Omit<SelectProps, keyof FormStaticSelectProps>> = ({
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
  options = [],
  clearable = true,
  searchable = true,
  nothingFoundMessage = 'No options found',
  ...mantineProps
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  // Transform options to Mantine Select format if needed
  const selectData = options.map(option => ({
    value: String(option.value),
    label: option.label,
    disabled: option.disabled || false
  }));

  return (
    <Select
      {...field}
      {...mantineProps}
      data={selectData}
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
      nothingFoundMessage={nothingFoundMessage}
      error={hasError ? meta.error : undefined}
    />
  );
};

export default FormStaticSelect;