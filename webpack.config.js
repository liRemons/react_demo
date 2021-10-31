const { Configuration } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ProgressPlugin = require("progress-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');
const path = require("path");
const rules = require("./config/rules");
/**
 * @type {Configuration}
 */

module.exports = (env) => {
  const {mode} = env;
  const config = {
    entry: path.resolve(__dirname, 'src/main.jsx'),
    mode,
    output: {
      filename: 'static/main.js',
      publicPath: '/',
      clean: true,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          exclude: /node_modules/,
          uglifyOptions: {
            output: {
              comments: false,
            }
          },
        })
      ],
      splitChunks: {
        name: 'verdor',
        minSize: 20000,
        maxSize: 1024 * 500,
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            filename: '[name].bundle.js'
          }
        }
      }
    },
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'antd': 'antd',
      'mobx': 'mobx',
      'mobx-react': 'mobxReact'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      // 提取单独的CSS
      new MiniCssExtractPlugin({
        filename: "[name]/main.[contenthash:10].css",
      }),
      // 压缩css
      new CssMinimizerPlugin(),
      new CleanWebpackPlugin(),
      new webpackDashboard(),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: mode === 'production' ? 'server' : 'disabled'
      // })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3033,
      host: '127.0.0.1',
      open: true,
      hot: true,
    },
    devtool: "eval-source-map",
  };

  return config;
};
