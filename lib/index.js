/** @typedef {import("../typings").Options} PluginOptions */
/** @typedef {import("../typings").CustomError} PluginError */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */

const { ERROR_CODE } = require("./const");
const { checkAllDependencies, asyncShellExecutor } = require("./utils");
const path = require("path");

const PLUGIN_INFO = {
  NAME: "DependencyCheckWebpackPlugin",
};

class DependencyCheckWebpackPlugin {
  /**
   * @param {PluginOptions} [options]
   */
  constructor(options) {
    /** @type {PluginOptions} */
    this.userOptions = options || {};

    /** @type {PluginOptions} */
    const defaultOptions = {
      skip: false,
      installCommand: "yarn install",
      packageJSONPath: path.join(__dirname, "package.json"),
      nodeModulesPath: path.join(__dirname, "node_modules"),
    };
    /** @type {PluginOptions} */
    this.options = {
      ...defaultOptions,
      ...this.userOptions,
    };
  }

  /** @param {WebpackCompiler} compiler */
  apply(compiler) {
    if (this.userOptions.skip) {
      return;
    }

    const commonHandler = (_, callback) => {
      try {
        checkAllDependencies(this.options);
        console.log("all dependencies are available");
        callback();
      } catch (error) {
        if (error.code !== ERROR_CODE.LOSE_DEPENDENCY) {
          console.error(error.message);
          callback();
          return;
        }

        console.log(
          "*** detect dependency update, will install and restart server *** "
        );
        const contextPath = this.options.packageJSONPath.replace(
          "package.json",
          ""
        );
        asyncShellExecutor(this.options.installCommand, contextPath)
          .catch((error) => {
            console.error(error.message);
          })
          .finally(() => {
            callback();
          });
      }
    };

    compiler.hooks.beforeRun.tapAsync(PLUGIN_INFO.NAME, commonHandler);
    compiler.hooks.watchRun.tapAsync(PLUGIN_INFO.NAME, commonHandler);
  }
}

module.exports = { DependencyCheckWebpackPlugin };
