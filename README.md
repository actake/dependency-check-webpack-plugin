# dependency-check-webpack-plugin

Check if there are new dependencies in package.json that have not been installed, if exist, it will automatically execute the install command

## Install

```bash
npm i --save-dev dependency-check-webpack-plugin
```

```bash
yarn add dependency-check-webpack-plugin -D
```

## Usage

### webpack.config.js

```javascript
const { DependencyCheckWebpackPlugin } = require("dependency-check-webpack-plugin");

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    // give some options
    new HtmlWebpackPlugin({})
  ]
}
```

## Options

|      Name       |  Type   | Required |           Default            |            Description            |
| :-------------: | :-----: | :------: | :--------------------------: | :-------------------------------: |
|      skip       | boolean |  false   |            false             |      skip plugin  execution       |
| installCommand  | string  |  false   |        'yarn install'        |  install command in your project  |
| packageJSONPath | string  |  false   | `${executeDir}/package.json` | package.json path in your project |
| nodeModulesPath | string  |  false   | `${executeDir}/node_modules` | node_modules path in your project |

