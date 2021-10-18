//const fs = require('fs'); // работа с файловой системой
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlagin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: 'single', // без этого куска открытое окно не обновляется сервером
  };
  
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash:2].${ext}`);

const cssLoaders = (addition) => {
  const loaders = [
    isDev ? 'style-loader':
      { loader: MiniCssExtractPlagin.loader,
        options: {
          esModule: false,
        },
      },
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
    clean: true,
  },
  optimization: optimization(),
  devServer: {
    // contentBase: './dist', не работает с ним, нет такого свойства больше
    port: 4200,
    hot: isDev,
    open: 'Google Chrome',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/demo/demo.pug'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
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
        type: 'asset/resource',
        //use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/inline',
        //use: ['file-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules/',
      },
    ],
  },
}