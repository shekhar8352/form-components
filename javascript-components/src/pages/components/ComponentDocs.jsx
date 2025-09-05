import { Container, Title, Text, Stack, Card, SimpleGrid, Badge, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconComponents } from '@tabler/icons-react';

function ComponentDocs() {
  const components = [
    {
      name: 'FormTextInput',
      description: 'Standard text input with validation and error display',
      status: 'documented',
      category: 'Input',
      link: '/components/text-input'
    },
    {
      name: 'FormTextArea',
      description: 'Multi-line text input for larger content',
      status: 'coming-soon',
      category: 'Input',
      link: '/components/textarea'
    },
    {
      name: 'FormYesNoSelect',
      description: 'Binary choice dropdown with Yes/No options',
      status: 'documented',
      category: 'Selection',
      link: '/components/yes-no-select'
    },
    {
      name: 'FormStaticSelect',
      description: 'Single-select dropdown with predefined static options',
      status: 'coming-soon',
      category: 'Selection',
      link: '/components/static-select'
    },
    {
      name: 'FormDynamicSelect',
      description: 'Single-select dropdown with API-loaded options',
      status: 'coming-soon',
      category: 'Selection',
      link: '/components/dynamic-select'
    },
    {
      name: 'FormSearchableSelect',
      description: 'Server-side searchable dropdown with debouncing',
      status: 'coming-soon',
      category: 'Selection',
      link: '/components/searchable-select'
    },
    {
      name: 'FormFileUpload',
      description: 'File upload with file list display and removal',
      status: 'coming-soon',
      category: 'Specialized',
      link: '/components/file-upload'
    },
    {
      name: 'FormRadioGroup',
      description: 'Radio button groups for single-choice selections',
      status: 'coming-soon',
      category: 'Selection',
      link: '/components/radio-group'
    },
    {
      name: 'FormDatePicker',
      description: 'Date selection with validation',
      status: 'coming-soon',
      category: 'Specialized',
      link: '/components/date-picker'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'documented': return 'green';
      case 'coming-soon': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'documented': return 'Documented';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
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
          <Group gap="xs" mb="md">
            <IconComponents size={32} color="blue" />
            <Title order={1}>Component Documentation</Title>
          </Group>
          <Text size="lg" c="dimmed">
            Comprehensive documentation for all form components with examples, props, and usage guides.
          </Text>
        </div>

        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <div key={category}>
            <Title order={2} mb="lg">{category} Components</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {categoryComponents.map((component) => (
                <Card key={component.name} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="lg">{component.name}</Text>
                    <Badge color={getStatusColor(component.status)} variant="light" size="sm">
                      {getStatusLabel(component.status)}
                    </Badge>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="lg" style={{ minHeight: '40px' }}>
                    {component.description}
                  </Text>
                  
                  <Group justify="space-between">
                    {component.status === 'documented' ? (
                      <Button
                        component={Link}
                        to={component.link}
                        variant="light"
                        size="sm"
                        rightSection={<IconArrowRight size={14} />}
                      >
                        View Docs
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    )}
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        ))}

        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Title order={3} mb="md">More Documentation Coming Soon</Title>
          <Text c="dimmed" mb="lg">
            We're actively working on comprehensive documentation for all components. 
            Check back soon for complete API references, examples, and usage guides.
          </Text>
          <Group justify="center" gap="md">
            <Button
              component={Link}
              to="/playground"
              leftSection={<IconComponents size={16} />}
            >
              Try in Playground
            </Button>
            <Button
              component={Link}
              to="/examples"
              variant="outline"
            >
              View Examples
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default ComponentDocs;