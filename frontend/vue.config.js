const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    css: {
      loaderOptions: {
        sass: {
          implementation: require('sass'),
        },
      },
    },
  },
});
