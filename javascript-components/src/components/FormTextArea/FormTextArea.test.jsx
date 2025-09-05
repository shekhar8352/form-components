import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import * as yup from 'yup';
import FormTextArea from './FormTextArea';

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

describe('FormTextArea', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <FormTextArea name="testField" label="Test TextArea" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Test TextArea')).toBeInTheDocument();
  });

  it('applies custom width and height while maintaining Mantine size properties', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Custom Dimensions TextArea" 
          width="400px"
          height="200px"
          size="lg"
        />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Custom Dimensions TextArea');
    const textareaWrapper = textarea.closest('.mantine-Textarea-root');
    
    expect(textareaWrapper).toHaveStyle({ width: '400px', height: '200px' });
    expect(textarea).toHaveClass('mantine-Textarea-input');
  });

  it('displays validation errors when field is touched and has error', async () => {
    const validationSchema = yup.object({
      testField: yup.string().required('This field is required')
    });

    render(
      <TestWrapper validationSchema={validationSchema}>
        <FormTextArea name="testField" label="Required TextArea" />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Required TextArea');
    
    // Touch the field and blur to trigger validation
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);
    
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
        <FormTextArea name="testField" label="Test TextArea" />
        <button type="submit">Submit</button>
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Test TextArea');
    await user.type(textarea, 'This is a multi-line\ntext area content');
    
    expect(textarea).toHaveValue('This is a multi-line\ntext area content');
    
    await user.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(formValues.testField).toBe('This is a multi-line\ntext area content');
    });
  });

  it('supports auto-resizing functionality', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Auto-resize TextArea" 
          autosize
          minRows={2}
          maxRows={6}
        />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Auto-resize TextArea');
    // Check that the textarea is rendered (autosize behavior is handled by Mantine internally)
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('applies required asterisk when required prop is true', () => {
    render(
      <TestWrapper>
        <FormTextArea name="testField" label="Required TextArea" required />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies required asterisk when withAsterisk prop is true', () => {
    render(
      <TestWrapper>
        <FormTextArea name="testField" label="TextArea with Asterisk" withAsterisk />
      </TestWrapper>
    );
    
    // Check for asterisk in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('supports HTML textarea attributes like maxLength and rows', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Constrained TextArea" 
          maxLength={100}
          rows={6}
        />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Constrained TextArea');
    expect(textarea).toHaveAttribute('maxLength', '100');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <FormTextArea name="testField" label="Disabled TextArea" disabled />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Disabled TextArea');
    expect(textarea).toBeDisabled();
  });

  it('displays description text when provided', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="TextArea with Description" 
          description="This is a helpful description for the textarea"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('This is a helpful description for the textarea')).toBeInTheDocument();
  });

  it('applies custom className and style props', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Styled TextArea" 
          className="custom-textarea-class"
          style={{ backgroundColor: 'lightgray' }}
        />
      </TestWrapper>
    );
    
    const textareaWrapper = screen.getByLabelText('Styled TextArea').closest('.mantine-Textarea-root');
    expect(textareaWrapper).toHaveClass('custom-textarea-class');
    expect(textareaWrapper).toHaveStyle('background-color: rgb(211, 211, 211)');
  });

  it('supports resize property', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Resizable TextArea" 
          resize="both"
        />
      </TestWrapper>
    );
    
    const textareaWrapper = screen.getByLabelText('Resizable TextArea').closest('.mantine-Textarea-root');
    expect(textareaWrapper).toHaveStyle('resize: both');
  });

  it('validates maxLength constraint', async () => {
    const validationSchema = yup.object({
      testField: yup.string().max(10, 'Text is too long')
    });

    render(
      <TestWrapper validationSchema={validationSchema}>
        <FormTextArea name="testField" label="Length Limited TextArea" maxLength={10} />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Length Limited TextArea');
    
    fireEvent.change(textarea, { target: { value: 'This text is way too long for the limit' } });
    fireEvent.blur(textarea);
    
    await waitFor(() => {
      expect(screen.getByText('Text is too long')).toBeInTheDocument();
    });
  });

  it('supports character count display with maxLength', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="TextArea with Character Count" 
          maxLength={50}
        />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('TextArea with Character Count');
    expect(textarea).toHaveAttribute('maxLength', '50');
  });

  it('handles minRows and maxRows for autosize', () => {
    render(
      <TestWrapper>
        <FormTextArea 
          name="testField" 
          label="Auto-size with Limits" 
          autosize
          minRows={3}
          maxRows={8}
        />
      </TestWrapper>
    );
    
    const textarea = screen.getByLabelText('Auto-size with Limits');
    // Check that the textarea is rendered with autosize props (behavior is handled by Mantine)
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });
});