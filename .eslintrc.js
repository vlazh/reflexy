module.exports = {
  root: true,
  extends: require.resolve('@vzh/configs/eslint/ts.react.eslintrc.js'),
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/export': 'off',
  }
};
