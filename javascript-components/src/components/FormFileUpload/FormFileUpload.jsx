import React, { useRef, useCallback } from 'react';
import { Button, Group, Text, ActionIcon, Stack, Paper, Box } from '@mantine/core';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useFileUpload } from '../../hooks/useFileUpload';

/**
 * FormFileUpload component for file uploads with validation and file list display
 * Integrates with Formik and provides file management functionality
 */
const FormFileUpload = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  size = 'sm',
  width,
  height,
  className = '',
  style = {},
  description,
  withAsterisk,
  accept = '',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  uploadButtonText = 'Upload Files',
  showFileList = true,
  onFilesChange,
  ...props
}) => {
  const fileInputRef = useRef(null);
  const [field, meta, helpers] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Create custom style object that includes width override
  const customStyle = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };
  
  // Use the file upload hook for file management
  const {
    files,
    error: fileError,
    addFiles,
    removeFile,
    getFileInfo,
    canAddMoreFiles,
    remainingSlots,
  } = useFileUpload({
    maxSize,
    maxFiles,
    accept,
    onFilesChange: (newFiles) => {
      // Update Formik field value
      helpers.setValue(newFiles);
      if (onFilesChange) {
        onFilesChange(newFiles);
      }
    },
  });

  // Handle file input change
  const handleFileInputChange = useCallback((event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [addFiles]);

  // Handle upload button click
  const handleUploadClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Handle file removal
  const handleRemoveFile = useCallback((index) => {
    removeFile(index);
  }, [removeFile]);

  // Render file list item
  const renderFileItem = useCallback((file, index) => {
    const fileInfo = getFileInfo(file);
    
    return (
      <Paper key={`${file.name}-${index}`} p="sm" withBorder>
        <Group justify="space-between" align="center">
          <Group align="center" gap="sm">
            <IconFile size={20} />
            <Box>
              <Text size="sm" fw={500} truncate style={{ maxWidth: 200 }}>
                {fileInfo.name}
              </Text>
              <Text size="xs" c="dimmed">
                {fileInfo.formattedSize}
              </Text>
            </Box>
          </Group>
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => handleRemoveFile(index)}
            aria-label={`Remove ${fileInfo.name}`}
          >
            <IconX size={16} />
          </ActionIcon>
        </Group>
      </Paper>
    );
  }, [getFileInfo, handleRemoveFile]);

  return (
    <Box className={className} style={customStyle}>
      {label && (
        <Text size="sm" fw={500} mb="xs">
          {label}
          {(withAsterisk || required) && <Text component="span" c="red"> *</Text>}
        </Text>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      
      <Stack gap="sm">
        <Group align="center" gap="sm">
          <Button
            leftSection={<IconUpload size={16} />}
            onClick={handleUploadClick}
            disabled={!canAddMoreFiles || disabled}
            variant="light"
            size={size}
          >
            {uploadButtonText}
          </Button>
          
          {!canAddMoreFiles && (
            <Text size="sm" c="orange">
              Maximum {maxFiles} files allowed
            </Text>
          )}
          
          {canAddMoreFiles && remainingSlots < maxFiles && (
            <Text size="sm" c="dimmed">
              {remainingSlots} more file{remainingSlots !== 1 ? 's' : ''} allowed
            </Text>
          )}
        </Group>

        {fileError && (
          <Text size="sm" c="red">
            {fileError.message}
          </Text>
        )}

        {showFileList && files.length > 0 && (
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Attached Files ({files.length})
            </Text>
            {files.map((file, index) => renderFileItem(file, index))}
          </Stack>
        )}
      </Stack>
      
      {hasError && (
        <Text size="sm" c="red" mt={4}>
          {meta.error}
        </Text>
      )}
      
      {description && !hasError && (
        <Text size="sm" c="dimmed" mt={4}>
          {description}
        </Text>
      )}
    </Box>
  );
};

FormFileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  uploadButtonText: PropTypes.string,
  showFileList: PropTypes.bool,
  onFilesChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  description: PropTypes.string,
  withAsterisk: PropTypes.bool,
};

export default FormFileUpload;