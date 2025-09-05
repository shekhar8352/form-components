import React from 'react';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useField } from 'formik';
import PropTypes from 'prop-types';

/**
 * FormDatePicker component for date selection with validation
 * Integrates with Formik and provides date handling functionality
 */
const FormDatePicker = ({
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
  type = 'default',
  minDate,
  maxDate,
  excludeDate,
  locale,
  dateFormat,
  clearable = true,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };

  // Handle date change
  const handleDateChange = (value) => {
    helpers.setValue(value);
  };

  // Get the appropriate initial value based on type
  const getInitialValue = () => {
    if (field.value) return field.value;
    
    switch (type) {
      case 'range':
        return [null, null];
      case 'multiple':
        return [];
      default:
        return null;
    }
  };

  // Handle date validation
  const isDateExcluded = (date) => {
    if (excludeDate && typeof excludeDate === 'function') {
      return excludeDate(date);
    }
    return false;
  };

  // Common props for both date components
  const commonProps = {
    ...props,
    label,
    placeholder: placeholder || 'Select date',
    required,
    disabled,
    size,
    className,
    style: customStyle,
    description,
    withAsterisk: withAsterisk || required,
    error: hasError ? meta.error : undefined,
    value: field.value || getInitialValue(),
    onChange: handleDateChange,
    clearable,
    minDate,
    maxDate,
    excludeDate: isDateExcluded,
    locale,
    valueFormat: dateFormat,
  };

  // Render different date picker types
  switch (type) {
    case 'range':
      return (
        <DatePickerInput
          {...commonProps}
          type="range"
          placeholder={placeholder || 'Select date range'}
        />
      );
    
    case 'multiple':
      return (
        <DatePickerInput
          {...commonProps}
          type="multiple"
          placeholder={placeholder || 'Select dates'}
        />
      );
    
    default:
      return (
        <DateInput
          {...commonProps}
        />
      );
  }
};

FormDatePicker.propTypes = {
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
  type: PropTypes.oneOf(['default', 'multiple', 'range']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  excludeDate: PropTypes.func,
  locale: PropTypes.string,
  dateFormat: PropTypes.string,
  clearable: PropTypes.bool,
};

export default FormDatePicker;