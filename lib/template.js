const child_process = require('child_process')
const ora = require('ora')
const shell = require('shelljs')
const chalk = require('chalk')

function simple(directory) {
  const spinner = ora({
    interval: 100,
    text: '安装依赖..'
  }).start()
  shell.exec('npm config set loglevel=http')
  shell.exec('npm config set registry http://registry.npm.taobao.org', { silent: true })

  //开启子进程安装依赖
  child_process.exec('npm install', (err, stdout, stderr) => {
    if (err) {
      installSpinner.color = 'red'
      installSpinner.fail(chalk.red('依赖安装失败，请您重新安装!'))
      console.log(err)
    } else {
      spinner.succeed('初始化完成')
      //console.log(`${stderr}---${stdout}`)
      console.log(`
  cd ${directory}

  - local：${chalk.yellow('npm start')}
  - build：${chalk.yellow('npm run build')}
  - prod：${chalk.yellow(' npm run prod')}
      `)
    }
  })

}

function vue(directory) {
  const spinner = ora({
    interval: 100,
    text: '安装依赖..'
  }).start()
  shell.exec('npm config set loglevel=http')
  shell.exec('npm config set registry http://registry.npm.taobao.org', { silent: true })

  //开启子进程安装依赖
  child_process.exec('npm install', (err, stdout, stderr) => {
    if (err) {
      installSpinner.color = 'red'
      installSpinner.fail(chalk.red('依赖安装失败，请您重新安装!'))
      console.log(err)
    } else {
      spinner.succeed('初始化完成')
      console.log(`
  cd ${directory}

  - local：${chalk.yellow('npm run serve')}
  - build：${chalk.yellow('npm run build')}
      `)
    }
  })
}

function react() {

}

function vueadmin() {

}

function reactadmin() {

}

function rollup() {
  const spinner = ora({
    interval: 100,
    text: '安装依赖..'
  }).start()
  shell.exec('npm config set loglevel=http')
  shell.exec('npm config set registry http://registry.npm.taobao.org', { silent: true })

  //开启子进程安装依赖
  child_process.exec('npm install', (err, stdout, stderr) => {
    if (err) {
      installSpinner.color = 'red'
      installSpinner.fail(chalk.red('依赖安装失败，请您重新安装!'))
      console.log(err)
    } else {
      spinner.succeed('初始化完成')
      console.log(`

  -   dev：${chalk.yellow('npm run dev')}
  - build：${chalk.yellow('npm run build')}
      `)
    }
  })
}

function npm() {

}

module.exports = {
  simple,
  vue,
  react,
  vueadmin,
  reactadmin,
  rollup,
  npm
}