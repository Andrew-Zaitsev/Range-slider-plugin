const path = require('path');
const fs = require('fs'); // работа с файловой системой
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlagin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'; // в режиме разработки или нет
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
  };
  
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash:4].${ext}`);

const cssLoaders = (addition) => {
  const loaders = [
    'style-loader',
    { loader: MiniCssExtractPlagin.loader },
    'css-loader',
  ];
  
  if (addition) loaders.push(addition);
  
  return loaders;
};


module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    sliderApp: './index.ts',
    demo: './demo/demo.ts'
  },
  //entry: ['./index.ts', './demo/demo.ts'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  //optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    open: 'Google Chrome',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/demo/demo.pug'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlagin({
      filename: filename('css'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules/',
      },
    ],
  },
}