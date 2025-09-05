import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import * as yup from 'yup';
import FormYesNoSelect from './FormYesNoSelect';

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

describe('FormYesNoSelect', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Test Field" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('renders with default Yes/No options', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Yes/No Field" />
      </TestWrapper>
    );
    
    const select = screen.getByLabelText('Yes/No Field');
    await user.click(select);
    
    await waitFor(() => {
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
    });
  });

  it('renders with custom Yes/No labels', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormYesNoSelect 
          name="testField" 
          label="Custom Labels Field" 
          yesLabel="Agree"
          noLabel="Disagree"
        />
      </TestWrapper>
    );
    
    const select = screen.getByLabelText('Custom Labels Field');
    await user.click(select);
    
    await waitFor(() => {
      expect(screen.getByText('Agree')).toBeInTheDocument();
      expect(screen.getByText('Disagree')).toBeInTheDocument();
    });
  });

  it('applies custom width while maintaining Mantine size properties', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect 
          name="testField" 
          label="Custom Width Field" 
          width="300px"
          size="lg"
        />
      </TestWrapper>
    );
    
    const select = screen.getByLabelText('Custom Width Field');
    const selectWrapper = select.closest('.mantine-Select-root');
    
    expect(selectWrapper).toHaveStyle({ width: '300px' });
    // Check that the select has Mantine classes
    expect(select).toHaveClass('mantine-Select-input');
  });

  it('displays validation errors when field is touched and has error', async () => {
    const user = userEvent.setup();
    const validationSchema = yup.object({
      testField: yup.string().required('This field is required')
    });

    render(
      <TestWrapper validationSchema={validationSchema}>
        <FormYesNoSelect name="testField" label="Required Field" />
      </TestWrapper>
    );
    
    const select = screen.getByLabelText('Required Field');
    
    // Touch the field and blur to trigger validation
    fireEvent.focus(select);
    fireEvent.blur(select);
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('updates form state when selection is made', async () => {
    const user = userEvent.setup();
    let formValues = {};
    
    const handleSubmit = (values) => {
      formValues = values;
    };

    render(
      <TestWrapper onSubmit={handleSubmit}>
        <FormYesNoSelect name="testField" label="Test Field" />
        <button type="submit">Submit</button>
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Test Field' });
    await user.click(select);
    
    await waitFor(() => {
      expect(screen.getByText('Yes')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Yes'));
    
    expect(select).toHaveValue('Yes');
    
    await user.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(formValues.testField).toBe('yes');
    });
  });

  it('supports clearable functionality', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper initialValues={{ testField: 'yes' }}>
        <FormYesNoSelect name="testField" label="Clearable Field" clearable />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Clearable Field' });
    expect(select).toHaveValue('Yes');
    
    // Find and click the clear button
    const clearButton = select.parentElement?.querySelector('button[type="button"]');
    if (clearButton) {
      await user.click(clearButton);
      expect(select).toHaveValue('');
    }
  });

  it('can disable clearable functionality', () => {
    render(
      <TestWrapper initialValues={{ testField: 'yes' }}>
        <FormYesNoSelect name="testField" label="Non-clearable Field" clearable={false} />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Non-clearable Field' });
    const clearButton = select.parentElement?.querySelector('[data-clear]');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('supports searchable functionality', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Searchable Field" searchable />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Searchable Field' });
    await user.click(select);
    
    // Type to search
    await user.type(select, 'Y');
    
    await waitFor(() => {
      expect(screen.getByText('Yes')).toBeInTheDocument();
      // No should be filtered out
      expect(screen.queryByText('No')).not.toBeInTheDocument();
    });
  });

  it('applies required asterisk when required prop is true', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Required Field" required />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies required asterisk when withAsterisk prop is true', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Field with Asterisk" withAsterisk />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect name="testField" label="Disabled Field" disabled />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Disabled Field' });
    expect(select).toBeDisabled();
  });

  it('displays description text when provided', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect 
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
        <FormYesNoSelect 
          name="testField" 
          label="Styled Field" 
          className="custom-class"
          style={{ backgroundColor: 'lightblue' }}
        />
      </TestWrapper>
    );
    
    const selectInput = screen.getByRole('textbox', { name: 'Styled Field' });
    const selectWrapper = selectInput.closest('.mantine-Select-root');
    expect(selectWrapper).toHaveClass('custom-class');
    expect(selectWrapper).toHaveStyle('background-color: rgb(173, 216, 230)');
  });

  it('integrates with Formik validation', async () => {
    const validationSchema = yup.object({
      agreement: yup.string().required('This field is required')
    });

    render(
      <TestWrapper validationSchema={validationSchema} initialValues={{ agreement: '' }}>
        <FormYesNoSelect 
          name="agreement" 
          label="Agreement Field" 
          yesLabel="I Agree"
          noLabel="I Disagree"
        />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Agreement Field' });
    
    // Trigger validation by focusing and blurring
    fireEvent.focus(select);
    fireEvent.blur(select);
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('handles placeholder text correctly', () => {
    render(
      <TestWrapper>
        <FormYesNoSelect 
          name="testField" 
          label="Field with Placeholder" 
          placeholder="Choose Yes or No"
        />
      </TestWrapper>
    );
    
    const select = screen.getByRole('textbox', { name: 'Field with Placeholder' });
    expect(select).toHaveAttribute('placeholder', 'Choose Yes or No');
  });
});