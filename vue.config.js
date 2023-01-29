const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      // 这里的/api是指定发送数据的url以/api开头（/api/***）
      '/api': {
        target: 'http://110.40.205.103:8577',
        // 重写路径,不重写的话，到最后请求后端的连接还是/api开头
        pathRewrite: {
          // 键值是一个正则,把请求路径中的/api替换为空值
          '^/api': ''
        },
        ws: true,//用于支持websocket
        changeOrigin: true,//用于指定端口号值
      },
    },
  },
})
