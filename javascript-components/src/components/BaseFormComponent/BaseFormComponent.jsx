import React from 'react';
import { useField } from 'formik';
import { Text, Box } from '@mantine/core';
import PropTypes from 'prop-types';

/**
 * Base wrapper component for form components with Formik integration
 * Provides common functionality like error display, field management, and styling
 */
const BaseFormComponent = ({ 
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
  const combinedStyle = {
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

BaseFormComponent.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
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
  showError: PropTypes.bool,
};

export default BaseFormComponent;