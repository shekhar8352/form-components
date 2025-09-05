import { Container, Title, Text, Stack, Card, Table, Badge, Group, Tabs, Alert } from '@mantine/core';
import { IconInfoCircle, IconCode, IconEye, IconSettings } from '@tabler/icons-react';
import CodeBlock from '../../components/CodeBlock';

function FormTextInputDocs() {
  const basicUsageCode = `import { Formik, Form } from 'formik';
import { FormTextInput } from 'reusable-form-components-js';
import { Button, Stack } from '@mantine/core';

function BasicExample() {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values) => console.log(values)}
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
import { FormTextInput } from 'reusable-form-components-js';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

function ValidationExample() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
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

  const customizationCode = `import { FormTextInput } from 'reusable-form-components-js';
import { IconUser, IconMail } from '@tabler/icons-react';

function CustomizationExample() {
  return (
    <Stack gap="md">
      {/* Custom width */}
      <FormTextInput
        name="customWidth"
        label="Custom Width"
        width="300px"
        placeholder="Custom width input"
      />
      
      {/* With left section icon */}
      <FormTextInput
        name="withIcon"
        label="With Icon"
        placeholder="Enter your name"
        leftSection={<IconUser size={16} />}
      />
      
      {/* Different sizes */}
      <FormTextInput
        name="smallSize"
        label="Small Size"
        size="xs"
        placeholder="Extra small input"
      />
      
      <FormTextInput
        name="largeSize"
        label="Large Size"
        size="xl"
        placeholder="Extra large input"
      />
    </Stack>
  );
}`;

  const propsData = [
    { prop: 'name', type: 'string', required: true, default: '-', description: 'Formik field name' },
    { prop: 'label', type: 'string', required: false, default: '-', description: 'Input label text' },
    { prop: 'placeholder', type: 'string', required: false, default: '-', description: 'Input placeholder text' },
    { prop: 'type', type: 'string', required: false, default: 'text', description: 'Input type (text, email, password, etc.)' },
    { prop: 'required', type: 'boolean', required: false, default: 'false', description: 'Whether the field is required' },
    { prop: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Whether the input is disabled' },
    { prop: 'size', type: 'string', required: false, default: 'sm', description: 'Mantine size (xs, sm, md, lg, xl)' },
    { prop: 'width', type: 'string | number', required: false, default: '-', description: 'Custom width override' },
    { prop: 'maxLength', type: 'number', required: false, default: '-', description: 'Maximum character length' },
    { prop: 'minLength', type: 'number', required: false, default: '-', description: 'Minimum character length' },
    { prop: 'leftSection', type: 'ReactNode', required: false, default: '-', description: 'Content for left section (icons, etc.)' },
    { prop: 'rightSection', type: 'ReactNode', required: false, default: '-', description: 'Content for right section (icons, etc.)' },
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
          </Group>
          <Text size="lg" c="dimmed">
            Standard text input component with Formik integration, validation support, and customizable styling options.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="Key Features" color="blue">
          <Text size="sm">
            • Seamless Formik integration with automatic error display<br/>
            • Support for various input types (text, email, password, etc.)<br/>
            • Custom width while maintaining Mantine size properties<br/>
            • Left and right section support for icons and additional elements<br/>
            • Built-in validation feedback and error handling
          </Text>
        </Alert>

        <Tabs defaultValue="usage" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="usage" leftSection={<IconCode size={16} />}>
              Usage
            </Tabs.Tab>
            <Tabs.Tab value="props" leftSection={<IconSettings size={16} />}>
              Props
            </Tabs.Tab>
            <Tabs.Tab value="examples" leftSection={<IconEye size={16} />}>
              Examples
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="usage" pt="xl">
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Basic Usage</Title>
                <Text mb="md">
                  The simplest way to use FormTextInput with Formik:
                </Text>
                <CodeBlock code={basicUsageCode} language="javascript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">With Validation</Title>
                <Text mb="md">
                  Using FormTextInput with Yup validation schema:
                </Text>
                <CodeBlock code={validationCode} language="javascript" />
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="props" pt="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Component Props</Title>
              <Text mb="md" c="dimmed">
                All available props for the FormTextInput component:
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
          </Tabs.Panel>

          <Tabs.Panel value="examples" pt="xl">
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Customization Examples</Title>
                <Text mb="md">
                  Various customization options for FormTextInput:
                </Text>
                <CodeBlock code={customizationCode} language="javascript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Common Use Cases</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Email Input</Text>
                    <Text size="sm" c="dimmed">Use type="email" for email validation and mobile keyboard optimization</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Password Input</Text>
                    <Text size="sm" c="dimmed">Use type="password" to hide input text</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Number Input</Text>
                    <Text size="sm" c="dimmed">Use type="number" for numeric inputs with validation</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Search Input</Text>
                    <Text size="sm" c="dimmed">Add search icon in leftSection for search functionality</Text>
                  </div>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Troubleshooting</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Validation not showing</Text>
                    <Text size="sm" c="dimmed">
                      Ensure the component is wrapped in a Formik component and the name prop matches your form schema
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Custom width not applying</Text>
                    <Text size="sm" c="dimmed">
                      The width prop overrides Mantine's size-based width. Use either width or size, not both
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Icons not displaying</Text>
                    <Text size="sm" c="dimmed">
                      Make sure to import icons from @tabler/icons-react and pass them as React elements
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