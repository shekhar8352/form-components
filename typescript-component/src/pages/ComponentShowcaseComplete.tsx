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
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IconInfoCircle, IconCheck, IconCode, IconEye, IconBrandTypescript } from '@tabler/icons-react';
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
} from '../components';

// TypeScript interface for form values
interface ShowcaseFormValues {
  textInput: string;
  textArea: string;
  yesNoSelect: string;
  staticSelect: string;
  dynamicSelect: string;
  searchableSelect: string;
  fileUpload: File[];
  radioGroup: string;
  datePicker: Date | null;
}

// Typed validation schema
const validationSchema: Yup.ObjectSchema<ShowcaseFormValues> = Yup.object({
  textInput: Yup.string().required('Text input is required'),
  textArea: Yup.string().max(200, 'Maximum 200 characters'),
  yesNoSelect: Yup.string().required('Please select an option'),
  staticSelect: Yup.string().required('Static select is required'),
  dynamicSelect: Yup.string().required('Dynamic select is required'),
  searchableSelect: Yup.string().required('Searchable select is required'),
  fileUpload: Yup.array().of(Yup.mixed<File>().required()).min(1, 'Please upload at least one file'),
  radioGroup: Yup.string().required('Please select a radio option'),
  datePicker: Yup.date().nullable().required('Date is required')
});

// Typed mock data
const staticOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const radioOptions: SelectOption[] = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' }
];

// Component information with types
interface ComponentInfo {
  name: string;
  description: string;
  props: string[];
  typeInterface: string;
}

