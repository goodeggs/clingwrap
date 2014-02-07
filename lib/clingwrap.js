var findPrefix = require('npm/lib/utils/find-prefix'),
    path = require('path'),
    fs = require('fs')

// findPrefix(process.cwd(), function (err, prefix) {
//   console.log(fs.readFileSync(path.resolve(prefix, 'npm-shrinkwrap.json'), 'utf8'))
// })
function npmbegone (pkginfo) {
  ['from', 'resolved'].forEach(function (key) {
    if (pkginfo[key] && /registry\.npmjs\.org/.test(pkginfo[key]))
      delete pkginfo[key]
  })

  for (var dependency in pkginfo.dependencies || {})
    npmbegone(pkginfo.dependencies[dependency])

  return pkginfo
}

module.exports = {
  npmbegone: npmbegone
}

