import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  AppShell,
  Text,
  Group,
  Button,
  Stack,
  NavLink,
  Burger,
  ScrollArea,
  Badge,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconBook,
  IconComponents,
  IconRocket,
  IconCode,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';

interface NavigationProps {
  children: React.ReactNode;
}

interface NavigationItem {
  label: string;
  icon: React.ComponentType<{ size: number }>;
  link: string;
  description: string;
}

interface ComponentLink {
  label: string;
  link: string;
}

function Navigation({ children }: NavigationProps) {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      label: 'Getting Started',
      icon: IconRocket,
      link: '/getting-started',
      description: 'Installation and TypeScript setup',
    },
    {
      label: 'Documentation',
      icon: IconBook,
      link: '/documentation',
      description: 'Complete API reference',
    },
    {
      label: 'Component Showcase',
      icon: IconComponents,
      link: '/showcase',
      description: 'Interactive component examples',
    },
    {
      label: 'Playground',
      icon: IconCode,
      link: '/playground',
      description: 'Interactive TypeScript playground',
    },
    {
      label: 'Examples',
      icon: IconCode,
      link: '/examples',
      description: 'TypeScript form implementations',
    },
    {
      label: 'Live Demos',
      icon: IconRocket,
      link: '/demos',
      description: 'Interactive TypeScript demos',
    },
  ];

  const componentLinks: ComponentLink[] = [
    { label: 'FormTextInput', link: '/components/text-input' },
    { label: 'FormTextArea', link: '/components/textarea' },
    { label: 'FormYesNoSelect', link: '/components/yes-no-select' },
    { label: 'FormStaticSelect', link: '/components/static-select' },
    { label: 'FormDynamicSelect', link: '/components/dynamic-select' },
    { label: 'FormSearchableSelect', link: '/components/searchable-select' },
    { label: 'FormFileUpload', link: '/components/file-upload' },
    { label: 'FormRadioGroup', link: '/components/radio-group' },
    { label: 'FormDatePicker', link: '/components/date-picker' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <IconComponents size={24} color="blue" />
              <Text fw={700} size="lg">
                Form Components
              </Text>
              <Badge size="xs" variant="light" color="blue">
                TS
              </Badge>
            </Group>
          </Group>
          
          <Group gap="xs">
            <Button
              variant="subtle"
              leftSection={<IconBrandGithub size={16} />}
              rightSection={<IconExternalLink size={14} />}
              size="sm"
            >
              GitHub
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          <Stack gap="xs">
            <NavLink
              component={Link}
              to="/"
              label="Home"
              leftSection={<IconHome size={16} />}
              active={location.pathname === '/'}
            />
            
            <Divider my="sm" />
            
            {navigationItems.map((item) => (
              <NavLink
                key={item.link}
                component={Link}
                to={item.link}
                label={item.label}
                description={item.description}
                leftSection={<item.icon size={16} />}
                active={location.pathname === item.link}
              />
            ))}
            
            <Divider my="sm" />
            
            <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="xs">
              Components
            </Text>
            
            {componentLinks.map((component) => (
              <NavLink
                key={component.link}
                component={Link}
                to={component.link}
                label={component.label}
                active={location.pathname === component.link}
                style={{ fontSize: '14px' }}
              />
            ))}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default Navigation;