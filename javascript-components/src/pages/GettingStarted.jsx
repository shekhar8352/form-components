import { Container, Title, Text, Stack, Code, Card, List, Divider, Alert } from '@mantine/core';
import { IconInfoCircle, IconCheck } from '@tabler/icons-react';
import CodeBlock from '../components/CodeBlock';

function GettingStarted() {
  const installationCode = `npm install reusable-form-components-js
# or
yarn add reusable-form-components-js`;

  const basicUsageCode = `import { FormTextInput, FormYesNoSelect } from 'reusable-form-components-js';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';

function MyForm() {
  return (
    <MantineProvider>
      <Formik
        initialValues={{ name: '', isActive: '' }}
        onSubmit={(values) => console.log(values)}
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
  }
}`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Getting Started</Title>
          <Text size="lg" c="dimmed">
            Quick setup guide to start using the Reusable Form Components library
          </Text>
        </div>

        <Alert icon={<IconInfoCircle size={16} />} title="Prerequisites" color="blue">
          <Text size="sm">
            This library requires React 18+ and is built on top of Mantine UI and Formik. 
            Make sure you have these dependencies in your project.
          </Text>
        </Alert>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Installation</Title>
          <Text mb="md">
            Install the component library using npm or yarn:
          </Text>
          <CodeBlock code={installationCode} language="bash" />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Required Dependencies</Title>
          <Text mb="md">
            The library has peer dependencies that need to be installed in your project:
          </Text>
          <CodeBlock code={dependenciesCode} language="json" />
          <Text size="sm" c="dimmed" mt="md">
            These dependencies are marked as peer dependencies to avoid version conflicts.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Basic Usage</Title>
          <Text mb="md">
            Here's a simple example of how to use the components in your React application:
          </Text>
          <CodeBlock code={basicUsageCode} language="javascript" />
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">Setup Checklist</Title>
          <List
            spacing="sm"
            size="sm"
            center
            icon={<IconCheck size={16} color="green" />}
          >
            <List.Item>Install the component library package</List.Item>
            <List.Item>Install required peer dependencies (Mantine UI, Formik, React)</List.Item>
            <List.Item>Import Mantine CSS styles in your app</List.Item>
            <List.Item>Wrap your app with MantineProvider</List.Item>
            <List.Item>Set up Formik forms with your components</List.Item>
            <List.Item>Configure validation schemas (optional)</List.Item>
          </List>
        </Card>

        <Divider my="xl" />

        <div>
          <Title order={2} mb="md">Next Steps</Title>
          <Text mb="md">
            Now that you have the library installed, explore the available components:
          </Text>
          <List spacing="sm" size="sm">
            <List.Item>
              <Text component="span" fw={500}>Component Showcase:</Text> See all available components with live examples
            </List.Item>
            <List.Item>
              <Text component="span" fw={500}>Documentation:</Text> Detailed API reference and usage guides
            </List.Item>
            <List.Item>
              <Text component="span" fw={500}>Examples:</Text> Complete form implementations and patterns
            </List.Item>
          </List>
        </div>
      </Stack>
    </Container>
  );
}

export default GettingStarted;