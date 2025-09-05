# Reusable Form Components Library (TypeScript)

A comprehensive library of reusable form components built with Mantine UI and Formik for TypeScript React projects. This library provides 9 distinct form components with full type safety, IntelliSense support, and compile-time error checking.

## 🚀 Quick Start

### Installation

```bash
# Install the component library (when published)
npm install reusable-form-components-ts

# Or use the local development version
npm install
npm run dev
```

### Basic Usage

```typescript
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { MantineProvider } from '@mantine/core';
import { FormTextInput, FormYesNoSelect } from 'reusable-form-components-ts';

interface FormValues {
  name: string;
  isActive: string;
}

function MyForm() {
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmitting(false);
  };

  const initialValues: FormValues = {
    name: '',
    isActive: ''
  };

  return (
    <MantineProvider>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormTextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <FormYesNoSelect
            name="isActive"
            label="Are you active?"
            required
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </MantineProvider>
  );
}
```

## 📦 Available Components

### 1. FormTextInput
Standard text input with validation and error display.

```typescript
import { FormTextInput, FormTextInputProps } from 'reusable-form-components-ts';

<FormTextInput
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  width="300px"
/>
```

**TypeScript Interface:**
```typescript
interface FormTextInputProps extends BaseFormComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}
```

### 2. FormTextArea
Multi-line text input for larger content.

```typescript
import { FormTextArea, FormTextAreaProps } from 'reusable-form-components-ts';

<FormTextArea
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  rows={4}
  maxLength={500}
/>
```

**TypeScript Interface:**
```typescript
interface FormTextAreaProps extends BaseFormComponentProps {
  rows?: number;
  maxRows?: number;
  minRows?: number;
  maxLength?: number;
  autosize?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}
```

### 3. FormYesNoSelect
Binary choice dropdown with Yes/No options.

```typescript
import { FormYesNoSelect, FormYesNoSelectProps } from 'reusable-form-components-ts';

<FormYesNoSelect
  name="newsletter"
  label="Subscribe to Newsletter?"
  yesLabel="Yes, please"
  noLabel="No, thanks"
  clearable
/>
```

**TypeScript Interface:**
```typescript
interface FormYesNoSelectProps extends BaseFormComponentProps {
  yesLabel?: string;
  noLabel?: string;
  clearable?: boolean;
  searchable?: boolean;
}
```

### 4. FormStaticSelect
Single-select dropdown with predefined static options.

```typescript
import { FormStaticSelect, FormStaticSelectProps, SelectOption } from 'reusable-form-components-ts';

const options: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' }
];

<FormStaticSelect
  name="country"
  label="Country"
  options={options}
  searchable
  clearable
/>
```

**TypeScript Interface:**
```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FormStaticSelectProps extends BaseFormComponentProps {
  options: SelectOption[];
  clearable?: boolean;
  searchable?: boolean;
  nothingFoundMessage?: string;
}
```

### 5. FormDynamicSelect
Single-select dropdown with API-loaded options.

```typescript
import { FormDynamicSelect, FormDynamicSelectProps } from 'reusable-form-components-ts';

<FormDynamicSelect
  name="department"
  label="Department"
  apiUrl="/api/departments"
  valueKey="id"
  labelKey="name"
  onApiError={(error: Error) => console.error(error)}
/>
```

**TypeScript Interface:**
```typescript
interface FormDynamicSelectProps extends BaseFormComponentProps {
  apiUrl: string;
  apiHeaders?: Record<string, string>;
  valueKey?: string;
  labelKey?: string;
  clearable?: boolean;
  searchable?: boolean;
  onApiError?: (error: Error) => void;
}
```

### 6. FormSearchableSelect
Server-side searchable dropdown with debouncing.

```typescript
import { FormSearchableSelect, FormSearchableSelectProps } from 'reusable-form-components-ts';

<FormSearchableSelect
  name="skills"
  label="Primary Skill"
  searchApiUrl="/api/skills/search"
  searchParam="q"
  debounceMs={300}
  minSearchLength={2}
/>
```

**TypeScript Interface:**
```typescript
interface FormSearchableSelectProps extends BaseFormComponentProps {
  searchApiUrl: string;
  searchParam?: string;
  debounceMs?: number;
  apiHeaders?: Record<string, string>;
  valueKey?: string;
  labelKey?: string;
  minSearchLength?: number;
  onApiError?: (error: Error) => void;
}
```

### 7. FormFileUpload
File upload with file list display and removal.

