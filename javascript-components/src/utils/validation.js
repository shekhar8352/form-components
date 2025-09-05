/**
 * Validation utilities for form components
 * Provides comprehensive validation functions and error formatting
 */

// Error formatting utilities
export const formatValidationError = (error, fieldName) => {
  if (!error) return '';
  
  // Capitalize first letter if not already capitalized
  const formattedError = error.charAt(0).toUpperCase() + error.slice(1);
  
  // Add period if not present
  return formattedError.endsWith('.') ? formattedError : `${formattedError}.`;
};

export const formatFieldName = (fieldName) => {
  // Convert camelCase or snake_case to readable format
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
};

// Basic validation functions
export const validateRequired = (value, message = 'This field is required') => {
  if (value === null || value === undefined || value === '') {
    return message;
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return message;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return message;
  }
  
  return undefined;
};

export const validateEmail = (value, message = 'Please enter a valid email address') => {
  if (!value) return undefined;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return message;
  }
  return undefined;
};

export const validateMinLength = (min, message) => (value) => {
  if (!value) return undefined;
  
  if (value.length < min) {
    return message || `Must be at least ${min} characters long`;
  }
  return undefined;
};

export const validateMaxLength = (max, message) => (value) => {
  if (!value) return undefined;
  
  if (value.length > max) {
    return message || `Must be no more than ${max} characters long`;
  }
  return undefined;
};

export const validatePattern = (pattern, message) => (value) => {
  if (!value) return undefined;
  
  if (!pattern.test(value)) {
    return message || 'Invalid format';
  }
  return undefined;
};

export const validateNumber = (value, message = 'Must be a valid number') => {
  if (!value) return undefined;
  
  const num = Number(value);
  if (isNaN(num)) {
    return message;
  }
  return undefined;
};

export const validateMinValue = (min, message) => (value) => {
  if (!value) return undefined;
  
  const num = Number(value);
  if (isNaN(num) || num < min) {
    return message || `Must be at least ${min}`;
  }
  return undefined;
};

export const validateMaxValue = (max, message) => (value) => {
  if (!value) return undefined;
  
  const num = Number(value);
  if (isNaN(num) || num > max) {
    return message || `Must be no more than ${max}`;
  }
  return undefined;
};

// File validation functions
export const validateFileSize = (maxSize, message) => (file) => {
  if (!file) return undefined;
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1024 / 1024 * 100) / 100;
    return message || `File size must be less than ${maxSizeMB}MB`;
  }
  return undefined;
};

export const validateFileType = (allowedTypes, message) => (file) => {
  if (!file) return undefined;
  
  if (!allowedTypes.includes(file.type)) {
    const typeList = allowedTypes.map(type => type.split('/')[1]).join(', ');
    return message || `Only ${typeList} files are allowed`;
  }
  return undefined;
};

export const validateMaxFiles = (maxFiles, message) => (files) => {
  if (!files || !Array.isArray(files)) return undefined;
  
  if (files.length > maxFiles) {
    return message || `Maximum ${maxFiles} files allowed`;
  }
  return undefined;
};

// Date validation functions
export const validateMinDate = (minDate, message) => (value) => {
  if (!value) return undefined;
  
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  if (date < minDate) {
    return message || `Date must be after ${minDate.toLocaleDateString()}`;
  }
  return undefined;
};

export const validateMaxDate = (maxDate, message) => (value) => {
  if (!value) return undefined;
  
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  if (date > maxDate) {
    return message || `Date must be before ${maxDate.toLocaleDateString()}`;
  }
  return undefined;
};

// Composite validation functions
export const createValidator = (rules) => {
  return (value) => {
    for (const rule of rules) {
      let result;
      
      switch (rule.type) {
        case 'required':
          result = validateRequired(value, rule.message);
          break;
        case 'email':
          result = validateEmail(value, rule.message);
          break;
        case 'minLength':
          result = validateMinLength(rule.value, rule.message)(value);
          break;
        case 'maxLength':
          result = validateMaxLength(rule.value, rule.message)(value);
          break;
        case 'pattern':
          result = validatePattern(rule.value, rule.message)(value);
          break;
        case 'fileSize':
          result = validateFileSize(rule.value, rule.message)(value);
          break;
        case 'fileType':
          result = validateFileType(rule.value, rule.message)(value);
          break;
        case 'custom':
          result = rule.validator ? rule.validator(value) : undefined;
          break;
        default:
          result = undefined;
      }
      
      if (result) {
        return formatValidationError(result);
      }
    }
    
    return undefined;
  };
};

// Utility function to combine multiple validators
export const combineValidators = (...validators) => {
  return (value) => {
    for (const validator of validators) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return undefined;
  };
};

// Yup schema helpers for integration with Formik
export const createYupValidator = (validator) => {
  return function (value) {
    const error = validator(value);
    if (error) {
      throw this.createError({ message: error });
    }
    return true;
  };
};