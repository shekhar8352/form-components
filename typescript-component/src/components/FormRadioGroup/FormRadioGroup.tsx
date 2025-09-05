import React from 'react';
import { Radio } from '@mantine/core';
import { useField } from 'formik';

/**
 * Props interface for FormRadioGroup component
 */
export interface FormRadioGroupProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  description?: string;
  withAsterisk?: boolean;
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number;
}

/**
 * Interface for radio option data
 */
interface RadioOption {
  value: string;
  label: string;
  disabled: boolean;
}

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
const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
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
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  // Handle value change
  const handleChange = (value: string): void => {
    helpers.setValue(value);
  };

  // Transform options to ensure they have string values for consistency
  const radioOptions: RadioOption[] = options.map(option => ({
    value: String(option.value),
    label: option.label,
    disabled: option.disabled || false
  }));

  // Calculate spacing value
  const getSpacingValue = (spacing: string | number): string => {
    if (typeof spacing === 'number') {
      return `${spacing}px`;
    }
    
    switch (spacing) {
      case 'xs': return '0.5rem';
      case 'sm': return '0.75rem';
      case 'md': return '1rem';
      case 'lg': return '1.25rem';
      case 'xl': return '1.5rem';
      default: return spacing;
    }
  };

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
          gap: getSpacingValue(spacing)
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

export default FormRadioGroup;