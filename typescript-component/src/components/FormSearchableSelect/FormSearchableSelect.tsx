import React, { useState, useEffect, useMemo } from 'react';
import { Select, Loader, Text } from '@mantine/core';
import { useField } from 'formik';
import { useDebounce } from '../../hooks/useDebounce';
import { searchData } from '../../utils/api';

/**
 * Props interface for FormSearchableSelect component
 */
export interface FormSearchableSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  description?: string;
  withAsterisk?: boolean;
  searchApiUrl: string;
  searchParam?: string;
  debounceMs?: number;
  apiHeaders?: Record<string, string>;
  valueKey?: string;
  labelKey?: string;
  minSearchLength?: number;
  nothingFoundMessage?: string;
  onApiError?: (error: Error) => void;
}

/**
 * Interface for select option data
 */
interface SelectOption {
  value: string;
  label: string;
}

/**
 * Interface for API response item
 */
interface ApiResponseItem {
  [key: string]: any;
  id?: string | number;
  value?: string | number;
  name?: string;
  label?: string;
  title?: string;
}

/**
 * FormSearchableSelect - Server-side searchable dropdown with debounced API calls
 * 
 * Features:
 * - Server-side searchable dropdown with debounced API calls (default 300ms)
 * - Dynamic option loading based on search parameters
 * - Loading indicators and error handling for search API
 * - Configurable minimum search length and API parameters
 * - Formik field integration with automatic error display
 * - Custom width override while maintaining Mantine size properties
 */
const FormSearchableSelect: React.FC<FormSearchableSelectProps> = ({
  name,
  label,
  placeholder = 'Type to search...',
  required = false,
  disabled = false,
  size = 'sm',
  width,
  height,
  className = '',
  style = {},
  description,
  withAsterisk,
  searchApiUrl,
  searchParam = 'search',
  debounceMs = 300,
  apiHeaders = {},
  valueKey = 'value',
  labelKey = 'label',
  minSearchLength = 1,
  nothingFoundMessage = 'No options found',
  onApiError,
  ...mantineProps
}) => {
  const [field, meta, helpers] = useField(name);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const hasError = meta.touched && meta.error;
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Effect to handle debounced search
  useEffect(() => {
    const performSearch = async (): Promise<void> => {
      // Don't search if term is too short or empty
      if (!debouncedSearchTerm || debouncedSearchTerm.length < minSearchLength) {
        setOptions([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchData(searchApiUrl, debouncedSearchTerm, {
          headers: apiHeaders,
          searchParam,
        });

        // Transform API data to Mantine Select format
        let apiData: ApiResponseItem[] = response;
        
        // If response has a data property (common API pattern), use that
        if (response && typeof response === 'object' && 'data' in response) {
          apiData = response.data;
        }
        
        // Ensure we have an array
        const dataArray = Array.isArray(apiData) ? apiData : [apiData];
        
        const selectData: SelectOption[] = dataArray.map((item: ApiResponseItem, index: number) => {
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
            value = item as string | number;
            label = String(item);
          }

          return {
            value: String(value),
            label: String(label),
          };
        });

        setOptions(selectData);
        setHasSearched(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Search failed');
        setError(error);
        setOptions([]);
        setHasSearched(true);
        
        if (onApiError) {
          onApiError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm, searchApiUrl, searchParam, valueKey, labelKey, minSearchLength]);

  // Handle search input change
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  // Handle selection change
  const handleChange = (value: string | null): void => {
    helpers.setValue(value);
  };

  // Create custom style object that includes width override
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width })
  };

  // Determine effective disabled state
  const effectiveDisabled = disabled || loading;

  // Determine error message to show
  const showApiError = error && !hasError;
  const errorMessage = hasError ? meta.error : (showApiError ? `Search failed: ${error.message}` : undefined);

  // Determine what to show in dropdown
  const effectiveNothingFoundMessage = useMemo(() => {
    if (loading) return 'Searching...';
    if (!hasSearched && searchTerm.length < minSearchLength) {
      return `Type at least ${minSearchLength} character${minSearchLength > 1 ? 's' : ''} to search`;
    }
    if (error) return 'Search failed';
    return nothingFoundMessage;
  }, [loading, hasSearched, searchTerm.length, minSearchLength, error, nothingFoundMessage]);

  return (
    <>
      <Select
        value={field.value || null}
        onChange={handleChange}
        onSearchChange={handleSearchChange}
        searchValue={searchTerm}
        data={Array.isArray(options) ? options : []}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={effectiveDisabled}
        size={size}
        className={className}
        style={customStyle}
        description={description}
        withAsterisk={withAsterisk || required}
        searchable
        clearable
        nothingFoundMessage={effectiveNothingFoundMessage}
        error={errorMessage}
        rightSection={loading ? <Loader size="xs" /> : undefined}

        {...mantineProps}
      />
      {showApiError && (
        <Text size="sm" c="red" mt={4}>
          Search failed: {error.message}
        </Text>
      )}
    </>
  );
};

export default FormSearchableSelect;