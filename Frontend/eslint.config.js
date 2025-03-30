import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // "no-unused-vars": ["warn"],
      "linebreak-style": ["warn", "unix"],
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "eqeqeq": ["warn", "always"],
      "no-console": ["warn"],
      "prefer-const": ["warn"],
      "no-var": ["error"],
      "arrow-body-style": ["warn", "as-needed"],
      "prefer-template": ["warn"],
      "strict": ["error", "never"]
    },
  },
];
