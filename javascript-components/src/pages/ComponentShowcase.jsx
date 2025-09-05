import { Container, Title, Text, Stack, Tabs, Card, Group, Badge, Button } from '@mantine/core';
import { IconComponents, IconCode, IconSettings } from '@tabler/icons-react';

function ComponentShowcase() {
  const components = [
    {
      name: 'FormTextInput',
      description: 'Standard text input with validation and error display',
      status: 'completed',
      category: 'Input'
    },
    {
      name: 'FormTextArea',
      description: 'Multi-line text input for larger content',
      status: 'completed',
      category: 'Input'
    },
    {
      name: 'FormYesNoSelect',
      description: 'Binary choice dropdown with Yes/No options',
      status: 'completed',
      category: 'Selection'
    },
    {
      name: 'FormStaticSelect',
      description: 'Single-select dropdown with predefined static options',
      status: 'completed',
      category: 'Selection'
    },
    {
      name: 'FormDynamicSelect',
      description: 'Single-select dropdown with API-loaded options',
      status: 'completed',
      category: 'Selection'
    },
    {
      name: 'FormSearchableSelect',
      description: 'Server-side searchable dropdown with debouncing',
      status: 'completed',
      category: 'Selection'
    },
    {
      name: 'FormFileUpload',
      description: 'File upload with file list display and removal',
      status: 'completed',
      category: 'Specialized'
    },
    {
      name: 'FormRadioGroup',
      description: 'Radio button groups for single-choice selections',
      status: 'completed',
      category: 'Selection'
    },
    {
      name: 'FormDatePicker',
      description: 'Date selection with validation',
      status: 'completed',
      category: 'Specialized'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'yellow';
      default: return 'gray';
    }
  };

  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {});

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Component Showcase</Title>
          <Text size="lg" c="dimmed">
            Interactive examples and live demonstrations of all form components
          </Text>
        </div>

        <Tabs defaultValue="overview" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="overview" leftSection={<IconComponents size={16} />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="playground" leftSection={<IconCode size={16} />}>
              Playground
            </Tabs.Tab>
            <Tabs.Tab value="customization" leftSection={<IconSettings size={16} />}>
              Customization
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="xl">
            <Stack gap="lg">
              {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
                <div key={category}>
                  <Title order={3} mb="md">{category} Components</Title>
                  <Stack gap="md">
                    {categoryComponents.map((component) => (
                      <Card key={component.name} shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                          <Text fw={500} size="lg">{component.name}</Text>
                          <Badge color={getStatusColor(component.status)} variant="light">
                            {component.status}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed" mb="md">
                          {component.description}
                        </Text>
                        <Group gap="xs">
                          <Text size="xs" c="blue" style={{ cursor: 'pointer' }}>
                            View Documentation
                          </Text>
                          <Text size="xs" c="green" style={{ cursor: 'pointer' }}>
                            Try in Playground
                          </Text>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </div>
              ))}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="playground" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Title order={3} mb="md">Interactive Playground</Title>
              <Text c="dimmed" mb="lg">
                Try out components interactively with real-time code generation and prop modification.
              </Text>
              <Group gap="md">
                <Button
                  component="a"
                  href="/playground"
                  leftSection={<IconCode size={16} />}
                >
                  Open Playground
                </Button>
                <Text size="sm" c="blue">
                  Live code editor, props panel, and real-time preview available
                </Text>
              </Group>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="customization" pt="xl">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Title order={3} mb="md">Customization Guide</Title>
              <Text c="dimmed" mb="lg">
                Learn how to customize components with themes, styles, and custom props.
              </Text>
              <Text size="sm" c="blue">
                Coming soon: Theme examples, custom styling guides, and advanced customization patterns
              </Text>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default ComponentShowcase;