/**
 * Performance Tests for Form Components
 * 
 * Tests component rendering performance, memory usage, and optimization
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { Formik, Form } from 'formik';
import { vi } from 'vitest';

// Import form components
import {
  FormTextInput,
  FormTextArea,
  FormStaticSelect,
  FormRadioGroup,
  FormYesNoSelect
} from '../../components/index.js';

const TestWrapper = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

describe('Component Performance Tests', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Rendering Performance', () => {
    it('should render FormTextInput quickly', () => {
      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
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

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50);
      expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    });

    it('should render FormStaticSelect with many options efficiently', () => {
      const manyOptions = Array.from({ length: 1000 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`
      }));

      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
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

    it('should handle multiple component renders efficiently', () => {
      const MultipleComponentForm = () => (
        <TestWrapper>
          <Formik
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
                  name={`field${i + 1}`}
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

  describe('Re-render Performance', () => {
    it('should minimize re-renders on prop changes', () => {
      let renderCount = 0;
      
      const TestComponent = React.memo(({ value }) => {
        renderCount++;
        return (
          <TestWrapper>
            <Formik initialValues={{ test: value }} onSubmit={() => {}}>
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
      });

      const { rerender } = render(<TestComponent value="" />);
      
      // Initial render
      expect(renderCount).toBe(1);

      // Re-render with same props should not cause additional renders due to memoization
      rerender(<TestComponent value="" />);
      expect(renderCount).toBe(1);

      // Re-render with different props should cause one additional render
      rerender(<TestComponent value="new value" />);
      expect(renderCount).toBe(2);
    });

    it('should handle rapid user input efficiently', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={onSubmit}>
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
      const testText = 'This is a test of rapid typing performance';
      await user.type(input, testText);
      
      const endTime = performance.now();
      const typingTime = endTime - startTime;

      // Should handle rapid input efficiently
      expect(typingTime).toBeLessThan(1000); // Less than 1 second for typing
      expect(input).toHaveValue(testText);
    });
  });

  describe('Memory Usage', () => {
    it('should not create memory leaks on mount/unmount cycles', () => {
      const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      
      // Mount and unmount components multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <TestWrapper>
            <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
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

  describe('Large Dataset Performance', () => {
    it('should handle large option lists efficiently', async () => {
      const user = userEvent.setup();
      const largeOptionList = Array.from({ length: 5000 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i} - This is a longer label to test performance`
      }));

      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
              <FormStaticSelect
                name="test"
                label="Large Select"
                options={largeOptionList}
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

  describe('Component Update Performance', () => {
    it('should update form values efficiently', async () => {
      const user = userEvent.setup();
      let updateCount = 0;
      
      const TestForm = () => {
        const [formValues, setFormValues] = React.useState({
          text1: '', text2: '', text3: '', select1: '', radio1: ''
        });

        React.useEffect(() => {
          updateCount++;
        }, [formValues]);

        return (
          <TestWrapper>
            <Formik
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
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                />
                <FormRadioGroup
                  name="radio1"
                  label="Radio 1"
                  options={[
                    { value: 'choice1', label: 'Choice 1' },
                    { value: 'choice2', label: 'Choice 2' }
                  ]}
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
});