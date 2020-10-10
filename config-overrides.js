const theme = require('./theme')

const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require('customize-cra')
module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: theme,
    },
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addDecoratorsLegacy()
)
