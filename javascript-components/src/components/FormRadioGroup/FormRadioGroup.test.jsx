import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import * as yup from 'yup';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FormRadioGroup from './FormRadioGroup';

// Test wrapper component
const TestWrapper = ({ children, initialValues = {}, validationSchema, onSubmit = vi.fn() }) => (
  <MantineProvider>
    <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormRadioGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      render(
        <TestWrapper initialValues={{ testRadio: '' }}>
          <FormRadioGroup 
            name="testRadio" 
            label="Test Radio Group" 
            options={defaultOptions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Radio Group')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Option 2' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Option 3' })).toBeInTheDocument();
    });

    it('renders with required asterisk when required', () => {
      render(
        <TestWrapper initialValues={{ testRadio: '' }}>
          <FormRadioGroup 
            name="testRadio" 
            label="Required Radio Group" 
            options={defaultOptions}
            required
          />
        </TestWrapper>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('updates Formik field value when selection is made', async () => {
      const user = userEvent.setup();
      let formValues = {};
      
      const handleSubmit = (values) => {
        formValues = values;
      };

      render(
        <TestWrapper initialValues={{ testRadio: '' }} onSubmit={handleSubmit}>
          <FormRadioGroup 
            name="testRadio" 
            label="Test Radio Group" 
            options={defaultOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const option2Radio = screen.getByRole('radio', { name: 'Option 2' });
      await user.click(option2Radio);

      expect(option2Radio).toBeChecked();

      await user.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(formValues.testRadio).toBe('option2');
      });
    });

    it('displays initial value correctly', () => {
      render(
        <TestWrapper initialValues={{ testRadio: 'option2' }}>
          <FormRadioGroup 
            name="testRadio" 
            label="Pre-selected Radio Group" 
            options={defaultOptions}
          />
        </TestWrapper>
      );

      const option2Radio = screen.getByRole('radio', { name: 'Option 2' });
      expect(option2Radio).toBeChecked();
    });
  });

  describe('Validation', () => {
    it('displays validation errors when field is invalid', async () => {
      const validationSchema = yup.object({
        testRadio: yup.string().required('Please select an option')
      });

      render(
        <TestWrapper 
          initialValues={{ testRadio: '' }} 
          validationSchema={validationSchema}
        >
          <FormRadioGroup 
            name="testRadio" 
            label="Required Radio Group" 
            options={defaultOptions}
            required
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      // Try to submit without selecting anything
      fireEvent.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
    });
  });

  describe('Disabled State', () => {
    it('disables all radio buttons when disabled prop is true', () => {
      render(
        <TestWrapper initialValues={{ testRadio: '' }}>
          <FormRadioGroup 
            name="testRadio" 
            label="Disabled Radio Group" 
            options={defaultOptions}
            disabled
          />
        </TestWrapper>
      );

      defaultOptions.forEach(option => {
        const radio = screen.getByRole('radio', { name: option.label });
        expect(radio).toBeDisabled();
      });
    });
  });

  describe('Option Handling', () => {
    it('handles numeric values correctly', async () => {
      const user = userEvent.setup();
      const numericOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ];

      let formValues = {};
      const handleSubmit = (values) => {
        formValues = values;
      };

      render(
        <TestWrapper initialValues={{ testRadio: '' }} onSubmit={handleSubmit}>
          <FormRadioGroup 
            name="testRadio" 
            label="Numeric Values Radio Group" 
            options={numericOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const twoRadio = screen.getByRole('radio', { name: 'Two' });
      await user.click(twoRadio);

      await user.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(formValues.testRadio).toBe('2'); // Should be string
      });
    });
  });
});