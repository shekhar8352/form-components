# Reusable Form Components Library (JavaScript)

A comprehensive library of reusable form components built with Mantine UI and Formik for JavaScript React projects.

## Installation

```bash
npm install reusable-form-components-js
```

## Usage

### Individual Component Import (Tree-shaking friendly)

```javascript
import { FormTextInput, FormTextArea, useDebounce } from 'reusable-form-components-js';
```

### Grouped Imports

```javascript
import { FormComponents, FormHooks } from 'reusable-form-components-js';

const { FormTextInput, FormTextArea } = FormComponents;
const { useDebounce, useApiData } = FormHooks;
```

### Complete Import

```javascript
import * as FormLibrary from 'reusable-form-components-js';
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

## Build Information

- **ES Module**: `dist/reusable-form-components.es.js`
- **UMD**: `dist/reusable-form-components.umd.js`
- **TypeScript Definitions**: `src/index.d.ts`

## Peer Dependencies

- React >= 18.0.0
- @mantine/core >= 7.0.0
- @mantine/dates >= 7.0.0
- @mantine/form >= 7.0.0
- @mantine/hooks >= 7.0.0
- formik >= 2.0.0

## License

MIT