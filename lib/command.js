var package = require('../package.json')
var inquirer = require('inquirer')
var shell = require('shelljs')
var chalk = require('chalk')

//输出版本信息
function showVersion() {
  console.log('当前版本：' + package.version)
}

//输出帮助信息
function showHelp() {
  console.log(`使用方法: ldssite [options] [command]

Options:
  -v                  版本号
  -h                  帮助信息

Command：
  init <directory>    项目初始化

Support:
  产品官网或专题(集成pc和h5页面)
  客户端弹窗cef页(可选择vue或react)
  管理后台(react)
  nuxt服务端渲染项目
`)
}

//初始化项目
function createProject(directory = 'mypage') {
  if (shell.test('-e', directory)) {
    inquirer.prompt({
      type: 'confirm',
      name: 'hasDirectory',
      message: `已存在 ${chalk.yellow(directory)} 目录，是否继续?`
    }).then(res => {
      if (res.hasDirectory) {
        shell.rm('-rf', directory)
        init()
      } else {
        console.log(`
${chalk.gray('↶ 已取消')}`)
      }
    })
  } else {
    init()
  }

  function init() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: '选择项目类型',
        choices: [
          {
            name: '原生单页 (简单官网和专题)',
            value: 'jquery'
          },
          {
            name: 'React SPA (弹窗类项目)',
            value: 'react'
          },
          {
            name: 'Vue SPA (弹窗类项目)',
            value: 'vue'
          },
          {
            name: '服务端渲染 (SEO支持)',
            value: 'nuxt'
          },
          {
            name: '管理后台',
            value: 'admin'
          }
        ]
      }
    ]).then(res => {
      require(`./module/${res.framework}`)(directory)
    })
  }
}

module.exports = {
  showVersion,
  showHelp,
  createProject
}