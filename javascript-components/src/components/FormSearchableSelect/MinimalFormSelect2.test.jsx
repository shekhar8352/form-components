import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form, useField } from 'formik';
import { MantineProvider, Select } from '@mantine/core';
import { vi, describe, it, expect } from 'vitest';

const MinimalFormSelect2 = ({ name }) => {
  const [field] = useField(name);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Select
      {...field}
      data={[]}
      label="Test Select"
      placeholder="Select something"
      searchable
      onSearchChange={setSearchTerm}
      searchValue={searchTerm}
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

describe('Minimal Form Select Test 2', () => {
  it('renders Select with search props', () => {
    render(
      <TestWrapper initialValues={{ test: '' }}>
        <MinimalFormSelect2 name="test" />
      </TestWrapper>
    );

    expect(screen.getByRole('textbox', { name: 'Test Select' })).toBeInTheDocument();
  });
});