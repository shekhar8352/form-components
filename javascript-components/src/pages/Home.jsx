import { Container, Title, Text, Stack, Button, Group, Card, SimpleGrid, Badge, List } from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconRocket,
  IconComponents,
  IconCode,
  IconCheck,
  IconBrandReact,
  IconBrandTypescript,
  IconPalette,
} from '@tabler/icons-react';

function Home() {
  const features = [
    {
      icon: IconBrandReact,
      title: 'React Integration',
      description: 'Built specifically for React applications with modern hooks and patterns',
    },
    {
      icon: IconPalette,
      title: 'Mantine UI Design',
      description: 'Consistent design system with beautiful, accessible components',
    },
    {
      icon: IconCode,
      title: 'Formik Integration',
      description: 'Seamless form state management with built-in validation support',
    },
    {
      icon: IconBrandTypescript,
      title: 'TypeScript Ready',
      description: 'Full TypeScript support with comprehensive type definitions',
    },
  ];

  const quickStats = [
    { label: 'Components', value: '9', color: 'blue' },
    { label: 'Hooks', value: '3', color: 'green' },
    { label: 'Test Coverage', value: '95%', color: 'orange' },
    { label: 'Bundle Size', value: '< 50KB', color: 'purple' },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Badge size="lg" variant="light" color="blue" mb="md">
            JavaScript Components Library
          </Badge>
          <Title order={1} size="3rem" mb="md" style={{ lineHeight: 1.2 }}>
            Reusable Form Components
          </Title>
          <Text size="xl" c="dimmed" mb="xl" maw={600} mx="auto">
            A comprehensive library of beautiful, accessible form components built with Mantine UI and Formik. 
            Perfect for rapid development of consistent user interfaces.
          </Text>
          
          <Group justify="center" gap="md">
            <Button
              component={Link}
              to="/getting-started"
              size="lg"
              leftSection={<IconRocket size={20} />}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="/showcase"
              variant="outline"
              size="lg"
              leftSection={<IconComponents size={20} />}
            >
              View Components
            </Button>
          </Group>
        </div>

        {/* Quick Stats */}
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
          {quickStats.map((stat) => (
            <Card key={stat.label} shadow="sm" padding="lg" radius="md" withBorder>
              <Text ta="center" size="2rem" fw={700} c={stat.color}>
                {stat.value}
              </Text>
              <Text ta="center" size="sm" c="dimmed">
                {stat.label}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Features */}
        <div>
          <Title order={2} ta="center" mb="xl">
            Why Choose Our Components?
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {features.map((feature) => (
              <Card key={feature.title} shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                  <feature.icon size={24} color="blue" />
                  <Text fw={500} size="lg">
                    {feature.title}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </div>

        {/* Available Components */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="md">Available Components</Title>
          <Text c="dimmed" mb="lg">
            Our library includes 9 carefully crafted form components, each designed for specific use cases:
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <List spacing="xs" size="sm" icon={<IconCheck size={16} color="green" />}>
              <List.Item>FormTextInput</List.Item>
              <List.Item>FormTextArea</List.Item>
              <List.Item>FormYesNoSelect</List.Item>
            </List>
            <List spacing="xs" size="sm" icon={<IconCheck size={16} color="green" />}>
              <List.Item>FormStaticSelect</List.Item>
              <List.Item>FormDynamicSelect</List.Item>
              <List.Item>FormSearchableSelect</List.Item>
            </List>
            <List spacing="xs" size="sm" icon={<IconCheck size={16} color="green" />}>
              <List.Item>FormFileUpload</List.Item>
              <List.Item>FormRadioGroup</List.Item>
              <List.Item>FormDatePicker</List.Item>
            </List>
          </SimpleGrid>
        </Card>

        {/* Call to Action */}
        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Title order={3} mb="md">Ready to Get Started?</Title>
          <Text c="dimmed" mb="lg">
            Install the library and start building beautiful forms in minutes
          </Text>
          <Group justify="center" gap="md">
            <Button
              component={Link}
              to="/getting-started"
              leftSection={<IconRocket size={16} />}
            >
              Installation Guide
            </Button>
            <Button
              component={Link}
              to="/documentation"
              variant="outline"
              leftSection={<IconCode size={16} />}
            >
              View Documentation
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default Home;