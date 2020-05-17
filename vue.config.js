const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    // 用cdn方式引入
    config.set('externals', {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios'
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240, //对超过10k的数据进行压缩
            minRatio: 0.6 // 压缩比例，值为0 ~ 1
          })
        ]
      }
    }
  }
}
