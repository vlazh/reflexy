import webpackMerge from 'webpack-merge';
import clientConfig, { clientDefaultRules } from '@vzh/configs/webpack/client.config';
import loaders, { TsLoaderType } from '@vzh/configs/webpack/loaders';

export default webpackMerge(
  clientConfig({
    useTypeScript: true,
    tsLoaderType: TsLoaderType.ATL,

    entry: {
      lib: ['./index'],
    },

    rules: {
      cssNodeModulesRule: {},
      cssRule: {
        ...clientDefaultRules.cssRule,
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
