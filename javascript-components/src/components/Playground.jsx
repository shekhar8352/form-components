import { useState, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Button, 
  Select, 
  Switch,
  Tabs,
  ScrollArea,
  Alert,
  Badge,
  TextInput
} from '@mantine/core';
import { IconCode, IconEye, IconCopy, IconRefresh, IconAlertCircle } from '@tabler/icons-react';
import { Formik, Form } from 'formik';
import Editor from '@monaco-editor/react';
import CodeBlock from './CodeBlock';
import FormTextInput from './FormTextInput/FormTextInput';
import FormYesNoSelect from './FormYesNoSelect/FormYesNoSelect';

const COMPONENT_TEMPLATES = {
  FormTextInput: {
    name: 'FormTextInput',
    description: 'Standard text input with validation',
    defaultCode: `import { Formik, Form } from 'formik';
import { FormTextInput } from 'reusable-form-components-js';
import { Button, Stack } from '@mantine/core';

function Example() {
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
}`,
    props: {
      name: { type: 'string', default: 'name', required: true },
      label: { type: 'string', default: 'Full Name' },
      placeholder: { type: 'string', default: 'Enter your name' },
      required: { type: 'boolean', default: false },
      disabled: { type: 'boolean', default: false },
      type: { 
        type: 'select', 
        default: 'text', 
        options: ['text', 'email', 'password', 'number', 'tel', 'url'] 
      },
      size: { 
        type: 'select', 
        default: 'sm', 
        options: ['xs', 'sm', 'md', 'lg', 'xl'] 
      }
    }
  },
  FormYesNoSelect: {
    name: 'FormYesNoSelect',
    description: 'Binary choice dropdown',
    defaultCode: `import { Formik, Form } from 'formik';
import { FormYesNoSelect } from 'reusable-form-components-js';
import { Button, Stack } from '@mantine/core';

function Example() {
  return (
    <Formik
      initialValues={{ isActive: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Stack gap="md">
          <FormYesNoSelect
            name="isActive"
            label="Are you active?"
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}`,
    props: {
      name: { type: 'string', default: 'isActive', required: true },
      label: { type: 'string', default: 'Are you active?' },
      required: { type: 'boolean', default: false },
      disabled: { type: 'boolean', default: false },
      clearable: { type: 'boolean', default: true },
      size: { 
        type: 'select', 
        default: 'sm', 
        options: ['xs', 'sm', 'md', 'lg', 'xl'] 
      }
    }
  }
};

