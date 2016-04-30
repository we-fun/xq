const packager = require('electron-packager')
const join = require('path').join

packager({
  'app-version': require('./package.json').version,
  platform: process.platform,
  arch: process.arch,

  // https://github.com/electron-userland/electron-packager/blob/master/index.js
  dir: join(__dirname, 'app'), // 后面不要加`/` 否则影响ignore判断
  ignore: (file) => {
    // return !!file.match(/^\/src($|\/)/)
    return !!file.match(/^\/src$/) // 也可以
  },

  out: join(__dirname, 'pack'),
  overwrite: true
}, (err, appPath) => {
  if (err) throw err
  console.log('appPath', appPath)
})
