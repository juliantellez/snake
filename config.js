const path = require('path')

const APP = path.resolve(__dirname, 'app')
const BUILD = path.resolve(__dirname, 'build')

const SRC = path.resolve(APP, 'scripts')

module.exports = {
  APP,
  SRC,
  BUILD,
}
