# Reusable Form Components Library (JavaScript)

A comprehensive library of reusable form components built with Mantine UI and Formik for JavaScript React projects. This library provides 9 distinct form components with consistent APIs, built-in validation, error handling, and flexible customization options.

## 🚀 Quick Start

### Installation

```bash
# Install the component library (when published)
npm install reusable-form-components

# Or use the local development version
npm install
npm run dev
```

### Basic Usage

```javascript
import React from 'react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { FormTextInput, FormYesNoSelect } from 'reusable-form-components';

function MyForm() {
  return (
    <MantineProvider>
      <Formik
        initialValues={{ name: '', isActive: '' }}
        onSubmit={(values) => console.log(values)}
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

```javascript
<FormTextInput
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  width="300px"
/>
```

**Props:**
- `name` (string, required): Formik field name
- `type` (string): Input type (text, email, password, etc.)
- `label` (string): Field label
- `placeholder` (string): Input placeholder
- `required` (boolean): Required field indicator
- `width` (string|number): Custom width override
- `leftSection` (ReactNode): Left icon or element
- `rightSection` (ReactNode): Right icon or element

### 2. FormTextArea
Multi-line text input for larger content.

```javascript
<FormTextArea
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  rows={4}
  maxLength={500}
/>
```

**Props:**
- `name` (string, required): Formik field name
- `label` (string): Field label
- `rows` (number): Number of visible rows
- `maxLength` (number): Maximum character limit
- `autosize` (boolean): Auto-resize based on content

### 3. FormYesNoSelect
Binary choice dropdown with Yes/No options.

```javascript
<FormYesNoSelect
  name="newsletter"
  label="Subscribe to Newsletter?"
  yesLabel="Yes, please"
  noLabel="No, thanks"
  clearable
/>
```

**Props:**
- `name` (string, required): Formik field name
- `label` (string): Field label
- `yesLabel` (string): Custom Yes option label
- `noLabel` (string): Custom No option label
- `clearable` (boolean): Allow clearing selection

### 4. FormStaticSelect
Single-select dropdown with predefined static options.

```javascript
const options = [
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

**Props:**
- `name` (string, required): Formik field name
- `options` (array, required): Array of {value, label} objects
- `searchable` (boolean): Enable search functionality
- `clearable` (boolean): Allow clearing selection

### 5. FormDynamicSelect
Single-select dropdown with API-loaded options.

```javascript
<FormDynamicSelect
  name="department"
  label="Department"
  apiUrl="/api/departments"
  valueKey="id"
  labelKey="name"
  onApiError={(error) => console.error(error)}
/>
```

**Props:**
- `name` (string, required): Formik field name
- `apiUrl` (string, required): API endpoint for options
- `valueKey` (string): Key for option value (default: 'value')
- `labelKey` (string): Key for option label (default: 'label')
- `apiHeaders` (object): Custom headers for API request

### 6. FormSearchableSelect
Server-side searchable dropdown with debouncing.

```javascript
<FormSearchableSelect
  name="skills"
  label="Primary Skill"
  searchApiUrl="/api/skills/search"
  searchParam="q"
  debounceMs={300}
  minSearchLength={2}
/>
```

**Props:**
- `name` (string, required): Formik field name
- `searchApiUrl` (string, required): API endpoint for search
- `searchParam` (string): Query parameter name (default: 'search')
- `debounceMs` (number): Debounce delay in milliseconds (default: 300)
- `minSearchLength` (number): Minimum characters to trigger search

### 7. FormFileUpload
File upload with file list display and removal.

```javascript
<FormFileUpload
  name="documents"
  label="Upload Documents"
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={3}
/>
```

**Props:**
- `name` (string, required): Formik field name
- `accept` (string): Accepted file types
- `multiple` (boolean): Allow multiple files
- `maxSize` (number): Maximum file size in bytes
- `maxFiles` (number): Maximum number of files

### 8. FormRadioGroup
Radio button groups for single-choice selections.

```javascript
const options = [
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

**Props:**
- `name` (string, required): Formik field name
- `options` (array, required): Array of {value, label} objects
- `orientation` (string): 'horizontal' or 'vertical' layout
- `spacing` (string|number): Space between options

### 9. FormDatePicker
Date selection with validation.

```javascript
<FormDatePicker
  name="birthDate"
  label="Birth Date"
  minDate={new Date('1900-01-01')}
  maxDate={new Date()}
  clearable
/>
```

**Props:**
- `name` (string, required): Formik field name
- `minDate` (Date): Minimum selectable date
- `maxDate` (Date): Maximum selectable date
- `clearable` (boolean): Allow clearing selection
- `dateFormat` (string): Custom date format

## 🎨 Styling and Customization

### Mantine Size Props
All components support Mantine's size system:

```javascript
<FormTextInput
  name="example"
  size="lg"  // xs, sm, md, lg, xl
  width="400px"  // Custom width override
/>
```

### Custom Styling

```javascript
<FormTextInput
  name="example"
  className="my-custom-class"
  style={{ marginBottom: '20px' }}
/>
```

### Theme Integration
Components automatically inherit from your Mantine theme:

```javascript
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'blue',
  // ... your theme configuration
});

