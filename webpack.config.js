const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  devtool: `source-maps`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 9000,
    watchContentBase: true
  }
};
