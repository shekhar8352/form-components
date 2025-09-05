import { Container, Title, Text, Stack, Card, Group, Badge, Anchor } from '@mantine/core';
import { IconBook, IconCode, IconComponents } from '@tabler/icons-react';

function Documentation() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Documentation</Title>
          <Text size="lg" c="dimmed">
            Comprehensive guide to using the Reusable Form Components library
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>Getting Started</Text>
            <Badge color="blue" variant="light">
              Essential
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Learn how to install and set up the component library in your project
          </Text>
          <Group gap="xs">
            <Anchor href="#installation" size="sm">Installation</Anchor>
            <Anchor href="#quick-start" size="sm">Quick Start</Anchor>
            <Anchor href="#typescript-setup" size="sm">TypeScript Setup</Anchor>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <IconComponents size={20} />
              <Text fw={500}>Components</Text>
            </Group>
            <Badge color="green" variant="light">
              9 Components
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Explore all available form components with live examples and API documentation
          </Text>
          <Group gap="xs">
            <Anchor href="#form-text-input" size="sm">FormTextInput</Anchor>
            <Anchor href="#form-textarea" size="sm">FormTextArea</Anchor>
            <Anchor href="#form-yes-no-select" size="sm">FormYesNoSelect</Anchor>
            <Anchor href="#form-static-select" size="sm">FormStaticSelect</Anchor>
            <Anchor href="#form-dynamic-select" size="sm">FormDynamicSelect</Anchor>
            <Anchor href="#form-searchable-select" size="sm">FormSearchableSelect</Anchor>
            <Anchor href="#form-file-upload" size="sm">FormFileUpload</Anchor>
            <Anchor href="#form-radio-group" size="sm">FormRadioGroup</Anchor>
            <Anchor href="#form-date-picker" size="sm">FormDatePicker</Anchor>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <IconCode size={20} />
              <Text fw={500}>Examples</Text>
            </Group>
            <Badge color="orange" variant="light">
              Interactive
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Real-world examples and complete form implementations
          </Text>
          <Group gap="xs">
            <Anchor href="#complete-forms" size="sm">Complete Forms</Anchor>
            <Anchor href="#validation-patterns" size="sm">Validation Patterns</Anchor>
            <Anchor href="#custom-styling" size="sm">Custom Styling</Anchor>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <IconBook size={20} />
              <Text fw={500}>API Reference</Text>
            </Group>
            <Badge color="purple" variant="light">
              Reference
            </Badge>
          </Group>
          <Text size="sm" c="dimmed" mb="md">
            Detailed API documentation with props, types, and method references
          </Text>
          <Group gap="xs">
            <Anchor href="#component-props" size="sm">Component Props</Anchor>
            <Anchor href="#typescript-types" size="sm">TypeScript Types</Anchor>
            <Anchor href="#hooks-api" size="sm">Hooks API</Anchor>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default Documentation;