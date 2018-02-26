const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './server/index.ts',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
            {
                loader: 'ts-loader'
            }
        ]
    },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '/static/media/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2']
          }
        }
      },
      { test: /\.css$/, loader: 'ignore-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],
  resolve: {
    modules: ['src', 'node_modules']
  }
};