function Playground() {
  const [selectedComponent, setSelectedComponent] = useState('FormTextInput');
  const [code, setCode] = useState(COMPONENT_TEMPLATES.FormTextInput.defaultCode);
  const [props, setProps] = useState({});
  const [isJavaScript, setIsJavaScript] = useState(true);
  const [error, setError] = useState(null);

  const handleComponentChange = useCallback((componentName) => {
    setSelectedComponent(componentName);
    setCode(COMPONENT_TEMPLATES[componentName].defaultCode);
    setProps({});
    setError(null);
  }, []);

  const handlePropChange = useCallback((propName, value) => {
    setProps(prev => ({
      ...prev,
      [propName]: value
    }));
  }, []);

  const generateCodeWithProps = useCallback(() => {
    const template = COMPONENT_TEMPLATES[selectedComponent];
    const mergedProps = { ...template.props };
    
    // Apply user-modified props
    Object.keys(props).forEach(key => {
      if (mergedProps[key]) {
        mergedProps[key].current = props[key];
      }
    });

    // Generate prop string
    const propStrings = Object.entries(mergedProps)
      .filter(([key, config]) => {
        const value = config.current !== undefined ? config.current : config.default;
        return value !== undefined && value !== '';
      })
      .map(([key, config]) => {
        const value = config.current !== undefined ? config.current : config.default;
        if (config.type === 'boolean') {
          return value ? key : null;
        } else if (config.type === 'string' || config.type === 'select') {
          return `${key}="${value}"`;
        }
        return null;
      })
      .filter(Boolean)
      .join('\n            ');

    return template.defaultCode.replace(
      /(<Form\w+[^>]*>)/,
      `$1\n            ${propStrings}`
    );
  }, [selectedComponent, props]);

  const handleCopyCode = useCallback(() => {
    const codeToGenerate = generateCodeWithProps();
    navigator.clipboard.writeText(codeToGenerate);
  }, [generateCodeWithProps]);

  const handleReset = useCallback(() => {
    setCode(COMPONENT_TEMPLATES[selectedComponent].defaultCode);
    setProps({});
    setError(null);
  }, [selectedComponent]);

  const renderPreview = () => {
    const template = COMPONENT_TEMPLATES[selectedComponent];
    if (!template) return null;

    // Merge default props with user-modified props
    const componentProps = {};
    Object.entries(template.props).forEach(([key, config]) => {
      const value = props[key] !== undefined ? props[key] : config.default;
      if (value !== undefined && value !== '') {
        componentProps[key] = value;
      }
    });

    // Render the appropriate component
    const renderComponent = () => {
      switch (selectedComponent) {
        case 'FormTextInput':
          return <FormTextInput {...componentProps} />;
        case 'FormYesNoSelect':
          return <FormYesNoSelect {...componentProps} />;
        default:
          return <Text c="dimmed">Component not found</Text>;
      }
    };

    return (
      <Formik
        initialValues={{ [componentProps.name || 'field']: '' }}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
          alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
        }}
      >
        <Form>
          <Stack gap="md">
            {renderComponent()}
            <Button type="submit" size="sm" style={{ alignSelf: 'flex-start' }}>
              Test Submit
            </Button>
          </Stack>
        </Form>
      </Formik>
    );
  };

  const renderPropControls = () => {
    const template = COMPONENT_TEMPLATES[selectedComponent];
    if (!template) return null;

    return (
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={4}>Component Props</Title>
          <Badge variant="light" size="sm">
            {Object.keys(template.props).length} props
          </Badge>
        </Group>
        
        <Stack gap="lg">
          {Object.entries(template.props).map(([propName, config]) => {
            const currentValue = props[propName] !== undefined ? props[propName] : config.default;
            
            if (config.type === 'boolean') {
              return (
                <Group key={propName} justify="space-between" align="center" wrap="nowrap">
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {propName}
                      {config.required && <Text component="span" c="red" ml={2}>*</Text>}
                    </Text>
                    <Text size="xs" c="dimmed">Boolean</Text>
                  </div>
                  <Switch
                    checked={currentValue || false}
                    onChange={(event) => handlePropChange(propName, event.currentTarget.checked)}
                    size="sm"
                  />
                </Group>
              );
            } else if (config.type === 'select') {
              return (
                <Stack key={propName} gap="xs">
                  <Text size="sm" fw={500}>
                    {propName}
                    {config.required && <Text component="span" c="red" ml={2}>*</Text>}
                  </Text>
                  <Text size="xs" c="dimmed" mb="xs">
                    Options: {config.options.join(', ')}
                  </Text>
                  <Select
                    value={currentValue}
                    onChange={(value) => handlePropChange(propName, value)}
                    data={config.options}
                    size="sm"
                    placeholder="Select value"
                  />
                </Stack>
              );
            } else {
              return (
                <Stack key={propName} gap="xs">
                  <Text size="sm" fw={500}>
                    {propName}
                    {config.required && <Text component="span" c="red" ml={2}>*</Text>}
                  </Text>
                  <Text size="xs" c="dimmed" mb="xs">
                    {config.type === 'string' ? 'Text input' : config.type}
                  </Text>
                  <TextInput
                    value={currentValue || ''}
                    onChange={(e) => handlePropChange(propName, e.target.value)}
                    placeholder={`Enter ${propName}`}
                    size="sm"
                  />
                </Stack>
              );
            }
          })}
        </Stack>
      </Stack>
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Interactive Playground</Title>
          <Text size="lg" c="dimmed">
            Experiment with components in real-time and generate code snippets
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="md">
              <Select
                label="Component"
                value={selectedComponent}
                onChange={handleComponentChange}
                data={Object.keys(COMPONENT_TEMPLATES)}
                style={{ minWidth: 200 }}
              />
              <div>
                <Text size="xs" c="dimmed" mb="xs">Language</Text>
                <Group gap="xs">
                  <Button
                    variant={isJavaScript ? 'filled' : 'outline'}
                    size="xs"
                    onClick={() => setIsJavaScript(true)}
                  >
                    JavaScript
                  </Button>
                  <Button
                    variant={!isJavaScript ? 'filled' : 'outline'}
                    size="xs"
                    onClick={() => setIsJavaScript(false)}
                  >
                    TypeScript
                  </Button>
                </Group>
              </div>
            </Group>
            
            <Group gap="xs">
              <Button
                variant="outline"
                size="xs"
                leftSection={<IconCopy size={14} />}
                onClick={handleCopyCode}
              >
                Copy Code
              </Button>
              <Button
                variant="outline"
                size="xs"
                leftSection={<IconRefresh size={14} />}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Group>
          </Group>

          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, lg: 9 }}>
              <Tabs defaultValue="editor" variant="outline">
                <Tabs.List>
                  <Tabs.Tab value="editor" leftSection={<IconCode size={16} />}>
                    Code Editor
                  </Tabs.Tab>
                  <Tabs.Tab value="preview" leftSection={<IconEye size={16} />}>
                    Preview
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="editor" pt="md">
                  <Card withBorder>
                    <Editor
                      height="500px"
                      defaultLanguage={isJavaScript ? 'javascript' : 'typescript'}
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      theme="vs-light"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </Card>
                </Tabs.Panel>

                <Tabs.Panel value="preview" pt="md">
                  <Card withBorder>
                    <div style={{ height: '500px', padding: '2rem', overflow: 'auto' }}>
                      <Stack gap="md">
                        <Group justify="space-between" align="center">
                          <Title order={4}>Live Preview</Title>
                          <Badge variant="light" color="green">Interactive</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          Interact with the component below. Changes to props will update in real-time.
                        </Text>
                        <div style={{ 
                          padding: '1.5rem', 
                          border: '1px dashed #e9ecef', 
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa'
                        }}>
                          {renderPreview()}
                        </div>
                      </Stack>
                    </div>
                  </Card>
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 3 }}>
              <Card withBorder>
                <ScrollArea h={500}>
                  {renderPropControls()}
                </ScrollArea>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Generated Code</Title>
          <CodeBlock 
            code={generateCodeWithProps()} 
            language={isJavaScript ? 'javascript' : 'typescript'}
          />
        </Card>
      </Stack>
    </div>
  );
}

export default Playground;