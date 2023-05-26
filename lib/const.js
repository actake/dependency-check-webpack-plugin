/** @typedef {import("../typings").ErrorCodeList} PluginErrorCodeList */

const shelljs = require("shelljs");

/** start dir context */
const ORIGIN_DIR = shelljs.pwd().toString();

/**
 * error code list
 * @type {PluginErrorCodeList}
 */
const ERROR_CODE = {
  INVALID_PACKAGE_JSON_PATH: "INVALID_PACKAGE_JSON_PATH",
  INVALID_NODE_MODULES_PATH: "INVALID_NODE_MODULES_PATH",
  LOSE_DEPENDENCY: "LOSE_DEPENDENCY",
};

module.exports = {
  ORIGIN_DIR,
  ERROR_CODE,
};
