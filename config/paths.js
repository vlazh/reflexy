import path from 'path';

const baseDir = process.cwd();

const paths = {
  context: baseDir,

  nodeModules: {
    dirname: 'node_modules',
    path: path.resolve(baseDir, 'node_modules'),
  },

  client: {
    root: path.resolve(baseDir, 'client'),
    sources: path.resolve(baseDir, 'client/src'),
    assets: path.resolve(baseDir, 'client/src/assets'),
    output: {
      path: path.resolve(baseDir, 'dist'),
      // If multiple webpack configurations (i.e. client and server)
      // and used forked? process with express server
      // then for url-loader (fonts) must be equals to path suffix if path is subdir of output path.
      publicPath: '/',
    },
  },

  get publicUrl() {
    return this.client.output.publicPath.slice(0, -1);
  },
};

export default paths;
