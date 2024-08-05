/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...require('@js-toolkit/configs/eslint/react'),

  {
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'react/require-default-props': 'off',
    },
  },
];
