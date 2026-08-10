const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // GitHub Pages project site serves the app from /MondoQuest/, not /
  publicPath: process.env.NODE_ENV === 'production' ? '/MondoQuest/' : '/'
})
