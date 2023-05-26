import { Compiler } from "webpack";

export = DependencyCheckWebpackPlugin;

declare class DependencyCheckWebpackPlugin {
  constructor(options?: DependencyCheckWebpackPlugin.Options);

  userOptions: DependencyCheckWebpackPlugin.Options;

  options: DependencyCheckWebpackPlugin.Options;

  apply(compiler: Compiler): void;
}

declare namespace DependencyCheckWebpackPlugin {
  interface Options {
    /** 
     * will skip plugin execute when set to true
     * @default false
     */
    skip?: boolean;
    /**
     * install command in your project
     * @default 'yarn install'
     */
    installCommand?: string;
    /**
     * package.json path in your project
     */
    packageJSONPath: string;
    /**
     * node_modules path in your project
     * @default node_modules directory under the same level as package.json
    */
    nodeModulesPath?: string;
  }

  type ErrorCode = 'INVALID_PACKAGE_JSON_PATH' | 'INVALID_NODE_MODULES_PATH' | 'LOSE_DEPENDENCY'

  type ErrorCodeList = { [key in ErrorCode]: key };

  interface CustomError extends Error {
    code: ErrorCode;
  }
}