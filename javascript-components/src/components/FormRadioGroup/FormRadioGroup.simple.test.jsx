import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect } from 'vitest';
import FormRadioGroup from './FormRadioGroup';

// Test wrapper component
const TestWrapper = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormRadioGroup Simple', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders without crashing', () => {
    render(
      <TestWrapper initialValues={{ testRadio: '' }}>
        <FormRadioGroup 
          name="testRadio" 
          label="Test Radio Group" 
          options={defaultOptions}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Radio Group')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option 2' })).toBeInTheDocument();
  });
});