var npm = require('npm'),
    path = require('path'),
    fs = require('fs')

// findPrefix(process.cwd(), function (err, prefix) {
//   console.log(fs.readFileSync(path.resolve(prefix, 'npm-shrinkwrap.json'), 'utf8'))
// })
var clingwrap = module.exports

clingwrap.generateNew = function (cb) {
  npm.load(function (err) {
    if (err) return cb(err)
    npm.commands.ls([], true, function (err, _, pkginfo) {
      cb(err, pkginfo)
    })
  })
}

clingwrap.loadExisting = function (cb) {
  npm.load(function (err) {
    if (err) return cb(err)
    var file = path.resolve(npm.prefix, 'npm-shrinkwrap.json')
    fs.readFile(file, 'utf8', function (err, data) {
      cb(err, JSON.parse(data))
    });
  })
}

clingwrap.write = function (pkginfo, cb) {
  npm.load(function (err) {
    if (err) return cb(err)
    var file = path.resolve(npm.prefix, 'npm-shrinkwrap.json')
    var data = JSON.stringify(pkginfo, null, 2) + "\n"
    fs.writeFile(file, data, cb)
  })
}

function summarize (srcPkg, destPkg) {
  var result = {
    src: srcPkg && srcPkg.version,
    dest: destPkg && destPkg.version
  }
  if (!destPkg && srcPkg) {
    result.action = 'added'
  } else if (destPkg && !srcPkg) {
    result.action = 'removed'
  } else if (!srcPkg && !destPkg) {
    result.action = 'unknown'
  } else {
    result.action = 'changed'
  }
  return result
}

clingwrap.sync = function (src, dest, packages) {
  var results = {},
      srcDeps = src.dependencies || {},
      destDeps = dest.dependencies || {}

  packages.forEach(function (package) {
    var srcPkg = srcDeps[package]
        destPkg = destDeps[package]

    if (srcPkg.problems)
      throw new Error(srcPkg.problems.join('\n'))
    clingwrap.npmbegone(srcPkg)
    results[package] = summarize(srcPkg, destPkg)
    destDeps[package] = srcPkg
  })

  return results
}

clingwrap.npmbegone = function (pkginfo) {
  ['from', 'resolved'].forEach(function (key) {
    if (pkginfo[key] && /registry\.npmjs\.org/.test(pkginfo[key]))
      delete pkginfo[key]
  })

  for (var dependency in pkginfo.dependencies || {})
    clingwrap.npmbegone(pkginfo.dependencies[dependency])

  return pkginfo
}


