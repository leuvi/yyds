#!/usr/bin/env node
const { Command, Option } = require('commander')
const program = new Command()
const package = require('../package.json')
const { init } = require('./command')

program
  .version(package.version, '-v, --version', 'Version number')
  .name(package.name)
  .usage("<command> [options]")
  .addOption(new Option('-s, --secret').hideHelp())
  .helpOption('-h, --help', 'Help information')

program
  .command('init <appName>')
  .description('Initialize project')
  .action((appName) => {
    init(appName)
  })

program.addHelpCommand(false)

program.parse(process.argv)
