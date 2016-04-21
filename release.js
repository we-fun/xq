const packager = require('electron-packager')
const join = require('path').join

packager({
  'app-version': require('./package.json').version,
  platform: process.platform,
  arch: process.arch,
  dir: join(__dirname, 'app'),
  out: join(__dirname, 'pack'),
  overwrite: true
}, (err, appPath) => {
  if (err) throw err
  console.log('appPath', appPath)
})
