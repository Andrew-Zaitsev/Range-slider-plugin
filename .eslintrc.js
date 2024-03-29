module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:fsd/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'import/extensions': [1, {
      ts: 'never',
    }],
    'import/no-unresolved': [1], // 1-warning
    'linebreak-style': ['error', 'windows'],
    'max-len': [1, 130],
  },
  // root: true,
  plugins: [
    // 'fsd'
    '@typescript-eslint',
  ],
};
