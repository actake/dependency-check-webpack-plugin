const path = require("path");
const DependencyCheckWebpackPlugin = require("../../../../lib");

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
  plugins: [
    new DependencyCheckWebpackPlugin({
      installCommand: "yarn install -W",
      packageJSONPath: path.join(__dirname, "../../package.json"),
      nodeModulesPath: path.join(__dirname, "../../node_modules"),
    }),
  ],
};
