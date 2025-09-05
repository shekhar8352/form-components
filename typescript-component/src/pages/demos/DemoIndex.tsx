import { Container, Title, Text, Stack, Card, SimpleGrid, Badge, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { 
  IconUser, 
  IconMail, 
  IconClipboardList, 
  IconArrowRight, 
  IconEye,
  IconCode,
  IconRocket,
  IconBrandTypescript
} from '@tabler/icons-react';

interface Demo {
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; color?: string }>;
  link: string;
  features: string[];
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  components: number;
  status?: 'coming-soon';
}

function DemoIndex() {
  const demos: Demo[] = [
    {
      title: 'Cross-Project Compatibility',
      description: 'Comprehensive form showcasing all components with full TypeScript type safety',
      icon: IconBrandTypescript,
      link: '/demos/cross-project',
      features: ['All 9 components', 'Full type safety', 'Typed validation', 'Interface-driven'],
      complexity: 'Advanced',
      components: 9
    },
    {
      title: 'Registration Form',
      description: 'Complete user registration with type-safe form values and comprehensive validation',
      icon: IconUser,
      link: '/demos/registration',
      features: ['TypeScript interfaces', 'Typed validation', 'Generic Formik', 'Type-safe handlers'],
      complexity: 'Intermediate',
      components: 5
    },
    {
      title: 'Contact Form',
      description: 'Professional contact form with typed file upload and priority-based response system',
      icon: IconMail,
      link: '/demos/contact',
      features: ['File type validation', 'Union type priorities', 'Typed progress tracking', 'Interface composition'],
      complexity: 'Advanced',
      components: 4,
      status: 'coming-soon'
    },
    {
      title: 'Survey Form',
      description: 'Multi-step survey with conditional logic and type-safe state management',
      icon: IconClipboardList,
      link: '/demos/survey',
      features: ['Generic step types', 'Conditional rendering', 'Type guards', 'Discriminated unions'],
      complexity: 'Advanced',
      components: 6,
      status: 'coming-soon'
    }
  ];

  const getComplexityColor = (complexity: Demo['complexity']): string => {
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
            <IconBrandTypescript size={32} color="blue" />
            <Title order={1}>TypeScript Live Demos</Title>
          </Group>
          <Text size="lg" c="dimmed">
            Interactive demonstrations showcasing type-safe form implementations with full TypeScript support
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
                  <Badge color="blue" variant="light" size="sm">
                    TS
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
                  <Text size="xs" fw={500} c="dimmed">TypeScript Features:</Text>
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
                    View TypeScript Demo
                  </Button>
                )}
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="md">TypeScript Benefits in Action</Title>
          <Text c="dimmed" mb="lg">
            These demos showcase how TypeScript enhances form development with type safety, better tooling, and improved developer experience.
          </Text>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Stack gap="xs">
              <Group gap="xs">
                <IconCode size={20} color="blue" />
                <Text fw={500} size="sm">Type Safety</Text>
              </Group>
              <Text size="xs" c="dimmed">• Compile-time error checking</Text>
              <Text size="xs" c="dimmed">• Interface-driven development</Text>
              <Text size="xs" c="dimmed">• Generic form components</Text>
              <Text size="xs" c="dimmed">• Strict prop validation</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconEye size={20} color="green" />
                <Text fw={500} size="sm">Developer Experience</Text>
              </Group>
              <Text size="xs" c="dimmed">• IntelliSense auto-completion</Text>
              <Text size="xs" c="dimmed">• Real-time error detection</Text>
              <Text size="xs" c="dimmed">• Refactoring confidence</Text>
              <Text size="xs" c="dimmed">• Self-documenting code</Text>
            </Stack>
            
            <Stack gap="xs">
              <Group gap="xs">
                <IconClipboardList size={20} color="orange" />
                <Text fw={500} size="sm">Advanced Patterns</Text>
              </Group>
              <Text size="xs" c="dimmed">• Discriminated unions</Text>
              <Text size="xs" c="dimmed">• Conditional types</Text>
              <Text size="xs" c="dimmed">• Type guards</Text>
              <Text size="xs" c="dimmed">• Generic constraints</Text>
            </Stack>
          </SimpleGrid>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Title order={3} mb="md">Experience Type-Safe Forms</Title>
          <Text c="dimmed" mb="lg">
            See how TypeScript transforms form development with better tooling, error prevention, and maintainable code.
          </Text>
          <Group justify="center" gap="md">
            <Button
              component={Link}
              to="/playground"
              leftSection={<IconCode size={16} />}
            >
              TypeScript Playground
            </Button>
            <Button
              component={Link}
              to="/getting-started"
              variant="outline"
              leftSection={<IconRocket size={16} />}
            >
              Setup Guide
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}

export default DemoIndex;