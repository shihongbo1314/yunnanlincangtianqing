const path = require('path');
// 在vue.config.js中没有配置 resolve 方法， 需要自定义一个
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,  // 取消eslint
  productionSourceMap: false,
  devServer: {
    host: 'localhost',            // 启动时使⽤的域名
    port: 8080,                 // 指定端⼝号 
  },
  configureWebpack: { // 打包项目出现溢出时 采用的方案
    // //关闭 webpack 的性能提示
    // performance: {
    //   hints: false,
    // },

    //警告 webpack 的性能提示
    performance: {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
  },
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
}