const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './frontend/src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],

  },
  resolve: {
    extensions: ['.*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './frontend/index.html',
      filename: './index.html',
    }),
  ],
}
