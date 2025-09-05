import { Container, Title, Text, Stack, Code, Card, List, Divider, Alert } from '@mantine/core';
import { IconInfoCircle, IconCheck } from '@tabler/icons-react';
import CodeBlock from '../components/CodeBlock';

function GettingStarted() {
  const installationCode = `npm install reusable-form-components-ts
# or
yarn add reusable-form-components-ts`;

  const basicUsageCode = `import { FormTextInput, FormYesNoSelect } from 'reusable-form-components-ts';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';

interface FormValues {
  name: string;
  isActive: string;
}

function MyForm() {
  const initialValues: FormValues = {
    name: '',
    isActive: ''
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <MantineProvider>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormTextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <FormYesNoSelect
            name="isActive"
            label="Are you active?"
            required
          />
        </Form>
      </Formik>
    </MantineProvider>
  );
}`;

  const dependenciesCode = `{
  "dependencies": {
    "@mantine/core": "^8.2.8",
    "@mantine/dates": "^8.2.8",
    "@mantine/form": "^8.2.8",
    "@mantine/hooks": "^8.2.8",
    "formik": "^2.4.6",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "typescript": "~5.8.3"
  }
}`;

  const tsConfigCode = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Getting Started with TypeScript</Title>
          <Text size="lg" c="dimmed">
            Quick setup guide for using the Reusable Form Components library in TypeScript projects
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="TypeScript Benefits" color="blue">
          <Text size="sm">
            The TypeScript version provides full type safety, IntelliSense support, and compile-time error checking
            for all component props and form values.
          </Text>
        </Alert>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Installation</Title>
          <Text mb="md">
            Install the TypeScript component library using npm or yarn:
          </Text>
          <CodeBlock code={installationCode} language="bash" />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Required Dependencies</Title>
          <Text mb="md">
            The library requires these dependencies for TypeScript projects:
          </Text>
          <CodeBlock code={dependenciesCode} language="json" />
          <Text size="sm" c="dimmed" mt="md">
            TypeScript types are included in the package, no additional @types packages needed.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">TypeScript Configuration</Title>
          <Text mb="md">
            Ensure your tsconfig.json includes these recommended settings:
          </Text>
          <CodeBlock code={tsConfigCode} language="json" />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Basic Usage with Types</Title>
          <Text mb="md">
            Here's how to use the components with full TypeScript support:
          </Text>
          <CodeBlock code={basicUsageCode} language="typescript" />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">TypeScript Setup Checklist</Title>
          <List
            spacing="sm"
            size="sm"
            center
            icon={<IconCheck size={16} color="green" />}
          >
            <List.Item>Install the TypeScript component library package</List.Item>
            <List.Item>Install required peer dependencies (Mantine UI, Formik, React)</List.Item>
            <List.Item>Configure TypeScript with proper compiler options</List.Item>
            <List.Item>Import Mantine CSS styles in your app</List.Item>
            <List.Item>Define TypeScript interfaces for your form values</List.Item>
            <List.Item>Use typed Formik components with proper generics</List.Item>
            <List.Item>Configure validation schemas with Yup (optional)</List.Item>
          </List>
        </Card>

        <Divider my="xl" />

        <div>
          <Title order={2} mb="md">TypeScript-Specific Features</Title>
          <Text mb="md">
            The TypeScript version provides additional benefits:
          </Text>
          <List spacing="sm" size="sm">
            <List.Item>
              <Text component="span" fw={500}>Full Type Safety:</Text> All props are strictly typed with comprehensive interfaces
            </List.Item>
            <List.Item>
              <Text component="span" fw={500}>IntelliSense Support:</Text> Auto-completion and documentation in your IDE
            </List.Item>
            <List.Item>
              <Text component="span" fw={500}>Compile-time Validation:</Text> Catch errors before runtime
            </List.Item>
            <List.Item>
              <Text component="span" fw={500}>Generic Form Values:</Text> Type-safe form state management
            </List.Item>
          </List>
        </div>
      </Stack>
    </Container>
  );
}

export default GettingStarted;