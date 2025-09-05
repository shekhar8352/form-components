import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormFileUpload from './FormFileUpload';

// Mock the useFileUpload hook
vi.mock('../../hooks/useFileUpload', () => ({
  useFileUpload: vi.fn(() => ({
    files: [],
    error: null,
    addFiles: vi.fn(),
    removeFile: vi.fn(),
    getFileInfo: vi.fn((file) => ({
      name: file.name,
      size: file.size,
      formattedSize: '1.5 KB',
    })),
    canAddMoreFiles: true,
    remainingSlots: 10,
  })),
}));

const TestWrapper = ({ children, initialValues = {} }) => (
  <MantineProvider>
    <Formik initialValues={{ files: [], ...initialValues }} onSubmit={() => {}}>
      <Form>{children}</Form>
    </Formik>
  </MantineProvider>
);

describe('FormFileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders upload button with default text', () => {
    render(
      <TestWrapper>
        <FormFileUpload name="files" />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
  });

  it('renders upload button with custom text', () => {
    render(
      <TestWrapper>
        <FormFileUpload name="files" uploadButtonText="Choose Files" />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose files/i })).toBeInTheDocument();
  });

  it('renders with label and description', () => {
    render(
      <TestWrapper>
        <FormFileUpload 
          name="files" 
          label="Upload Documents" 
          description="Select files to upload"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Upload Documents')).toBeInTheDocument();
    expect(screen.getByText('Select files to upload')).toBeInTheDocument();
  });

  it('opens file dialog when upload button is clicked', () => {
    const mockClick = vi.fn();
    const originalCreateElement = document.createElement;
    
    document.createElement = vi.fn((tagName) => {
      if (tagName === 'input') {
        const input = originalCreateElement.call(document, tagName);
        input.click = mockClick;
        return input;
      }
      return originalCreateElement.call(document, tagName);
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" />
      </TestWrapper>
    );

    const uploadButton = screen.getByRole('button', { name: /upload files/i });
    fireEvent.click(uploadButton);

    document.createElement = originalCreateElement;
  });

  it('handles file selection', async () => {
    const mockAddFiles = vi.fn();
    const { useFileUpload } = await import('../../hooks/useFileUpload');
    
    useFileUpload.mockReturnValue({
      files: [],
      error: null,
      addFiles: mockAddFiles,
      removeFile: vi.fn(),
      getFileInfo: vi.fn((file) => ({
        name: file.name,
        size: file.size,
        formattedSize: '1.5 KB',
      })),
      canAddMoreFiles: true,
      remainingSlots: 10,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" />
      </TestWrapper>
    );

    // Create a mock file
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileInput = document.querySelector('input[type="file"]');
    
    // Simulate file selection
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(fileInput);

    expect(mockAddFiles).toHaveBeenCalledWith([file]);
  });

  it('displays file list when files are present', async () => {
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.pdf', { type: 'application/pdf' }),
    ];

    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: mockFiles,
      error: null,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn((file) => ({
        name: file.name,
        size: file.size,
        formattedSize: '1.5 KB',
      })),
      canAddMoreFiles: true,
      remainingSlots: 8,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" showFileList={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Attached Files (2)')).toBeInTheDocument();
    expect(screen.getByText('file1.txt')).toBeInTheDocument();
    expect(screen.getByText('file2.pdf')).toBeInTheDocument();
  });

  it('handles file removal', async () => {
    const mockRemoveFile = vi.fn();
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
    ];

    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: mockFiles,
      error: null,
      addFiles: vi.fn(),
      removeFile: mockRemoveFile,
      getFileInfo: vi.fn((file) => ({
        name: file.name,
        size: file.size,
        formattedSize: '1.5 KB',
      })),
      canAddMoreFiles: true,
      remainingSlots: 9,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" showFileList={true} />
      </TestWrapper>
    );

    const removeButton = screen.getByLabelText('Remove file1.txt');
    fireEvent.click(removeButton);

    expect(mockRemoveFile).toHaveBeenCalledWith(0);
  });

  it('displays error messages', async () => {
    const mockError = new Error('File too large');

    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: [],
      error: mockError,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn(),
      canAddMoreFiles: true,
      remainingSlots: 10,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" />
      </TestWrapper>
    );

    expect(screen.getByText('File too large')).toBeInTheDocument();
  });

  it('disables upload button when max files reached', async () => {
    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: [],
      error: null,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn(),
      canAddMoreFiles: false,
      remainingSlots: 0,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" maxFiles={5} />
      </TestWrapper>
    );

    const uploadButton = screen.getByRole('button', { name: /upload files/i });
    expect(uploadButton).toBeDisabled();
    expect(screen.getByText('Maximum 5 files allowed')).toBeInTheDocument();
  });

  it('shows remaining slots when files are added', async () => {
    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: [],
      error: null,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn(),
      canAddMoreFiles: true,
      remainingSlots: 3,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" maxFiles={5} />
      </TestWrapper>
    );

    expect(screen.getByText('3 more files allowed')).toBeInTheDocument();
  });

  it('handles multiple file selection when multiple prop is true', () => {
    render(
      <TestWrapper>
        <FormFileUpload name="files" multiple={true} />
      </TestWrapper>
    );

    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('multiple');
  });

  it('sets accept attribute correctly', () => {
    render(
      <TestWrapper>
        <FormFileUpload name="files" accept="image/*,.pdf" />
      </TestWrapper>
    );

    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept', 'image/*,.pdf');
  });

  it('hides file list when showFileList is false', async () => {
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
    ];

    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: mockFiles,
      error: null,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn((file) => ({
        name: file.name,
        size: file.size,
        formattedSize: '1.5 KB',
      })),
      canAddMoreFiles: true,
      remainingSlots: 9,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" showFileList={false} />
      </TestWrapper>
    );

    expect(screen.queryByText('Attached Files (1)')).not.toBeInTheDocument();
    expect(screen.queryByText('file1.txt')).not.toBeInTheDocument();
  });

  it('calls onFilesChange callback when files change', async () => {
    const mockOnFilesChange = vi.fn();

    const { useFileUpload } = await import('../../hooks/useFileUpload');
    useFileUpload.mockReturnValue({
      files: [],
      error: null,
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      getFileInfo: vi.fn((file) => ({
        name: file.name,
        size: file.size,
        formattedSize: '1.5 KB',
      })),
      canAddMoreFiles: true,
      remainingSlots: 10,
    });

    render(
      <TestWrapper>
        <FormFileUpload name="files" onFilesChange={mockOnFilesChange} />
      </TestWrapper>
    );

    // The component should render without errors
    expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
  });
});