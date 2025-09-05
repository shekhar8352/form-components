import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider, Select } from '@mantine/core';
import { vi, describe, it, expect } from 'vitest';

// Test wrapper component
const TestWrapper = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('Minimal Select Test', () => {
  it('renders basic Mantine Select', () => {
    render(
      <TestWrapper>
        <Select
          data={[]}
          label="Test Select"
          placeholder="Select something"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('textbox', { name: 'Test Select' })).toBeInTheDocument();
  });
});