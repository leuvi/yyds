var shell = require('shelljs')
var chalk = require('chalk')

function rm(dir) {
  if (!dir) return
  shell.rm('-rf', dir)
}

function cp(dir, outdir) {
  if (!dir && !outdir) {
    console.log('拷贝失败, 缺少参数')
  }
  shell.cp('-rf', dir, outdir)
}

function sed(grepString, newString, file) {
  shell.sed('-i', grepString, newString, file)
}

function log(text, color, type) {
  if (!text) {
    return
  }
  var defaultColor = '#18ad79'
  if (!color && !type) {
    console.log(chalk.hex(defaultColor)(text))
  }
  if (color && !type) {
    if (color == '-i') {
      console.log(chalk.hex(defaultColor).inverse(text))
    }
    if (color == '-u') {
      console.log(chalk.hex(defaultColor).underline(text))
    }
    if (color.charAt(0) == '#') {
      console.log(chalk.hex(color)(text))
    }
  }
  if (color && type) {
    if (type == '-i') {
      console.log(chalk.hex(color).inverse(text))
    }
    if (type == '-u') {
      console.log(chalk.hex(color).underline(text))
    }
  }
}

module.exports = {
  rm,
  cp,
  sed,
  log
}