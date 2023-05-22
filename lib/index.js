const PLUGIN_INFO = {
  NAME: "DependencyCheckWebpackPlugin", // 插件名称
};

class DependencyCheckWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.environment.tap(PLUGIN_INFO.NAME, (compilation) => {});
  }
}

module.exports = { DependencyCheckWebpackPlugin };
