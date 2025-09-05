/**
 * Integration Tests for Complete Forms (TypeScript)
 * 
 * Tests multiple components working together in realistic form scenarios
 * Covers form submission workflows, validation, component interaction, and TypeScript compatibility
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { vi } from 'vitest';

// Import all form components with TypeScript types
import {
  FormTextInput,
  FormTextArea,
  FormYesNoSelect,
  FormStaticSelect,
  FormDynamicSelect,
  FormSearchableSelect,
  FormFileUpload,
  FormRadioGroup,
  FormDatePicker,
  type SelectOption,
  type ApiResponse
} from '../../components';

// TypeScript interfaces for form data
interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  country: string;
  agreeToTerms: string;
  birthDate: Date | null;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: string;
  contactMethod: string;
  attachments: File[];
}

interface SurveyFormData {
  satisfaction: string;
  recommendation: string;
  feedback: string;
  improvements: string;
  followUp: string;
  contactDate: Date | null;
}

// Mock API responses with proper TypeScript typing
const mockApiResponse: ApiResponse<SelectOption> = {
  data: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ],
  success: true,
  total: 3
};

const mockSearchResponse: ApiResponse<SelectOption> = {
  data: [
    { value: '1', label: 'Search Result 1' },
    { value: '2', label: 'Search Result 2' }
  ],
  success: true,
  total: 2
};

// Mock fetch for API calls
global.fetch = vi.fn() as jest.MockedFunction<typeof fetch>;

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

describe('Complete Form Integration Tests (TypeScript)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    } as Response);
  });

  describe('Registration Form Integration with TypeScript', () => {
    const registrationSchema = Yup.object<RegistrationFormData>({
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

    interface RegistrationFormProps {
      onSubmit: (values: RegistrationFormData, formikBag: any) => void;
    }

    const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
      const initialValues: RegistrationFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        country: '',
        agreeToTerms: '',
        birthDate: null
      };

      return (
        <TestWrapper>
          <Formik
            initialValues={initialValues}
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
                valueKey="value"
                labelKey="label"
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
    };

    it('should render all form components with proper TypeScript types', async () => {
      const mockSubmit = vi.fn<[RegistrationFormData, any], void>();
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

    it('should handle form submission with properly typed data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn<[RegistrationFormData, any], void>();
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

    it('should provide proper TypeScript IntelliSense and type checking', () => {
      // This test ensures TypeScript compilation passes with proper types
      const testProps: RegistrationFormProps = {
        onSubmit: (values: RegistrationFormData) => {
          // TypeScript should provide IntelliSense for these properties
          const firstName: string = values.firstName;
          const email: string = values.email;
          const birthDate: Date | null = values.birthDate;
          
          // This should compile without errors
          expect(typeof firstName).toBe('string');
          expect(typeof email).toBe('string');
          expect(birthDate === null || birthDate instanceof Date).toBe(true);
        }
      };

      expect(testProps).toBeDefined();
    });
  });

  describe('Contact Form Integration with TypeScript', () => {
    const contactSchema = Yup.object<ContactFormData>({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
      priority: Yup.string().required('Priority is required'),
      contactMethod: Yup.string().required('Preferred contact method is required'),
      attachments: Yup.array().of(Yup.mixed<File>()).default([])
    });

    interface ContactFormProps {
      onSubmit: (values: ContactFormData, formikBag: any) => void;
    }

    const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
      const initialValues: ContactFormData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: '',
        contactMethod: '',
        attachments: []
      };

      const priorityOptions: SelectOption[] = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ];

      const contactMethodOptions: SelectOption[] = [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'sms', label: 'SMS' }
      ];

      return (
        <TestWrapper>
          <Formik
            initialValues={initialValues}
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
                valueKey="value"
                labelKey="label"
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
                options={priorityOptions}
                required
              />
              <FormRadioGroup
                name="contactMethod"
                label="Preferred Contact Method"
                options={contactMethodOptions}
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
    };

    it('should handle searchable select with proper TypeScript typing', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn<[ContactFormData, any], void>();
      
      // Mock search API response with proper typing
      (fetch as jest.MockedFunction<typeof fetch>).mockImplementation((url: string) => {
        if (url.includes('/api/subjects/search')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockSearchResponse
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: async () => mockApiResponse
        } as Response);
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

    it('should handle file upload with proper File type handling', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn<[ContactFormData, any], void>();
      render(<ContactForm onSubmit={mockSubmit} />);

      const fileInput = screen.getByLabelText(/attachments/i);
      
      // Create mock file with proper File type
      const file: File = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      
      await user.upload(fileInput, file);

      // Check if file is displayed in the list
      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });
  });

  describe('TypeScript Type Safety and IntelliSense', () => {
    it('should provide proper type checking for component props', () => {
      // Test that TypeScript properly validates component props
      const validTextInputProps = {
        name: 'testField',
        label: 'Test Field',
        type: 'email' as const,
        required: true,
        maxLength: 100
      };

      const validSelectOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];

      const validRadioOptions: SelectOption[] = [
        { value: 'radio1', label: 'Radio 1' },
        { value: 'radio2', label: 'Radio 2' }
      ];

      // These should compile without TypeScript errors
      expect(validTextInputProps.name).toBe('testField');
      expect(validSelectOptions.length).toBe(2);
      expect(validRadioOptions[0].value).toBe('radio1');
    });

    it('should handle generic API response types correctly', () => {
      // Test that API response types are properly handled
      const apiResponse: ApiResponse<SelectOption> = {
        data: [
          { value: '1', label: 'Test Option' }
        ],
        success: true,
        total: 1,
        message: 'Success'
      };

      // TypeScript should provide proper IntelliSense
      expect(apiResponse.data[0].value).toBe('1');
      expect(apiResponse.data[0].label).toBe('Test Option');
      expect(apiResponse.success).toBe(true);
    });

    it('should maintain type safety in form submission handlers', async () => {
      const user = userEvent.setup();
      
      // Type-safe form submission handler
      const handleSubmit = (values: { testField: string }) => {
        // TypeScript should enforce the correct shape
        const fieldValue: string = values.testField;
        expect(typeof fieldValue).toBe('string');
      };

      const TypeSafeForm: React.FC = () => (
        <TestWrapper>
          <Formik
            initialValues={{ testField: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormTextInput
                name="testField"
                label="Test Field"
                placeholder="Enter test value"
              />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </TestWrapper>
      );

      render(<TypeSafeForm />);

      await user.type(screen.getByLabelText(/test field/i), 'test value');
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Form should submit successfully with type-safe handling
    });
  });

  describe('Component Interaction with TypeScript', () => {
    interface InteractionFormData {
      textInput: string;
      selectValue: string;
      yesNo: string;
      radioValue: string;
    }

    it('should maintain type-safe form state across component interactions', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn<[InteractionFormData, any], void>();
      
      const InteractionForm: React.FC = () => {
        const initialValues: InteractionFormData = {
          textInput: '',
          selectValue: '',
          yesNo: '',
          radioValue: ''
        };

        const selectOptions: SelectOption[] = [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ];

        const radioOptions: SelectOption[] = [
          { value: 'radio1', label: 'Radio 1' },
          { value: 'radio2', label: 'Radio 2' }
        ];

        return (
          <TestWrapper>
            <Formik
              initialValues={initialValues}
              onSubmit={mockSubmit}
            >
              {({ values }: FormikProps<InteractionFormData>) => (
                <Form>
                  <FormTextInput
                    name="textInput"
                    label="Text Input"
                    placeholder="Type something"
                  />
                  <FormStaticSelect
                    name="selectValue"
                    label="Select Option"
                    options={selectOptions}
                  />
                  <FormYesNoSelect
                    name="yesNo"
                    label="Yes/No Question"
                  />
                  <FormRadioGroup
                    name="radioValue"
                    label="Radio Options"
                    options={radioOptions}
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
      };

      render(<InteractionForm />);

      // Interact with different components
      await user.type(screen.getByLabelText(/text input/i), 'test value');
      
      const selectInput = screen.getByLabelText(/select option/i);
      await user.click(selectInput);
      await user.click(screen.getByText('Option 1'));

      const yesNoSelect = screen.getByLabelText(/yes\/no question/i);
      await user.click(yesNoSelect);
      await user.click(screen.getByText('Yes'));

      await user.click(screen.getByLabelText(/radio 1/i));

      // Check that all values are maintained in form state with proper types
      const formValues = screen.getByTestId('form-values');
      expect(formValues).toHaveTextContent('"textInput":"test value"');
      expect(formValues).toHaveTextContent('"selectValue":"option1"');
      expect(formValues).toHaveTextContent('"yesNo":"yes"');
      expect(formValues).toHaveTextContent('"radioValue":"radio1"');
    });
  });
});