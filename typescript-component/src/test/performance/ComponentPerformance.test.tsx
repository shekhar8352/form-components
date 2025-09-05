/**
 * Performance Tests for Form Components (TypeScript)
 * 
 * Tests component rendering performance, memory usage, and optimization with TypeScript
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form, FormikProps } from 'formik';
import { vi } from 'vitest';

// Import form components with TypeScript types
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormRadioGroup,
  FormYesNoSelect,
  type SelectOption
} from '../../components';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

interface PerformanceTestFormData {
  test: string;
}

interface MultiFieldFormData {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  field10: string;
}

describe('Component Performance Tests (TypeScript)', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Rendering Performance with TypeScript', () => {
    it('should render FormTextInput quickly with proper TypeScript types', () => {
      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik<PerformanceTestFormData>
            initialValues={{ test: '' }}
            onSubmit={() => {}}
          >
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
                type="text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50);
      expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    });

    it('should render FormStaticSelect with typed options efficiently', () => {
      const manyOptions: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`
      }));

      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik<PerformanceTestFormData>
            initialValues={{ test: '' }}
            onSubmit={() => {}}
          >
            <Form>
              <FormStaticSelect
                name="test"
                label="Test Select"
                options={manyOptions}
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render even with many options in reasonable time
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    });

    it('should handle multiple component renders with TypeScript efficiently', () => {
      const MultipleComponentForm: React.FC = () => (
        <TestWrapper>
          <Formik<MultiFieldFormData>
            initialValues={{
              field1: '', field2: '', field3: '', field4: '', field5: '',
              field6: '', field7: '', field8: '', field9: '', field10: ''
            }}
            onSubmit={() => {}}
          >
            <Form>
              {Array.from({ length: 10 }, (_, i) => (
                <FormTextInput
                  key={i}
                  name={`field${i + 1}` as keyof MultiFieldFormData}
                  label={`Field ${i + 1}`}
                  placeholder={`Enter value ${i + 1}`}
                />
              ))}
            </Form>
          </Formik>
        </TestWrapper>
      );

      const startTime = performance.now();
      render(<MultipleComponentForm />);
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 10 components in reasonable time
      expect(renderTime).toBeLessThan(200);
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Field 10')).toBeInTheDocument();
    });
  });

  describe('TypeScript Type Safety Performance', () => {
    it('should maintain performance with strict TypeScript checking', () => {
      interface StrictFormData {
        requiredString: string;
        optionalNumber?: number;
        selectValue: 'option1' | 'option2' | 'option3';
        booleanField: boolean;
      }

      const strictOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ];

      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik<StrictFormData>
            initialValues={{
              requiredString: '',
              selectValue: 'option1',
              booleanField: false
            }}
            onSubmit={(values: StrictFormData) => {
              // TypeScript should enforce correct types here
              const stringValue: string = values.requiredString;
              const selectValue: 'option1' | 'option2' | 'option3' = values.selectValue;
              const booleanValue: boolean = values.booleanField;
              
              expect(typeof stringValue).toBe('string');
              expect(['option1', 'option2', 'option3']).toContain(selectValue);
              expect(typeof booleanValue).toBe('boolean');
            }}
          >
            {({ values }: FormikProps<StrictFormData>) => (
              <Form>
                <FormTextInput
                  name="requiredString"
                  label="Required String"
                  placeholder="Enter text"
                />
                <FormStaticSelect
                  name="selectValue"
                  label="Select Value"
                  options={strictOptions}
                />
                <div data-testid="type-check">
                  {/* TypeScript should provide IntelliSense here */}
                  {values.requiredString.length > 0 ? 'Has value' : 'Empty'}
                </div>
              </Form>
            )}
          </Formik>
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // TypeScript compilation and runtime should be fast
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByTestId('type-check')).toHaveTextContent('Empty');
    });
  });

  describe('Re-render Performance with TypeScript', () => {
    it('should minimize re-renders with typed props', () => {
      let renderCount = 0;
      
      interface TestComponentProps {
        value: string;
        options: SelectOption[];
      }
      
      const TestComponent: React.FC<TestComponentProps> = React.memo(({ value, options }) => {
        renderCount++;
        return (
          <TestWrapper>
            <Formik<PerformanceTestFormData>
              initialValues={{ test: value }}
              onSubmit={() => {}}
            >
              <Form>
                <FormTextInput
                  name="test"
                  label="Test Input"
                  placeholder="Enter text"
                />
                <FormStaticSelect
                  name="test"
                  label="Test Select"
                  options={options}
                />
              </Form>
            </Formik>
          </TestWrapper>
        );
      });

      const testOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];

      const { rerender } = render(<TestComponent value="" options={testOptions} />);
      
      // Initial render
      expect(renderCount).toBe(1);

      // Re-render with same props should not cause additional renders due to memoization
      rerender(<TestComponent value="" options={testOptions} />);
      expect(renderCount).toBe(1);

      // Re-render with different props should cause one additional render
      rerender(<TestComponent value="new value" options={testOptions} />);
      expect(renderCount).toBe(2);
    });

    it('should handle rapid user input efficiently with TypeScript', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn<[PerformanceTestFormData], void>();

      render(
        <TestWrapper>
          <Formik<PerformanceTestFormData>
            initialValues={{ test: '' }}
            onSubmit={onSubmit}
          >
            <Form>
              <FormTextInput
                name="test"
                label="Test Input"
                placeholder="Enter text"
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Input');
      
      const startTime = performance.now();
      
      // Simulate rapid typing
      const testText = 'This is a test of rapid typing performance with TypeScript';
      await user.type(input, testText);
      
      const endTime = performance.now();
      const typingTime = endTime - startTime;

      // Should handle rapid input efficiently
      expect(typingTime).toBeLessThan(1000); // Less than 1 second for typing
      expect(input).toHaveValue(testText);
    });
  });

  describe('Memory Usage with TypeScript', () => {
    it('should not create memory leaks with TypeScript components', () => {
      const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      
      // Mount and unmount components multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <TestWrapper>
            <Formik<{ test: string; textarea: string; select: string }>
              initialValues={{ test: '', textarea: '', select: '' }}
              onSubmit={() => {}}
            >
              <Form>
                <FormTextInput
                  name="test"
                  label="Test Input"
                  placeholder="Enter text"
                />
                <FormTextArea
                  name="textarea"
                  label="Test Textarea"
                  placeholder="Enter text"
                />
                <FormStaticSelect
                  name="select"
                  label="Test Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                />
              </Form>
            </Formik>
          </TestWrapper>
        );
        
        unmount();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      
      // Memory usage should not increase significantly (allowing for some variance)
      if (performance.memory) {
        const memoryIncrease = finalMemory - initialMemory;
        expect(memoryIncrease).toBeLessThan(1024 * 1024); // Less than 1MB increase
      }
    });
  });

  describe('Large Dataset Performance with TypeScript', () => {
    it('should handle large typed option lists efficiently', async () => {
      const user = userEvent.setup();
      
      interface LargeDataOption extends SelectOption {
        category: string;
        description: string;
      }
      
      const largeOptionList: LargeDataOption[] = Array.from({ length: 5000 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i} - This is a longer label to test performance`,
        category: `Category ${Math.floor(i / 100)}`,
        description: `Description for option ${i}`
      }));

      // Convert to SelectOption[] for component
      const selectOptions: SelectOption[] = largeOptionList.map(({ value, label }) => ({
        value,
        label
      }));

      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik<PerformanceTestFormData>
            initialValues={{ test: '' }}
            onSubmit={() => {}}
          >
            <Form>
              <FormStaticSelect
                name="test"
                label="Large Select"
                options={selectOptions}
                searchable
              />
            </Form>
          </Formik>
        </TestWrapper>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render large dataset in reasonable time
      expect(renderTime).toBeLessThan(500);

      const select = screen.getByLabelText('Large Select');
      expect(select).toBeInTheDocument();

      // Test search performance
      const searchStartTime = performance.now();
      await user.click(select);
      await user.type(select, 'Option 100');
      const searchEndTime = performance.now();
      const searchTime = searchEndTime - searchStartTime;

      // Search should be fast even with large dataset
      expect(searchTime).toBeLessThan(200);
    });
  });

  describe('Component Update Performance with TypeScript', () => {
    it('should update typed form values efficiently', async () => {
      const user = userEvent.setup();
      let updateCount = 0;
      
      interface ComplexFormData {
        text1: string;
        text2: string;
        text3: string;
        select1: string;
        radio1: string;
      }
      
      const TestForm: React.FC = () => {
        const [formValues, setFormValues] = React.useState<ComplexFormData>({
          text1: '', text2: '', text3: '', select1: '', radio1: ''
        });

        React.useEffect(() => {
          updateCount++;
        }, [formValues]);

        const selectOptions: SelectOption[] = [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ];

        const radioOptions: SelectOption[] = [
          { value: 'choice1', label: 'Choice 1' },
          { value: 'choice2', label: 'Choice 2' }
        ];

        return (
          <TestWrapper>
            <Formik<ComplexFormData>
              initialValues={formValues}
              enableReinitialize
              onSubmit={() => {}}
            >
              <Form>
                <FormTextInput name="text1" label="Text 1" />
                <FormTextInput name="text2" label="Text 2" />
                <FormTextInput name="text3" label="Text 3" />
                <FormStaticSelect
                  name="select1"
                  label="Select 1"
                  options={selectOptions}
                />
                <FormRadioGroup
                  name="radio1"
                  label="Radio 1"
                  options={radioOptions}
                />
                <button
                  type="button"
                  onClick={() => setFormValues({
                    text1: 'Updated 1',
                    text2: 'Updated 2',
                    text3: 'Updated 3',
                    select1: 'option1',
                    radio1: 'choice1'
                  })}
                >
                  Update All
                </button>
              </Form>
            </Formik>
          </TestWrapper>
        );
      };

      render(<TestForm />);

      const updateButton = screen.getByText('Update All');
      
      const startTime = performance.now();
      await user.click(updateButton);
      const endTime = performance.now();
      const updateTime = endTime - startTime;

      // Should update all form values quickly
      expect(updateTime).toBeLessThan(100);
      expect(screen.getByDisplayValue('Updated 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Updated 2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Updated 3')).toBeInTheDocument();
    });
  });

  describe('TypeScript Compilation Performance', () => {
    it('should demonstrate TypeScript type checking benefits', () => {
      // This test ensures TypeScript compilation passes with proper types
      interface TypeSafeFormData {
        stringField: string;
        numberField: number;
        booleanField: boolean;
        optionalField?: string;
        unionField: 'option1' | 'option2' | 'option3';
      }

      const initialValues: TypeSafeFormData = {
        stringField: '',
        numberField: 0,
        booleanField: false,
        unionField: 'option1'
      };

      const handleSubmit = (values: TypeSafeFormData) => {
        // TypeScript should enforce correct types here
        const stringValue: string = values.stringField;
        const numberValue: number = values.numberField;
        const booleanValue: boolean = values.booleanField;
        const unionValue: 'option1' | 'option2' | 'option3' = values.unionField;
        
        // This should compile without errors
        expect(typeof stringValue).toBe('string');
        expect(typeof numberValue).toBe('number');
        expect(typeof booleanValue).toBe('boolean');
        expect(['option1', 'option2', 'option3']).toContain(unionValue);
      };

      // This should compile without TypeScript errors
      expect(initialValues.stringField).toBe('');
      expect(initialValues.numberField).toBe(0);
      expect(initialValues.booleanField).toBe(false);
      expect(initialValues.unionField).toBe('option1');
      expect(handleSubmit).toBeDefined();
    });
  });
});