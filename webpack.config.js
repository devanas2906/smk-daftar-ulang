const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pages = ['register', 'login', 'student', 'admin', '404'];

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: pages.reduce((entries, page) => {
      entries[page] = path.resolve(__dirname, `client/src/pages/${page}/${page}.js`);
      return entries;
    }, {}),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]]
            }
          }
        },
        {
          test: /\.html$/i,
          use: ["html-loader",],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name]-[contenthash][ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name]-[contenthash][ext]'
          }
        },
        {
          test: /\.webmanifest$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/icons/[name][ext]'
          }
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].css'
      }),
      ...pages.map(page => new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `client/src/pages/${page}/${page}.html`),
        filename: `${page}.html`,
        chunks: [page]
      }))
    ],
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin()
      ]
    }
  };
};