```typescript
import { FormFileUpload, FormFileUploadProps } from 'reusable-form-components-ts';

<FormFileUpload
  name="documents"
  label="Upload Documents"
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={3}
  onFilesChange={(files: File[]) => console.log(files)}
/>
```

**TypeScript Interface:**
```typescript
interface FormFileUploadProps extends BaseFormComponentProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  uploadButtonText?: string;
  showFileList?: boolean;
}
```

### 8. FormRadioGroup
Radio button groups for single-choice selections.

```typescript
import { FormRadioGroup, FormRadioGroupProps, SelectOption } from 'reusable-form-components-ts';

const options: SelectOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' }
];

<FormRadioGroup
  name="contactMethod"
  label="Preferred Contact Method"
  options={options}
  orientation="horizontal"
/>
```

**TypeScript Interface:**
```typescript
interface FormRadioGroupProps extends BaseFormComponentProps {
  options: SelectOption[];
  orientation?: 'horizontal' | 'vertical';
  spacing?: string | number;
}
```

### 9. FormDatePicker
Date selection with validation.

```typescript
import { FormDatePicker, FormDatePickerProps } from 'reusable-form-components-ts';

<FormDatePicker
  name="birthDate"
  label="Birth Date"
  minDate={new Date('1900-01-01')}
  maxDate={new Date()}
  clearable
/>
```

**TypeScript Interface:**
```typescript
interface FormDatePickerProps extends BaseFormComponentProps {
  type?: 'default' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: Date) => boolean;
  locale?: string;
  dateFormat?: string;
  clearable?: boolean;
}
```

## 🎯 TypeScript Benefits

### 1. Type Safety
All components are fully typed with comprehensive interfaces:

```typescript
// Compile-time error checking
<FormTextInput
  name="email"
  type="invalid-type" // ❌ TypeScript error: Type '"invalid-type"' is not assignable
/>

// Correct usage
<FormTextInput
  name="email"
  type="email" // ✅ Valid type
/>
```

### 2. IntelliSense Support
Get auto-completion and documentation in your IDE:

```typescript
// Your IDE will show all available props with descriptions
<FormStaticSelect
  name="country"
  options={countryOptions}
  // IntelliSense shows: clearable, searchable, nothingFoundMessage, etc.
/>
```

### 3. Generic Form Values
Type-safe form handling with generic Formik:

```typescript
interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  isActive: boolean;
}

const validationSchema: Yup.ObjectSchema<UserFormValues> = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  age: Yup.number().min(18).required('Required'),
  isActive: Yup.boolean().required('Required')
});

<Formik<UserFormValues>
  initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    isActive: false
  }}
  validationSchema={validationSchema}
  onSubmit={(values: UserFormValues, helpers: FormikHelpers<UserFormValues>) => {
    // values is fully typed as UserFormValues
    console.log(values.firstName); // ✅ TypeScript knows this is a string
  }}
>
  {/* Form content */}
</Formik>
```

## 🔧 Advanced TypeScript Usage

### Custom Hook Integration

```typescript
import { useApiData, UseApiDataReturn } from 'reusable-form-components-ts';

interface Department {
  id: string;
  name: string;
  description: string;
}

function MyComponent() {
  const { data, loading, error }: UseApiDataReturn<Department[]> = useApiData<Department[]>('/api/departments');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const options = data?.map(dept => ({
    value: dept.id,
    label: dept.name
  })) || [];
  
  return (
    <FormStaticSelect
      name="department"
      label="Department"
      options={options}
    />
  );
}
```

### Type Guards and Validation

```typescript
// Type guard for form validation
function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Custom validation with type safety
const validateForm = (values: UserFormValues): Partial<UserFormValues> => {
  const errors: Partial<UserFormValues> = {};
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  return errors;
};
```

### Discriminated Unions for Complex Forms

```typescript
// Different form types with discriminated unions
type FormType = 
  | { type: 'registration'; requiresVerification: boolean }
  | { type: 'contact'; priority: 'low' | 'medium' | 'high' }
  | { type: 'survey'; steps: number };

interface FormConfig<T extends FormType> {
  formType: T;
  initialValues: T extends { type: 'registration' } 
    ? RegistrationFormValues 
    : T extends { type: 'contact' }
    ? ContactFormValues
    : SurveyFormValues;
}
```

## 🧪 Testing with TypeScript

### Component Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { FormTextInput } from 'reusable-form-components-ts';

interface TestFormValues {
  name: string;
}

