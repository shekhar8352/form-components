import { Container, Title, Text, Stack, Card, SimpleGrid, Badge, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { 
  IconUser, 
  IconMail, 
  IconClipboardList, 
  IconArrowRight, 
  IconEye,
  IconCode,
  IconRocket
} from '@tabler/icons-react';

function DemoIndex() {
  const demos = [
    {
      title: 'Cross-Project Compatibility',
      description: 'Comprehensive form showcasing all components working in JavaScript environment',
      icon: IconCode,
      link: '/demos/cross-project',
      features: ['All 9 components', 'JavaScript implementation', 'Full validation', 'Debug output'],
      complexity: 'Advanced',
      components: 9
    },
    {
      title: 'Registration Form',
      description: 'Complete user registration with personal information, preferences, and validation',
      icon: IconUser,
      link: '/demos/registration',
      features: ['Multiple input types', 'Date picker', 'Country selection', 'Bio text area'],
      complexity: 'Intermediate',
      components: 5
    },
    {
      title: 'Contact Form',
      description: 'Professional contact form with file upload, priority selection, and progress tracking',
      icon: IconMail,
      link: '/demos/contact',
      features: ['File upload', 'Priority levels', 'Progress tracking', 'Response time SLA'],
      complexity: 'Advanced',
      components: 4
    },
    {
      title: 'Survey Form',
      description: 'Multi-step survey with various question types and conditional logic',
      icon: IconClipboardList,
      link: '/demos/survey',
      features: ['Multi-step flow', 'Conditional questions', 'Progress indicator', 'Summary page'],
      complexity: 'Advanced',
      components: 6,
      status: 'coming-soon'
    }
  ];

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Basic': return 'green';
      case 'Intermediate': return 'yellow';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Group gap="xs" mb="md">
            <IconRocket size={32} color="blue" />
            <Title order={1}>Live Demos</Title>
          </Group>
          <Text size="lg" c="dimmed">
            Interactive demonstrations of real-world form implementations using the component library
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
          {demos.map((demo) => (
            <Card key={demo.title} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Group gap="xs">
                  <demo.icon size={24} color="blue" />
                  <Text fw={500} size="lg">{demo.title}</Text>
                </Group>
                <Group gap="xs">
                  <Badge color={getComplexityColor(demo.complexity)} variant="light" size="sm">
                    {demo.complexity}
                  </Badge>
                  {demo.status === 'coming-soon' && (
                    <Badge color="gray" variant="light" size="sm">
                      Coming Soon
                    </Badge>
                  )}
                </Group>
              </Group>
              
              <Text size="sm" c="dimmed" mb="md" style={{ minHeight: '60px' }}>
                {demo.description}
              </Text>
              
              <Stack gap="sm" mb="md">
                <Group justify="space-between">
                  <Text size="xs" fw={500} c="dimmed">Components Used:</Text>
                  <Badge variant="outline" size="xs">{demo.components} components</Badge>
                </Group>
                
                <Stack gap="xs">
                  {demo.features.map((feature, index) => (
                    <Text key={index} size="xs" c="dimmed">• {feature}</Text>
                  ))}
                </Stack>
              </Stack>
              
              <Group justify="space-between">
                {demo.status === 'coming-soon' ? (
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={demo.link}
                    variant="light"
                    size="sm"
                    rightSection={<IconArrowRight size={14} />}
                  >
                    View Demo
                  </Button>
                )}
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="md">What You'll Learn</Title>
          <Text c="dimmed" mb="lg">
            These demos showcase real-world implementations and best practices for building forms with our component library.
          </Text>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Stack gap="xs">
              <Group gap="xs">
                <IconCode size={20} color="blue" />
                <Text fw={500} size="sm">Implementation Patterns</Text>
              </Group>
              <Text size="xs" c="dimmed">• Form structure and organization</Text>
              <Text size="xs" c="dimmed">• Component composition</Text>
              <Text size="xs" c="dimmed">• State management</Text>
              <Text size="xs" c="dimmed">• Error handling</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconEye size={20} color="green" />
                <Text fw={500} size="sm">UX Best Practices</Text>
              </Group>
              <Text size="xs" c="dimmed">• Progressive disclosure</Text>
              <Text size="xs" c="dimmed">• Loading states</Text>
              <Text size="xs" c="dimmed">• Success feedback</Text>
              <Text size="xs" c="dimmed">• Accessibility features</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconClipboardList size={20} color="orange" />
                <Text fw={500} size="sm">Advanced Features</Text>
              </Group>
              <Text size="xs" c="dimmed">• File upload handling</Text>
              <Text size="xs" c="dimmed">• Multi-step workflows</Text>
              <Text size="xs" c="dimmed">• Conditional logic</Text>
              <Text size="xs" c="dimmed">• Progress tracking</Text>
            </Stack>
          </SimpleGrid>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Title order={3} mb="md">Ready to Build Your Own?</Title>
          <Text c="dimmed" mb="lg">
            Use these demos as inspiration for your own forms. All source code is available for reference.
          </Text>
          <Group justify="center" gap="md">
            <Button
              component={Link}
              to="/playground"
              leftSection={<IconCode size={16} />}
            >
              Try in Playground
            </Button>
            <Button
              component={Link}
              to="/getting-started"
              variant="outline"
              leftSection={<IconRocket size={16} />}
            >
              Get Started
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default DemoIndex;