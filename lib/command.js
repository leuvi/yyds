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
      url: 'activity_page_template'
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
      name: 'nuxt',
      value: 'nuxt',
      url: ''
    },
    {
      name: 'next',
      value: 'next',
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
    }
  ]
  if (shell.test('-e', directory)) {
    inquirer.prompt({
      type: 'confirm',
      name: 'hasDirectory',
      message: `Already exists ${chalk.yellow(directory)} directory, continue?`
    }).then(res => {
      if (res.hasDirectory) {
        shell.rm('-rf', directory)
        start()
      } else {
        console.log(`${chalk.gray('\n ↶ Cancelled')}`)
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
        message: 'Select project',
        choices: templates
      }
    ]).then(res => {
      const url = templates.find(e => e.value === res.type).url
      if (!url) {
        return console.log(`${chalk.gray('\n  Working hard...')}`)
      }
      console.log(' ')
      const spinner = ora({
        interval: 100,
        text: 'start'
      }).start()

      spinner.color = 'yellow'
      spinner.text = 'Download templates..'

      download(`leuvi/${url}#main`, directory, err => {
        if (err) {
          return spinner.fail('fail')
        }
        spinner.succeed('Download complete')
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