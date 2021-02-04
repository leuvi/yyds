const ora = require('ora')
const shell = require('shelljs')
const chalk = require('chalk')

function simple(directory) {
  const spinner = ora({
    interval: 100,
    text: 'Install dependency..'
  }).start()
  shell.exec('npm config set loglevel=http')
  shell.exec('npm config set registry http://registry.npm.taobao.org', { silent: true })
  shell.exec('npm install', { silent: true })
  spinner.succeed('Initialization complete')
  console.log(`
  cd ${directory}

  - local：${chalk.yellow('npm start')}
  - build：${chalk.yellow('npm run build')}
  - prod：${chalk.yellow(' npm run prod')}
  `)
}

function vue() {

}

function react() {

}

function nuxt() {

}

function next() {

}

function vueadmin() {

}

function reactadmin() {

}
module.exports = {
  simple,
  vue,
  react,
  nuxt,
  next,
  vueadmin,
  reactadmin
}