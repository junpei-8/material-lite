module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["module-resolver", {
      "alias": {
        "@material-lite/vue3": "./src/material-lite/components",
        "@material-lite/vue3-cdk": "./src/material-lite/cdk"
      }
    }]
  ]
}
