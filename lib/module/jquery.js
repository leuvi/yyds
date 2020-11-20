var chalk = require('chalk')
var shell = require('shelljs')
var { buildDirectory, copySource } = require('../utils')

function init(directory) {
  var directoryJson = [
    {
      type: 'f',
      value: 'package.json'
    },
    {
      type: 'f',
      value: 'README.md'
    },
    {
      type: 'd',
      name: 'config',
      value: [
        {
          type: 'f',
          value: 'base.js'
        },
        {
          type: 'f',
          value: 'dev.js'
        },
        {
          type: 'f',
          value: 'prod.js'
        }
      ]
    },
    {
      type: 'd',
      name: 'public',
      value: [
        {
          type: 'f',
          value: 'index.html'
        },
        {
          type: 'f',
          value: 'h5.html'
        },
      ]
    },
    {
      type: 'd',
      name: 'assets',
      value: [
        {
          type: 'd',
          name: 'images'
        },
        {
          type: 'd',
          name: 'utils'
        },
        {
          type: 'd',
          name: 'css'
        }
      ]
    },
    {
      type: 'd',
      name: 'src',
      value: [
        {
          type: 'f',
          value: 'index.js'
        },
        {
          type: 'f',
          value: 'h5.js'
        },
        {
          type: 'f',
          value: 'share.js'
        }
      ]
    }
  ]
  //生成目录
  buildDirectory(directoryJson, directory)
  console.log(`${chalk.black.bgGreen('✔ ')} ${chalk.green('创建完成')}`)
  console.log(` `)

  //cd到项目目录
  shell.cd(directory)

  //拷贝资源文件
  //@开头的文件是公共目录里的文件
  try {
    [
      'package.json',
      'README.md',
      '@copy.js',
      '@cdn_config.js',
      '@upload_cdn.js',
      'public/index.html',
      'public/h5.html',
      'src/index.js',
      'src/h5.js',
      'src/share.js',
      'config/base.js',
      'config/dev.js',
      'config/prod.js',
      '@public/favicon.ico',
      'assets/css/index.less',
      'assets/css/h5.less',
      '@assets/css/normalize.less',
      '@assets/css/reset.less'
    ].forEach(fileName => {
      if (fileName.charAt(0) === '@') {
        fileName = fileName.slice(1)
        copySource('common/' + fileName.split('/')[fileName.split('/').length - 1], fileName)
      } else {
        copySource('jquery/' + fileName.split('/')[fileName.split('/').length - 1], fileName)
      }
    })

    shell.sed('-i', 'mysites', 'lds_' + directory, 'package.json')
  } catch (error) { }


  //安装依赖
  console.log(`${chalk.black.bgBlue('↹ ')} ${chalk.blue('开始安装依赖')}\n\n`)
  shell.exec('npm config set loglevel=http')
  shell.exec('npm config set registry http://registry.npm.taobao.org', { silent: true })
  shell.exec('npm install', { silent: false })

  console.log(`\n\n${chalk.black.bgGreen('✔ ')} ${chalk.green('项目初始化完成')}

  cd ${directory}

  - local：${chalk.yellow('npm start')}
  - build：${chalk.yellow('npm run build')}
  - prod：${chalk.yellow('npm run prod')}
  `)

}

module.exports = init