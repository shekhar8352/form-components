import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FormDynamicSelect from './FormDynamicSelect';

// Mock the useApiData hook
const mockUseApiData = vi.fn();
vi.mock('../../hooks/useApiData', () => ({
  useApiData: () => mockUseApiData(),
}));

// Test wrapper component
const TestWrapper = ({ children, initialValues = {}, onSubmit = vi.fn() }) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormDynamicSelect', () => {
  const defaultProps = {
    name: 'testSelect',
    label: 'Test Select',
    apiUrl: '/api/test-options',
  };

  const mockApiData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox', { name: 'Test Select' })).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} placeholder="Choose an option" />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Choose an option')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('displays loading state correctly', () => {
      mockUseApiData.mockReturnValue({
        data: [],
        loading: true,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Loading options...')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('Data Display', () => {
    it('displays options when data is loaded', async () => {
      mockUseApiData.mockReturnValue({
        data: mockApiData,
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} valueKey="id" labelKey="name" />
        </TestWrapper>
      );

      // Click to open dropdown
      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    it('handles primitive values', async () => {
      const primitiveData = ['Option A', 'Option B', 'Option C'];

      mockUseApiData.mockReturnValue({
        data: primitiveData,
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} />
        </TestWrapper>
      );

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Option A')).toBeInTheDocument();
        expect(screen.getByText('Option B')).toBeInTheDocument();
        expect(screen.getByText('Option C')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays API error message', () => {
      const mockError = new Error('Network error');
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: mockError,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Failed to load options: Network error')).toBeInTheDocument();
    });

    it('shows retry link on API error', () => {
      const mockError = new Error('Network error');
      const mockRefetch = vi.fn();
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: mockError,
        refetch: mockRefetch,
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} />
        </TestWrapper>
      );

      const retryLink = screen.getByText('Try again');
      expect(retryLink).toBeInTheDocument();

      fireEvent.click(retryLink);
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Customization', () => {
    it('applies custom width', () => {
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} width="300px" />
        </TestWrapper>
      );

      const select = screen.getByRole('textbox');
      expect(select.closest('.mantine-Select-root')).toHaveStyle({ width: '300px' });
    });

    it('applies custom className', () => {
      mockUseApiData.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      });

      render(
        <TestWrapper initialValues={{ testSelect: '' }}>
          <FormDynamicSelect {...defaultProps} className="custom-select" />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox').closest('.mantine-Select-root')).toHaveClass('custom-select');
    });
  });
});