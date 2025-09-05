import React from 'react';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useField } from 'formik';
import type { FormDatePickerProps } from '../../types';

/**
 * FormDatePicker component for date selection with validation
 * Integrates with Formik and provides date handling functionality
 */
const FormDatePicker: React.FC<FormDatePickerProps> = ({
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
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };

  // Handle date change
  const handleDateChange = (value: Date | Date[] | null) => {
    helpers.setValue(value);
  };

  // Get the appropriate initial value based on type
  const getInitialValue = (): Date | Date[] | null => {
    if (field.value) return field.value;
    
    switch (type) {
      case 'range':
        return [null, null] as [Date | null, Date | null];
      case 'multiple':
        return [] as Date[];
      default:
        return null;
    }
  };

  // Handle date validation
  const isDateExcluded = (date: Date): boolean => {
    if (excludeDate && typeof excludeDate === 'function') {
      return excludeDate(date.toISOString());
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

export default FormDatePicker;