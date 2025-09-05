import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form, useField } from 'formik';
import { MantineProvider, Select } from '@mantine/core';
import { vi, describe, it, expect } from 'vitest';

const MinimalFormSelect = ({ name }) => {
  const [field] = useField(name);
  
  return (
    <Select
      {...field}
      data={[]}
      label="Test Select"
      placeholder="Select something"
    />
  );
};

// Test wrapper component
const TestWrapper = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('Minimal Form Select Test', () => {
  it('renders Select with useField', () => {
    render(
      <TestWrapper initialValues={{ test: '' }}>
        <MinimalFormSelect name="test" />
      </TestWrapper>
    );

    expect(screen.getByRole('textbox', { name: 'Test Select' })).toBeInTheDocument();
  });
});