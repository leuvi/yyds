var shell = require('shelljs')
var chalk = require('chalk')
var path = require('path')

let list = ''

//生成目录
function buildDirectory(directoryJson, directory, count = 0) {
  if (directory) {
    shell.mkdir(directory)
    shell.cd(directory)
  }
  directoryJson.forEach(item => {
    if (item.type === 'f') {
      shell.touch(item.value)
      list += ''.padStart(count * 3) + item.value + '\n'
    }
    if (item.type === 'd') {
      shell.mkdir(item.name)
      if (item.value && item.value.length) {
        list += ''.padStart(count * 3) + '▾ ' + item.name + '\n'
        shell.cd(item.name)
        buildDirectory(item.value, null, count + 1)
        shell.cd('..')
      } else {
        list += ''.padStart(count * 3) + '▸ ' + item.name + '\n'
      }
    }
  })
  if (directory) {
    shell.cd('..')
    console.log(` `)
    console.log(`${chalk.black.bgBlue('↻ ')} ${chalk.blue('创建项目结构')}

${list}`)
  }
}

//拷贝资源
function copySource(file, outfile) {
  var dir = path.join(__dirname.replace('utils', ''), 'template', file)
  shell.cp('-rf', dir, outfile)
}

module.exports = {
  buildDirectory,
  copySource
}