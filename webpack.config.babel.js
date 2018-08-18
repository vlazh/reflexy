import webpackMerge from 'webpack-merge';
import clientConfigAts from '@vzh/configs/webpack/client.config.ats';
import { defaultRules } from '@vzh/configs/webpack/client.config';
import loaders from '@vzh/configs/webpack/loaders';

export default webpackMerge(
  clientConfigAts({
    rhl: false,

    entry: {
      lib: ['./index'],
    },

    rules: {
      cssRule: {
        ...defaultRules.cssRule,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: 'src(?:/|\\\\)(.*)',
              name: '[1]',
            },
          },
          { loader: 'extract-loader' },
          ...loaders.css({ pattern: '[local]', prodPattern: '[local]', sourceMap: false }),
        ],
      },
    },
  }),
  {
    externals: { react: 'react' },
  }
);
