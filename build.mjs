#!/usr/bin/env zx

let { version } = require('./package.json')

$.verbose = false

let answer = await question(chalk`是否变更当前版本号 {white.bgRed  ${version} } ? [y/n] `)

if (answer != 'n') {
  let newVersion = await question('请输入新版本号：')
  await $`sed -i s/${version}/${newVersion}/g package.json`
  console.log(`版本号已变更为 ${chalk.green(` ${newVersion} `)}`)
}

await sleep(1000)
