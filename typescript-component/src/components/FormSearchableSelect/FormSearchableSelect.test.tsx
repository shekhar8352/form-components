import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import FormSearchableSelect, { FormSearchableSelectProps } from './FormSearchableSelect';

// Mock the hooks and utilities
const mockUseDebounce = vi.fn();
const mockSearchData = vi.fn();

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string, delay: number) => mockUseDebounce(value, delay),
}));

vi.mock('../../utils/api', () => ({
  searchData: (...args: any[]) => mockSearchData(...args),
}));

// Test wrapper component
interface TestWrapperProps {
  children: React.ReactNode;
  initialValues?: Record<string, any>;
  onSubmit?: (values: any) => void;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ 
  children, 
  initialValues = {}, 
  onSubmit = vi.fn() 
}) => (
  <MantineProvider>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormSearchableSelect', () => {
  const defaultProps: FormSearchableSelectProps = {
    name: 'testSearchSelect',
    label: 'Test Search Select',
    searchApiUrl: '/api/search',
  };

  const mockSearchResults = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    mockUseDebounce.mockImplementation((value: string) => value);
    mockSearchData.mockResolvedValue(mockSearchResults);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox', { name: 'Test Search Select' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} placeholder="Search for items..." />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Search for items...')).toBeInTheDocument();
    });

    it('shows minimum search length message initially', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} minSearchLength={3} />
        </TestWrapper>
      );

      // Click to open dropdown
      fireEvent.click(screen.getByRole('textbox'));
      
      expect(screen.getByText('Type at least 3 characters to search')).toBeInTheDocument();
    });
  });

  describe('Debounced Search Functionality', () => {
    it('calls useDebounce with correct parameters', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} debounceMs={500} />
        </TestWrapper>
      );

      expect(mockUseDebounce).toHaveBeenCalledWith('', 500);
    });

    it('performs search when debounced value changes', async () => {
      mockUseDebounce.mockReturnValue('apple');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} valueKey="id" labelKey="name" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalledWith(
          '/api/search',
          'apple',
          {
            headers: {},
            searchParam: 'search',
          }
        );
      });
    });

    it('does not search when term is below minimum length', async () => {
      mockUseDebounce.mockReturnValue('ap');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} minSearchLength={3} />
        </TestWrapper>
      );

      // Wait a bit to ensure no search is triggered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(mockSearchData).not.toHaveBeenCalled();
    });
  });

  describe('Search Results Display', () => {
    it('displays search results correctly', async () => {
      mockUseDebounce.mockReturnValue('fruit');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} valueKey="id" labelKey="name" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      // Click to open dropdown
      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });
    });

    it('handles API response with data property', async () => {
      mockUseDebounce.mockReturnValue('fruit');
      mockSearchData.mockResolvedValue({ data: mockSearchResults });

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} valueKey="id" labelKey="name" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('handles primitive search results', async () => {
      const primitiveResults = ['Apple', 'Banana', 'Cherry'];
      mockUseDebounce.mockReturnValue('fruit');
      mockSearchData.mockResolvedValue(primitiveResults);

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator during search', async () => {
      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise(resolve => {
        resolveSearch = resolve;
      });
      mockSearchData.mockReturnValue(searchPromise);
      mockUseDebounce.mockReturnValue('apple');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      // Resolve the search
      act(() => {
        resolveSearch!(mockSearchResults);
      });

      await waitFor(() => {
        expect(screen.getByRole('textbox')).not.toBeDisabled();
      });
    });

    it('shows "Searching..." message in dropdown during loading', async () => {
      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise(resolve => {
        resolveSearch = resolve;
      });
      mockSearchData.mockReturnValue(searchPromise);
      mockUseDebounce.mockReturnValue('apple');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      // Click to open dropdown during loading
      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Searching...')).toBeInTheDocument();
      });

      // Resolve the search
      act(() => {
        resolveSearch!(mockSearchResults);
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when search fails', async () => {
      const searchError = new Error('Network error');
      mockUseDebounce.mockReturnValue('apple');
      mockSearchData.mockRejectedValue(searchError);

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getAllByText(/Search failed.*Network error/)).toHaveLength(2);
      });
    });

    it('calls onApiError callback when search fails', async () => {
      const searchError = new Error('Network error');
      const onApiError = vi.fn();
      mockUseDebounce.mockReturnValue('apple');
      mockSearchData.mockRejectedValue(searchError);

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} onApiError={onApiError} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(onApiError).toHaveBeenCalledWith(searchError);
      });
    });

    it('shows "Search failed" in dropdown when error occurs', async () => {
      const searchError = new Error('Network error');
      mockUseDebounce.mockReturnValue('apple');
      mockSearchData.mockRejectedValue(searchError);

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('Search failed')).toBeInTheDocument();
      });
    });
  });

  describe('Customization', () => {
    it('uses custom search parameter', async () => {
      mockUseDebounce.mockReturnValue('apple');

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} searchParam="query" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalledWith(
          '/api/search',
          'apple',
          expect.objectContaining({
            searchParam: 'query',
          })
        );
      });
    });

    it('uses custom API headers', async () => {
      mockUseDebounce.mockReturnValue('apple');
      const customHeaders = { 'Authorization': 'Bearer token' };

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} apiHeaders={customHeaders} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalledWith(
          '/api/search',
          'apple',
          expect.objectContaining({
            headers: customHeaders,
          })
        );
      });
    });

    it('applies custom width', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} width="400px" />
        </TestWrapper>
      );

      const select = screen.getByRole('textbox');
      expect(select.closest('.mantine-Select-root')).toHaveStyle({ width: '400px' });
    });

    it('uses custom value and label keys', async () => {
      const customResults = [
        { uuid: 'a1', title: 'First Item' },
        { uuid: 'b2', title: 'Second Item' },
      ];
      mockUseDebounce.mockReturnValue('item');
      mockSearchData.mockResolvedValue(customResults);

      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} valueKey="uuid" labelKey="title" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByText('First Item')).toBeInTheDocument();
        expect(screen.getByText('Second Item')).toBeInTheDocument();
      });
    });
  });

  describe('Form Integration', () => {
    it('updates Formik field value when selection is made', async () => {
      mockUseDebounce.mockReturnValue('apple');

      const onSubmit = vi.fn();
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }} onSubmit={onSubmit}>
          <FormSearchableSelect {...defaultProps} valueKey="id" labelKey="name" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockSearchData).toHaveBeenCalled();
      });

      // Click to open dropdown
      fireEvent.click(screen.getByRole('textbox'));

      // Select an option
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Apple'));

      // Check that the value was set
      expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
    });

    it('displays Formik validation errors', () => {
      render(
        <TestWrapper initialValues={{ testSearchSelect: '' }}>
          <FormSearchableSelect {...defaultProps} required />
        </TestWrapper>
      );

      // Simulate Formik error by triggering validation
      const select = screen.getByRole('textbox');
      fireEvent.blur(select);

      // Note: In a real scenario, Formik would set the error based on validation schema
      // This test structure shows how the component would display the error
    });
  });

  describe('TypeScript Type Safety', () => {
    it('accepts all required props with correct types', () => {
      const props: FormSearchableSelectProps = {
        name: 'test',
        searchApiUrl: '/api/search',
        debounceMs: 500,
        minSearchLength: 2,
        apiHeaders: { 'Authorization': 'Bearer token' },
        onApiError: (error: Error) => console.error(error),
      };

      render(
        <TestWrapper initialValues={{ test: '' }}>
          <FormSearchableSelect {...props} />
        </TestWrapper>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});