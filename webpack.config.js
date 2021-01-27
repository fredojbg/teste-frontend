const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { generateHtmlPlugins, generateEntries } = require('./config/config');

const accountName = 'pair';
const isProduction =
  process.env.NODE_ENV == 'production' ? 'production' : 'development';

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins();
// const entries = generateEntries();

module.exports = {
  mode: isProduction,
  devtool: isProduction === 'production' ? false : 'source-map',
  stats: 'minimal',
  // entry: entries,

  entry: {
    'desktop.general': [`./src/pages/home.js`],
  },
  output: {
    filename: `arquivos/frn.${accountName}.[name].js`,
    path: `${__dirname}/dist`,
    jsonpFunction: 'wpJsonpFRN',
  },
  devServer: {
    index: 'home.html',
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 3000,
    https: false, // chrome may need this flag 'enabled' -> chrome://flags/#allow-insecure-localhost
    // proxy: {
    //   '**': {
    //     target: `https://${accountName}.myvtex.com/`,
    //     changeOrigin: true,
    //     headers: {
    //       'X-Dev-Server-Proxy': `https://${accountName}.myvtex.com/`,
    //     },
    //   },
    // },
  },
  module: {
    noParse: /jquery|lodash|sweetalert2|hammerjs|pretty-checkbox/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: isProduction === 'production' ? false : true,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isProduction === 'production' ? false : true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `arquivos/frn.${accountName}.[name].css`,
      chunkFilename: `arquivos/frn.${accountName}.[name].css`,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: 'src/img', to: 'arquivos' }],
    // }),
  ].concat(htmlPlugins),
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          mangle: isProduction === 'production' ? true : false,
          compress: {
            drop_console: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  stats: 'errors-only',
  resolve: {
    alias: {
      // Components: path.resolve(__dirname, 'src/js/components'),
      // Helpers: path.resolve(__dirname, 'src/js/helpers'),
      // Services: path.resolve(__dirname, 'src/js/services'),
    },
  },
};
