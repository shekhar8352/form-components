import React from 'react';
import { Select } from '@mantine/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';

/**
 * FormYesNoSelect - Yes/No dropdown component with Formik integration and Mantine Select
 * 
 * Features:
 * - Predefined Yes/No options with customizable labels
 * - Formik field integration with automatic error display
 * - Optional clear functionality
 * - Custom width override while maintaining Mantine size properties
 * - Full Mantine Select prop support
 */
const FormYesNoSelect = ({
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
  const customStyle = {
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

FormYesNoSelect.propTypes = {
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
  yesLabel: PropTypes.string,
  noLabel: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
};

export default FormYesNoSelect;