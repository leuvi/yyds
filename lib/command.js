const inquirer = require('inquirer')
const shell = require('shelljs')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')

//初始化命令
function init(directory) {
  const templates = [
    {
      name: '专题页模板',
      value: 'simple',
      url: 'activity_page_template'
    },
    {
      name: 'Vue模板',
      value: 'vue',
      url: ''
    },
    {
      name: 'React模板',
      value: 'react',
      url: ''
    },
    {
      name: 'Nuxt模板',
      value: 'nuxt',
      url: ''
    },
    {
      name: 'Next模板',
      value: 'next',
      url: ''
    },
    {
      name: 'Vue后台',
      value: 'vueadmin',
      url: ''
    },
    {
      name: 'React后台',
      value: 'reactadmin',
      url: ''
    }
  ]
  if (shell.test('-e', directory)) {
    inquirer.prompt({
      type: 'confirm',
      name: 'hasDirectory',
      message: `已存在 ${chalk.yellow(directory)} 目录，是否继续?`
    }).then(res => {
      if (res.hasDirectory) {
        shell.rm('-rf', directory)
        start()
      } else {
        console.log(`${chalk.gray('\n ↶ 已取消')}`)
      }
    })
  } else {
    start()
  }

  function start() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '选择项目类型',
        choices: templates
      }
    ]).then(res => {
      const url = templates.find(e => e.value === res.type).url
      if (!url) {
        return console.log(`${chalk.gray('\n  努力开发中...')}`)
      }
      console.log(' ')
      const spinner = ora({
        interval: 100,
        text: '开始下载'
      }).start()
      download(`leuvi/${url}#main`, directory, err => {
        if (err) {
          return spinner.fail('下载失败')
        }
        spinner.succeed('下载完成')
      })
    })
  }
}

module.exports = {
  init,
}