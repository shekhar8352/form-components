import React from 'react';
import { Container, Title, Text, Stack, Group, Button, Paper, Alert } from '@mantine/core';
import { Formik, Form } from 'formik';
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
  FormDatePicker
} from '../../components';

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
  isActive: Yup.string().required('Please select an option'),
  country: Yup.string().required('Country is required'),
  department: Yup.string().required('Department is required'),
  skills: Yup.string().required('Skills selection is required'),
  profilePicture: Yup.array().min(1, 'Profile picture is required'),
  contactMethod: Yup.string().required('Contact method is required'),
  birthDate: Yup.date().required('Birth date is required')
});

// Mock data for selects
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }
];

const contactMethodOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' },
  { value: 'mail', label: 'Postal Mail' }
];

function CrossProjectDemo() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call
    setTimeout(() => {
      alert('Form submitted successfully! Check console for values.');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="md">Cross-Project Compatibility Demo (JavaScript)</Title>
          <Text size="lg" c="dimmed">
            This form demonstrates all form components working together in a JavaScript React project.
            The same components work identically in TypeScript projects with full type safety.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="JavaScript Implementation" color="blue">
          This demo shows the component library working in a JavaScript environment with:
          <ul>
            <li>Formik integration for form state management</li>
            <li>Yup validation schema</li>
            <li>Mantine UI styling and theming</li>
            <li>All 9 form components in a single form</li>
          </ul>
        </Alert>

        <Paper shadow="sm" p="xl" radius="md">
          <Formik
            initialValues={{
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
            }}
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

                  {/* Debug info */}
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
}

export default CrossProjectDemo;