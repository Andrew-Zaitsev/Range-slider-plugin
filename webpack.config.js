//const fs = require('fs'); // работа с файловой системой
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlagin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    minimize: false,
    runtimeChunk: 'single', // без этого куска открытое окно не обновляется сервером
    splitChunks: {
      cacheGroups: { // собрать все css в один выходной файл
        styles: {
          name: "sliderAppStyles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  };
  
  return config;
};

const filename =  (ext) => `[name].${ext}`; // (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash:2].${ext}`);

const cssLoaders = (addition) => {

  const loaders = ['css-loader'];
  const loaderMCEP = { 
    loader: MiniCssExtractPlagin.loader,
    options: {
      esModule: false,
    },
  };

  if (isDev) {
    loaders.unshift('style-loader')
  } else {
    loaders.unshift(loaderMCEP)
  };
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
    // assetModuleFilename: 'images/[name][ext]',
    clean: true,
  },
  optimization: optimization(),
  devServer: {
    // contentBase: './dist', не работает с ним, нет такого свойства больше
    port: 4200,
    hot: isDev,
    open: 'Google Chrome',
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/demo/demo.pug'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlagin({
      filename: 'assets/css/' + filename('css'),
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
        generator: {
          filename: 'assets/images/[name][ext]'
        }
        //use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',//'asset/inline',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
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