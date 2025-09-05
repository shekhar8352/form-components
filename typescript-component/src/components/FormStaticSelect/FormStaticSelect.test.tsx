import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import FormStaticSelect from './FormStaticSelect';
import type { SelectOption } from '../../types';

interface TestWrapperProps {
  children: React.ReactNode;
  initialValues?: Record<string, any>;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ 
  children, 
  initialValues = { testField: '' }
}) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        {children}
      </Form>
    </Formik>
  </MantineProvider>
);

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
];

describe('FormStaticSelect', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <FormStaticSelect name="testField" label="Test Field" options={mockOptions} />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('renders with correct placeholder', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Test Field" 
          options={mockOptions}
          placeholder="Choose an option"
        />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Test Field' });
    expect(select).toHaveAttribute('placeholder', 'Choose an option');
  });

  it('applies custom width styling', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Custom Width Field" 
          options={mockOptions}
          width="300px"
        />
      </TestWrapper>
    );
    
    const select = screen.getByLabelText('Custom Width Field');
    const selectWrapper = select.closest('.mantine-Select-root');
    expect(selectWrapper).toHaveStyle({ width: '300px' });
  });

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Required Field" 
          options={mockOptions}
          required 
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Disabled Field" 
          options={mockOptions}
          disabled 
        />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Disabled Field' });
    expect(select).toBeDisabled();
  });

  it('displays description text', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Field with Description" 
          options={mockOptions}
          description="This is a helpful description"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('This is a helpful description')).toBeInTheDocument();
  });

  it('integrates with Formik for initial values', () => {
    render(
      <TestWrapper initialValues={{ testField: 'option1' }}>
        <FormStaticSelect 
          name="testField" 
          label="Formik Integration Field" 
          options={mockOptions}
        />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Formik Integration Field' });
    expect(select).toHaveValue('Option 1');
  });

  it('handles empty options array', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Empty Options Field" 
          options={[]}
        />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Empty Options Field')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Styled Field" 
          options={mockOptions}
          className="custom-class"
        />
      </TestWrapper>
    );
    
    const selectWrapper = screen.getByLabelText('Styled Field').closest('.mantine-Select-root');
    expect(selectWrapper).toHaveClass('custom-class');
  });

  it('supports different Mantine sizes', () => {
    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Large Field" 
          options={mockOptions}
          size="lg"
        />
      </TestWrapper>
    );
    
    const selectWrapper = screen.getByLabelText('Large Field').closest('.mantine-Select-root');
    expect(selectWrapper).toHaveAttribute('data-size', 'lg');
  });

  it('provides proper TypeScript type safety', () => {
    // This test ensures TypeScript compilation passes with proper types
    const options: SelectOption[] = [
      { value: 'test', label: 'Test' },
      { value: 'test2', label: 'Test 2', disabled: false },
    ];

    render(
      <TestWrapper>
        <FormStaticSelect 
          name="testField" 
          label="Type Safe Field" 
          options={options}
          size="md"
          width={200}
          clearable={true}
          searchable={true}
          nothingFoundMessage="Nothing found"
        />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Type Safe Field')).toBeInTheDocument();
  });
});