const ComponentShowcaseComplete: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('demo');
  const [submittedValues, setSubmittedValues] = useState<ShowcaseFormValues | null>(null);

  const handleSubmit = (
    values: ShowcaseFormValues, 
    { setSubmitting }: FormikHelpers<ShowcaseFormValues>
  ): void => {
    console.log('Form submitted with values:', values);
    setSubmittedValues(values);
    
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  const initialValues: ShowcaseFormValues = {
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

  const componentInfo: ComponentInfo[] = [
    {
      name: 'FormTextInput',
      description: 'Standard text input with validation and error display',
      props: ['name', 'type', 'label', 'placeholder', 'required', 'width'],
      typeInterface: 'FormTextInputProps'
    },
    {
      name: 'FormTextArea',
      description: 'Multi-line text input for larger content',
      props: ['name', 'label', 'rows', 'maxLength', 'autosize'],
      typeInterface: 'FormTextAreaProps'
    },
    {
      name: 'FormYesNoSelect',
      description: 'Binary choice dropdown with Yes/No options',
      props: ['name', 'label', 'yesLabel', 'noLabel', 'clearable'],
      typeInterface: 'FormYesNoSelectProps'
    },
    {
      name: 'FormStaticSelect',
      description: 'Single-select dropdown with predefined options',
      props: ['name', 'label', 'options', 'searchable', 'clearable'],
      typeInterface: 'FormStaticSelectProps'
    },
    {
      name: 'FormDynamicSelect',
      description: 'Single-select dropdown with API-loaded options',
      props: ['name', 'label', 'apiUrl', 'valueKey', 'labelKey'],
      typeInterface: 'FormDynamicSelectProps'
    },
    {
      name: 'FormSearchableSelect',
      description: 'Server-side searchable dropdown with debouncing',
      props: ['name', 'label', 'searchApiUrl', 'debounceMs', 'minSearchLength'],
      typeInterface: 'FormSearchableSelectProps'
    },
    {
      name: 'FormFileUpload',
      description: 'File upload with file list display and removal',
      props: ['name', 'label', 'accept', 'multiple', 'maxSize', 'maxFiles'],
      typeInterface: 'FormFileUploadProps'
    },
    {
      name: 'FormRadioGroup',
      description: 'Radio button groups for single-choice selections',
      props: ['name', 'label', 'options', 'orientation', 'spacing'],
      typeInterface: 'FormRadioGroupProps'
    },
    {
      name: 'FormDatePicker',
      description: 'Date selection with validation',
      props: ['name', 'label', 'minDate', 'maxDate', 'clearable'],
      typeInterface: 'FormDatePickerProps'
    }
  ];

  const codeExample = `import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
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
  FormDatePicker,
  SelectOption
} from 'reusable-form-components-ts';

// Type-safe form values interface
interface FormValues {
  textInput: string;
  textArea: string;
  yesNoSelect: string;
  staticSelect: string;
  dynamicSelect: string;
  searchableSelect: string;
  fileUpload: File[];
  radioGroup: string;
  datePicker: Date | null;
}

// Typed validation schema
const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  textInput: Yup.string().required('Required'),
  textArea: Yup.string().max(200, 'Max 200 chars'),
  yesNoSelect: Yup.string().required('Required'),
  staticSelect: Yup.string().required('Required'),
  dynamicSelect: Yup.string().required('Required'),
  searchableSelect: Yup.string().required('Required'),
  fileUpload: Yup.array().of(Yup.mixed<File>().required()).min(1, 'Required'),
  radioGroup: Yup.string().required('Required'),
  datePicker: Yup.date().nullable().required('Required')
});

// Typed options
const staticOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

const MyTypedForm: React.FC = () => {
  const handleSubmit = (
    values: FormValues, 
    { setSubmitting }: FormikHelpers<FormValues>
  ): void => {
    console.log(values); // Fully typed values
    setSubmitting(false);
  };

  const initialValues: FormValues = {
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

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormTextInput name="textInput" label="Text Input" required />
        <FormTextArea name="textArea" label="Text Area" />
        <FormYesNoSelect name="yesNoSelect" label="Yes/No" required />
        <FormStaticSelect 
          name="staticSelect" 
          label="Static Select" 
          options={staticOptions}
          required 
        />
        {/* ... other components with full type safety */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="xs" mb="md">
            <IconBrandTypescript size={32} color="blue" />
            <Title order={1}>Complete Component Showcase (TypeScript)</Title>
          </Group>
          <Text size="lg" c="dimmed">
            Interactive demonstration of all 9 form components working together in a TypeScript React environment
            with full type safety, IntelliSense support, and compile-time error checking.
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="TypeScript Implementation" color="green">
          This showcase demonstrates all components in a TypeScript environment with:
          <ul>
            <li>Full type safety for all props and form values</li>
            <li>IntelliSense support and auto-completion</li>
            <li>Compile-time error checking and validation</li>
            <li>Typed Formik integration and validation schemas</li>
          </ul>
        </Alert>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="demo" leftSection={<IconEye size={16} />}>
              Live TypeScript Demo
            </Tabs.Tab>
            <Tabs.Tab value="code" leftSection={<IconCode size={16} />}>
              TypeScript Code
            </Tabs.Tab>
            <Tabs.Tab value="components" leftSection={<IconInfoCircle size={16} />}>
              Type Interfaces
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="demo" pt="md">
            <Paper shadow="sm" p="xl" radius="md">
              <Formik<ShowcaseFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <Stack gap="md">
                      <Group gap="xs" mb="sm">
                        <IconBrandTypescript size={24} color="blue" />
                        <Title order={3}>All Form Components Demo (Type-Safe)</Title>
                      </Group>
                      
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
                          label="Static Select (Typed Options)"
                          placeholder="Choose from predefined options"
                          options={staticOptions}
                          searchable
                          required
                        />

                        <FormDynamicSelect
                          name="dynamicSelect"
                          label="Dynamic Select (Typed API)"
                          placeholder="Options loaded from API"
                          apiUrl="/api/departments"
                          required
                        />
                      </SimpleGrid>

                      <FormSearchableSelect
                        name="searchableSelect"
                        label="Searchable Select (Typed Search)"
                        placeholder="Type to search..."
                        searchApiUrl="/api/skills/search"
                        searchParam="q"
                        minSearchLength={2}
                        required
                      />

                      <FormRadioGroup
                        name="radioGroup"
                        label="Radio Group (Typed Options)"
                        options={radioOptions}
                        orientation="horizontal"
                        required
                      />

                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <FormDatePicker
                          name="datePicker"
                          label="Date Picker (Typed Date)"
                          placeholder="Select a date"
                          clearable
                          required
                        />

                        <FormFileUpload
                          name="fileUpload"
                          label="File Upload (Typed Files)"
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
                          Submit All Components (Type-Safe)
                        </Button>
                      </Group>

                      {/* Real-time form state with type information */}
                      <Paper bg="gray.0" p="md" mt="lg">
                        <Group gap="xs" mb="xs">
                          <IconBrandTypescript size={16} color="blue" />
                          <Text size="sm" fw={500}>Current Form State (Typed as ShowcaseFormValues):</Text>
                        </Group>
                        <Code block style={{ fontSize: '11px', maxHeight: '200px', overflow: 'auto' }}>
                          {JSON.stringify(values, null, 2)}
                        </Code>
                      </Paper>

                      {/* Submission result with type safety */}
                      {submittedValues && (
                        <Alert icon={<IconCheck size={16} />} title="Form Submitted Successfully with Type Safety!" color="green">
                          <Text size="sm" mb="xs">Submitted values (typed as ShowcaseFormValues):</Text>
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
              <Group gap="xs" mb="md">
                <IconBrandTypescript size={24} color="blue" />
                <Title order={3}>Complete TypeScript Implementation</Title>
              </Group>
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
                    <Group gap="xs">
                      <Badge color="blue" variant="light" size="sm">
                        TypeScript
                      </Badge>
                      <Badge color="green" variant="light" size="sm">
                        Typed
                      </Badge>
                    </Group>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="md" style={{ minHeight: '40px' }}>
                    {component.description}
                  </Text>
                  
                  <Text size="xs" fw={500} c="dimmed" mb="xs">
                    Interface: <Code>{component.typeInterface}</Code>
                  </Text>
                  
                  <Text size="xs" fw={500} c="dimmed" mb="xs">Key Typed Props:</Text>
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
          <Group gap="xs" mb="md">
            <IconBrandTypescript size={24} color="blue" />
            <Title order={3}>TypeScript Benefits in Action</Title>
          </Group>
          <Text c="dimmed" mb="lg">
            This TypeScript implementation provides the same functionality as the JavaScript version
            but with additional compile-time safety, better tooling, and enhanced developer experience.
          </Text>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="blue" />
                <Text fw={500} size="sm">Type Safety</Text>
              </Group>
              <Text size="xs" c="dimmed">• Compile-time error checking</Text>
              <Text size="xs" c="dimmed">• Interface-driven development</Text>
              <Text size="xs" c="dimmed">• Strict prop validation</Text>
              <Text size="xs" c="dimmed">• Type-safe form handling</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="green" />
                <Text fw={500} size="sm">Developer Experience</Text>
              </Group>
              <Text size="xs" c="dimmed">• IntelliSense auto-completion</Text>
              <Text size="xs" c="dimmed">• Real-time error detection</Text>
              <Text size="xs" c="dimmed">• Refactoring confidence</Text>
              <Text size="xs" c="dimmed">• Self-documenting code</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconCheck size={20} color="orange" />
                <Text fw={500} size="sm">Cross-Project Compatibility</Text>
              </Group>
              <Text size="xs" c="dimmed">• Same API as JavaScript version</Text>
              <Text size="xs" c="dimmed">• Easy migration path</Text>
              <Text size="xs" c="dimmed">• Consistent behavior</Text>
              <Text size="xs" c="dimmed">• Team flexibility</Text>
            </Stack>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
};

export default ComponentShowcaseComplete;