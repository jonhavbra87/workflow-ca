import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import cypress from 'eslint-plugin-cypress';

// Create an instance of FlatCompat with the recommendedConfig parameter
const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  baseDirectory: import.meta.url,
});

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add your custom rules here
    },
  },
  {
    files: ['**/*.test.js'],
    plugins: {
      jest,
    },
    ...compat.extends('plugin:jest/recommended'),
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/prefer-expect-assertions': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.cy.js'],
    plugins: {
      cypress,
    },
    ...compat.extends('plugin:cypress/recommended'),
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals['cypress/globals'],
      },
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'no-unused-vars': 'off',
    },
  },
];
