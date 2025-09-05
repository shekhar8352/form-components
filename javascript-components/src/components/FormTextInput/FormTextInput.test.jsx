import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import * as yup from 'yup';
import FormTextInput from './FormTextInput';

const TestWrapper = ({ children, initialValues = { testField: '' }, validationSchema, onSubmit = () => {} }) => (
  <MantineProvider>
    <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {children}
      </Form>
    </Formik>
  </MantineProvider>
);

describe('FormTextInput', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <FormTextInput name="testField" label="Test Field" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('renders with different input types', () => {
    const { rerender } = render(
      <TestWrapper>
        <FormTextInput name="testField" label="Email Field" type="email" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Email Field')).toHaveAttribute('type', 'email');
    
    rerender(
      <TestWrapper>
        <FormTextInput name="testField" label="Password Field" type="password" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Password Field')).toHaveAttribute('type', 'password');
  });

  it('applies custom width while maintaining Mantine size properties', () => {
    render(
      <TestWrapper>
        <FormTextInput 
          name="testField" 
          label="Custom Width Field" 
          width="300px"
          size="lg"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Custom Width Field');
    const inputWrapper = input.closest('.mantine-TextInput-root');
    
    expect(inputWrapper).toHaveStyle({ width: '300px' });
    // Check that the input has Mantine classes (size classes are applied via CSS modules)
    expect(input).toHaveClass('mantine-TextInput-input');
  });

  it('displays validation errors when field is touched and has error', async () => {
    const validationSchema = yup.object({
      testField: yup.string().required('This field is required')
    });

    render(
      <TestWrapper validationSchema={validationSchema}>
        <FormTextInput name="testField" label="Required Field" />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Required Field');
    
    // Touch the field and blur to trigger validation
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('updates form state when value changes', async () => {
    const user = userEvent.setup();
    let formValues = {};
    
    const handleSubmit = (values) => {
      formValues = values;
    };

    render(
      <TestWrapper onSubmit={handleSubmit}>
        <FormTextInput name="testField" label="Test Field" />
        <button type="submit">Submit</button>
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Test Field');
    await user.type(input, 'test value');
    
    expect(input).toHaveValue('test value');
    
    await user.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(formValues.testField).toBe('test value');
    });
  });

  it('supports left and right sections for icons', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    const rightIcon = <span data-testid="right-icon">✓</span>;
    
    render(
      <TestWrapper>
        <FormTextInput 
          name="testField" 
          label="Field with Sections" 
          leftSection={leftIcon}
          rightSection={rightIcon}
        />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies required asterisk when required prop is true', () => {
    render(
      <TestWrapper>
        <FormTextInput name="testField" label="Required Field" required />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies required asterisk when withAsterisk prop is true', () => {
    render(
      <TestWrapper>
        <FormTextInput name="testField" label="Field with Asterisk" withAsterisk />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('supports HTML input attributes like maxLength and pattern', () => {
    render(
      <TestWrapper>
        <FormTextInput 
          name="testField" 
          label="Constrained Field" 
          maxLength={10}
          pattern="[0-9]*"
          autoComplete="off"
        />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Constrained Field');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('pattern', '[0-9]*');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <FormTextInput name="testField" label="Disabled Field" disabled />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Disabled Field');
    expect(input).toBeDisabled();
  });

  it('displays description text when provided', () => {
    render(
      <TestWrapper>
        <FormTextInput 
          name="testField" 
          label="Field with Description" 
          description="This is a helpful description"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('This is a helpful description')).toBeInTheDocument();
  });

  it('applies custom className and style props', () => {
    render(
      <TestWrapper>
        <FormTextInput 
          name="testField" 
          label="Styled Field" 
          className="custom-class"
          style={{ backgroundColor: 'lightblue' }}
        />
      </TestWrapper>
    );
    
    const inputWrapper = screen.getByLabelText('Styled Field').closest('.mantine-TextInput-root');
    expect(inputWrapper).toHaveClass('custom-class');
    // Check that custom styles are applied to the wrapper
    expect(inputWrapper).toHaveStyle('background-color: rgb(173, 216, 230)');
  });

  it('validates email input type with invalid email', async () => {
    const validationSchema = yup.object({
      email: yup.string().email('Invalid email format')
    });

    render(
      <TestWrapper validationSchema={validationSchema} initialValues={{ email: '' }}>
        <FormTextInput name="email" label="Email Field" type="email" />
      </TestWrapper>
    );
    
    const input = screen.getByLabelText('Email Field');
    
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });
});