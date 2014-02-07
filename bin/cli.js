#!/usr/bin/env node

var pkg = require('../package.json')
var program = require('commander')
var clingwrap = require('..')

program
  .version(pkg.version)
  .on('--help', function () {
    console.log('  '+pkg.description)
  })

program
  .command('update <packages>')
  .description('update shrinkwrap for named package(s) and dependencies')
  .action(function (package) {
    console.log('updating', package)
  })

program
  .command('npmbegone')
  .description('strip hardcoded npmjs.org urls from shrinkwrap for faster installs')
  .action(function () {
    clingwrap.show()
  })

program.parse(process.argv)

if (!program.args.length) program.help()
