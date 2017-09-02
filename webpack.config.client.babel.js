import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import commonConfig from './webpack.config.common.babel';
import reactEnv from './config/env';
import paths from './config/paths';

export default webpackMerge(
  commonConfig({
    outputPath: paths.client.output.path,
    outputPublicPath: paths.client.output.publicPath,
  }),
  {
    name: 'client',
    target: 'web',

    context: paths.client.sources,

    entry: {
      lib: './index',
    },

    resolve: {
      modules: [paths.nodeModules.path, paths.client.sources, paths.context],
    },

    devtool: '',

    output: {
      filename: '[name].js',
      library: 'reflexy',
      libraryTarget: 'umd',
    },

    externals: {
      react: 'react',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [paths.client.sources],
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: './tsconfig.json',
                useBabel: true, // Also sets "target": "es201*" and "jsx": "preserve" in tsconfig.json
                useCache: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: [paths.client.sources],
          use: [
            {
              loader: 'file-loader',
              options: {
                regExp: 'src(?:/|\\\\)(.*)',
                name: '[1]',
              },
            },
            { loader: 'extract-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: false,
                sourceMap: false,
                localIdentName: '[local]',
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: loader => [autoprefixer()],
              },
            },
          ],
        },
      ],
    },
  }
);
