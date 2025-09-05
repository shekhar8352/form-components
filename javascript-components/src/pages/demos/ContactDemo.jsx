import { useState } from 'react';
import { Container, Title, Text, Stack, Card, Group, Button, Alert, Badge, Tabs, Progress } from '@mantine/core';
import { IconMail, IconCode, IconEye, IconCheck, IconClock } from '@tabler/icons-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CodeBlock from '../../components/CodeBlock';

// Mock components for demo
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

const FormFileUpload = ({ name, label, accept, multiple, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
      {label}
    </label>
    <input
      name={name}
      type="file"
      accept={accept}
      multiple={multiple}
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

function ContactDemo() {
  const [submittedData, setSubmittedData] = useState(null);
  const [submissionProgress, setSubmissionProgress] = useState(0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    priority: Yup.string().required('Priority is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required'),
    attachments: Yup.mixed()
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmissionProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setSubmissionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSubmittedData(values);
          setSubmitting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formCode = `import { Formik, Form } from 'formik';
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
  attachments: Yup.mixed()
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
        attachments: null
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
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
          />
          
          <Button type="submit" size="md">
            Send Message
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
            <IconMail size={32} color="blue" />
            <Title order={1}>Contact Form Demo</Title>
            <Badge color="green" variant="light">Live Demo</Badge>
          </Group>
          <Text size="lg" c="dimmed">
            Professional contact form with file upload, priority selection, and progress tracking
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
                <Title order={3} mb="md">Contact Us</Title>
                
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    priority: '',
                    message: '',
                    attachments: null
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
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
                          label="Attachments (Optional)"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                          multiple
                        />
                        
                        {isSubmitting && (
                          <div>
                            <Group justify="space-between" mb="xs">
                              <Text size="sm">Sending message...</Text>
                              <Text size="sm">{submissionProgress}%</Text>
                            </Group>
                            <Progress value={submissionProgress} size="sm" />
                          </div>
                        )}
                        
                        <Button 
                          type="submit" 
                          size="md" 
                          loading={isSubmitting}
                          leftSection={<IconMail size={16} />}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Card>

              {submittedData && (
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: '300px' }}>
                  <Title order={4} mb="md">Message Sent</Title>
                  <Alert icon={<IconCheck size={16} />} title="Success!" color="green" mb="md">
                    <Text size="sm">Your message has been sent successfully</Text>
                  </Alert>
                  
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>Name:</Text>
                      <Text size="sm" c="dimmed">{submittedData.name}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>Email:</Text>
                      <Text size="sm" c="dimmed">{submittedData.email}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>Subject:</Text>
                      <Text size="sm" c="dimmed">{submittedData.subject}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>Priority:</Text>
                      <Badge size="sm" color={
                        submittedData.priority === 'urgent' ? 'red' :
                        submittedData.priority === 'high' ? 'orange' :
                        submittedData.priority === 'medium' ? 'yellow' : 'gray'
                      }>
                        {submittedData.priority}
                      </Badge>
                    </Group>
                  </Stack>
                  
                  <Alert icon={<IconClock size={16} />} title="Response Time" color="blue" mt="md" mb="md">
                    <Text size="sm">
                      Expected response: {
                        submittedData.priority === 'urgent' ? '2-4 hours' :
                        submittedData.priority === 'high' ? '4-8 hours' :
                        submittedData.priority === 'medium' ? '1-2 days' : '2-3 days'
                      }
                    </Text>
                  </Alert>
                  
                  <Button 
                    variant="outline" 
                    size="xs" 
                    onClick={() => {
                      setSubmittedData(null);
                      setSubmissionProgress(0);
                    }}
                  >
                    Send Another Message
                  </Button>
                </Card>
              )}
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="code" pt="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Complete Implementation</Title>
              <Text mb="md" c="dimmed">
                Full source code for the contact form with file upload and validation:
              </Text>
              <CodeBlock code={formCode} language="javascript" showLineNumbers />
            </Card>
          </Tabs.Panel>
        </Tabs>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Advanced Features Demonstrated</Title>
          <Group gap="xl">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Form Components</Text>
              <Text size="xs" c="dimmed">• FormTextInput (multiple types)</Text>
              <Text size="xs" c="dimmed">• FormTextArea (large content)</Text>
              <Text size="xs" c="dimmed">• FormStaticSelect (priority)</Text>
              <Text size="xs" c="dimmed">• FormFileUpload (attachments)</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">UX Enhancements</Text>
              <Text size="xs" c="dimmed">• Progress tracking</Text>
              <Text size="xs" c="dimmed">• Priority-based responses</Text>
              <Text size="xs" c="dimmed">• File upload feedback</Text>
              <Text size="xs" c="dimmed">• Success confirmation</Text>
            </Stack>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={500} size="sm">Business Logic</Text>
              <Text size="xs" c="dimmed">• Priority-based SLA</Text>
              <Text size="xs" c="dimmed">• File type validation</Text>
              <Text size="xs" c="dimmed">• Message length limits</Text>
              <Text size="xs" c="dimmed">• Email format validation</Text>
            </Stack>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default ContactDemo;