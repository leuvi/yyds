const path = require("path")
const merge = require('webpack-merge')
const base = require("./base")

module.exports = merge(base, {
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "url-loader",
        options: {
          esModule: false,
          limit: false,
          name: '[name].[ext]',
          outputPath: 'images'
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: [
                    ">1%",
                    "not dead",
                    "not op_mini all",
                    "last 2 versions",
                    "Android >= 5.0",
                    "IOS >= 8.0",
                  ]
                }),
                require("postcss-pxtorem")({
                  rootValue: 20,
                  propList: ["*"],
                  selectorBlackList: ["html"],
                  exclude: 'index.less' //需要排除转rem的文件，如果有多个文件用正则或函数
                }),
              ],
            }
          },
          "less-loader",
        ],
      }
    ]
  },
  devServer: {
    host: "localhost",
    port: 3020,
    hot: true,
    contentBase: path.join(__dirname, "../public"),
    watchContentBase: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    }
  }
})
