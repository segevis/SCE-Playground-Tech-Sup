
export default [
  {
    files: ['**/*.js'],
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'eqeqeq': ['warn', 'always'],
      'no-console': ['warn'],
      'prefer-const': ['warn'],
      'no-var': ['error'],
      'arrow-body-style': ['warn', 'as-needed'],
      'prefer-template': ['warn'],
      'strict': ['error', 'never'],
    },
  },
];