<MantineProvider theme={theme}>
  {/* Your form components will use this theme */}
</MantineProvider>
```

## 🔧 Validation

### With Yup Schema

```javascript
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  age: Yup.number().min(18, 'Must be 18+').required('Required'),
  terms: Yup.string().required('You must accept terms')
});

<Formik
  validationSchema={validationSchema}
  // ... other props
>
  {/* Your form */}
</Formik>
```

### Custom Validation

```javascript
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
```

## 🚀 Advanced Usage

### Complete Form Example

```javascript
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Stack, Button, Group } from '@mantine/core';
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormYesNoSelect,
  FormDatePicker
} from 'reusable-form-components';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  country: Yup.string().required('Country is required'),
  newsletter: Yup.string().required('Please select an option'),
  birthDate: Yup.date().required('Birth date is required')
});

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];

function RegistrationForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted:', values);
    // Handle form submission
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        country: '',
        newsletter: '',
        birthDate: null
      }}
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
}

export default RegistrationForm;
```

## 🔗 API Integration

### Mock API Setup for Development

```javascript
// Mock API responses for development
const mockApiResponses = {
  '/api/departments': [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' }
  ],
  '/api/skills/search': (query) => [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' }
  ].filter(skill => skill.label.toLowerCase().includes(query.toLowerCase()))
};
```

## 🧪 Testing

### Component Testing

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { MantineProvider } from '@mantine/core';
import { FormTextInput } from 'reusable-form-components';

test('FormTextInput renders and handles input', async () => {
  const onSubmit = jest.fn();
  
  render(
    <MantineProvider>
      <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
        <Form>
          <FormTextInput name="name" label="Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </MantineProvider>
  );

  const input = screen.getByLabelText('Name');
  fireEvent.change(input, { target: { value: 'John Doe' } });
  
  expect(input.value).toBe('John Doe');
});
```

## 📚 Best Practices

### 1. Form Structure
- Group related fields together
- Use consistent spacing and layout
- Provide clear labels and placeholders
- Include helpful descriptions for complex fields

### 2. Validation
- Validate on both client and server side
- Provide immediate feedback for errors
- Use clear, actionable error messages
- Consider progressive validation for better UX

### 3. Performance
- Use debouncing for search inputs
- Implement proper loading states
- Consider virtualization for large option lists
- Optimize API calls and caching

### 4. Accessibility
- Ensure proper ARIA labels
- Support keyboard navigation
- Maintain sufficient color contrast
- Test with screen readers

## 🐛 Troubleshooting

### Common Issues

**Components not rendering:**
- Ensure MantineProvider wraps your app
- Check that Formik Form wrapper is present
- Verify component imports are correct

**Validation not working:**
- Confirm validation schema matches field names
- Check that Formik's validationSchema prop is set
- Ensure error display is not disabled

**Styling issues:**
- Verify Mantine CSS is imported
- Check for conflicting CSS rules
- Ensure theme configuration is correct

**API integration problems:**
- Check network requests in browser dev tools
- Verify API endpoints are accessible
- Confirm response format matches expected structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [TypeScript Component Library](../typescript-component/README.md) - TypeScript version with full type safety
- [Mantine UI](https://mantine.dev/) - React components library
- [Formik](https://formik.org/) - Form library for React
- [Yup](https://github.com/jquense/yup) - Schema validation library