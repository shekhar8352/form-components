import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReusableFormComponents',
      // Generate both ES modules and UMD formats
      formats: ['es', 'umd'],
      fileName: (format) => `reusable-form-components.${format}.js`
    },
    rollupOptions: {
      // Externalize peer dependencies to avoid bundling them
      external: [
        'react',
        'react-dom',
        '@mantine/core',
        '@mantine/dates',
        '@mantine/form',
        '@mantine/hooks',
        'formik',
        '@tabler/icons-react'
      ],
      output: {
        // Global variables for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mantine/core': 'MantineCore',
          '@mantine/dates': 'MantineDates',
          '@mantine/form': 'MantineForm',
          '@mantine/hooks': 'MantineHooks',
          formik: 'Formik',
          '@tabler/icons-react': 'TablerIcons'
        }
      }
    },
    // Generate source maps for debugging
    sourcemap: true,
    // Ensure compatibility with older browsers
    target: 'es2015'
  },
  // Optimize dependencies for development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/form',
      '@mantine/hooks',
      'formik'
    ]
  }
})
