import webpackMerge from 'webpack-merge';
import path from 'path';
import commonConfig from '@vzh/configs/webpack/common.config';
import paths from '@vzh/configs/paths';
import loaders from '@vzh/configs/webpack/loaders';

export default webpackMerge(
  commonConfig({
    outputPath: path.resolve(paths.root, 'dist'),
    outputPublicPath: paths.client.output.publicPath,
  }),
  {
    context: paths.client.sources,

    entry: { lib: './index' },

    devtool: '',

    output: {
      filename: '[name].js',
    },

    resolve: {
      modules: [paths.nodeModules.root, paths.client.sources, paths.root],
    },

    externals: {
      react: 'react',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [paths.client.sources],
          use: loaders.ats({ tsconfig: './tsconfig.webpack.json' }),
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
                sourceMap: false,
                localIdentName: '[local]',
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
  }
);
