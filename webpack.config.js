/*eslint no-undef: "error"*/
/*eslint-env node*/

var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ],
            sass: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      //vue$: 'vue/dist/vue.esm.js'
      vue$: 'vue/dist/vue.esm-bundler.js',
      // vue: '@vue/runtime-dom',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new VueLoaderPlugin(),
  ],
  devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'eval-source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

if (process.env.NODE_ENV === 'export') {
  module.exports.entry = './src/picker/VueDatetimeJs.vue'

  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-datetime-js.js',
    library: 'VueDatetimeJs',
    libraryTarget: 'umd'
  }

  module.exports.externals = (module.exports.externals || []).concat([
    'vue',
    'moment',
    'moment-jalaali'
  ])

  module.exports.devtool = 'eval-source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

if (process.env.NODE_ENV === 'browser') {
  module.exports.entry = './src/picker/VueDatetimeJs.vue'
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-datetime-js-browser.js',
    library: 'VueDatetimeJs',
    libraryExport: 'default',
    libraryTarget: 'var'
  }
  module.exports.externals = {
    vue: 'vue',
    moment: 'moment',
    'moment-jalaali': 'moment'
  }
  module.exports.devtool = 'eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
