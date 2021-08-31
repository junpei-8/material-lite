const path = require('path');

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,

      "@material-lite/react-cdk": path.resolve(__dirname, './src/material-lite/react-cdk'),
      "@material-lite/react": path.resolve(__dirname, './src/material-lite/react'),
      "components": path.resolve(__dirname, './src/app/components')
    }
  };

  return config;
}
