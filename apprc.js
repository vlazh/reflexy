module.exports = {
  client: {
    root: 'lib',

    webpackConfig: 'webpack.config.ts',
    tsconfig: '../tsconfig.webpack.json',

    html: { template: '' },

    output: {
      root: '',
      assetManifest: { fileName: '' },
    },
  },
};
