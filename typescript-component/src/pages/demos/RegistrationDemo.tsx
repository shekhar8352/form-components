import { useState } from 'react';
import { Container, Title, Text, Stack, Card, Group, Button, Alert, Badge, Tabs } from '@mantine/core';
import { IconCheck, IconCode, IconEye, IconUser, IconBrandTypescript } from '@tabler/icons-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CodeBlock from '../../components/CodeBlock';

// TypeScript interfaces for form data
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  country: string;
  newsletter: string;
  bio: string;
}

interface CountryOption {
  value: string;
  label: string;
}

// Mock components for demo with TypeScript props
interface FormInputProps {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

interface FormSelectProps {
  name: keyof FormValues;
  label: string;
  options?: CountryOption[];
  required?: boolean;
}

interface FormTextAreaProps {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

const FormTextInput: React.FC<FormInputProps> = ({ name, label, placeholder, type = 'text', required, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '14px'
      }}
      {...props}
    />
  </div>
);

const FormTextArea: React.FC<FormTextAreaProps> = ({ name, label, placeholder, rows = 4, required, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      required={required}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '14px',
        resize: 'vertical'
      }}
      {...props}
    />
  </div>
);

const FormYesNoSelect: React.FC<FormInputProps> = ({ name, label, required, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <select
      name={name}
      required={required}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '14px'
      }}
      {...props}
    >
      <option value="">Select option</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>
);

const FormStaticSelect: React.FC<FormSelectProps> = ({ name, label, options = [], required, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <select
      name={name}
      required={required}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '14px'
      }}
      {...props}
    >
      <option value="">Select option</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormDatePicker: React.FC<FormInputProps> = ({ name, label, required, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input
      name={name}
      type="date"
      required={required}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '14px'
      }}
      {...props}
    />
  </div>
);

function RegistrationDemo() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Type-safe validation schema
  const validationSchema = Yup.object<FormValues>({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    birthDate: Yup.string().required('Birth date is required'),
    country: Yup.string().required('Country is required'),
    newsletter: Yup.string().required('Please select an option'),
    bio: Yup.string().max(500, 'Bio must be less than 500 characters')
  });

  const countryOptions: CountryOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' }
  ];

  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setTimeout(() => {
      setSubmittedData(values);
      setSubmitting(false);
    }, 1000);
  };

  const formCode = `import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormTextInput,
  FormTextArea,
  FormYesNoSelect,
  FormStaticSelect,
  FormDatePicker
} from 'reusable-form-components-ts';

// TypeScript interfaces
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  country: string;
  newsletter: string;
  bio: string;
}

interface CountryOption {
  value: string;
  label: string;
}

// Type-safe validation schema
const validationSchema = Yup.object<FormValues>({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  birthDate: Yup.string().required('Birth date is required'),
  country: Yup.string().required('Country is required'),
  newsletter: Yup.string().required('Please select an option'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters')
});

function RegistrationForm() {
  const countryOptions: CountryOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... more options
  ];

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    country: '',
    newsletter: '',
    bio: ''
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Typed form values:', values);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack gap="md">
          <Group grow>
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
          </Group>
          
          <FormTextInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          
          <FormDatePicker
            name="birthDate"
            label="Date of Birth"
            required
          />
          
          <FormStaticSelect
            name="country"
            label="Country"
            options={countryOptions}
            required
          />
          
          <FormYesNoSelect
            name="newsletter"
            label="Subscribe to Newsletter"
            required
          />
          
          <FormTextArea
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself (optional)"
            rows={4}
          />
          
          <Button type="submit" size="md">
            Register
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="xs" mb="md">
            <IconBrandTypescript size={32} color="blue" />
            <Title order={1}>TypeScript Registration Demo</Title>
            <Badge color="blue" variant="light">Type-Safe</Badge>
          </Group>
          <Text size="lg" c="dimmed">
            Complete user registration form with full TypeScript support, type-safe validation, and interface-driven development
          </Text>
        </div>

        <Tabs defaultValue="demo" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="demo" leftSection={<IconEye size={16} />}>
              Live Demo
            </Tabs.Tab>
            <Tabs.Tab value="code" leftSection={<IconCode size={16} />}>
              TypeScript Code
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="demo" pt="xl">
            <Group align="flex-start" gap="xl">
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
                <Title order={3} mb="md">Registration Form</Title>
                
                <Formik<FormValues>
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    birthDate: '',
                    country: '',
                    newsletter: '',
                    bio: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Stack gap="md">
                        <Group grow>
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
                        </Group>
                        
                        <FormTextInput
                          name="email"
                          type="email"
                          label="Email Address"
                          placeholder="Enter your email"
                          required
                        />
                        
                        <FormDatePicker
                          name="birthDate"
                          label="Date of Birth"
                          required
                        />
                        
                        <FormStaticSelect
                          name="country"
                          label="Country"
                          options={countryOptions}
                          required
                        />
                        
                        <FormYesNoSelect
                          name="newsletter"
                          label="Subscribe to Newsletter"
                          required
                        />
                        
                        <FormTextArea
                          name="bio"
                          label="Bio"
                          placeholder="Tell us about yourself (optional)"
                          rows={4}
                        />
                        
                        <Button 
                          type="submit" 
                          size="md" 
                          loading={isSubmitting}
                          leftSection={<IconCheck size={16} />}
                        >
                          {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Card>

              {submittedData && (
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: '300px' }}>
                  <Title order={4} mb="md">Typed Form Data</Title>
                  <Alert icon={<IconCheck size={16} />} title="Registration Successful!" color="green" mb="md">
                    <Text size="sm">Form submitted with full type safety</Text>
                  </Alert>
                  <Stack gap="xs">
                    {(Object.entries(submittedData) as [keyof FormValues, string][]).map(([key, value]) => (
                      <Group key={key} justify="space-between">
                        <Text size="sm" fw={500}>{key}:</Text>
                        <Text size="sm" c="dimmed">{value || 'N/A'}</Text>
                      </Group>
                    ))}
                  </Stack>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    mt="md" 
                    onClick={() => setSubmittedData(null)}
                  >
                    Reset
                  </Button>
                </Card>
              )}
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="code" pt="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Complete TypeScript Implementation</Title>
              <Text mb="md" c="dimmed">
                Full source code with TypeScript interfaces, type-safe validation, and generic Formik usage:
              </Text>
              <CodeBlock code={formCode} language="typescript" showLineNumbers />
            </Card>
          </Tabs.Panel>
        </Tabs>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">TypeScript Features Demonstrated</Title>
          <Group gap="xl">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Type Safety</Text>
              <Text size="xs" c="dimmed">• Strict interface definitions</Text>
              <Text size="xs" c="dimmed">• Generic Formik components</Text>
              <Text size="xs" c="dimmed">• Type-safe validation schemas</Text>
              <Text size="xs" c="dimmed">• Compile-time error checking</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Developer Experience</Text>
              <Text size="xs" c="dimmed">• IntelliSense auto-completion</Text>
              <Text size="xs" c="dimmed">• Real-time type checking</Text>
              <Text size="xs" c="dimmed">• Refactoring confidence</Text>
              <Text size="xs" c="dimmed">• Self-documenting code</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Advanced Patterns</Text>
              <Text size="xs" c="dimmed">• Generic form handlers</Text>
              <Text size="xs" c="dimmed">• Typed component props</Text>
              <Text size="xs" c="dimmed">• Interface composition</Text>
              <Text size="xs" c="dimmed">• Type-safe form state</Text>
            </Stack>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default RegistrationDemo;