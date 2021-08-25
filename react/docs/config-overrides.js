const path = require('path');

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,

      "@material-lite/react-cdk/utils": path.resolve(__dirname, './src/material-lite/react-cdk/utils'),
      "@material-lite/react/core": path.resolve(__dirname, './src/material-lite/react/core'),
    }
  };

  return config;
}
