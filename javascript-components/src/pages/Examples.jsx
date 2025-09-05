import { Container, Title, Text, Stack, Tabs, Card, Group, Badge, Button } from '@mantine/core';
import { IconForms, IconCode, IconEye, IconSettings } from '@tabler/icons-react';
import CodeBlock from '../components/CodeBlock';

function Examples() {
  const registrationFormCode = `import { Formik, Form } from 'formik';
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
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
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
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
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
            placeholder="Select your birth date"
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

  const contactFormCode = `import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormFileUpload
} from 'reusable-form-components-js';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  priority: Yup.string().required('Priority is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
  attachments: Yup.array()
});

function ContactForm() {
  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        subject: '',
        priority: '',
        message: '',
        attachments: []
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Contact form submitted:', values);
      }}
    >
      <Form>
        <Stack gap="md">
          <FormTextInput
            name="name"
            label="Your Name"
            placeholder="Enter your full name"
            required
          />
          
          <FormTextInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          
          <FormTextInput
            name="subject"
            label="Subject"
            placeholder="Brief description of your inquiry"
            required
          />
          
          <FormStaticSelect
            name="priority"
            label="Priority Level"
            placeholder="Select priority"
            options={priorityOptions}
            required
          />
          
          <FormTextArea
            name="message"
            label="Message"
            placeholder="Describe your inquiry in detail..."
            rows={6}
            required
          />
          
          <FormFileUpload
            name="attachments"
            label="Attachments"
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            multiple
            maxSize={5 * 1024 * 1024} // 5MB
          />
          
          <Button type="submit" size="md">
            Send Message
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  const examples = [
    {
      title: 'Registration Form',
      description: 'Complete user registration with validation',
      code: registrationFormCode,
      components: ['FormTextInput', 'FormDatePicker', 'FormStaticSelect', 'FormYesNoSelect', 'FormTextArea']
    },
    {
      title: 'Contact Form',
      description: 'Contact form with file upload and priority selection',
      code: contactFormCode,
      components: ['FormTextInput', 'FormTextArea', 'FormStaticSelect', 'FormFileUpload']
    }
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Examples</Title>
          <Text size="lg" c="dimmed">
            Real-world form implementations using the component library
          </Text>
        </div>

        <Tabs defaultValue="forms" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="forms" leftSection={<IconForms size={16} />}>
              Complete Forms
            </Tabs.Tab>
            <Tabs.Tab value="patterns" leftSection={<IconCode size={16} />}>
              Validation Patterns
            </Tabs.Tab>
            <Tabs.Tab value="styling" leftSection={<IconSettings size={16} />}>
              Custom Styling
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="forms" pt="xl">
            <Stack gap="xl">
              {examples.map((example, index) => (
                <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <div>
                      <Title order={3} mb="xs">{example.title}</Title>
                      <Text c="dimmed" mb="md">{example.description}</Text>
                    </div>
                    <Group gap="xs">
                      <Button variant="light" size="xs" leftSection={<IconEye size={14} />}>
                        Preview
                      </Button>
                    </Group>
                  </Group>
                  
                  <Group gap="xs" mb="md">
                    <Text size="sm" fw={500}>Components used:</Text>
                    {example.components.map((component) => (
                      <Badge key={component} size="sm" variant="light">
                        {component}
                      </Badge>
                    ))}
                  </Group>
                  
                  <CodeBlock 
                    code={example.code} 
                    language="javascript"
                    showLineNumbers
                  />
                </Card>
              ))}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="patterns" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Title order={3} mb="md">Validation Patterns</Title>
              <Text c="dimmed" mb="lg">
                Common validation patterns and schemas will be documented here.
              </Text>
              <Text size="sm" c="blue">
                Coming soon: Yup schemas, custom validators, and validation examples
              </Text>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="styling" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Title order={3} mb="md">Custom Styling Examples</Title>
              <Text c="dimmed" mb="lg">
                Learn how to customize component appearance and create custom themes.
              </Text>
              <Text size="sm" c="blue">
                Coming soon: Theme examples, CSS customization, and styling patterns
              </Text>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default Examples;