test('FormTextInput renders and handles input with type safety', async () => {
  const onSubmit = jest.fn<void, [TestFormValues]>();
  
  render(
    <MantineProvider>
      <Formik<TestFormValues>
        initialValues={{ name: '' }}
        onSubmit={onSubmit}
      >
        <Form>
          <FormTextInput name="name" label="Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </MantineProvider>
  );

  const input = screen.getByLabelText('Name');
  fireEvent.change(input, { target: { value: 'John Doe' } });
  
  expect(input).toHaveValue('John Doe');
});
```

### Mock API with Types

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

interface ApiDepartment {
  id: string;
  name: string;
}

const server = setupServer(
  rest.get<never, never, ApiDepartment[]>('/api/departments', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'Engineering' },
        { id: '2', name: 'Marketing' }
      ])
    );
  })
);
```

## 📚 Best Practices for TypeScript

### 1. Interface Design
```typescript
// ✅ Good: Extend base interfaces
interface CustomFormInputProps extends BaseFormComponentProps {
  customProp: string;
}

// ❌ Avoid: Duplicating common props
interface CustomFormInputProps {
  name: string;
  label?: string;
  // ... duplicating all base props
  customProp: string;
}
```

### 2. Generic Components
```typescript
// ✅ Good: Use generics for reusable components
interface SelectProps<T> extends BaseFormComponentProps {
  options: Array<{ value: T; label: string }>;
  onSelect: (value: T) => void;
}

function TypedSelect<T extends string | number>({ options, onSelect }: SelectProps<T>) {
  // Component implementation
}
```

### 3. Strict Type Checking
```typescript
// Enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

## 🔗 Integration Examples

### Complete TypeScript Form

```typescript
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Stack, Button, Group } from '@mantine/core';
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormYesNoSelect,
  FormDatePicker,
  SelectOption
} from 'reusable-form-components-ts';

// Type-safe form values interface
interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  country: string;
  newsletter: string;
  birthDate: Date | null;
}

// Typed validation schema
const validationSchema: Yup.ObjectSchema<RegistrationFormValues> = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
  country: Yup.string().required('Country is required'),
  newsletter: Yup.string().required('Please select an option'),
  birthDate: Yup.date().nullable().required('Birth date is required')
});

// Typed options
const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];

const RegistrationForm: React.FC = () => {
  const handleSubmit = (
    values: RegistrationFormValues, 
    { setSubmitting }: FormikHelpers<RegistrationFormValues>
  ): void => {
    console.log('Form submitted:', values);
    // Type-safe form handling
    setSubmitting(false);
  };

  const initialValues: RegistrationFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    country: '',
    newsletter: '',
    birthDate: null
  };

  return (
    <Formik<RegistrationFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack gap="md">
            <Group grow>
              <FormTextInput
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
              <FormTextInput
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </Group>

            <FormTextInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              required
            />

            <FormTextArea
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself..."
              rows={4}
            />

            <FormStaticSelect
              name="country"
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
              searchable
              required
            />

            <FormYesNoSelect
              name="newsletter"
              label="Subscribe to Newsletter?"
              required
            />

            <FormDatePicker
              name="birthDate"
              label="Birth Date"
              placeholder="Select your birth date"
              required
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={isSubmitting}>
                Submit Registration
              </Button>
            </Group>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
```

## 🐛 TypeScript Troubleshooting

### Common Type Issues

**Type errors with Formik:**
```typescript
// ❌ Problem: Generic type not specified
<Formik initialValues={...} onSubmit={...}>

// ✅ Solution: Specify generic type
<Formik<MyFormValues> initialValues={...} onSubmit={...}>
```

**Missing type definitions:**
```typescript
// ❌ Problem: Importing from wrong path
import { FormTextInput } from 'reusable-form-components';

// ✅ Solution: Use TypeScript-specific import
import { FormTextInput } from 'reusable-form-components-ts';
```

**Strict null checks:**
```typescript
// ❌ Problem: Possible null value
const date: Date = formValues.birthDate; // Error if strictNullChecks is true

// ✅ Solution: Handle null case
const date: Date | null = formValues.birthDate;
if (date) {
  // Use date safely
}
```

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [JavaScript Component Library](../javascript-components/README.md) - JavaScript version without TypeScript
- [Mantine UI](https://mantine.dev/) - React components library
- [Formik](https://formik.org/) - Form library for React
- [Yup](https://github.com/jquense/yup) - Schema validation library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript