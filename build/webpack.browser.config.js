var path = require('path')
var fs = require('fs')

var dirPath = path.resolve(__dirname, '..', 'html5', 'runtime')
var filePath = path.join(dirPath, 'config.js')
if (!fs.existsSync(filePath)) {
  var programName = require('os').platform() === 'win32' ? 'npm.cmd' : 'npm'
  require('child_process').spawnSync(programName, ['run', 'build:config'])
}

var webpack = require('webpack')

var pkg = require('../package.json')

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js$/
})

var version = pkg.subversion.browser

var date = new Date().toISOString().split('T')[0].replace(/\-/g, '')
var banner = `(this.nativeLog || function(s) {console.log(s)})` +
  `('START WEEX HTML5: ${version} Build ${date}');`;

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: './html5/browser',
  output: {
    path: './dist',
    filename: 'browser.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json'},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [bannerPlugin, sourceMapPlugin]
}
