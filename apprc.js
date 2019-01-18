module.exports = {
  client: {
    root: 'lib',

    webpackConfig: 'webpack.config.babel.js',
    tsconfig: '../tsconfig.webpack.json',

    html: { template: '' },

    output: {
      root: '',
      assetManifest: { fileName: '' },
    },
  },
};
