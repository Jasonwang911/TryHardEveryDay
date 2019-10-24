// 存放脚手架所需要的常量
const { version } = require('../package.json');

const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;
console.log(downloadDirectory);

module.exports = {
  version,
  downloadDirectory,
};
