const { ProgressPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const globals = require('../src/globals/globals')

module.exports = {
  entry: [`${paths.src}/index.js`],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(jpe?g|png|gif|webp|avif)$/i,
        type: 'asset/resource',
      },
      { test: /\.img.svg$/i, type: 'asset/resource' },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      { test: /\.(woff(2)?|eot|ttf|otf)$/, type: 'asset/resource' },
      { test: /\.txt$/, type: 'asset/source' },
    ],
  },

  plugins: [
    new ProgressPlugin({ percentBy: 'entries' }),
    new CleanWebpackPlugin(paths.dist),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store', '**/template.ejs'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: `${paths.public}/template.ejs`,
      templateParameters: globals,
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      '@assets': `${paths.src}/assets`,
      '@components': `${paths.src}/components`,
      '@context': `${paths.src}/context`,
      '@hooks': `${paths.src}/hooks`,
      '@pages': `${paths.src}/pages`,
      '@utils': `${paths.src}/utils`,
      assets: paths.public,
    },
  },
}
