import React from 'react';
import { Radio } from '@mantine/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';

/**
 * FormRadioGroup - Radio button group component with Formik integration and Mantine Radio.Group
 * 
 * Features:
 * - Flexible option configuration with value/label pairs
 * - Horizontal and vertical layout orientations
 * - Customizable spacing between radio options
 * - Formik field integration with automatic error display
 * - Custom width override while maintaining Mantine size properties
 * - Full Mantine Radio.Group prop support
 */
const FormRadioGroup = ({
  name,
  label,
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
  orientation = 'vertical',
  spacing = 'xs',
  ...mantineProps
}) => {
  const [field, meta, helpers] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle = {
    ...style,
    ...(width && { width })
  };

  // Handle value change
  const handleChange = (value) => {
    helpers.setValue(value);
  };

  // Transform options to ensure they have string values for consistency
  const radioOptions = options.map(option => ({
    value: String(option.value),
    label: option.label,
    disabled: option.disabled || false
  }));

  return (
    <Radio.Group
      {...mantineProps}
      value={field.value || ''}
      onChange={handleChange}
      label={label}
      required={required}
      disabled={disabled}
      size={size}
      className={className}
      style={customStyle}
      description={description}
      withAsterisk={withAsterisk || required}
      error={hasError ? meta.error : undefined}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: spacing === 'xs' ? '0.5rem' : 
               spacing === 'sm' ? '0.75rem' : 
               spacing === 'md' ? '1rem' : 
               spacing === 'lg' ? '1.25rem' : 
               spacing === 'xl' ? '1.5rem' : 
               spacing
        }}
      >
        {radioOptions.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={disabled || option.disabled}
            size={size}
          />
        ))}
      </div>
    </Radio.Group>
  );
};

FormRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
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
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  spacing: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string,
    PropTypes.number
  ]),
};

export default FormRadioGroup;