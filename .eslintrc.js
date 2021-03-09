module.exports = {
  root: true,
  extends: require.resolve('@js-toolkit/configs/eslint/react'),
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-use-before-define': 'off',
    'import/export': 'off',
  },
};
