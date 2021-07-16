const child_process = require('child_process')
const inquirer = require('inquirer')
const shell = require('shelljs')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')

function init(directory) {
  const templates = [
    {
      name: 'simple',
      value: 'simple',
      url: 'activity_page_template',
      des: '原生单页模板(适合专题页、简单官网，支持PC和H5)'
    },
    {
      name: 'vue',
      value: 'vue',
      url: 'vue_template'
    },
    {
      name: 'react',
      value: 'react',
      url: ''
    },
    {
      name: 'vue admin',
      value: 'vueadmin',
      url: ''
    },
    {
      name: 'react admin',
      value: 'reactadmin',
      url: ''
    },
    {
      name: 'rollup',
      value: 'rollup',
      url: 'rollup_template'
    },
    {
      name: 'npm',
      value: 'npm',
      url: 'npm_package_template'
    },
  ]
  if (shell.test('-e', directory)) {
    inquirer.prompt({
      type: 'confirm',
      name: 'hasDirectory',
      message: `已存在 ${chalk.yellow(directory)} 目录, 继续?`
    }).then(res => {
      if (res.hasDirectory) {
        shell.rm('-rf', directory)
        start()
      } else {
        console.log(`${chalk.gray('\n ↶ 取消')}`)
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
        message: '选择模板类型',
        choices: templates
      }
    ]).then(res => {
      const url = templates.find(e => e.value === res.type).url
      if (!url) {
        return console.log(`${chalk.gray('\n  努力完善中...')}`)
      }
      console.log(' ')
      const spinner = ora({
        interval: 100,
        text: '开始'
      }).start()

      spinner.color = 'yellow'
      spinner.text = '正在下载模板..'

      download(`leuvi/${url}#main`, directory, err => {
        if (err) {
          return spinner.fail('失败')
        }
        spinner.succeed('模板文件下载完成')
        shell.cd(directory)
        shell.sed('-i', 'project_name', directory + '_web', 'package.json')
        console.log(' ')

        //git init
        const gitInitSpinner = ora(`${chalk.cyan.bold('git init')}`).start()
        const gitInit = child_process.exec('git init')
        gitInit.on('close', code => {
          if (code === 0) {
            gitInitSpinner.color = 'green'
            gitInitSpinner.succeed(gitInit.stdout.read())
            console.log(' ')
            require('./template')[res.type](directory)
          }
          else {
            gitInitSpinner.color = 'red'
            gitInitSpinner.fail(gitInit.stderr.read())
          }
        })
      })
    })
  }
}

module.exports = {
  init,
}