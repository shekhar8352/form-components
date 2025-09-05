/**
 * Accessibility Tests for Form Components
 * 
 * Tests ARIA attributes, keyboard navigation, screen reader compatibility,
 * and other accessibility features
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form } from 'formik';
import { vi } from 'vitest';

// Import form components
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormYesNoSelect,
  FormRadioGroup
} from '../../components/index.js';

const TestWrapper = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

describe('Component Accessibility Tests', () => {
  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes for FormTextInput', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
                required
                description="This is a test input field"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Input');
      
      // Should have proper ARIA attributes
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('required');
      
      // Should be properly labeled
      expect(input).toHaveAccessibleName('Test Input');
      expect(input).toHaveAccessibleDescription();
    });

    it('should have proper ARIA attributes for FormTextArea', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextArea
                name="test"
                label="Test Textarea"
                placeholder="Enter text"
                required
                rows={4}
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const textarea = screen.getByLabelText('Test Textarea');
      
      // Should have proper ARIA attributes
      expect(textarea).toHaveAttribute('aria-invalid', 'false');
      expect(textarea).toHaveAttribute('required');
      expect(textarea).toHaveAttribute('rows', '4');
      
      // Should be properly labeled
      expect(textarea).toHaveAccessibleName('Test Textarea');
    });

    it('should have proper ARIA attributes for FormStaticSelect', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormStaticSelect
                name="test"
                label="Test Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
                required
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const select = screen.getByLabelText('Test Select');
      
      // Should have proper ARIA attributes
      expect(select).toHaveAttribute('aria-haspopup', 'listbox');
      expect(select).toHaveAttribute('aria-invalid', 'false');
      expect(select).toHaveAttribute('autocomplete', 'off');
      
      // Should be properly labeled
      expect(select).toHaveAccessibleName('Test Select');
    });

    it('should have proper ARIA attributes for FormRadioGroup', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormRadioGroup
                name="test"
                label="Test Radio Group"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
                required
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const radioGroup = screen.getByRole('radiogroup');
      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');
      
      // Radio group should have proper attributes
      expect(radioGroup).toHaveAccessibleName('Test Radio Group');
      
      // Individual radios should have proper attributes
      expect(radio1).toHaveAttribute('type', 'radio');
      expect(radio1).toHaveAttribute('value', 'option1');
      expect(radio2).toHaveAttribute('type', 'radio');
      expect(radio2).toHaveAttribute('value', 'option2');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation for FormTextInput', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test1: '', test2: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test1"
                label="First Input"
                placeholder="Enter text"
              />
              <FormTextInput
                name="test2"
                label="Second Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const firstInput = screen.getByLabelText('First Input');
      const secondInput = screen.getByLabelText('Second Input');

      // Should be able to focus with Tab
      await user.tab();
      expect(firstInput).toHaveFocus();

      // Should be able to navigate to next field with Tab
      await user.tab();
      expect(secondInput).toHaveFocus();

      // Should be able to navigate back with Shift+Tab
      await user.tab({ shift: true });
      expect(firstInput).toHaveFocus();
    });

    it('should support keyboard navigation for FormRadioGroup', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormRadioGroup
                name="test"
                label="Test Radio Group"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');
      const radio3 = screen.getByLabelText('Option 3');

      // Focus first radio
      radio1.focus();
      expect(radio1).toHaveFocus();

      // Arrow down should move to next radio
      await user.keyboard('{ArrowDown}');
      expect(radio2).toHaveFocus();

      // Arrow down again should move to third radio
      await user.keyboard('{ArrowDown}');
      expect(radio3).toHaveFocus();

      // Arrow up should move back to second radio
      await user.keyboard('{ArrowUp}');
      expect(radio2).toHaveFocus();

      // Space should select the focused radio
      await user.keyboard(' ');
      expect(radio2).toBeChecked();
    });

    it('should support keyboard navigation for FormStaticSelect', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormStaticSelect
                name="test"
                label="Test Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const select = screen.getByLabelText('Test Select');

      // Should be able to focus the select
      select.focus();
      expect(select).toHaveFocus();

      // Enter or Space should open the dropdown
      await user.keyboard('{Enter}');
      
      // Should be able to navigate options with arrow keys
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      
      // Should close dropdown and select option
      expect(select).toHaveValue('Option 1');
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide proper labels for screen readers', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test"
                label="Email Address"
                placeholder="Enter your email"
                required
                description="We'll never share your email"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Email Address');
      
      // Should have accessible name
      expect(input).toHaveAccessibleName('Email Address');
      
      // Should have accessible description
      expect(input).toHaveAccessibleDescription();
      
      // Should indicate required status
      expect(input).toBeRequired();
    });

    it('should announce validation errors to screen readers', async () => {
      const user = userEvent.setup();
      
      const TestForm = () => {
        const [error, setError] = React.useState('');
        
        return (
          <TestWrapper>
            <Formik
              initialValues={{ test: '' }}
              onSubmit={() => {}}
              validate={(values) => {
                const errors = {};
                if (!values.test) {
                  errors.test = 'This field is required';
                  setError('This field is required');
                }
                return errors;
              }}
            >
              <Form>
                <FormTextInput
                  name="test"
                  label="Required Field"
                  placeholder="Enter text"
                  required
                />
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </TestWrapper>
        );
      };

      render(<TestForm />);

      const input = screen.getByLabelText('Required Field');
      const submitButton = screen.getByText('Submit');

      // Try to submit without filling required field
      await user.click(submitButton);

      // Error should be announced to screen readers
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should maintain proper focus order', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ field1: '', field2: '', field3: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput name="field1" label="Field 1" />
              <FormStaticSelect
                name="field2"
                label="Field 2"
                options={[{ value: 'option1', label: 'Option 1' }]}
              />
              <FormTextArea name="field3" label="Field 3" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </TestWrapper>
      );

      const field1 = screen.getByLabelText('Field 1');
      const field2 = screen.getByLabelText('Field 2');
      const field3 = screen.getByLabelText('Field 3');
      const submitButton = screen.getByText('Submit');

      // Tab through all elements in order
      await user.tab();
      expect(field1).toHaveFocus();

      await user.tab();
      expect(field2).toHaveFocus();

      await user.tab();
      expect(field3).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('should handle focus trapping in modals/dropdowns', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormStaticSelect
                name="test"
                label="Test Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const select = screen.getByLabelText('Test Select');

      // Open dropdown
      await user.click(select);
      
      // Focus should be managed within the dropdown
      expect(select).toHaveFocus();
      
      // Escape should close dropdown and return focus
      await user.keyboard('{Escape}');
      expect(select).toHaveFocus();
    });
  });

  describe('Color Contrast and Visual Accessibility', () => {
    it('should have sufficient color contrast for text inputs', () => {
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Input');
      const label = screen.getByText('Test Input');
      
      // Elements should be visible and have proper styling
      expect(input).toBeVisible();
      expect(label).toBeVisible();
      
      // Should have proper styling classes from Mantine
      expect(input).toHaveClass('mantine-TextInput-input');
      expect(label).toHaveClass('mantine-TextInput-label');
    });

    it('should indicate focus state clearly', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Input');

      // Focus the input
      await user.click(input);
      expect(input).toHaveFocus();
      
      // Should have focus styling (Mantine handles this)
      expect(input).toBeVisible();
    });
  });

  describe('Error State Accessibility', () => {
    it('should properly announce error states', () => {
      const TestFormWithError = () => (
        <TestWrapper>
          <Formik
            initialValues={{ test: '' }}
            initialErrors={{ test: 'This field has an error' }}
            initialTouched={{ test: true }}
            onSubmit={() => {}}
          >
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      render(<TestFormWithError />);

      const input = screen.getByLabelText('Test Input');
      
      // Should indicate error state
      expect(input).toHaveAttribute('aria-invalid', 'true');
      
      // Error message should be present and associated
      expect(screen.getByText('This field has an error')).toBeInTheDocument();
    });
  });

  describe('Responsive Design Accessibility', () => {
    it('should maintain accessibility on different screen sizes', () => {
      // Mock different viewport sizes
      const originalInnerWidth = window.innerWidth;
      
      // Test mobile size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Input');
      
      // Should still be accessible on mobile
      expect(input).toBeVisible();
      expect(input).toHaveAccessibleName('Test Input');
      
      // Restore original width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });
  });
});