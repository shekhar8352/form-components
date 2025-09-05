import React from 'react';
import { Select } from '@mantine/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';

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
 */
const FormStaticSelect = ({
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
  const customStyle = {
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

FormStaticSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  description: PropTypes.string,
  withAsterisk: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  nothingFoundMessage: PropTypes.string,
};

export default FormStaticSelect;