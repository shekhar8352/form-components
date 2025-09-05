import { Container, Title, Text, Stack, Card, Table, Badge, Group, Tabs, Alert } from '@mantine/core';
import { IconInfoCircle, IconCode, IconEye, IconSettings } from '@tabler/icons-react';
import CodeBlock from '../../components/CodeBlock';

interface PropData {
  prop: string;
  type: string;
  required: boolean;
  default: string;
  description: string;
}

function FormTextInputDocs() {
  const basicUsageCode = `import { Formik, Form } from 'formik';
import { FormTextInput } from 'reusable-form-components-ts';
import { Button, Stack } from '@mantine/core';

interface FormValues {
  name: string;
}

function BasicExample() {
  const initialValues: FormValues = { name: '' };
  
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack gap="md">
          <FormTextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  const validationCode = `import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormTextInput } from 'reusable-form-components-ts';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object<FormValues>({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

function ValidationExample() {
  const initialValues: FormValues = { email: '', password: '' };
  
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack gap="md">
          <FormTextInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          <FormTextInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  const typescriptInterfaceCode = `import { FormTextInputProps } from 'reusable-form-components-ts';

// Base interface for all form components
interface BaseFormComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  description?: string;
  withAsterisk?: boolean;
}

// FormTextInput specific props
interface FormTextInputProps extends BaseFormComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}`;

  const propsData: PropData[] = [
    { prop: 'name', type: 'string', required: true, default: '-', description: 'Formik field name' },
    { prop: 'label', type: 'string', required: false, default: '-', description: 'Input label text' },
    { prop: 'placeholder', type: 'string', required: false, default: '-', description: 'Input placeholder text' },
    { prop: 'type', type: 'InputType', required: false, default: 'text', description: 'Input type (text, email, password, etc.)' },
    { prop: 'required', type: 'boolean', required: false, default: 'false', description: 'Whether the field is required' },
    { prop: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Whether the input is disabled' },
    { prop: 'size', type: 'MantineSize', required: false, default: 'sm', description: 'Mantine size (xs, sm, md, lg, xl)' },
    { prop: 'width', type: 'string | number', required: false, default: '-', description: 'Custom width override' },
    { prop: 'maxLength', type: 'number', required: false, default: '-', description: 'Maximum character length' },
    { prop: 'minLength', type: 'number', required: false, default: '-', description: 'Minimum character length' },
    { prop: 'leftSection', type: 'React.ReactNode', required: false, default: '-', description: 'Content for left section (icons, etc.)' },
    { prop: 'rightSection', type: 'React.ReactNode', required: false, default: '-', description: 'Content for right section (icons, etc.)' },
    { prop: 'description', type: 'string', required: false, default: '-', description: 'Help text below the input' },
    { prop: 'withAsterisk', type: 'boolean', required: false, default: 'false', description: 'Show asterisk for required fields' },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="xs" mb="md">
            <Title order={1}>FormTextInput</Title>
            <Badge color="green" variant="light">Stable</Badge>
            <Badge color="blue" variant="light">TypeScript</Badge>
          </Group>
          <Text size="lg" c="dimmed">
            Standard text input component with full TypeScript support, Formik integration, and comprehensive type safety.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="TypeScript Benefits" color="blue">
          <Text size="sm">
            • Full type safety with comprehensive interfaces<br/>
            • IntelliSense support for all props and methods<br/>
            • Compile-time validation of prop types<br/>
            • Generic form value typing with Formik<br/>
            • Strict type checking for validation schemas
          </Text>
        </Alert>

        <Tabs defaultValue="usage" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="usage" leftSection={<IconCode size={16} />}>
              Usage
            </Tabs.Tab>
            <Tabs.Tab value="types" leftSection={<IconSettings size={16} />}>
              TypeScript Types
            </Tabs.Tab>
            <Tabs.Tab value="examples" leftSection={<IconEye size={16} />}>
              Examples
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="usage" pt="xl">
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Basic TypeScript Usage</Title>
                <Text mb="md">
                  Using FormTextInput with proper TypeScript interfaces:
                </Text>
                <CodeBlock code={basicUsageCode} language="typescript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">With Typed Validation</Title>
                <Text mb="md">
                  Using FormTextInput with typed Yup validation schema:
                </Text>
                <CodeBlock code={validationCode} language="typescript" />
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="types" pt="xl">
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">TypeScript Interfaces</Title>
                <Text mb="md" c="dimmed">
                  Complete TypeScript interface definitions for FormTextInput:
                </Text>
                <CodeBlock code={typescriptInterfaceCode} language="typescript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Component Props</Title>
                <Text mb="md" c="dimmed">
                  All available props with TypeScript types:
                </Text>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Prop</Table.Th>
                      <Table.Th>Type</Table.Th>
                      <Table.Th>Required</Table.Th>
                      <Table.Th>Default</Table.Th>
                      <Table.Th>Description</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {propsData.map((row) => (
                      <Table.Tr key={row.prop}>
                        <Table.Td>
                          <Text fw={500} size="sm">{row.prop}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" size="sm">{row.type}</Badge>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={row.required ? 'red' : 'gray'} variant="light" size="sm">
                            {row.required ? 'Yes' : 'No'}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" c="dimmed">{row.default}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{row.description}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="examples" pt="xl">
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">TypeScript Best Practices</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Define Form Interfaces</Text>
                    <Text size="sm" c="dimmed">
                      Always define TypeScript interfaces for your form values to ensure type safety
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Use Generic Formik</Text>
                    <Text size="sm" c="dimmed">
                      Use Formik&lt;FormValues&gt; to get typed form state and handlers
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Typed Validation Schemas</Text>
                    <Text size="sm" c="dimmed">
                      Use Yup.object&lt;FormValues&gt;() for type-safe validation schemas
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Strict Type Checking</Text>
                    <Text size="sm" c="dimmed">
                      Enable strict mode in TypeScript for maximum type safety
                    </Text>
                  </div>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Common TypeScript Patterns</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Optional vs Required Fields</Text>
                    <Text size="sm" c="dimmed">
                      Use optional properties (field?: string) for non-required form fields
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Union Types for Input Types</Text>
                    <Text size="sm" c="dimmed">
                      Leverage union types for type-safe input type specification
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Generic Components</Text>
                    <Text size="sm" c="dimmed">
                      Create reusable form components with generic type parameters
                    </Text>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default FormTextInputDocs;