const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const package = require('../package.json')

const isProd = process.env.NODE_ENV == 'production'

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"],
    h5: ["./src/h5.js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      favicon: "public/favicon.ico",
      inject: true,
      chunks: ["index"],
      banner: `${package.author}, version: ${package.version}, update：${new Date().toLocaleString()}`,
      minify: isProd ? {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : {}
    }),
    new HtmlWebpackPlugin({
      filename: "h5.html",
      template: "public/h5.html",
      favicon: "public/favicon.ico",
      inject: true,
      chunks: ["h5"],
      banner: `${package.author}, version: ${package.version}, update：${new Date().toLocaleString()}`,
      minify: isProd ? {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : {}
    })
  ],
  resolve: {
    alias: {
      "@less": path.resolve(__dirname, "../assets/css"),
      "@images": path.resolve(__dirname, "../assets/images"),
      "@utils": path.resolve(__dirname, "../assets/utils"),
    },
  }
}