import webpack from 'webpack';
import reactEnv from './config/env';
import paths from './config/paths';

export default ({ outputPath, outputPublicPath }) => ({
  // The home directory for webpack
  // The entry and module.rules.loader option is resolved relative to this directory
  context: paths.context,

  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    pathinfo: reactEnv.ifDevMode(true, false),
    filename: 'js/[name].js',
  },

  devtool: reactEnv.ifDevMode('inline-source-map', ''), // https://github.com/commissure/redbox-react#sourcemaps-with-webpack

  plugins: [
    // In order for the specified environment variables to be available in the JS code.
    new webpack.EnvironmentPlugin(reactEnv.raw),
    // Keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Prints more readable module names in the browser console on HMR updates.
    new webpack.NamedModulesPlugin(),
    // In order for don't emit files if errors occurred.
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
