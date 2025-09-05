import { Container, Title, Text, Stack, Card, Table, Badge, Group, Tabs, Alert } from '@mantine/core';
import { IconInfoCircle, IconCode, IconEye, IconSettings } from '@tabler/icons-react';
import CodeBlock from '../../components/CodeBlock';

function FormYesNoSelectDocs() {
  const basicUsageCode = `import { Formik, Form } from 'formik';
import { FormYesNoSelect } from 'reusable-form-components-js';
import { Button, Stack } from '@mantine/core';

function BasicExample() {
  return (
    <Formik
      initialValues={{ isActive: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Stack gap="md">
          <FormYesNoSelect
            name="isActive"
            label="Are you currently active?"
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  const customLabelsCode = `import { FormYesNoSelect } from 'reusable-form-components-js';

function CustomLabelsExample() {
  return (
    <Stack gap="md">
      <FormYesNoSelect
        name="hasExperience"
        label="Do you have prior experience?"
        yesLabel="I have experience"
        noLabel="I'm a beginner"
        required
      />
      
      <FormYesNoSelect
        name="agreeToTerms"
        label="Do you agree to the terms?"
        yesLabel="I agree"
        noLabel="I disagree"
        required
      />
    </Stack>
  );
}`;

  const validationCode = `import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormYesNoSelect } from 'reusable-form-components-js';

const validationSchema = Yup.object({
  newsletter: Yup.string()
    .required('Please select an option'),
  terms: Yup.string()
    .oneOf(['yes'], 'You must agree to the terms')
    .required('Agreement is required')
});

function ValidationExample() {
  return (
    <Formik
      initialValues={{ newsletter: '', terms: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Stack gap="md">
          <FormYesNoSelect
            name="newsletter"
            label="Subscribe to newsletter?"
            required
          />
          <FormYesNoSelect
            name="terms"
            label="Agree to terms and conditions?"
            yesLabel="I agree"
            noLabel="I disagree"
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}`;

  const propsData = [
    { prop: 'name', type: 'string', required: true, default: '-', description: 'Formik field name' },
    { prop: 'label', type: 'string', required: false, default: '-', description: 'Select label text' },
    { prop: 'yesLabel', type: 'string', required: false, default: 'Yes', description: 'Custom label for Yes option' },
    { prop: 'noLabel', type: 'string', required: false, default: 'No', description: 'Custom label for No option' },
    { prop: 'required', type: 'boolean', required: false, default: 'false', description: 'Whether the field is required' },
    { prop: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Whether the select is disabled' },
    { prop: 'clearable', type: 'boolean', required: false, default: 'true', description: 'Whether the selection can be cleared' },
    { prop: 'searchable', type: 'boolean', required: false, default: 'false', description: 'Whether the select is searchable' },
    { prop: 'size', type: 'string', required: false, default: 'sm', description: 'Mantine size (xs, sm, md, lg, xl)' },
    { prop: 'width', type: 'string | number', required: false, default: '-', description: 'Custom width override' },
    { prop: 'placeholder', type: 'string', required: false, default: 'Select option', description: 'Placeholder text when no option is selected' },
    { prop: 'description', type: 'string', required: false, default: '-', description: 'Help text below the select' },
    { prop: 'withAsterisk', type: 'boolean', required: false, default: 'false', description: 'Show asterisk for required fields' },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="xs" mb="md">
            <Title order={1}>FormYesNoSelect</Title>
            <Badge color="green" variant="light">Stable</Badge>
          </Group>
          <Text size="lg" c="dimmed">
            Binary choice dropdown component with predefined Yes/No options, perfect for boolean decisions and consent forms.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="Key Features" color="blue">
          <Text size="sm">
            • Predefined Yes/No options with customizable labels<br/>
            • Seamless Formik integration with validation support<br/>
            • Optional clear functionality for non-required fields<br/>
            • Consistent styling with other form components<br/>
            • Built-in accessibility features
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
                  The simplest way to use FormYesNoSelect for binary choices:
                </Text>
                <CodeBlock code={basicUsageCode} language="javascript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">With Validation</Title>
                <Text mb="md">
                  Using FormYesNoSelect with validation requirements:
                </Text>
                <CodeBlock code={validationCode} language="javascript" />
              </Card>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="props" pt="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Component Props</Title>
              <Text mb="md" c="dimmed">
                All available props for the FormYesNoSelect component:
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
                <Title order={3} mb="md">Custom Labels</Title>
                <Text mb="md">
                  Customize the Yes/No labels to match your use case:
                </Text>
                <CodeBlock code={customLabelsCode} language="javascript" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Common Use Cases</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Newsletter Subscription</Text>
                    <Text size="sm" c="dimmed">Perfect for opt-in/opt-out decisions</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Terms Agreement</Text>
                    <Text size="sm" c="dimmed">Use with validation to ensure agreement</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Feature Preferences</Text>
                    <Text size="sm" c="dimmed">Enable/disable features in user settings</Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Survey Questions</Text>
                    <Text size="sm" c="dimmed">Binary response questions in forms</Text>
                  </div>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Best Practices</Title>
                <Stack gap="md">
                  <div>
                    <Text fw={500} mb="xs">Clear Labels</Text>
                    <Text size="sm" c="dimmed">
                      Use descriptive labels that clearly indicate what Yes/No means in context
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Validation Messages</Text>
                    <Text size="sm" c="dimmed">
                      Provide clear validation messages when selection is required
                    </Text>
                  </div>
                  <div>
                    <Text fw={500} mb="xs">Default Values</Text>
                    <Text size="sm" c="dimmed">
                      Consider whether to pre-select an option or leave it empty
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

export default FormYesNoSelectDocs;