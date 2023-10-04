const propTypeSortOrder = {
  callbacksLast: false,
  ignoreCase: false,
  noSortAlphabetically: false,
};

module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // NOTE: This has to come last
    'plugin:prettier/recommended',
  ],
  globals: {
    JSX: 'readonly',
    ReactNativePaper: 'readonly',
    ReactNavigation: 'readonly',
    __DEV__: 'readonly',
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier', 'react-hooks', 'react-native'],
  env: {
    es2020: true,
    'react-native/react-native': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    impliedStrict: true,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'func-style': ['error', 'expression'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['index', 'sibling', 'parent'],
          'type',
          'object',
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'max-len': [
      'warn',
      {
        code: 100,
        comments: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: 'eslint-disable+',
      },
    ],
    'no-undef': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-use-before-define': 'off',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-handler-names': 'error',
    'react/jsx-sort-props': [
      'warn',
      {
        ...propTypeSortOrder,
        shorthandFirst: false,
        shorthandLast: false,
        reservedFirst: false,
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': [
      'warn',
      {
        ...propTypeSortOrder,
        requiredFirst: true,
        sortShapeProp: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        classes: {
          memberTypes: ['field', 'static-field', 'constructor', 'method', 'static-method'],
          order: 'alphabetically',
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/default-param-last': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'react/react-in-jsx-scope': ['off'],
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    'react-native/no-inline-styles': ['warn'],
    'react-native/sort-styles': ['warn', 'asc'],
    'react-native/no-unused-styles': ['warn'],
    quotes: ['warn', 'single', { avoidEscape: true }],
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': ['warn'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
