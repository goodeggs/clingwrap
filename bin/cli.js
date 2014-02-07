#!/usr/bin/env node

var pkg = require('../package.json'),
    program = require('commander'),
    cw = require('..')

program
  .version(pkg.version)
  .usage('[npmbegone] <package ...>')
  .on('--help', function () {
    console.log('  '+pkg.description)
  })

program
  .command('npmbegone')
  .description('strip hardcoded npmjs.org urls from shrinkwrap for faster installs')
  .action(function () {
    cw.loadExisting(function (err, shrinkwrap) {
      cw.npmbegone(shrinkwrap)
      cw.write(shrinkwrap, function () {})
    })
  })

program
  .command('*')
  .usage('<package ...>')
  .description('update or remove shrinkwrap for named package(s) and dependencies')
  .action(function () {
    var packages = Array.prototype.slice.call(arguments, 0, -1)
    if (packages.length < 1)
      return this.missingArgument('package')

    cw.loadExisting(safe(function (destShrinkwrap) {
      cw.generateNew(safe(function (srcShrinkwrap) {
        var results = cw.sync(srcShrinkwrap, destShrinkwrap, packages)
        cw.write(destShrinkwrap, safe(function () {
          summarizeSync(packages, results)
        }))
      }))
    }))
  })


program.parse(process.argv)

if (!program.args.length) program.help()


function safe (callback) {
  return function (err, result) {
    if (err) {
      throw(err)
      console.error(err)
      process.exit(1)
    }
    callback(result)
  }
}

function summarizeSync (packages, results) {
  var  colors = require('colors'),
      Table = require('cli-table')

  var versionFormatters = {
    added:   function (src, dest) { return src.green },
    removed: function (src, dest) { return 'removed'.red },
    changed: function (src, dest) { return (dest +' → '+ src).blue },
    unknown: function (src, dest) { return 'unknown'.grey }
  }

  var table = new Table({
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
           'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
           'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
           'right': '' , 'right-mid': '' , 'middle': ' ' },
    style: { 'padding-left': 0, 'padding-right': 0 }
  })

  packages.forEach(function (package) {
    var result = results[package]
    var row = {}
    row[package.black] = versionFormatters[result.action](result.src, result.dest)
    table.push(row)
  })
  console.log(table.toString())
}
