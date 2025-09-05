import React from 'react';
import { useField } from 'formik';
import { Text, Box } from '@mantine/core';

export interface BaseFormComponentProps {
  name: string;                    // Formik field name
  label?: string;                  // Field label
  placeholder?: string;            // Input placeholder
  required?: boolean;              // Required field indicator
  disabled?: boolean;              // Disabled state
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Mantine size
  width?: string | number;         // Custom width override
  height?: string | number;        // Custom height (where applicable)
  className?: string;              // Additional CSS classes
  style?: React.CSSProperties;     // Custom inline styles
  description?: string;            // Help text
  withAsterisk?: boolean;          // Show required asterisk
  showError?: boolean;             // Whether to show error messages
  children?: React.ReactElement;   // Child component to wrap
}

interface BaseFormComponentWrapperProps extends BaseFormComponentProps {
  children: React.ReactElement;
}

/**
 * Base wrapper component for form components with Formik integration
 * Provides common functionality like error display, field management, and styling
 */
const BaseFormComponent: React.FC<BaseFormComponentWrapperProps> = ({ 
  name, 
  children, 
  showError = true,
  className = '',
  style = {},
  width,
  height,
  size = 'sm',
  label,
  placeholder,
  required,
  disabled,
  description,
  withAsterisk,
  ...props 
}) => {
  const [field, meta, helpers] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create combined styles with custom width/height overrides
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };
  
  // Prepare props to pass to child component
  const childProps = {
    ...field,
    ...props,
    size,
    label,
    placeholder,
    required,
    disabled,
    description,
    withAsterisk: withAsterisk ?? required,
    error: hasError ? meta.error : undefined,
    style: combinedStyle,
    className: className ? `${className}` : undefined,
  };
  
  return (
    <Box className={`form-component-wrapper ${className}`}>
      {React.cloneElement(children, childProps)}
      {showError && hasError && (
        <Text size="sm" c="red" mt={4}>
          {meta.error}
        </Text>
      )}
      {description && !hasError && (
        <Text size="sm" c="dimmed" mt={4}>
          {description}
        </Text>
      )}
    </Box>
  );
};

export default BaseFormComponent;