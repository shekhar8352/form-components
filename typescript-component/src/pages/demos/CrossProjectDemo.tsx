import React from 'react';
import { Container, Title, Text, Stack, Group, Button, Paper, Alert } from '@mantine/core';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IconInfoCircle } from '@tabler/icons-react';
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
  SelectOption
} from '../../components';

// TypeScript interface for form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  isActive: string;
  country: string;
  department: string;
  skills: string;
  profilePicture: File[];
  contactMethod: string;
  birthDate: Date | null;
}

// Validation schema with TypeScript
const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
  isActive: Yup.string().required('Please select an option'),
  country: Yup.string().required('Country is required'),
  department: Yup.string().required('Department is required'),
  skills: Yup.string().required('Skills selection is required'),
  profilePicture: Yup.array().of(Yup.mixed<File>().required()).min(1, 'Profile picture is required'),
  contactMethod: Yup.string().required('Contact method is required'),
  birthDate: Yup.date().nullable().required('Birth date is required')
});

// Typed options for selects
const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }
];

const contactMethodOptions: SelectOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' },
  { value: 'mail', label: 'Postal Mail' }
];

const CrossProjectDemo: React.FC = () => {
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call with proper typing
    setTimeout(() => {
      alert('Form submitted successfully! Check console for values.');
      setSubmitting(false);
    }, 1000);
  };

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    isActive: '',
    country: '',
    department: '',
    skills: '',
    profilePicture: [],
    contactMethod: '',
    birthDate: null
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="md">Cross-Project Compatibility Demo (TypeScript)</Title>
          <Text size="lg" c="dimmed">
            This form demonstrates all form components working together in a TypeScript React project
            with full type safety, IntelliSense support, and compile-time error checking.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="TypeScript Implementation" color="green">
          This demo shows the component library working in a TypeScript environment with:
          <ul>
            <li>Full type safety for all props and form values</li>
            <li>IntelliSense support in IDEs</li>
            <li>Compile-time error checking</li>
            <li>Typed Formik integration and validation</li>
            <li>All 9 form components with proper TypeScript interfaces</li>
          </ul>
        </Alert>

        <Paper shadow="sm" p="xl" radius="md">
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Stack gap="md">
                  <Title order={3} mb="sm">Personal Information</Title>
                  
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

                  <FormTextArea
                    name="bio"
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    description="Maximum 500 characters"
                  />

                  <FormDatePicker
                    name="birthDate"
                    label="Birth Date"
                    placeholder="Select your birth date"
                    required
                  />

                  <Title order={3} mt="lg" mb="sm">Preferences & Settings</Title>

                  <FormYesNoSelect
                    name="isActive"
                    label="Are you currently active?"
                    placeholder="Select Yes or No"
                    required
                  />

                  <FormStaticSelect
                    name="country"
                    label="Country"
                    placeholder="Select your country"
                    options={countryOptions}
                    searchable
                    required
                  />

                  <FormDynamicSelect
                    name="department"
                    label="Department"
                    placeholder="Select your department"
                    apiUrl="/api/departments"
                    required
                  />

                  <FormSearchableSelect
                    name="skills"
                    label="Primary Skill"
                    placeholder="Search for skills..."
                    searchApiUrl="/api/skills/search"
                    searchParam="q"
                    minSearchLength={2}
                    required
                  />

                  <FormRadioGroup
                    name="contactMethod"
                    label="Preferred Contact Method"
                    options={contactMethodOptions}
                    required
                  />

                  <FormFileUpload
                    name="profilePicture"
                    label="Profile Picture"
                    accept="image/*"
                    maxSize={5 * 1024 * 1024} // 5MB
                    uploadButtonText="Upload Profile Picture"
                    required
                  />

                  <Group justify="space-between" mt="xl">
                    <Button variant="outline" type="button">
                      Reset Form
                    </Button>
                    <Button type="submit" loading={isSubmitting}>
                      Submit Form
                    </Button>
                  </Group>

                  {/* Debug info with proper typing */}
                  <Paper bg="gray.0" p="md" mt="lg">
                    <Text size="sm" fw={500} mb="xs">Current Form Values (Debug):</Text>
                    <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                      {JSON.stringify(values, null, 2)}
                    </Text>
                  </Paper>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CrossProjectDemo;