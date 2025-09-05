import React, { useMemo } from 'react';
import { Select, Loader, Text, type SelectProps } from '@mantine/core';
import { useField } from 'formik';
import { useApiData } from '../../hooks/useApiData';
import type { FormDynamicSelectProps } from '../../types';

/**
 * FormDynamicSelect - Single-select dropdown with API-loaded options using Mantine Select
 * 
 * Features:
 * - API data fetching on component mount using useApiData hook
 * - Loading state management with visual indicators
 * - Error handling for API failures with user feedback
 * - Searchable functionality on loaded data (client-side filtering)
 * - Configurable value and label keys for API response mapping
 * - Clear selection capability with icon
 * - Formik field integration with automatic error display
 * - Custom width override while maintaining Mantine size properties
 * - Full TypeScript support with proper type definitions
 */
const FormDynamicSelect: React.FC<FormDynamicSelectProps & Omit<SelectProps, keyof FormDynamicSelectProps>> = ({
  name,
  label,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  size = 'sm',
  width,
  height,
  className = '',
  style = {},
  description,
  withAsterisk,
  apiUrl,
  apiHeaders = {},
  valueKey = 'value',
  labelKey = 'label',
  clearable = true,
  searchable = true,
  nothingFoundMessage = 'No options found',
  onApiError,
  ...mantineProps
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  
  // Use the useApiData hook to fetch options from API
  const { data: apiData, loading, error: apiError, refetch } = useApiData<Record<string, any>>(apiUrl, {
    headers: apiHeaders,
    onError: onApiError,
  });

  // Transform API data to Mantine Select format
  const selectData = useMemo(() => {
    if (!apiData || !Array.isArray(apiData)) {
      return [];
    }

    return apiData.map((item, index) => {
      // Handle different data structures
      let value: string | number;
      let label: string;
      
      if (typeof item === 'object' && item !== null) {
        // Use configured keys to extract value and label
        value = item[valueKey];
        label = item[labelKey];
        
        // Fallback if keys don't exist
        if (value === undefined) {
          value = item.id || item.value || index;
        }
        if (label === undefined) {
          label = item.name || item.label || item.title || String(value);
        }
      } else {
        // Handle primitive values
        value = item;
        label = String(item);
      }

      return {
        value: String(value),
        label: String(label),
      };
    });
  }, [apiData, valueKey, labelKey]);
  
  // Create custom style object that includes width override
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  // Show loading state in the select
  const isLoading = loading && !apiError;
  const effectiveDisabled = disabled || isLoading;
  const effectivePlaceholder = isLoading ? 'Loading options...' : placeholder;

  // Determine if we should show an error message
  const showApiError = apiError && !hasError;
  const errorMessage = hasError ? meta.error : (showApiError ? `Failed to load options: ${apiError.message}` : undefined);

  return (
    <>
      <Select
        {...field}
        {...mantineProps}
        data={selectData}
        label={label}
        placeholder={effectivePlaceholder}
        required={required}
        disabled={effectiveDisabled}
        size={size}
        className={className}
        style={customStyle}
        description={description}
        withAsterisk={withAsterisk || required}
        clearable={clearable}
        searchable={searchable}
        nothingFoundMessage={isLoading ? 'Loading...' : nothingFoundMessage}
        error={errorMessage}
        rightSection={isLoading ? <Loader size="xs" /> : undefined}
      />
      {showApiError && (
        <Text size="sm" c="red" mt={4}>
          Failed to load options. 
          <Text 
            component="span" 
            size="sm" 
            c="blue" 
            style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: 4 }}
            onClick={refetch}
          >
            Try again
          </Text>
        </Text>
      )}
    </>
  );
};

export default FormDynamicSelect;