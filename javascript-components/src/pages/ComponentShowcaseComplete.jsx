import React, { useState } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Button, 
  Paper, 
  Alert,
  Tabs,
  Code,
  Badge,
  SimpleGrid,
  Card
} from '@mantine/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IconInfoCircle, IconCheck, IconCode, IconEye } from '@tabler/icons-react';
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
} from '../components';

// Validation schema
const validationSchema = Yup.object({
  textInput: Yup.string().required('Text input is required'),
  textArea: Yup.string().max(200, 'Maximum 200 characters'),
  yesNoSelect: Yup.string().required('Please select an option'),
  staticSelect: Yup.string().required('Static select is required'),
  dynamicSelect: Yup.string().required('Dynamic select is required'),
  searchableSelect: Yup.string().required('Searchable select is required'),
  fileUpload: Yup.array().min(1, 'Please upload at least one file'),
  radioGroup: Yup.string().required('Please select a radio option'),
  datePicker: Yup.date().required('Date is required')
});

// Mock data
const staticOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const radioOptions = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' }
];

function ComponentShowcaseComplete() {
  const [activeTab, setActiveTab] = useState('demo');
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    setSubmittedValues(values);
    
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  const initialValues = {
    textInput: '',
    textArea: '',
    yesNoSelect: '',
    staticSelect: '',
    dynamicSelect: '',
    searchableSelect: '',
    fileUpload: [],
    radioGroup: '',
    datePicker: null
  };

  const componentInfo = [
    {
      name: 'FormTextInput',
      description: 'Standard text input with validation and error display',
      props: ['name', 'type', 'label', 'placeholder', 'required', 'width']
    },
    {
      name: 'FormTextArea',
      description: 'Multi-line text input for larger content',
      props: ['name', 'label', 'rows', 'maxLength', 'autosize']
    },
    {
      name: 'FormYesNoSelect',
      description: 'Binary choice dropdown with Yes/No options',
      props: ['name', 'label', 'yesLabel', 'noLabel', 'clearable']
    },
    {
      name: 'FormStaticSelect',
      description: 'Single-select dropdown with predefined options',
      props: ['name', 'label', 'options', 'searchable', 'clearable']
    },
    {
      name: 'FormDynamicSelect',
      description: 'Single-select dropdown with API-loaded options',
      props: ['name', 'label', 'apiUrl', 'valueKey', 'labelKey']
    },
    {
      name: 'FormSearchableSelect',
      description: 'Server-side searchable dropdown with debouncing',
      props: ['name', 'label', 'searchApiUrl', 'debounceMs', 'minSearchLength']
    },
    {
      name: 'FormFileUpload',
      description: 'File upload with file list display and removal',
      props: ['name', 'label', 'accept', 'multiple', 'maxSize', 'maxFiles']
    },
    {
      name: 'FormRadioGroup',
      description: 'Radio button groups for single-choice selections',
      props: ['name', 'label', 'options', 'orientation', 'spacing']
    },
    {
      name: 'FormDatePicker',
      description: 'Date selection with validation',
      props: ['name', 'label', 'minDate', 'maxDate', 'clearable']
    }
  ];

  const codeExample = `import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
} from 'reusable-form-components';

const validationSchema = Yup.object({
  textInput: Yup.string().required('Required'),
  // ... other validation rules
});

function MyForm() {
  return (
    <Formik
      initialValues={{
        textInput: '',
        textArea: '',
        yesNoSelect: '',
        // ... other initial values
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <FormTextInput name="textInput" label="Text Input" required />
        <FormTextArea name="textArea" label="Text Area" />
        <FormYesNoSelect name="yesNoSelect" label="Yes/No" required />
        {/* ... other components */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Complete Component Showcase (JavaScript)</Title>
          <Text size="lg" c="dimmed">
            Interactive demonstration of all 9 form components working together in a JavaScript React environment.
            This showcase demonstrates cross-project compatibility and consistent behavior.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="JavaScript Implementation" color="blue">
          This showcase demonstrates all components in a JavaScript environment with:
          <ul>
            <li>Full Formik integration and validation</li>
            <li>Consistent Mantine UI styling</li>
            <li>Error handling and user feedback</li>
            <li>Real-time form state updates</li>
          </ul>
        </Alert>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="demo" leftSection={<IconEye size={16} />}>
              Live Demo
            </Tabs.Tab>
            <Tabs.Tab value="code" leftSection={<IconCode size={16} />}>
              Code Example
            </Tabs.Tab>
            <Tabs.Tab value="components" leftSection={<IconInfoCircle size={16} />}>
              Component Info
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="demo" pt="md">
            <Paper shadow="sm" p="xl" radius="md">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <Stack gap="md">
                      <Title order={3} mb="sm">All Form Components Demo</Title>
                      
                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <FormTextInput
                          name="textInput"
                          label="Text Input"
                          placeholder="Enter some text"
                          required
                        />
                        
                        <FormYesNoSelect
                          name="yesNoSelect"
                          label="Yes/No Selection"
                          placeholder="Choose Yes or No"
                          required
                        />
                      </SimpleGrid>

                      <FormTextArea
                        name="textArea"
                        label="Text Area"
                        placeholder="Enter a longer description..."
                        rows={3}
                        description="Maximum 200 characters"
                      />

                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <FormStaticSelect
                          name="staticSelect"
                          label="Static Select"
                          placeholder="Choose from predefined options"
                          options={staticOptions}
                          searchable
                          required
                        />

                        <FormDynamicSelect
                          name="dynamicSelect"
                          label="Dynamic Select (API)"
                          placeholder="Options loaded from API"
                          apiUrl="/api/departments"
                          required
                        />
                      </SimpleGrid>

                      <FormSearchableSelect
                        name="searchableSelect"
                        label="Searchable Select"
                        placeholder="Type to search..."
                        searchApiUrl="/api/skills/search"
                        searchParam="q"
                        minSearchLength={2}
                        required
                      />

                      <FormRadioGroup
                        name="radioGroup"
                        label="Radio Group"
                        options={radioOptions}
                        orientation="horizontal"
                        required
                      />

                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <FormDatePicker
                          name="datePicker"
                          label="Date Picker"
                          placeholder="Select a date"
                          clearable
                          required
                        />

                        <FormFileUpload
                          name="fileUpload"
                          label="File Upload"
                          accept="image/*,.pdf,.doc,.docx"
                          multiple
                          maxSize={5 * 1024 * 1024} // 5MB
                          uploadButtonText="Choose Files"
                          required
                        />
                      </SimpleGrid>

                      <Group justify="space-between" mt="xl">
                        <Button variant="outline" type="button">
                          Reset Form
                        </Button>
                        <Button type="submit" loading={isSubmitting}>
                          Submit All Components
                        </Button>
                      </Group>

                      {/* Real-time form state */}
                      <Paper bg="gray.0" p="md" mt="lg">
                        <Text size="sm" fw={500} mb="xs">Current Form State:</Text>
                        <Code block style={{ fontSize: '11px', maxHeight: '200px', overflow: 'auto' }}>
                          {JSON.stringify(values, null, 2)}
                        </Code>
                      </Paper>

                      {/* Submission result */}
                      {submittedValues && (
                        <Alert icon={<IconCheck size={16} />} title="Form Submitted Successfully!" color="green">
                          <Text size="sm" mb="xs">Submitted values:</Text>
                          <Code block style={{ fontSize: '11px', maxHeight: '150px', overflow: 'auto' }}>
                            {JSON.stringify(submittedValues, null, 2)}
                          </Code>
                        </Alert>
                      )}
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="code" pt="md">
            <Paper shadow="sm" p="xl" radius="md">
              <Title order={3} mb="md">Complete Implementation Code</Title>
              <Code block style={{ fontSize: '12px', maxHeight: '600px', overflow: 'auto' }}>
                {codeExample}
              </Code>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="components" pt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
              {componentInfo.map((component) => (
                <Card key={component.name} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{component.name}</Text>
                    <Badge color="blue" variant="light" size="sm">
                      Component
                    </Badge>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="md" style={{ minHeight: '40px' }}>
                    {component.description}
                  </Text>
                  
                  <Text size="xs" fw={500} c="dimmed" mb="xs">Key Props:</Text>
                  <Stack gap="xs">
                    {component.props.slice(0, 4).map((prop) => (
                      <Text key={prop} size="xs" c="dimmed">• {prop}</Text>
                    ))}
                    {component.props.length > 4 && (
                      <Text size="xs" c="dimmed">• ... and {component.props.length - 4} more</Text>
                    )}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>

        <Paper shadow="sm" p="xl" radius="md">
          <Title order={3} mb="md">Cross-Project Compatibility</Title>
          <Text c="dimmed" mb="lg">
            This exact same functionality is available in the TypeScript version with full type safety.
            All components work identically across both JavaScript and TypeScript projects.
          </Text>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="green" />
                <Text fw={500} size="sm">JavaScript Benefits</Text>
              </Group>
              <Text size="xs" c="dimmed">• Quick setup and development</Text>
              <Text size="xs" c="dimmed">• No type annotations needed</Text>
              <Text size="xs" c="dimmed">• Flexible and dynamic</Text>
              <Text size="xs" c="dimmed">• Smaller learning curve</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="blue" />
                <Text fw={500} size="sm">Shared Features</Text>
              </Group>
              <Text size="xs" c="dimmed">• Identical component APIs</Text>
              <Text size="xs" c="dimmed">• Same validation patterns</Text>
              <Text size="xs" c="dimmed">• Consistent styling</Text>
              <Text size="xs" c="dimmed">• Same performance</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="orange" />
                <Text fw={500} size="sm">Migration Path</Text>
              </Group>
              <Text size="xs" c="dimmed">• Easy JS to TS migration</Text>
              <Text size="xs" c="dimmed">• Gradual type adoption</Text>
              <Text size="xs" c="dimmed">• No functionality loss</Text>
              <Text size="xs" c="dimmed">• Team flexibility</Text>
            </Stack>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}

export default ComponentShowcaseComplete;