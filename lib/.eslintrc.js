module.exports = {
  extends: require.resolve('@vzh/configs/eslint/ts.react.eslintrc.js'),

  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      },
    },
  },
};
