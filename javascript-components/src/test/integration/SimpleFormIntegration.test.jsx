/**
 * Simple Integration Tests for Form Components
 * 
 * Tests basic form functionality with multiple components working together
 * Focuses on core integration scenarios without complex API interactions
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { vi } from 'vitest';

// Import form components
import {
  FormTextInput,
  FormTextArea,
  FormYesNoSelect,
  FormStaticSelect,
  FormRadioGroup
} from '../../components/index.js';

const TestWrapper = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

describe('Simple Form Integration Tests', () => {
  describe('Basic Contact Form', () => {
    const contactSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required'),
      priority: Yup.string().required('Priority is required'),
      newsletter: Yup.string().required('Newsletter preference is required'),
      contactMethod: Yup.string().required('Contact method is required')
    });

    const ContactForm = ({ onSubmit }) => (
      <TestWrapper>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
            priority: '',
            newsletter: '',
            contactMethod: ''
          }}
          validationSchema={contactSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormTextInput
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              required
            />
            <FormTextInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FormTextArea
              name="message"
              label="Message"
              placeholder="Enter your message"
              required
              rows={4}
            />
            <FormStaticSelect
              name="priority"
              label="Priority Level"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
              required
            />
            <FormYesNoSelect
              name="newsletter"
              label="Subscribe to Newsletter"
              required
            />
            <FormRadioGroup
              name="contactMethod"
              label="Preferred Contact Method"
              options={[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'mail', label: 'Mail' }
              ]}
              required
            />
            <button type="submit">Send Message</button>
          </Form>
        </Formik>
      </TestWrapper>
    );

    it('should render all form components correctly', () => {
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      // Check that all form fields are rendered
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(screen.getByLabelText('Priority Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Subscribe to Newsletter')).toBeInTheDocument();
      expect(screen.getByLabelText('Preferred Contact Method')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
    });

    it('should handle form submission with valid data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Full Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email Address'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'This is a test message');

      // Select priority
      const prioritySelect = screen.getByLabelText('Priority Level');
      await user.click(prioritySelect);
      await user.click(screen.getByText('High'));

      // Select newsletter
      const newsletterSelect = screen.getByLabelText('Subscribe to Newsletter');
      await user.click(newsletterSelect);
      await user.click(screen.getByText('Yes'));

      // Select contact method
      const emailRadio = screen.getByLabelText('Email');
      await user.click(emailRadio);

      // Submit the form
      await user.click(screen.getByRole('button', { name: 'Send Message' }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'This is a test message',
            priority: 'high',
            newsletter: 'yes',
            contactMethod: 'email'
          }),
          expect.any(Object)
        );
      });
    });

    it('should display validation errors for empty form', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      // Try to submit empty form
      await user.click(screen.getByRole('button', { name: 'Send Message' }));

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
        expect(screen.getByText('Priority is required')).toBeInTheDocument();
        expect(screen.getByText('Newsletter preference is required')).toBeInTheDocument();
        expect(screen.getByText('Contact method is required')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      // Fill with invalid email
      await user.type(screen.getByLabelText('Email Address'), 'invalid-email');
      
      // Try to submit
      await user.click(screen.getByRole('button', { name: 'Send Message' }));

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Registration Form', () => {
    const RegistrationForm = ({ onSubmit }) => (
      <TestWrapper>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            agreeToTerms: '',
            accountType: ''
          }}
          onSubmit={onSubmit}
        >
          <Form>
            <FormTextInput
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
            />
            <FormTextInput
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
            />
            <FormTextInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email"
            />
            <FormYesNoSelect
              name="agreeToTerms"
              label="Agree to Terms"
            />
            <FormRadioGroup
              name="accountType"
              label="Account Type"
              options={[
                { value: 'personal', label: 'Personal' },
                { value: 'business', label: 'Business' }
              ]}
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </TestWrapper>
    );

    it('should handle radio group selection correctly', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Select personal account
      const personalRadio = screen.getByLabelText('Personal');
      await user.click(personalRadio);
      expect(personalRadio).toBeChecked();

      // Switch to business account
      const businessRadio = screen.getByLabelText('Business');
      await user.click(businessRadio);
      expect(businessRadio).toBeChecked();
      expect(personalRadio).not.toBeChecked();
    });

    it('should handle yes/no selection correctly', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Select agree to terms
      const agreeSelect = screen.getByLabelText('Agree to Terms');
      await user.click(agreeSelect);
      await user.click(screen.getByText('Yes'));

      // Verify selection
      expect(agreeSelect).toHaveValue('Yes');
    });
  });

  describe('Component State Management', () => {
    it('should maintain form state across component interactions', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      
      const StateTestForm = () => (
        <TestWrapper>
          <Formik
            initialValues={{
              textField: '',
              selectField: '',
              yesNoField: '',
              radioField: ''
            }}
            onSubmit={mockSubmit}
          >
            {({ values }) => (
              <Form>
                <FormTextInput
                  name="textField"
                  label="Text Field"
                  placeholder="Enter text"
                />
                <FormStaticSelect
                  name="selectField"
                  label="Select Field"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                />
                <FormYesNoSelect
                  name="yesNoField"
                  label="Yes/No Field"
                />
                <FormRadioGroup
                  name="radioField"
                  label="Radio Field"
                  options={[
                    { value: 'choice1', label: 'Choice 1' },
                    { value: 'choice2', label: 'Choice 2' }
                  ]}
                />
                <div data-testid="form-state">
                  {JSON.stringify(values)}
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </TestWrapper>
      );

      render(<StateTestForm />);

      // Interact with text input
      await user.type(screen.getByLabelText('Text Field'), 'test text');

      // Interact with select
      const selectField = screen.getByLabelText('Select Field');
      await user.click(selectField);
      await user.click(screen.getByText('Option 1'));

      // Interact with yes/no
      const yesNoField = screen.getByLabelText('Yes/No Field');
      await user.click(yesNoField);
      await user.click(screen.getByText('Yes'));

      // Interact with radio
      await user.click(screen.getByLabelText('Choice 1'));

      // Check that all values are maintained
      const formState = screen.getByTestId('form-state');
      expect(formState).toHaveTextContent('"textField":"test text"');
      expect(formState).toHaveTextContent('"selectField":"option1"');
      expect(formState).toHaveTextContent('"yesNoField":"yes"');
      expect(formState).toHaveTextContent('"radioField":"choice1"');
    });
  });

  describe('Form Validation Integration', () => {
    const ValidationForm = ({ onSubmit }) => {
      const validationSchema = Yup.object({
        requiredText: Yup.string().required('This field is required'),
        minLengthText: Yup.string().min(5, 'Must be at least 5 characters'),
        emailField: Yup.string().email('Invalid email format'),
        requiredSelect: Yup.string().required('Please make a selection')
      });

      return (
        <TestWrapper>
          <Formik
            initialValues={{
              requiredText: '',
              minLengthText: '',
              emailField: '',
              requiredSelect: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <FormTextInput
                name="requiredText"
                label="Required Text"
                placeholder="Enter required text"
              />
              <FormTextInput
                name="minLengthText"
                label="Min Length Text"
                placeholder="Enter at least 5 characters"
              />
              <FormTextInput
                name="emailField"
                label="Email Field"
                type="email"
                placeholder="Enter email"
              />
              <FormStaticSelect
                name="requiredSelect"
                label="Required Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
              />
              <button type="submit">Validate</button>
            </Form>
          </Formik>
        </TestWrapper>
      );
    };

    it('should show validation errors for invalid inputs', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ValidationForm onSubmit={mockSubmit} />);

      // Fill with invalid data
      await user.type(screen.getByLabelText('Min Length Text'), 'abc'); // Too short
      await user.type(screen.getByLabelText('Email Field'), 'invalid-email');

      // Try to submit
      await user.click(screen.getByRole('button', { name: 'Validate' }));

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument();
        expect(screen.getByText('Must be at least 5 characters')).toBeInTheDocument();
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        expect(screen.getByText('Please make a selection')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should submit successfully with valid data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ValidationForm onSubmit={mockSubmit} />);

      // Fill with valid data
      await user.type(screen.getByLabelText('Required Text'), 'Valid text');
      await user.type(screen.getByLabelText('Min Length Text'), 'Valid long text');
      await user.type(screen.getByLabelText('Email Field'), 'valid@example.com');

      const selectField = screen.getByLabelText('Required Select');
      await user.click(selectField);
      await user.click(screen.getByText('Option 1'));

      // Submit
      await user.click(screen.getByRole('button', { name: 'Validate' }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            requiredText: 'Valid text',
            minLengthText: 'Valid long text',
            emailField: 'valid@example.com',
            requiredSelect: 'option1'
          }),
          expect.any(Object)
        );
      });
    });
  });
});