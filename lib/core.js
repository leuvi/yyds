#!/usr/bin/env node

var { showVersion, showHelp, createProject, uploadCdn } = require('./command')

var args = process.argv.slice(2)

if (!args.length || args[0] == '-v') {
  showVersion()
}

if (args[0] == '-h') {
  showHelp()
}

if(args[0] == 'init') {
  createProject(args[1])
}