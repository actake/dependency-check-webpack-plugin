/** @typedef {import("../typings").Options} PluginOptions */
/** @typedef {import("../typings").CustomError} PluginError */

const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const { ORIGIN_DIR, ERROR_CODE } = require("./const");

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

/**
 * check dependencies available
 * @param {PluginOptions} options
 * @throws {PluginError}
 */
const checkAllDependencies = (options) => {
  const { packageJSONPath, nodeModulesPath } = options;
  if (!fs.existsSync(packageJSONPath)) {
    throw new CustomError(
      `packageJSONPath ${packageJSONPath} is not exist`,
      ERROR_CODE.INVALID_PACKAGE_JSON_PATH
    );
  }

  if (!fs.existsSync(nodeModulesPath)) {
    throw new CustomError(
      `nodeModulesPath ${nodeModulesPath} is not exist`,
      ERROR_CODE.INVALID_NODE_MODULES_PATH
    );
  }

  const packageJSONContent = JSON.parse(
    fs.readFileSync(packageJSONPath, "utf-8")
  );

  const allDependencies = {
    ...(packageJSONContent.dependencies || {}),
    ...(packageJSONContent.devDependencies || {}),
  };

  const validateResult = !Object.entries(allDependencies).some((entryItem) => {
    const [name, version] = entryItem;

    const dependencyPackageJSONPath = path.join(
      nodeModulesPath,
      name,
      "package.json"
    );

    return !fs.existsSync(dependencyPackageJSONPath);
  });

  if (!validateResult) {
    throw new CustomError("lose dependency", ERROR_CODE.LOSE_DEPENDENCY);
  }
};

/**
 * async shell executor util
 * @param {string} command
 * @returns {Promise<[number, string]>}
 */
const asyncShellExecutor = (command, contextPath) => {
  if (contextPath) {
    shelljs.cd(contextPath);
  }
  return new Promise((resolve, reject) => {
    shelljs.exec(command, { async: true }, (code, stdout, stderr) => {
      if (!code) {
        resolve(code, stdout);
        return;
      }

      reject(stderr);
    });
  }).finally(() => {
    shelljs.cd(ORIGIN_DIR);
  });
};

module.exports = {
  asyncShellExecutor,
  checkAllDependencies,
  CustomError,
};
