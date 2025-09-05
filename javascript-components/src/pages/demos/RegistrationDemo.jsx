import { useState } from 'react';
import { Container, Title, Text, Stack, Card, Group, Button, Alert, Badge, Tabs } from '@mantine/core';
import { IconCheck, IconCode, IconEye, IconUser } from '@tabler/icons-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CodeBlock from '../../components/CodeBlock';

// Mock components for demo (these would be the actual components in a real implementation)
const FormTextInput = ({ name, label, placeholder, type = 'text', required, ...props }) => (
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

const FormTextArea = ({ name, label, placeholder, rows = 4, required, ...props }) => (
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

const FormYesNoSelect = ({ name, label, required, ...props }) => (
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

const FormStaticSelect = ({ name, label, options, required, ...props }) => (
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

const FormDatePicker = ({ name, label, required, ...props }) => (
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
  const [submittedData, setSubmittedData] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    birthDate: Yup.date().required('Birth date is required'),
    country: Yup.string().required('Country is required'),
    newsletter: Yup.string().required('Please select an option'),
    bio: Yup.string().max(500, 'Bio must be less than 500 characters')
  });

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' }
  ];

  const handleSubmit = (values, { setSubmitting }) => {
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
} from 'reusable-form-components-js';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  birthDate: Yup.date().required('Birth date is required'),
  country: Yup.string().required('Country is required'),
  newsletter: Yup.string().required('Please select an option'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters')
});

function RegistrationForm() {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... more options
  ];

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        birthDate: null,
        country: '',
        newsletter: '',
        bio: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
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
            <IconUser size={32} color="blue" />
            <Title order={1}>Registration Form Demo</Title>
            <Badge color="blue" variant="light">Live Demo</Badge>
          </Group>
          <Text size="lg" c="dimmed">
            Complete user registration form showcasing multiple form components working together
          </Text>
        </div>

        <Tabs defaultValue="demo" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="demo" leftSection={<IconEye size={16} />}>
              Live Demo
            </Tabs.Tab>
            <Tabs.Tab value="code" leftSection={<IconCode size={16} />}>
              Source Code
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="demo" pt="xl">
            <Group align="flex-start" gap="xl">
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
                <Title order={3} mb="md">Registration Form</Title>
                
                <Formik
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
                  <Title order={4} mb="md">Submitted Data</Title>
                  <Alert icon={<IconCheck size={16} />} title="Registration Successful!" color="green" mb="md">
                    <Text size="sm">Form submitted successfully with validation</Text>
                  </Alert>
                  <Stack gap="xs">
                    {Object.entries(submittedData).map(([key, value]) => (
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
              <Title order={3} mb="md">Complete Implementation</Title>
              <Text mb="md" c="dimmed">
                Full source code for the registration form with validation:
              </Text>
              <CodeBlock code={formCode} language="javascript" showLineNumbers />
            </Card>
          </Tabs.Panel>
        </Tabs>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Features Demonstrated</Title>
          <Group gap="xl">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Form Components</Text>
              <Text size="xs" c="dimmed">• FormTextInput (multiple instances)</Text>
              <Text size="xs" c="dimmed">• FormTextArea</Text>
              <Text size="xs" c="dimmed">• FormYesNoSelect</Text>
              <Text size="xs" c="dimmed">• FormStaticSelect</Text>
              <Text size="xs" c="dimmed">• FormDatePicker</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Validation Features</Text>
              <Text size="xs" c="dimmed">• Required field validation</Text>
              <Text size="xs" c="dimmed">• Email format validation</Text>
              <Text size="xs" c="dimmed">• Date validation</Text>
              <Text size="xs" c="dimmed">• Text length limits</Text>
              <Text size="xs" c="dimmed">• Custom error messages</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">UX Features</Text>
              <Text size="xs" c="dimmed">• Loading states</Text>
              <Text size="xs" c="dimmed">• Success feedback</Text>
              <Text size="xs" c="dimmed">• Responsive layout</Text>
              <Text size="xs" c="dimmed">• Accessible form labels</Text>
              <Text size="xs" c="dimmed">• Consistent styling</Text>
            </Stack>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default RegistrationDemo;