import paths from './paths';

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

export function getReactEnvironment() {
  // Object with keys and their default values so we can feed into Webpack EnvironmentPlugin
  const raw = Object.keys(process.env)
      .filter(key => REACT_APP.test(key))
      .reduce(
          (env, key) => {
            env[key] = process.env[key];
            return env;
          },
          {
            // Useful for determining whether we’re running in production mode.
            // Most importantly, it switches React into the correct mode.
            NODE_ENV: process.env.NODE_ENV || 'development',
            // Useful for resolving the correct path to static assets in `public`.
            // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
            // This should only be used as an escape hatch. Normally you would put
            // images into the `src` and `import` them in code to get their paths.
            PUBLIC_URL: paths.publicUrl,
          },
      );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce(
        (env, key) => {
          env[key] = JSON.stringify(raw[key]);
          return env;
        },
        {},
    ),
  };

  return {
    raw,
    stringified,
    ifDevMode(devModeValue, elseValue) {
      return this.raw.NODE_ENV === 'development' ? devModeValue : elseValue;
    },
    isDevServer() {
      return !!this.raw.REACT_APP_DEV_SERVER;
    },
  };
}

export default getReactEnvironment();
