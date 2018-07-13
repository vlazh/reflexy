const postcssConfig = require('@vzh/configs/css/postcssConfig').default;
const baseConfig = postcssConfig();

module.exports = {
  ...baseConfig,
  plugins: {
    autoprefixer: baseConfig.plugins.autoprefixer,
    cssnano: baseConfig.plugins.cssnano,
  },
};
