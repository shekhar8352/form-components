# Reusable Form Components Library (TypeScript)

A comprehensive library of reusable form components built with Mantine UI and Formik for TypeScript React projects.

## Installation

```bash
npm install reusable-form-components-ts
```

## Usage

### Individual Component Import (Tree-shaking friendly)

```typescript
import { FormTextInput, FormTextArea, useDebounce } from 'reusable-form-components-ts';
import type { FormTextInputProps, FormTextAreaProps } from 'reusable-form-components-ts';
```

### Grouped Imports

```typescript
import { FormComponents, FormHooks } from 'reusable-form-components-ts';

const { FormTextInput, FormTextArea } = FormComponents;
const { useDebounce, useApiData } = FormHooks;
```

### Complete Import

```typescript
import * as FormLibrary from 'reusable-form-components-ts';
```

## Available Components

- `FormTextInput` - Text input with validation
- `FormTextArea` - Multi-line text input
- `FormYesNoSelect` - Binary choice dropdown
- `FormStaticSelect` - Dropdown with static options
- `FormDynamicSelect` - Dropdown with API-loaded options
- `FormSearchableSelect` - Server-side searchable dropdown
- `FormFileUpload` - File upload with validation
- `FormRadioGroup` - Radio button groups
- `FormDatePicker` - Date selection component

## Available Hooks

- `useDebounce` - Debounce values for search inputs
- `useApiData` - Fetch and manage API data
- `useFileUpload` - Handle file uploads and validation

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  BaseFormComponentProps,
  FormTextInputProps,
  FormTextAreaProps,
  SelectOption,
  UseApiDataReturn,
  UseFileUploadReturn
} from 'reusable-form-components-ts';
```

## Build Information

- **ES Module**: `dist/reusable-form-components.es.js`
- **UMD**: `dist/reusable-form-components.umd.js`
- **TypeScript Definitions**: `dist/index.d.ts`

## Peer Dependencies

- React >= 18.0.0
- @mantine/core >= 7.0.0
- @mantine/dates >= 7.0.0
- @mantine/form >= 7.0.0
- @mantine/hooks >= 7.0.0
- formik >= 2.0.0

## License

MIT