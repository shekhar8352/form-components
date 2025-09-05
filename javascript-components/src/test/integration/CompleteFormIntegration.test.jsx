/**
 * Integration Tests for Complete Forms
 * 
 * Tests multiple components working together in realistic form scenarios
 * Covers form submission workflows, validation, and component interaction
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { vi } from 'vitest';

// Import all form components
import {
  FormTextInput,
  FormTextArea,
  FormYesNoSelect,
  FormStaticSelect,
  FormRadioGroup
} from '../../components/index.js';

// Mock API responses for dynamic components
const mockApiResponse = {
  data: [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]
};

const mockSearchResponse = {
  data: [
    { id: 1, name: 'Search Result 1' },
    { id: 2, name: 'Search Result 2' }
  ]
};

// Mock fetch for API calls
global.fetch = vi.fn();

const TestWrapper = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

describe('Complete Form Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
  });

  describe('Registration Form Integration', () => {
    const registrationSchema = Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
      bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
      country: Yup.string().required('Country is required'),
      agreeToTerms: Yup.string().oneOf(['yes'], 'You must agree to the terms'),
      birthDate: Yup.date().required('Birth date is required')
    });

    const RegistrationForm = ({ onSubmit }) => (
      <TestWrapper>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            bio: '',
            country: '',
            agreeToTerms: '',
            birthDate: null
          }}
          validationSchema={registrationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormTextInput
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              required
            />
            <FormTextInput
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              required
            />
            <FormTextInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FormTextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <FormTextInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              required
            />
            <FormTextArea
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
              maxLength={500}
            />
            <FormDynamicSelect
              name="country"
              label="Country"
              apiUrl="/api/countries"
              valueKey="id"
              labelKey="name"
              required
            />
            <FormYesNoSelect
              name="agreeToTerms"
              label="I agree to the terms and conditions"
              required
            />
            <FormDatePicker
              name="birthDate"
              label="Birth Date"
              required
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </TestWrapper>
    );

    it('should render all form components correctly', async () => {
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Check that all form fields are rendered
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/agree to the terms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

      // Wait for dynamic select to load
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/countries', expect.any(Object));
      });
    });

    it('should handle form submission with valid data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Fill out the form
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
      await user.type(screen.getByLabelText(/^password/i), 'password123');
      await user.type(screen.getByLabelText(/confirm password/i), 'password123');
      await user.type(screen.getByLabelText(/bio/i), 'I am a software developer');

      // Wait for country options to load and select one
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/countries', expect.any(Object));
      });

      const countrySelect = screen.getByLabelText(/country/i);
      await user.click(countrySelect);
      await user.click(screen.getByText('Option 1'));

      // Select agree to terms
      const termsSelect = screen.getByLabelText(/agree to the terms/i);
      await user.click(termsSelect);
      await user.click(screen.getByText('Yes'));

      // Set birth date
      const birthDateInput = screen.getByLabelText(/birth date/i);
      await user.type(birthDateInput, '01/01/1990');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            confirmPassword: 'password123',
            bio: 'I am a software developer',
            country: '1',
            agreeToTerms: 'yes'
          }),
          expect.any(Object)
        );
      });
    });

    it('should display validation errors for invalid data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Try to submit empty form
      await user.click(screen.getByRole('button', { name: /register/i }));

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('Country is required')).toBeInTheDocument();
        expect(screen.getByText('You must agree to the terms')).toBeInTheDocument();
        expect(screen.getByText('Birth date is required')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate password confirmation', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<RegistrationForm onSubmit={mockSubmit} />);

      // Fill passwords with different values
      await user.type(screen.getByLabelText(/^password/i), 'password123');
      await user.type(screen.getByLabelText(/confirm password/i), 'differentpassword');

      // Try to submit
      await user.click(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        expect(screen.getByText('Passwords must match')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Contact Form Integration', () => {
    const contactSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
      priority: Yup.string().required('Priority is required'),
      contactMethod: Yup.string().required('Preferred contact method is required'),
      attachments: Yup.array()
    });

    const ContactForm = ({ onSubmit }) => (
      <TestWrapper>
        <Formik
          initialValues={{
            name: '',
            email: '',
            subject: '',
            message: '',
            priority: '',
            contactMethod: '',
            attachments: []
          }}
          validationSchema={contactSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormTextInput
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
            <FormTextInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FormSearchableSelect
              name="subject"
              label="Subject"
              searchApiUrl="/api/subjects/search"
              searchParam="q"
              valueKey="id"
              labelKey="title"
              required
            />
            <FormTextArea
              name="message"
              label="Message"
              placeholder="Enter your message"
              required
              rows={5}
            />
            <FormStaticSelect
              name="priority"
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              required
            />
            <FormRadioGroup
              name="contactMethod"
              label="Preferred Contact Method"
              options={[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'sms', label: 'SMS' }
              ]}
              required
            />
            <FormFileUpload
              name="attachments"
              label="Attachments"
              accept=".pdf,.doc,.docx,.txt"
              multiple
              maxSize={5 * 1024 * 1024} // 5MB
            />
            <button type="submit">Send Message</button>
          </Form>
        </Formik>
      </TestWrapper>
    );

    it('should handle searchable select with debouncing', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      
      // Mock search API response
      fetch.mockImplementation((url) => {
        if (url.includes('/api/subjects/search')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockSearchResponse
          });
        }
        return Promise.resolve({
          ok: true,
          json: async () => mockApiResponse
        });
      });

      render(<ContactForm onSubmit={mockSubmit} />);

      const subjectInput = screen.getByLabelText(/subject/i);
      
      // Type in search field
      await user.type(subjectInput, 'test');

      // Wait for debounced search
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          '/api/subjects/search?q=test',
          expect.any(Object)
        );
      }, { timeout: 1000 });

      // Select an option
      await user.click(screen.getByText('Search Result 1'));

      expect(subjectInput).toHaveValue('Search Result 1');
    });

    it('should handle file upload component', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      const fileInput = screen.getByLabelText('Attachments');
      
      // Create mock file
      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      
      await user.upload(fileInput, file);

      // Check if file is displayed in the list
      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });

    it('should handle radio group selection', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<ContactForm onSubmit={mockSubmit} />);

      // Select email option
      const emailRadio = screen.getByDisplayValue('email');
      await user.click(emailRadio);

      expect(emailRadio).toBeChecked();

      // Select phone option
      const phoneRadio = screen.getByDisplayValue('phone');
      await user.click(phoneRadio);

      expect(phoneRadio).toBeChecked();
      expect(emailRadio).not.toBeChecked();
    });
  });

  describe('Survey Form Integration', () => {
    const SurveyForm = ({ onSubmit }) => (
      <TestWrapper>
        <Formik
          initialValues={{
            satisfaction: '',
            recommendation: '',
            feedback: '',
            improvements: '',
            followUp: '',
            contactDate: null
          }}
          onSubmit={onSubmit}
        >
          <Form>
            <FormRadioGroup
              name="satisfaction"
              label="How satisfied are you with our service?"
              options={[
                { value: '1', label: 'Very Dissatisfied' },
                { value: '2', label: 'Dissatisfied' },
                { value: '3', label: 'Neutral' },
                { value: '4', label: 'Satisfied' },
                { value: '5', label: 'Very Satisfied' }
              ]}
              orientation="horizontal"
            />
            <FormYesNoSelect
              name="recommendation"
              label="Would you recommend us to others?"
              yesLabel="Definitely"
              noLabel="Probably not"
            />
            <FormTextArea
              name="feedback"
              label="Additional Feedback"
              placeholder="Please share any additional thoughts..."
              autosize
              minRows={3}
              maxRows={8}
            />
            <FormDynamicSelect
              name="improvements"
              label="What area needs the most improvement?"
              apiUrl="/api/improvement-areas"
              valueKey="id"
              labelKey="area"
            />
            <FormYesNoSelect
              name="followUp"
              label="May we contact you for follow-up questions?"
            />
            <FormDatePicker
              name="contactDate"
              label="Best date to contact you"
              minDate={new Date()}
            />
            <button type="submit">Submit Survey</button>
          </Form>
        </Formik>
      </TestWrapper>
    );

    it('should handle complete survey workflow', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      render(<SurveyForm onSubmit={mockSubmit} />);

      // Select satisfaction rating
      await user.click(screen.getByLabelText(/very satisfied/i));

      // Select recommendation
      const recommendSelect = screen.getByLabelText('Would you recommend us to others?');
      await user.click(recommendSelect);
      await user.click(screen.getByText('Definitely'));

      // Fill feedback
      await user.type(
        screen.getByLabelText(/additional feedback/i),
        'Great service overall!'
      );

      // Wait for improvements options to load
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/improvement-areas', expect.any(Object));
      });

      // Select improvement area
      const improvementSelect = screen.getByLabelText(/improvement/i);
      await user.click(improvementSelect);
      await user.click(screen.getByText('Option 1'));

      // Select follow-up
      const followUpSelect = screen.getByLabelText(/contact you for follow-up/i);
      await user.click(followUpSelect);
      await user.click(screen.getByText('Yes'));

      // Set contact date
      const contactDateInput = screen.getByLabelText(/best date to contact/i);
      await user.type(contactDateInput, '12/31/2024');

      // Submit survey
      await user.click(screen.getByRole('button', { name: /submit survey/i }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            satisfaction: '5',
            recommendation: 'yes',
            feedback: 'Great service overall!',
            improvements: '1',
            followUp: 'yes'
          }),
          expect.any(Object)
        );
      });
    });
  });

  describe('Component Interaction and Data Flow', () => {
    it('should maintain form state across component interactions', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      
      const InteractionForm = () => (
        <TestWrapper>
          <Formik
            initialValues={{
              textInput: '',
              selectValue: '',
              yesNo: '',
              radioValue: ''
            }}
            onSubmit={mockSubmit}
          >
            {({ values }) => (
              <Form>
                <FormTextInput
                  name="textInput"
                  label="Text Input"
                  placeholder="Type something"
                />
                <FormStaticSelect
                  name="selectValue"
                  label="Select Option"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                />
                <FormYesNoSelect
                  name="yesNo"
                  label="Yes/No Question"
                />
                <FormRadioGroup
                  name="radioValue"
                  label="Radio Options"
                  options={[
                    { value: 'radio1', label: 'Radio 1' },
                    { value: 'radio2', label: 'Radio 2' }
                  ]}
                />
                <div data-testid="form-values">
                  {JSON.stringify(values)}
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </TestWrapper>
      );

      render(<InteractionForm />);

      // Interact with different components
      await user.type(screen.getByLabelText(/text input/i), 'test value');
      
      const selectInput = screen.getByLabelText('Select Option');
      await user.click(selectInput);
      await user.click(screen.getByText('Option 1'));

      const yesNoSelect = screen.getByLabelText(/yes\/no question/i);
      await user.click(yesNoSelect);
      await user.click(screen.getByText('Yes'));

      await user.click(screen.getByLabelText(/radio 1/i));

      // Check that all values are maintained in form state
      const formValues = screen.getByTestId('form-values');
      expect(formValues).toHaveTextContent('"textInput":"test value"');
      expect(formValues).toHaveTextContent('"selectValue":"option1"');
      expect(formValues).toHaveTextContent('"yesNo":"yes"');
      expect(formValues).toHaveTextContent('"radioValue":"radio1"');
    });
  });
});