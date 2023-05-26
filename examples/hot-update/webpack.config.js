const path = require("path");
const { DependencyCheckWebpackPlugin } = require("../../lib");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [],
  },
  plugins: [
    new DependencyCheckWebpackPlugin({
      packageJSONPath: path.join(__dirname, "./package.json"),
      nodeModulesPath: path.join(__dirname, "./node_modules"),
    }),
  ],
};
