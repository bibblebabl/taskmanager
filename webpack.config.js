const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  devtool: `source-maps`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 9000,
    watchContentBase: true
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
