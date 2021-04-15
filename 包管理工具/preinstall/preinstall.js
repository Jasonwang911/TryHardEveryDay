const { exec } = require('node:child_process')

require('child_process').exec('npm config get registry', function(error, stdout, stderr) {
  if(!stdout.toString().match(/registry\.x\.com/)) {
    exec('npm config set @xscope:registry https://xxx/com/npm/')
  }
})