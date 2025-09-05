import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FormSearchableSelect from './FormSearchableSelect';

// Mock the hooks and utilities
vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value) => value,
}));

vi.mock('../../utils/api', () => ({
  searchData: vi.fn().mockResolvedValue([]),
}));

// Test wrapper component
const TestWrapper = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormSearchableSelect Simple', () => {
  const defaultProps = {
    name: 'testSearchSelect',
    label: 'Test Search Select',
    searchApiUrl: '/api/search',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <TestWrapper initialValues={{ testSearchSelect: '' }}>
        <FormSearchableSelect {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('textbox', { name: 'Test Search Select' })).toBeInTheDocument();
  });
});