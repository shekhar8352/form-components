import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validatePattern,
  validateNumber,
  validateMinValue,
  validateMaxValue,
  validateFileSize,
  validateFileType,
  validateMaxFiles,
  validateMinDate,
  validateMaxDate,
  formatValidationError,
  formatFieldName,
  createValidator,
  combineValidators,
} from './validation';

describe('Validation Utilities', () => {
  describe('validateRequired', () => {
    it('should return error for empty values', () => {
      expect(validateRequired('')).toBe('This field is required');
      expect(validateRequired('   ')).toBe('This field is required');
      expect(validateRequired(null)).toBe('This field is required');
      expect(validateRequired(undefined)).toBe('This field is required');
      expect(validateRequired([])).toBe('This field is required');
    });

    it('should return undefined for valid values', () => {
      expect(validateRequired('test')).toBeUndefined();
      expect(validateRequired(0)).toBeUndefined();
      expect(validateRequired(false)).toBeUndefined();
      expect(validateRequired(['item'])).toBeUndefined();
    });

    it('should use custom message', () => {
      expect(validateRequired('', 'Custom message')).toBe('Custom message');
    });
  });

  describe('validateEmail', () => {
    it('should return error for invalid emails', () => {
      expect(validateEmail('invalid')).toBe('Please enter a valid email address');
      expect(validateEmail('test@')).toBe('Please enter a valid email address');
      expect(validateEmail('@test.com')).toBe('Please enter a valid email address');
      expect(validateEmail('test@test')).toBe('Please enter a valid email address');
    });

    it('should return undefined for valid emails', () => {
      expect(validateEmail('test@test.com')).toBeUndefined();
      expect(validateEmail('user.name+tag@example.com')).toBeUndefined();
      expect(validateEmail('')).toBeUndefined(); // Empty is valid (use required for mandatory)
    });

    it('should use custom message', () => {
      expect(validateEmail('invalid', 'Custom email error')).toBe('Custom email error');
    });
  });

  describe('validateMinLength', () => {
    const validator = validateMinLength(5);

    it('should return error for short strings', () => {
      expect(validator('test')).toBe('Must be at least 5 characters long');
      expect(validator('ab')).toBe('Must be at least 5 characters long');
    });

    it('should return undefined for valid strings', () => {
      expect(validator('testing')).toBeUndefined();
      expect(validator('12345')).toBeUndefined();
      expect(validator('')).toBeUndefined(); // Empty is valid
    });

    it('should use custom message', () => {
      const customValidator = validateMinLength(3, 'Too short!');
      expect(customValidator('ab')).toBe('Too short!');
    });
  });

  describe('validateMaxLength', () => {
    const validator = validateMaxLength(5);

    it('should return error for long strings', () => {
      expect(validator('testing')).toBe('Must be no more than 5 characters long');
      expect(validator('123456')).toBe('Must be no more than 5 characters long');
    });

    it('should return undefined for valid strings', () => {
      expect(validator('test')).toBeUndefined();
      expect(validator('12345')).toBeUndefined();
      expect(validator('')).toBeUndefined();
    });
  });

  describe('validatePattern', () => {
    const phoneValidator = validatePattern(/^\d{3}-\d{3}-\d{4}$/);

    it('should return error for invalid patterns', () => {
      expect(phoneValidator('123456789')).toBe('Invalid format');
      expect(phoneValidator('abc-def-ghij')).toBe('Invalid format');
    });

    it('should return undefined for valid patterns', () => {
      expect(phoneValidator('123-456-7890')).toBeUndefined();
      expect(phoneValidator('')).toBeUndefined();
    });
  });

  describe('validateNumber', () => {
    it('should return error for non-numbers', () => {
      expect(validateNumber('abc')).toBe('Must be a valid number');
      expect(validateNumber('12abc')).toBe('Must be a valid number');
    });

    it('should return undefined for valid numbers', () => {
      expect(validateNumber('123')).toBeUndefined();
      expect(validateNumber('123.45')).toBeUndefined();
      expect(validateNumber('-123')).toBeUndefined();
      expect(validateNumber('')).toBeUndefined();
    });
  });

  describe('validateMinValue', () => {
    const validator = validateMinValue(10);

    it('should return error for small values', () => {
      expect(validator('5')).toBe('Must be at least 10');
      expect(validator(9)).toBe('Must be at least 10');
    });

    it('should return undefined for valid values', () => {
      expect(validator('10')).toBeUndefined();
      expect(validator(15)).toBeUndefined();
      expect(validator('')).toBeUndefined();
    });
  });

  describe('validateMaxValue', () => {
    const validator = validateMaxValue(100);

    it('should return error for large values', () => {
      expect(validator('150')).toBe('Must be no more than 100');
      expect(validator(200)).toBe('Must be no more than 100');
    });

    it('should return undefined for valid values', () => {
      expect(validator('50')).toBeUndefined();
      expect(validator(100)).toBeUndefined();
      expect(validator('')).toBeUndefined();
    });
  });

  describe('validateFileSize', () => {
    const validator = validateFileSize(1024 * 1024); // 1MB

    it('should return error for large files', () => {
      const largeFile = new File([''], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(largeFile, 'size', { value: 2 * 1024 * 1024 });
      
      expect(validator(largeFile)).toContain('File size must be less than');
    });

    it('should return undefined for valid files', () => {
      const smallFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      expect(validator(smallFile)).toBeUndefined();
    });
  });

  describe('validateFileType', () => {
    const validator = validateFileType(['image/jpeg', 'image/png']);

    it('should return error for invalid file types', () => {
      const textFile = new File([''], 'test.txt', { type: 'text/plain' });
      expect(validator(textFile)).toContain('Only');
    });

    it('should return undefined for valid file types', () => {
      const imageFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      expect(validator(imageFile)).toBeUndefined();
    });
  });

  describe('validateMaxFiles', () => {
    const validator = validateMaxFiles(3);

    it('should return error for too many files', () => {
      const files = [
        new File([''], 'test1.txt'),
        new File([''], 'test2.txt'),
        new File([''], 'test3.txt'),
        new File([''], 'test4.txt'),
      ];
      expect(validator(files)).toBe('Maximum 3 files allowed');
    });

    it('should return undefined for valid file count', () => {
      const files = [
        new File([''], 'test1.txt'),
        new File([''], 'test2.txt'),
      ];
      expect(validator(files)).toBeUndefined();
    });
  });

  describe('validateMinDate', () => {
    const minDate = new Date('2023-01-01');
    const validator = validateMinDate(minDate);

    it('should return error for dates before minimum', () => {
      expect(validator(new Date('2022-12-31'))).toContain('Date must be after');
    });

    it('should return undefined for valid dates', () => {
      expect(validator(new Date('2023-01-02'))).toBeUndefined();
      expect(validator('')).toBeUndefined();
    });
  });

  describe('validateMaxDate', () => {
    const maxDate = new Date('2023-12-31');
    const validator = validateMaxDate(maxDate);

    it('should return error for dates after maximum', () => {
      expect(validator(new Date('2024-01-01'))).toContain('Date must be before');
    });

    it('should return undefined for valid dates', () => {
      expect(validator(new Date('2023-12-30'))).toBeUndefined();
      expect(validator('')).toBeUndefined();
    });
  });

  describe('formatValidationError', () => {
    it('should capitalize and add period', () => {
      expect(formatValidationError('test error')).toBe('Test error.');
      expect(formatValidationError('Test error.')).toBe('Test error.');
      expect(formatValidationError('')).toBe('');
    });
  });

  describe('formatFieldName', () => {
    it('should format field names correctly', () => {
      expect(formatFieldName('firstName')).toBe('First Name');
      expect(formatFieldName('email_address')).toBe('Email Address');
      expect(formatFieldName('phoneNumber')).toBe('Phone Number');
    });
  });

  describe('createValidator', () => {
    it('should combine multiple validation rules', () => {
      const validator = createValidator([
        { type: 'required', message: 'Required field' },
        { type: 'minLength', value: 5, message: 'Too short' },
      ]);

      expect(validator('')).toBe('Required field.');
      expect(validator('abc')).toBe('Too short.');
      expect(validator('testing')).toBeUndefined();
    });

    it('should handle custom validators', () => {
      const validator = createValidator([
        {
          type: 'custom',
          message: 'Custom error',
          validator: (value) => value === 'invalid' ? 'Custom error' : undefined,
        },
      ]);

      expect(validator('invalid')).toBe('Custom error.');
      expect(validator('valid')).toBeUndefined();
    });
  });

  describe('combineValidators', () => {
    it('should combine multiple validator functions', () => {
      const validator = combineValidators(
        validateRequired,
        validateMinLength(5)
      );

      expect(validator('')).toBe('This field is required');
      expect(validator('abc')).toBe('Must be at least 5 characters long');
      expect(validator('testing')).toBeUndefined();
    });
  });
});