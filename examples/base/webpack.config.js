const path = require("path");
const { DependencyCheckWebpackPlugin } = require("../../");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [],
  },
  plugins: [new DependencyCheckWebpackPlugin()],
};
