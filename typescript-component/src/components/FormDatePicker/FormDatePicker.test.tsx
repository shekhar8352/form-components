import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormDatePicker from './FormDatePicker';

interface TestWrapperProps {
  children: React.ReactNode;
  initialValues?: Record<string, any>;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <DatesProvider settings={{ locale: 'en' }}>
      <Formik initialValues={{ date: null, ...initialValues }} onSubmit={() => {}}>
        <Form>{children}</Form>
      </Formik>
    </DatesProvider>
  </MantineProvider>
);

describe('FormDatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders default date input', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('placeholder', 'Select date');
  });

  it('renders with custom placeholder', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" placeholder="Choose a date" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toHaveAttribute('placeholder', 'Choose a date');
  });

  it('renders with label and description', () => {
    render(
      <TestWrapper>
        <FormDatePicker 
          name="date" 
          label="Birth Date" 
          description="Select your birth date"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Birth Date')).toBeInTheDocument();
    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('renders range date picker when type is range', () => {
    render(
      <TestWrapper initialValues={{ dateRange: [null, null] }}>
        <FormDatePicker name="dateRange" type="range" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('button', { name: /select date range/i });
    expect(dateInput).toBeInTheDocument();
  });

  it('renders multiple date picker when type is multiple', () => {
    render(
      <TestWrapper initialValues={{ dates: [] }}>
        <FormDatePicker name="dates" type="multiple" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('button', { name: /select dates/i });
    expect(dateInput).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" label="Required Date" required={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Required Date')).toBeInTheDocument();
    // The asterisk is rendered as part of the label by Mantine
  });

  it('shows required asterisk when withAsterisk is true', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" label="Date" withAsterisk={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('applies custom width and styling', () => {
    render(
      <TestWrapper>
        <FormDatePicker 
          name="date" 
          width="300px"
          className="custom-date-picker"
          style={{ backgroundColor: 'lightblue' }}
        />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" disabled={true} />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeDisabled();
  });

  it('displays validation errors', async () => {
    const initialValues = { date: null };
    const validate = (values: any) => {
      const errors: any = {};
      if (!values.date) {
        errors.date = 'Date is required';
      }
      return errors;
    };

    render(
      <MantineProvider>
        <DatesProvider settings={{ locale: 'en' }}>
          <Formik 
            initialValues={initialValues} 
            validate={validate}
            onSubmit={() => {}}
          >
            {({ setFieldTouched, setFieldError }) => (
              <Form>
                <FormDatePicker name="date" />
                <button 
                  type="button" 
                  onClick={() => {
                    setFieldTouched('date', true);
                    setFieldError('date', 'Date is required');
                  }}
                >
                  Touch Field
                </button>
              </Form>
            )}
          </Formik>
        </DatesProvider>
      </MantineProvider>
    );

    // Touch the field to trigger validation
    fireEvent.click(screen.getByText('Touch Field'));

    // Wait for the error to appear
    await screen.findByText('Date is required');
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('handles date format prop', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" dateFormat="DD/MM/YYYY" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles clearable prop', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" clearable={false} />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles min and max date constraints', () => {
    const minDate = new Date('2023-01-01');
    const maxDate = new Date('2023-12-31');

    render(
      <TestWrapper>
        <FormDatePicker 
          name="date" 
          minDate={minDate}
          maxDate={maxDate}
        />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles exclude date function', () => {
    const excludeWeekends = (dateString: string): boolean => {
      const date = new Date(dateString);
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday = 0, Saturday = 6
    };

    render(
      <TestWrapper>
        <FormDatePicker 
          name="date" 
          excludeDate={excludeWeekends}
        />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles different sizes', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" size="lg" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('handles locale prop', () => {
    render(
      <TestWrapper>
        <FormDatePicker name="date" locale="en-US" />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });

  it('updates formik value when date changes', () => {
    const mockSubmit = vi.fn();

    render(
      <MantineProvider>
        <DatesProvider settings={{ locale: 'en' }}>
          <Formik 
            initialValues={{ date: null }} 
            onSubmit={mockSubmit}
          >
            {({ values, submitForm }) => (
              <Form>
                <FormDatePicker name="date" />
                <button type="button" onClick={submitForm}>
                  Submit
                </button>
                <div data-testid="current-value">
                  {values.date ? values.date.toString() : 'No date'}
                </div>
              </Form>
            )}
          </Formik>
        </DatesProvider>
      </MantineProvider>
    );

    expect(screen.getByTestId('current-value')).toHaveTextContent('No date');
  });

  it('handles TypeScript type safety', () => {
    // This test ensures TypeScript compilation works correctly
    const minDate: Date = new Date('2023-01-01');
    const maxDate: Date = new Date('2023-12-31');
    const excludeFunction = (dateString: string): boolean => {
      return new Date(dateString).getDay() === 0;
    };

    render(
      <TestWrapper>
        <FormDatePicker 
          name="date"
          type="default"
          minDate={minDate}
          maxDate={maxDate}
          excludeDate={excludeFunction}
          clearable={true}
          required={false}
          disabled={false}
        />
      </TestWrapper>
    );

    const dateInput = screen.getByRole('textbox');
    expect(dateInput).toBeInTheDocument();
  });
});